import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { siteConfig } from "@/config/site"

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
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200"
                aria-label={link.label}
                suppressHydrationWarning
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
