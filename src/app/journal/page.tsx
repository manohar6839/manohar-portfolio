import { Metadata } from "next"
import { getAllContent } from "@/lib/mdx"
import { JournalFrontmatter } from "@/types"
import { JournalList } from "./JournalList"

export const metadata: Metadata = {
  title: "Journal",
  description: "Thoughts on renewable energy, technology, building things, and lessons learned along the way.",
}

interface JournalPost {
  slug: string
  frontmatter: JournalFrontmatter
}

export default function JournalPage() {
  const posts = getAllContent("journal") as JournalPost[]

  return <JournalList posts={posts} />
}
