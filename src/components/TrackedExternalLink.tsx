"use client"

import { type LucideIcon } from "lucide-react"

interface TrackedExternalLinkProps {
  href: string
  label: string
  icon: LucideIcon
  className?: string
  iconClassName?: string
  external?: boolean
}

export function TrackedExternalLink({
  href,
  label,
  icon: Icon,
  className = "text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200",
  iconClassName = "h-5 w-5",
  external = true,
}: TrackedExternalLinkProps) {
  const handleClick = () => {
    if (typeof umami !== "undefined") {
      umami.track("external-link", { destination: label.toLowerCase(), url: href })
    }
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
      aria-label={label}
      onClick={handleClick}
      suppressHydrationWarning
    >
      <Icon className={iconClassName} />
    </a>
  )
}
