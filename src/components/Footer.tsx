"use client"

import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { siteConfig } from "@/config/site"
import { TrackedExternalLink } from "@/components/TrackedExternalLink"

const socialLinks = [
  {
    href: siteConfig.socialLinks.linkedin,
    icon: Linkedin,
    label: "LinkedIn",
    external: true,
  },
  {
    href: siteConfig.socialLinks.github,
    icon: Github,
    label: "GitHub",
    external: true,
  },
  {
    href: siteConfig.socialLinks.twitter,
    icon: Twitter,
    label: "X",
    external: true,
  },
  {
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    label: "Email",
    external: false,
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-muted-foreground">
            <span>&copy; {siteConfig.copyrightYear} {siteConfig.name}</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <TrackedExternalLink
                key={link.label}
                href={link.href}
                label={link.label}
                icon={link.icon}
                external={link.external}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
