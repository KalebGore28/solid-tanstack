import { createAuthClient } from 'better-auth/client'
import { useQuery } from '@tanstack/solid-query'
import { authQuery } from './queries'
import { getRouter } from '@/router'
import { getQueryClient } from '@/integrations/tanstack-query/provider'

export const authClient = createAuthClient({
    fetchOptions: {
        credentials: 'include',
    },
})

export const signinGoogle = async () => {
    return await authClient.signIn.social({
        provider: 'google',
        callbackURL: import.meta.env.GOOGLE_CALLBACK_URL,
    })
}

export const signOut = async () => {
    const queryClient = getQueryClient()
    const router = getRouter()

    await authClient.signOut()
    await queryClient.invalidateQueries()
    router.invalidate()
}

export const useAuthentication = () => {
    const { data: userSession, isLoading } = useQuery(() => authQuery.user())

    return { userSession, isAuthenticated: !!userSession, isLoading }
}
