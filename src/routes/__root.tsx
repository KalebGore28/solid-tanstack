import {
    HeadContent,
    Outlet,
    Scripts,
    createRootRouteWithContext,
} from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import { HydrationScript } from 'solid-js/web'
import appCss from '../app.css?url'
import type { getQueryClient } from '@/integrations/tanstack-query/provider'
import { TanstackQueryProvider } from '@/integrations/tanstack-query/provider'
import { authQuery } from '@/lib/queries'

interface RootRouteContext {
    queryClient: ReturnType<typeof getQueryClient>
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'TanStack Start Starter',
            },
        ],
        links: [
            {
                rel: 'stylesheet',
                href: appCss,
            },
        ],
    }),
    shellComponent: RootDocument,
    beforeLoad: async ({ context }) => {
        const userSession = await context.queryClient.fetchQuery(
            authQuery.user(),
        )
        return { userSession }
    },
})

function RootDocument() {
    return (
        <html>
            <head>
                <HydrationScript />
            </head>
            <body>
                <HeadContent />
                <TanstackQueryProvider>
                    <Outlet />
                </TanstackQueryProvider>
                <TanStackRouterDevtools />
                <Scripts />
            </body>
        </html>
    )
}
