export const playfulTransitions = {
  pop: { type: 'spring', stiffness: 520, damping: 32, mass: 0.8 },
  soft: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
  quick: { duration: 0.14, ease: [0.2, 0.9, 0.2, 1] },
} as const
