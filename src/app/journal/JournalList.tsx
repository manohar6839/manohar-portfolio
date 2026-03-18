"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ExternalCard } from "@/components/ExternalCard"
import { JournalFrontmatter } from "@/types"

interface JournalPost {
  slug: string
  frontmatter: JournalFrontmatter
}

interface JournalListProps {
  posts: JournalPost[]
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

export function JournalList({ posts }: JournalListProps) {
  return (
    <div className="container py-12 max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold mb-4">Journal</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Thoughts on renewable energy, technology, building things, and lessons learned along the way.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-0">
          {posts.map((post, index) => {
            // Check if it's an external article
            if (post.frontmatter.externalUrl) {
              return (
                <ExternalCard
                  key={post.slug}
                  title={post.frontmatter.title}
                  description={post.frontmatter.description}
                  date={post.frontmatter.date}
                  tags={post.frontmatter.tags}
                  externalUrl={post.frontmatter.externalUrl}
                  platform={post.frontmatter.externalPlatform}
                  index={index}
                />
              )
            }

            // Render internal MDX post
            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/journal/${post.slug}`}
                  className="block group"
                >
                  <div className="py-6 border-b border-border hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                      <time className="text-sm text-muted-foreground w-24 shrink-0">
                        {formatDate(post.frontmatter.date)}
                      </time>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-heading font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                          {post.frontmatter.title}
                        </h2>
                        <p className="text-muted-foreground mb-3">
                          {post.frontmatter.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {post.frontmatter.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all cursor-pointer">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-12">
          No posts yet. First post coming soon!
        </p>
      )}
    </div>
  )
}
