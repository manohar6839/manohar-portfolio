"use client"

import { useState } from "react"
import { Mail, ArrowRight, Check } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    // Simulate subscription (replace with actual newsletter service)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For now, just show success
    setStatus("success")
    setEmail("")

    // Reset after 5 seconds
    setTimeout(() => setStatus("idle"), 5000)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container max-w-xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-heading font-bold mb-3">
            Stay Updated
          </h2>
          <p className="text-muted-foreground">
            Get the latest insights on renewable energy, solar finance, and technology — delivered to your inbox.
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-green-700 dark:text-green-400 font-medium">
              Thanks for subscribing!
            </p>
            <p className="text-sm text-green-600 dark:text-green-500">
              You&apos;ll receive our next newsletter.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
              className="flex-1 px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                "Subscribing..."
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground mt-4">
          No spam, unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
