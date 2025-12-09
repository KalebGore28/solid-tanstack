import { HeadContent, Scripts, createRootRoute } from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import { HydrationScript } from 'solid-js/web'
import TanStackQueryProvider from '../integrations/tanstack-query/provider.tsx'
import appCSS from '../app.css?url'
import type * as Solid from 'solid-js'

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charset: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
        ],
        links: [
            { rel: 'stylesheet', href: appCSS },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/apple-touch-icon.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png',
            },
            { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
            { rel: 'icon', href: '/favicon.ico' },
        ],
    }),
    shellComponent: RootDocument,
})

function RootDocument({ children }: { children: Solid.JSX.Element }) {
    return (
        <html>
            <head>
                <HydrationScript />
            </head>
            <body>
                <HeadContent />
                <TanStackQueryProvider>
                    {children}
                </TanStackQueryProvider>
                <TanStackRouterDevtools />
                <Scripts />
            </body>
        </html>
    )
}
