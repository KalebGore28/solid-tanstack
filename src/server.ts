import handler from '@tanstack/solid-start/server-entry'
import { drizzle as drizzleD1 } from 'drizzle-orm/d1'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import * as schema from '@/db/d1/schema'
import { getAuth } from '@/lib/auth'

declare module '@tanstack/solid-start' {
    interface Register {
        server: {
            requestContext: {
                d1Session: DrizzleD1Database<typeof schema>
                auth: ReturnType<typeof getAuth>
            }
        }
    }
}

export default {
    async fetch(request, env) {
        // const bookmark = request.headers.get('x-d1-bookmark') ?? 'first'

        const d1Session = drizzleD1(env.solid_tanstack_db, { schema })

        const auth = getAuth({ d1Session })

        const response = await handler.fetch(request, {
            context: {
                auth,
                d1Session,
            },
        })

        // response.headers.set('x-d1-bookmark', d1Session.getBookmark() ?? '')
        return response
    },
} satisfies ExportedHandler<Env>
