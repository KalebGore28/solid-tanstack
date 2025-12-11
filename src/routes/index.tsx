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
        <div class="p-8 space-y-4 w-full">
            <h1 class="text-2xl font-bold items-center gap-2">
                Welcome to the TanStack Start Starter!
            </h1>
            <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
    )
}
