"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Linkedin, FileText } from "lucide-react"

interface ExternalCardProps {
  title: string
  description: string
  date: string
  tags: string[]
  externalUrl: string
  platform?: "linkedin" | "medium" | "devto"
  index: number
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

function getPlatformIcon(platform?: string) {
  switch (platform) {
    case "linkedin":
      return <Linkedin className="h-4 w-4" />
    case "medium":
      return <FileText className="h-4 w-4" />
    default:
      return <ArrowUpRight className="h-4 w-4" />
  }
}

function getPlatformLabel(platform?: string): string {
  switch (platform) {
    case "linkedin":
      return "LinkedIn"
    case "medium":
      return "Medium"
    case "devto":
      return "Dev.to"
    default:
      return "External"
  }
}

export function ExternalCard({
  title,
  description,
  date,
  tags,
  externalUrl,
  platform = "linkedin",
  index,
}: ExternalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="py-6 border-b border-border hover:bg-muted/50 transition-colors">
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
            <time className="text-sm text-muted-foreground w-24 shrink-0">
              {formatDate(date)}
            </time>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="font-heading font-semibold text-xl group-hover:text-primary transition-colors">
                  {title}
                </h2>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {getPlatformIcon(platform)}
                  {getPlatformLabel(platform)}
                </span>
              </div>
              <p className="text-muted-foreground mb-3">{description}</p>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all cursor-pointer">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </div>
        </div>
      </a>
    </motion.div>
  )
}
