import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>
      Welcome to the Solid TanStack Starter!
    </div>
  )
}
