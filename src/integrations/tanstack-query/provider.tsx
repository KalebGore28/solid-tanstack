import {
    QueryClient,
    QueryClientProvider,
    isServer,
} from '@tanstack/solid-query'
import type { JSX } from 'solid-js'

let browserQueryClient: QueryClient | undefined = undefined

function makeQueryClient() {
    return new QueryClient()
}

export function getQueryClient() {
    if (isServer) {
        return makeQueryClient()
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}

export function TanstackQueryProvider(props: { children: JSX.Element }) {
    return (
        <QueryClientProvider client={getQueryClient()}>
            {props.children}
        </QueryClientProvider>
    )
}
