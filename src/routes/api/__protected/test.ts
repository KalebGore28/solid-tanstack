import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/api/__protected/test')({
    server: {
        handlers: {
            GET: async ({ context }) => {
                return new Response(JSON.stringify({ message: 'Protected test route accessed', user: context.user }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                })
            }
        }
    }
})