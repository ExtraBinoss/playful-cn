#!/usr/bin/env node
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { confirm } from "@inquirer/prompts";
import { Command } from "commander";
import { execa } from "execa";
import { z } from "zod";

const DEFAULT_REGISTRY_URL =
	"https://raw.githubusercontent.com/ExtraBinoss/playful-cn/main/registry/index.json";

const registryItemSchema = z.object({
	name: z.string(),
	type: z.enum(["component", "lib"]),
	title: z.string().optional(),
	files: z.array(z.string()),
	dependencies: z.array(z.string()),
	registryDependencies: z.array(z.string()),
});

const registrySchema = z.object({
	name: z.string(),
	source: z.object({
		type: z.literal("github-raw"),
		owner: z.string(),
		repo: z.string(),
		branch: z.string(),
	}),
	styles: z.object({
		name: z.string(),
		files: z.array(z.string()),
	}),
	items: z.array(registryItemSchema),
});

type Registry = z.infer<typeof registrySchema>;
type RegistryItem = z.infer<typeof registryItemSchema>;
type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

type CliOptions = {
	cwd: string;
	registryUrl: string;
	path?: string;
	yes?: boolean;
	overwrite?: boolean;
	dryRun?: boolean;
};

type ProjectContext = {
	root: string;
	packageJsonPath: string;
	packageJson: {
		dependencies?: Record<string, string>;
		devDependencies?: Record<string, string>;
	};
	packageManager: PackageManager;
	targetRoot: string;
	hasSrc: boolean;
};

const program = new Command();

program
	.name("playful-cn")
	.description("Install Playful CN components into React projects.")
	.version("0.1.0")
	.option("--cwd <cwd>", "project directory", process.cwd())
	.option("--registry-url <url>", "registry URL", DEFAULT_REGISTRY_URL)
	.option("--yes", "skip confirmation prompts")
	.option("--dry-run", "show actions without writing files");

program
	.command("list")
	.description("List available registry items.")
	.action(async () => {
		const options = program.opts<CliOptions>();
		const registry = await loadRegistry(options.registryUrl);
		for (const item of registry.items.filter(
			(entry) => entry.type === "component",
		)) {
			console.log(`${item.name}${item.title ? ` - ${item.title}` : ""}`);
		}
	});

program
	.command("init")
	.description("Install Playful CN base styles.")
	.option("--path <path>", "installation directory")
	.option("--overwrite", "overwrite existing files")
	.action(async (commandOptions: Pick<CliOptions, "path" | "overwrite">) => {
		const options = mergeOptions(commandOptions);
		const registry = await loadRegistry(options.registryUrl);
		const project = await getProjectContext(options);
		await explainSource(options.registryUrl, options);
		await installStyles(registry, project, options);
		await maybeInstallDependencies(project, ["motion"], options);
		printNextSteps(project);
	});

program
	.command("add")
	.description("Install one or more components.")
	.argument("<items...>", "registry item names")
	.option("--path <path>", "installation directory")
	.option("--overwrite", "overwrite existing files")
	.action(
		async (
			itemNames: string[],
			commandOptions: Pick<CliOptions, "path" | "overwrite">,
		) => {
			const options = mergeOptions(commandOptions);
			const registry = await loadRegistry(options.registryUrl);
			const project = await getProjectContext(options);
			await explainSource(options.registryUrl, options);

			const resolvedItems = resolveItems(registry, itemNames);
			const runtimeDependencies = unique(
				resolvedItems.flatMap((item) => item.dependencies),
			);

			await installStyles(registry, project, options);
			await installItems(registry, resolvedItems, project, options);
			await maybeInstallDependencies(project, runtimeDependencies, options);
			printNextSteps(project, itemNames);
		},
	);

program
	.command("diff")
	.description("Show files and dependencies that would be installed.")
	.argument("<items...>", "registry item names")
	.action(async (itemNames: string[]) => {
		const options = mergeOptions({});
		const registry = await loadRegistry(options.registryUrl);
		const resolvedItems = resolveItems(registry, itemNames);
		const files = unique(resolvedItems.flatMap((item) => item.files));
		const dependencies = unique(
			resolvedItems.flatMap((item) => item.dependencies),
		);

		console.log("Registry items:");
		for (const item of resolvedItems) console.log(`- ${item.name}`);
		console.log("\nFiles:");
		for (const file of files) console.log(`- ${file}`);
		console.log("\nDependencies:");
		for (const dependency of dependencies) console.log(`- ${dependency}`);
	});

await program.parseAsync(process.argv);

function mergeOptions<T extends Partial<CliOptions>>(
	commandOptions: T,
): CliOptions {
	const rootOptions = program.opts<CliOptions>();
	return {
		cwd: rootOptions.cwd,
		registryUrl: rootOptions.registryUrl,
		yes: rootOptions.yes,
		dryRun: rootOptions.dryRun,
		...commandOptions,
	};
}

async function loadRegistry(registryUrl: string) {
	const raw = registryUrl.startsWith("file:")
		? await readFile(fileURLToPath(registryUrl), "utf8")
		: await fetchText(registryUrl);
	return registrySchema.parse(JSON.parse(raw));
}

