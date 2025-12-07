import { createFileRoute } from '@tanstack/solid-router'
import { loadUser } from '@/middleware/load-user'

export const Route = createFileRoute('/api/__protected')({
    server: {
        middleware: [loadUser],
    },
})
