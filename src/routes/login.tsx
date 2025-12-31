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
        <div class="w-full space-y-4 p-8">
            <h1 class="items-center gap-2 text-2xl font-bold">
                Please sign in to continue
            </h1>
            <Button onClick={() => signinGoogle()}>Sign in with Google</Button>
        </div>
    )
}