async function getProjectContext(options: CliOptions): Promise<ProjectContext> {
	const root = path.resolve(options.cwd);
	const packageJsonPath = path.join(root, "package.json");
	const packageJson = JSON.parse(
		await readFile(packageJsonPath, "utf8"),
	) as ProjectContext["packageJson"];
	const hasSrc = await pathExists(path.join(root, "src"));
	const installBase = options.path
		? path.resolve(root, options.path)
		: path.join(root, hasSrc ? "src/lib" : "lib");
	const targetRoot = installBase.endsWith("playful-cn")
		? installBase
		: path.join(installBase, "playful-cn");

	return {
		root,
		packageJsonPath,
		packageJson,
		packageManager: await detectPackageManager(root),
		targetRoot,
		hasSrc,
	};
}

async function detectPackageManager(root: string): Promise<PackageManager> {
	if (await pathExists(path.join(root, "pnpm-lock.yaml"))) return "pnpm";
	if (await pathExists(path.join(root, "bun.lockb"))) return "bun";
	if (await pathExists(path.join(root, "yarn.lock"))) return "yarn";
	return "npm";
}

async function explainSource(registryUrl: string, options: CliOptions) {
	console.log(`playful-cn will download registry files from:\n${registryUrl}`);
	if (options.yes) return;
	const shouldContinue = await confirm({
		message: "Continue with this registry source?",
		default: true,
	});
	if (!shouldContinue) process.exit(0);
}

function resolveItems(registry: Registry, names: string[]) {
	const byName = new Map(registry.items.map((item) => [item.name, item]));
	const resolved = new Map<string, RegistryItem>();

	function visit(name: string) {
		const item = byName.get(name);
		if (!item) {
			throw new Error(
				`Unknown registry item "${name}". Run "playful-cn list" to see available items.`,
			);
		}
		for (const dependency of item.registryDependencies) visit(dependency);
		resolved.set(item.name, item);
	}

	for (const name of names) visit(name);
	return [...resolved.values()];
}

async function installStyles(
	registry: Registry,
	project: ProjectContext,
	options: CliOptions,
) {
	const target = path.join(project.targetRoot, "styles.css");
	const contents = await Promise.all(
		registry.styles.files.map((file) =>
			fetchSourceFile(registry, options, file),
		),
	);
	const styleFile = [
		"/* Generated by playful-cn. Edit CSS variables here to customize the theme. */",
		...contents,
	].join("\n\n");

	await writeTargetFile(target, styleFile, options);
	await maybePatchGlobalCss(project, options);
}

async function installItems(
	registry: Registry,
	items: RegistryItem[],
	project: ProjectContext,
	options: CliOptions,
) {
	const seenFiles = new Set<string>();
	for (const item of items) {
		for (const sourceFile of item.files) {
			if (seenFiles.has(sourceFile)) continue;
			seenFiles.add(sourceFile);
			const target = path.join(project.targetRoot, getTargetPath(sourceFile));
			const source = await fetchSourceFile(registry, options, sourceFile);
			await writeTargetFile(
				target,
				transformImports(source, sourceFile),
				options,
			);
		}
	}
}

