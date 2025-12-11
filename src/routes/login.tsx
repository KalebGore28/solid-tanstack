import { createFileRoute, redirect } from '@tanstack/solid-router'
import { signinGoogle } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/login')({
    beforeLoad: ({ context }) => {
        if (context.userSession?.session) {
            throw redirect({ to: '/' })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div class="p-8 space-y-4 w-full">
            <h1 class="text-2xl font-bold items-center gap-2">
                Please sign in to continue
            </h1>
            <Button onClick={() => signinGoogle()}>Sign in with Google</Button>
        </div>
    )
}
