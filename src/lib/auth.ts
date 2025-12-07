import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { env } from 'cloudflare:workers'
import { DrizzleD1Database } from 'drizzle-orm/d1'
import * as schema from '@/db/d1/schema'

export function getAuth(context: { d1Session: DrizzleD1Database<typeof schema> }) {
    return betterAuth({
        database: drizzleAdapter(context.d1Session, {
            provider: 'sqlite',
            schema,
        }),
        secondaryStorage: {
            get: async (key) => {
                return await env.solid_tanstack.get(key);
            },
            set: async (key, value, ttl) => {
                if (ttl) {
                    await env.solid_tanstack.put(key, value, { expirationTtl: ttl });
                } else {
                    await env.solid_tanstack.put(key, value);
                }
            },
            delete: async (key) => {
                await env.solid_tanstack.delete(key);
            },
        },
        // socialProviders: {
        //     google: {
        //         clientId: env.GOOGLE_CLIENT_ID,
        //         clientSecret: env.GOOGLE_CLIENT_SECRET,
        //     },
        // },
        trustedOrigins: [env.BETTER_AUTH_URL],
        secret: env.BETTER_AUTH_SECRET,
        session: {
            // For more info: https://www.better-auth.com/docs/guides/optimizing-for-performance
            cookieCache: {
                enabled: true,
                maxAge: 5 * 60, // Cache duration in seconds
            },
            // For more info: https://www.better-auth.com/docs/concepts/session-management
            expiresIn: 60 * 60 * 24 * 7, // 7 days
            updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
        },
    })
}