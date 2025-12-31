import { useNavigate } from '@tanstack/solid-router'
import { ArrowLeft, House } from 'lucide-solid'
import { Button } from '@/components/ui/button'

export function NotFound() {
    const navigate = useNavigate()

    return (
        <div class="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800">
            <div class="max-w-md space-y-8 text-center">
                {/* 404 Number */}
                <div class="relative">
                    <h1 class="text-9xl font-bold text-gray-200 select-none dark:text-gray-700">
                        404
                    </h1>
                </div>

                {/* Message */}
                <div class="space-y-3">
                    <h2 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                        Page Not Found
                    </h2>
                    <p class="text-gray-600 dark:text-gray-400">
                        The page you're looking for doesn't exist or has been
                        moved.
                    </p>
                </div>

                {/* Actions */}
                <div class="flex flex-col justify-center gap-3 sm:flex-row">
                    <Button
                        onClick={() => navigate({ to: '/' })}
                        size="lg"
                        class="gap-2"
                    >
                        <House class="h-4 w-4" />
                        Go Home
                    </Button>
                    <Button
                        onClick={() => window.history.back()}
                        variant="outline"
                        size="lg"
                        class="gap-2"
                    >
                        <ArrowLeft class="h-4 w-4" />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    )
}
