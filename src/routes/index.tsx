import { createFileRoute, redirect } from '@tanstack/solid-router'
import { signOut } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
    beforeLoad: ({ context }) => {
        if (!context.userSession?.session) {
            throw redirect({ to: '/login' })
        }
    },
    component: App,
})

function App() {
    return (
        <div class="w-full space-y-4 p-8">
            <h1 class="items-center gap-2 text-2xl font-bold">
                Welcome to the TanStack Start Starter!
            </h1>
            <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
    )
}
