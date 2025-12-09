import { betterAuth } from 'better-auth/minimal'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { lastLoginMethod } from 'better-auth/plugins'
import pkg from '../../package.json'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import * as schema from '@/db/d1/schema'

export const getAuth = (context: {
    d1Session: DrizzleD1Database<typeof schema>
    env: Env
}) => {
    return betterAuth({
        appName: pkg.name,
        secret: context.env.BETTER_AUTH_SECRET,
        baseURL: context.env.BETTER_AUTH_URL,
        trustedOrigins: [context.env.TRUSTED_ORIGIN],
        database: drizzleAdapter(context.d1Session, {
            provider: 'sqlite',
            schema,
        }),
        secondaryStorage: {
            get: async (key) => {
                return await context.env.solid_tanstack.get(key)
            },
            set: async (key, value, ttl) => {
                if (ttl) {
                    await context.env.solid_tanstack.put(key, value, {
                        expirationTtl: ttl,
                    })
                } else {
                    await context.env.solid_tanstack.put(key, value)
                }
            },
            delete: async (key) => {
                await context.env.solid_tanstack.delete(key)
            },
        },
        socialProviders: {
            google: {
                clientId: context.env.GOOGLE_CLIENT_ID,
                clientSecret: context.env.GOOGLE_CLIENT_SECRET,
            },
        },
        session: {
            // For more info: https://www.better-auth.com/docs/guides/optimizing-for-performance
            cookieCache: {
                enabled: true,
                maxAge: 5 * 60, // Cache duration in seconds
            },
            // For more info: https://www.better-auth.com/docs/concepts/session-management
            expiresIn: 60 * 60 * 24 * 7, // 7 days
            updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
        },
        account: {
            encryptOAuthTokens: true,
        },
        // advanced: {
        //     useSecureCookies: true,
        // },
        plugins: [
            lastLoginMethod({
                storeInDatabase: true,
            }),
            tanstackStartCookies(), // make sure this is the last plugin in the array
        ],
    })
}

// For usage only when generating Better Auth schema and outside of request context
export const auth = getAuth({ d1Session: {} as any, env: {} as any })
