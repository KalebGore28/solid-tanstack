import { useNavigate } from '@tanstack/solid-router'
import { Check, CircleAlert, Copy, House, RotateCcw } from 'lucide-solid'
import { Show, createSignal } from 'solid-js'
import { Button } from '@/components/ui/button'

interface ErrorComponentProps {
    error: Error
    reset?: () => void
    info?: { componentStack: string }
}

export function ErrorComponent(props: ErrorComponentProps) {
    const navigate = useNavigate()
    const [copied, setCopied] = createSignal(false)

    const isDevelopment = import.meta.env.DEV

    const copyErrorDetails = async () => {
        const errorDetails =
            `Error: ${props.error.message}\n\n` +
            `Stack Trace:\n${props.error.stack || 'N/A'}\n\n` +
            `Component Stack:\n${props.info?.componentStack || 'N/A'}`

        try {
            await navigator.clipboard.writeText(errorDetails)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    return (
        <div class="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800">
            <div class="w-full max-w-2xl space-y-8 text-center">
                {/* Error Icon */}
                <div class="flex justify-center">
                    <div class="rounded-full bg-red-100 p-6 dark:bg-red-900/20">
                        <CircleAlert class="h-16 w-16 text-red-600 dark:text-red-400" />
                    </div>
                </div>

                {/* Message */}
                <div class="space-y-3">
                    <h2 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                        Something went wrong
                    </h2>
                    <p class="text-gray-600 dark:text-gray-400">
                        We encountered an unexpected error. Please try again or
                        return home.
                    </p>
                </div>

                {/* Error Details (Development Only) */}
                <Show when={isDevelopment}>
                    <div class="rounded-lg border border-red-200 bg-red-50 p-4 text-left dark:border-red-800 dark:bg-red-900/10">
                        <div class="mb-2 flex items-center justify-between">
                            <p class="text-sm font-semibold text-red-800 dark:text-red-300">
                                Error Details:
                            </p>
                            <Button
                                onClick={copyErrorDetails}
                                variant="outline"
                                size="sm"
                                class="h-8 gap-2 text-red-700 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            >
                                <Show
                                    when={copied()}
                                    fallback={
                                        <>
                                            <Copy class="h-4 w-4" />
                                            Copy
                                        </>
                                    }
                                >
                                    <Check class="h-4 w-4" />
                                    Copied!
                                </Show>
                            </Button>
                        </div>
                        <p class="font-mono text-sm wrap-break-word text-red-700 dark:text-red-400">
                            {props.error.message}
                        </p>
                        <Show when={props.error.stack}>
                            <details class="mt-3">
                                <summary class="cursor-pointer text-sm text-red-600 hover:underline dark:text-red-400">
                                    Stack Trace
                                </summary>
                                <pre class="mt-2 overflow-x-auto text-xs whitespace-pre-wrap text-red-600 dark:text-red-400">
                                    {props.error.stack}
                                </pre>
                            </details>
                        </Show>
                        <Show when={props.info?.componentStack}>
                            <details class="mt-3">
                                <summary class="cursor-pointer text-sm text-red-600 hover:underline dark:text-red-400">
                                    Component Stack
                                </summary>
                                <pre class="mt-2 overflow-x-auto text-xs whitespace-pre-wrap text-red-600 dark:text-red-400">
                                    {props.info?.componentStack}
                                </pre>
                            </details>
                        </Show>
                    </div>
                </Show>

                {/* Actions */}
                <div class="flex flex-col justify-center gap-3 sm:flex-row">
                    <Show when={props.reset}>
                        <Button
                            onClick={() => props.reset?.()}
                            size="lg"
                            class="gap-2"
                        >
                            <RotateCcw class="h-4 w-4" />
                            Try Again
                        </Button>
                    </Show>
                    <Button
                        onClick={() => navigate({ to: '/' })}
                        variant={props.reset ? 'outline' : 'default'}
                        size="lg"
                        class="gap-2"
                    >
                        <House class="h-4 w-4" />
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    )
}