function getTargetPath(sourceFile: string) {
	return sourceFile
		.replace(/^src\/components\/playful\//, "components/")
		.replace(/^src\/lib\/styling\//, "lib/")
		.replace(/^src\/lib\/react\//, "lib/")
		.replace(/^src\/lib\/colors\//, "lib/")
		.replace(/^src\/lib\/animation\//, "lib/");
}

function transformImports(source: string, sourceFile: string) {
	const targetPath = getTargetPath(sourceFile);
	const fromDirectory = path.posix.dirname(targetPath);

	return source.replace(
		/from\s+["']((?:\.\.\/)+lib\/(?:styling|react|colors|animation)\/[^"']+)["']/g,
		(_match, importPath: string) => {
			const normalized = path.posix.normalize(
				path.posix.join(path.posix.dirname(sourceFile), importPath),
			);
			const targetImport = getTargetPath(normalized);
			return `from "${toRelativeImport(fromDirectory, targetImport)}"`;
		},
	);
}

function toRelativeImport(fromDirectory: string, targetFile: string) {
	const withoutExtension = targetFile.replace(/\.(tsx?|jsx?)$/, "");
	let relative = path.posix.relative(fromDirectory, withoutExtension);
	if (!relative.startsWith(".")) relative = `./${relative}`;
	return relative;
}

async function maybePatchGlobalCss(
	project: ProjectContext,
	options: CliOptions,
) {
	const cssCandidates = [
		path.join(project.root, "src/styles.css"),
		path.join(project.root, "src/index.css"),
		path.join(project.root, "src/app.css"),
		path.join(project.root, "app/globals.css"),
		path.join(project.root, "src/app/globals.css"),
	];
	const globalCss = await firstExisting(cssCandidates);
	if (!globalCss) {
		console.log(
			`Add this import to your global CSS:\n@import "${relativeCssImport(project, project.targetRoot)}";`,
		);
		return;
	}

	const importLine = `@import "${relativeImportForCss(globalCss, path.join(project.targetRoot, "styles.css"))}";`;
	const current = await readFile(globalCss, "utf8");
	if (current.includes(importLine) || current.includes("playful-cn/styles.css"))
		return;

	if (!options.yes) {
		const shouldPatch = await confirm({
			message: `Add ${importLine} to ${path.relative(project.root, globalCss)}?`,
			default: true,
		});
		if (!shouldPatch) {
			console.log(
				`Add this import manually to ${path.relative(project.root, globalCss)}:\n${importLine}`,
			);
			return;
		}
	}

	await writeTargetFile(globalCss, `${importLine}\n${current}`, options, true);
}

function relativeCssImport(project: ProjectContext, targetRoot: string) {
	const fromRoot = path
		.relative(project.root, path.join(targetRoot, "styles.css"))
		.split(path.sep)
		.join("/");
	return fromRoot.startsWith(".") ? fromRoot : `./${fromRoot}`;
}

function relativeImportForCss(fromFile: string, toFile: string) {
	let relative = path
		.relative(path.dirname(fromFile), toFile)
		.split(path.sep)
		.join("/");
	if (!relative.startsWith(".")) relative = `./${relative}`;
	return relative;
}

async function maybeInstallDependencies(
	project: ProjectContext,
	dependencies: string[],
	options: CliOptions,
) {
	const missing = dependencies.filter(
		(dependency) => !hasDependency(project, dependency),
	);
	if (!hasDependency(project, "react")) {
		console.warn(
			"React was not found in package.json. playful-cn components require React.",
		);
	}
	if (!hasDependency(project, "tailwindcss")) {
		console.warn(
			"Tailwind CSS was not found in package.json. The copied CSS works best in Tailwind projects.",
		);
	}
	if (missing.length === 0) return;

	const installCommand = getInstallCommand(project.packageManager, missing);
	if (options.dryRun) {
		console.log(`[dry-run] ${installCommand.join(" ")}`);
		return;
	}
	if (!options.yes) {
		const shouldInstall = await confirm({
			message: `Install missing dependencies with "${installCommand.join(" ")}"?`,
			default: true,
		});
		if (!shouldInstall) {
			console.log(
				`Install missing dependencies manually:\n${installCommand.join(" ")}`,
			);
			return;
		}
	}
	const [command, ...args] = installCommand;
	if (!command) return;
	await execa(command, args, {
		cwd: project.root,
		stdio: "inherit",
	});
}

function hasDependency(project: ProjectContext, dependency: string) {
	return Boolean(
		project.packageJson.dependencies?.[dependency] ??
			project.packageJson.devDependencies?.[dependency],
	);
}

function getInstallCommand(
	packageManager: PackageManager,
	dependencies: string[],
) {
	if (packageManager === "pnpm") return ["pnpm", "add", ...dependencies];
	if (packageManager === "yarn") return ["yarn", "add", ...dependencies];
	if (packageManager === "bun") return ["bun", "add", ...dependencies];
	return ["npm", "install", ...dependencies];
}

async function fetchSourceFile(
	registry: Registry,
	options: CliOptions,
	sourceFile: string,
) {
	if (options.registryUrl.startsWith("file:")) {
		const registryPath = fileURLToPath(options.registryUrl);
		const repoRoot = path.resolve(path.dirname(registryPath), "..");
		return readFile(path.join(repoRoot, sourceFile), "utf8");
	}
	const url = `https://raw.githubusercontent.com/${registry.source.owner}/${registry.source.repo}/${registry.source.branch}/${sourceFile}`;
	return fetchText(url);
}

async function fetchText(url: string) {
	const response = await fetch(url);
	if (!response.ok)
		throw new Error(
			`Failed to fetch ${url}: ${response.status} ${response.statusText}`,
		);
	return response.text();
}

async function writeTargetFile(
	target: string,
	contents: string,
	options: CliOptions,
	allowPatchExisting = false,
) {
	const exists = await pathExists(target);
	if (exists && !options.overwrite && !allowPatchExisting) {
		console.log(`Skipped existing file: ${target}`);
		return;
	}
	if (options.dryRun) {
		console.log(`[dry-run] write ${target}`);
		return;
	}
	await mkdir(path.dirname(target), { recursive: true });
	await writeFile(target, contents);
	console.log(`${exists ? "Updated" : "Created"} ${target}`);
}

async function firstExisting(paths: string[]) {
	for (const candidate of paths) {
		if (await pathExists(candidate)) return candidate;
	}
	return null;
}

async function pathExists(candidate: string) {
	try {
		await access(candidate);
		return true;
	} catch {
		return false;
	}
}

function unique<T>(values: T[]) {
	return [...new Set(values)];
}

function printNextSteps(project: ProjectContext, itemNames: string[] = []) {
	console.log(
		`\nInstalled into ${path.relative(project.root, project.targetRoot)}`,
	);
	if (itemNames.length > 0) {
		console.log("Import components from the copied files under:");
		console.log(
			`./${path.relative(project.root, path.join(project.targetRoot, "components")).split(path.sep).join("/")}`,
		);
	}
}
