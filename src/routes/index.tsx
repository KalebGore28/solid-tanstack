import { createFileRoute } from '@tanstack/solid-router'
import { Match, Show, Switch } from 'solid-js'
import { signOut, signinGoogle } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { getAuthUser } from '@/functions/get-auth-user'

export const Route = createFileRoute('/')({
    component: App,
    beforeLoad: async () => {
        const session = await getAuthUser()
        return { session }
    },
})

function App() {
    const session = { isLoading: false, user: null } // useSession()
    const data = Route.useLoaderData()

    console.log('Session Object:', session, data())

    return (
        <div>
            <Button onClick={() => signinGoogle()}>Sign in with Google</Button>
            <Button onClick={() => signOut()}>Sign Out</Button>
            <h1>Welcome to the Solid TanStack Starter!</h1>
            <Show
                when={!session.isLoading}
                fallback={<p>Checking authentication...</p>}
            >
                <Show
                    when={session.user}
                    fallback={<p>Access denied. Please log in.</p>}
                >
                    <div>
                        <h1>Protected Content</h1>
                        <p>Only logged in users can see this!</p>
                    </div>
                </Show>
            </Show>
        </div>
    )
}
