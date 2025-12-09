import { createServerFn } from '@tanstack/solid-start'
import { getRequest } from '@tanstack/solid-start/server'
import { auth } from '@/lib/auth'

export const getAuthUser = createServerFn({ method: 'GET' }).handler(
    async () => {
        const getWebRequest = getRequest()
        const headers = getWebRequest.headers
        if (!headers) {
            return null
        }
        const session = await auth.api.getSession({
            headers,
        })
        return session
    },
)
