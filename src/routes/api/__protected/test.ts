import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/api/__protected/test')({
    server: {
        handlers: {
            GET: ({ context }) => {
                return new Response(
                    JSON.stringify({
                        message: 'Protected test route accessed',
                        user: context.user,
                        session: context.session,
                    }),
                    {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' },
                    },
                )
            },
        },
    },
})
