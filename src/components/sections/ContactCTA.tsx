"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
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

export function ContactCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-heading font-bold mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-muted-foreground mb-8">
            Interested in renewable energy, project finance, or just want to chat
            about building cool things? I&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors mb-8"
          >
            Get in Touch
          </Link>

          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
              >
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
