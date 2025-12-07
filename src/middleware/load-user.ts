import { createMiddleware } from '@tanstack/solid-start'

export const loadUser = createMiddleware().server(
    async ({ next, context, request }) => {
        const session = await context.auth.api.getSession({
            headers: request.headers,
        })

        if (!session) {
            return {
                response: new Response(
                    JSON.stringify({
                        error: 'Unauthorized',
                        message: 'User not signed in',
                    }),
                    {
                        status: 401,
                        headers: { 'Content-Type': 'application/json' },
                    },
                ),
                request,
                pathname: new URL(request.url).pathname,
                context: {
                    ...context,
                    session: {
                        id: '',
                        createdAt: new Date(0),
                        updatedAt: new Date(0),
                        userId: '',
                        expiresAt: new Date(0),
                        token: '',
                        ipAddress: '',
                        userAgent: '',
                    },
                    user: {
                        id: '',
                        createdAt: new Date(0),
                        updatedAt: new Date(0),
                        email: '',
                        emailVerified: false,
                        name: '',
                        image: null,
                        lastLoginMethod: null,
                    },
                },
            }
        }

        return next({
            context: {
                ...context,
                session: session.session,
                user: session.user,
            },
        })
    },
)
