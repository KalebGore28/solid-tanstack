import { createFileRoute } from '@tanstack/solid-router'
import { Match, Show, Switch } from 'solid-js'
// import { signOut, signinGoogle } from '@/lib/auth-client'
// import { Button } from '@/components/ui/button'
import { getAuthUser } from '@/functions/get-auth-user'

export const Route = createFileRoute('/')({
    beforeLoad: async () => {
        // const session = await auth.api.getSession({ request });
        const session = await getAuthUser()
        console.log('Session', session)
    },
    component: App,
})

function App() {
    const session = { isLoading: false, user: null } // useSession()
    console.log('Session Object:', session)

    return (
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
    )
}
