import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/connectmanohar/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/manohar6839",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://x.com/hiemanohar",
    icon: Twitter,
    label: "X",
  },
  {
    href: "mailto:pgp09manoharg@iimrohtak.ac.in",
    icon: Mail,
    label: "Email",
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-muted-foreground">
            <span>&copy; 2026 Manohar Gupta</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
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
