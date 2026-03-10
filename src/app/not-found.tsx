import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container py-24">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-6xl font-heading font-extrabold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-heading font-bold mb-4">Page not found</h2>
        <p className="text-muted-foreground mb-8">
          Looks like this page doesn&apos;t exist. Maybe it was moved, or you mistyped the URL.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    </div>
  )
}
