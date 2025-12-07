import handler from '@tanstack/solid-start/server-entry'
import { drizzle } from 'drizzle-orm/d1'
import { relations } from '@/db/d1/relations'
import * as schema from '@/db/d1//schema'
import { getAuth } from '@/lib/auth'

declare module '@tanstack/solid-start' {
    interface Register {
        server: {
            requestContext: {
                d1Session: ReturnType<
                    typeof drizzle<typeof schema, typeof relations>
                >
                auth: ReturnType<typeof getAuth>
                user?: NonNullable<
                    Awaited<
                        ReturnType<
                            ReturnType<typeof getAuth>['api']['getSession']
                        >
                    >
                >['user']
                session?: NonNullable<
                    Awaited<
                        ReturnType<
                            ReturnType<typeof getAuth>['api']['getSession']
                        >
                    >
                >['session']
            }
        }
    }
}

export default {
    async fetch(request, env) {
        const bookmark =
            request.headers.get('x-d1-bookmark') ?? 'first-unconstrained'

        const dbSession = env.solid_tanstack_db.withSession(bookmark)

        const d1Session = drizzle(dbSession, { schema, relations })

        const auth = getAuth({ d1Session })

        const response = await handler.fetch(request, {
            context: {
                auth,
                d1Session,
            },
        })

        response.headers.set('x-d1-bookmark', dbSession.getBookmark() ?? '')
        return response
    },
} satisfies ExportedHandler<Env>
