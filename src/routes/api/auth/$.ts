import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/api/auth/$')({
    server: {
        handlers: {
            GET: ({ request, context }) => {
                return context.auth.handler(request)
            },
            POST: ({ request, context }) => {
                return context.auth.handler(request)
            },
        },
    },
})
