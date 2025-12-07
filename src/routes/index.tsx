import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
    // Force a runtime error
    throw new Error('Test error from App component')
    return <div>Welcome to the Solid TanStack Starter!</div>
}
