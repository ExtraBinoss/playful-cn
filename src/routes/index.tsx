import { createFileRoute } from '@tanstack/react-router'
import { ComponentWall } from '../components/site/lp/component-wall'
import { Hero } from '../components/site/lp/hero'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main>
      <Hero />
      <ComponentWall />
    </main>
  )
}
