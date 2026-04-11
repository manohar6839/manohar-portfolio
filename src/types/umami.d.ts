// Umami analytics global type declaration
// umami.track() is available when the Umami script is loaded
interface UmamiTracker {
  track: (event: string, data?: Record<string, string | number>) => void
}

declare const umami: UmamiTracker | undefined
