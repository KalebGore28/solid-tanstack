import { createServerFn } from '@tanstack/solid-start'
import { getRequest } from '@tanstack/solid-start/server'
import { auth } from '@/lib/auth'

export const getAuthUser = createServerFn({ method: 'GET' }).handler(
    async () => {
        const request = getRequest()
        const session = await auth.api.getSession({
            headers: request.headers,
        })
        return session
    },
)
