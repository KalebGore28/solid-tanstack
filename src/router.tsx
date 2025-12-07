import { createRouter, ErrorComponent } from '@tanstack/solid-router'
import { broadcastQueryClient } from '@tanstack/query-broadcast-client-experimental'
import { NotFound } from './not-found'
import { getQueryClient } from './integrations/tanstack-query/provider'
import pkg from '../package.json'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
	const queryClient = getQueryClient()

	const router = createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: 'intent',
		defaultErrorComponent: ({ error }) => (
			<ErrorComponent error={error} />
		),
		defaultNotFoundComponent: () => <NotFound />,
	})

	// Setup broadcasting for queryClient updates across tabs/windows
	if (typeof window !== 'undefined') {
		broadcastQueryClient({
			queryClient,
			broadcastChannel: `${pkg.name}-${pkg.version}-queries`,
		})
	}

	return router
}
