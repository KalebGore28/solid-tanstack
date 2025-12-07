import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import TanStackQueryProvider from '../integrations/tanstack-query/provider.tsx'

import { HydrationScript } from 'solid-js/web'
import { Suspense } from 'solid-js'

import appCSS from '../app.css?url'

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCSS }],
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
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <Suspense>
          <TanStackQueryProvider>
            <Outlet />
            <TanStackRouterDevtools />
          </TanStackQueryProvider>
        </Suspense>
        <Scripts />
      </body>
    </html>
  )
}
