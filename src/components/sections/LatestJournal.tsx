"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { JournalFrontmatter } from "@/types"

interface JournalPost {
  slug: string
  frontmatter: JournalFrontmatter
}

interface LatestJournalProps {
  posts: JournalPost[]
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

export function LatestJournal({ posts }: LatestJournalProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Journal
            </span>
            <h2 className="text-3xl font-heading font-bold mt-2">
              Latest thoughts & learnings
            </h2>
          </div>
          <Link
            href="/journal"
            className="hidden md:inline-flex items-center gap-2 text-primary hover:underline"
          >
            Read all posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {posts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-0"
          >
            {posts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="block group"
              >
                <div className="py-4 border-b border-border hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                    <time className="text-sm text-muted-foreground w-24 shrink-0">
                      {formatDate(post.frontmatter.date)}
                    </time>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-lg group-hover:text-primary transition-colors truncate">
                        {post.frontmatter.title}
                      </h3>
                      <p className="text-muted-foreground text-sm truncate">
                        {post.frontmatter.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 md:justify-end">
                      {post.frontmatter.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            className="text-muted-foreground"
          >
            First post coming soon. Stay tuned.
          </motion.p>
        )}

        <Link
          href="/journal"
          className="md:hidden inline-flex items-center gap-2 text-primary hover:underline mt-6"
        >
          Read all posts <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
