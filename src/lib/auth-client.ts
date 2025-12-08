import { createAuthClient } from 'better-auth/client'

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
    return await authClient.signOut()
}

export const getSession = async () => {
    const res = await authClient.getSession()
    return { ...res.data }
}
