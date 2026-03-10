"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Linkedin, Github, Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// NOTE: Manohar needs to create a free Web3Forms account at https://web3forms.com
// and add the access key as NEXT_PUBLIC_WEB3FORMS_KEY in .env.local or Vercel env vars

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

    if (!accessKey) {
      // For demo purposes, simulate success if no key is configured
      setTimeout(() => {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      }, 1000)
      return
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio Contact: ${formData.subject}`,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="container py-12 max-w-6xl mx-auto px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4">Get in Touch</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Whether it&apos;s about renewable energy, a collaboration idea, or just saying hello — I&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What&apos;s this about?"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={5}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                "Sending..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-600 p-4 bg-green-50 rounded-lg dark:bg-green-900/20"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Thanks! I&apos;ll get back to you soon.</span>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-600 p-4 bg-red-50 rounded-lg dark:bg-red-900/20"
              >
                <AlertCircle className="h-5 w-5" />
                <span>Something went wrong. Please try again or email directly.</span>
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Alternative Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-xl font-heading font-semibold mb-4">
              Alternative Ways to Reach Me
            </h2>
            <div className="space-y-4">
              <a
                href="mailto:manohar@example.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>manohar@example.com</span>
              </a>
              <a
                href="https://linkedin.com/in/manohar-gupta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>Gurugram, India</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-muted/30 rounded-xl">
            <h3 className="font-heading font-semibold mb-2">
              Let&apos;s Connect
            </h3>
            <p className="text-muted-foreground text-sm">
              I&apos;m always open to discussing renewable energy projects, potential
              collaborations, or just chatting about technology and sustainability.
              Feel free to reach out!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
