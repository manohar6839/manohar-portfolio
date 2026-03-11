import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { ProjectFrontmatter, JournalFrontmatter } from "@/types"

const projectsDirectory = path.join(process.cwd(), "src/content/projects")
const journalDirectory = path.join(process.cwd(), "src/content/journal")

export function getContentBySlug(
  type: "projects" | "journal",
  slug: string
): {
  frontmatter: ProjectFrontmatter | JournalFrontmatter
  content: string
} {
  const directory = type === "projects" ? projectsDirectory : journalDirectory
  const fullPath = path.join(directory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`)
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    frontmatter: data as ProjectFrontmatter | JournalFrontmatter,
    content,
  }
}

export function getAllContent(
  type: "projects" | "journal"
): Array<{
  slug: string
  frontmatter: ProjectFrontmatter | JournalFrontmatter
}> {
  const directory = type === "projects" ? projectsDirectory : journalDirectory

  if (!fs.existsSync(directory)) {
    return []
  }

  const files = fs.readdirSync(directory)
  console.log(`Files in ${type}:`, files)

  const content = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      console.log(`Processing slug: "${slug}"`)
      const { frontmatter } = getContentBySlug(type, slug)
      return {
        slug,
        frontmatter,
      }
    })
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date)
      const dateB = new Date(b.frontmatter.date)
      return dateB.getTime() - dateA.getTime()
    })

  return content
}

export function getFeaturedProjects(): Array<{
  slug: string
  frontmatter: ProjectFrontmatter
}> {
  const allProjects = getAllContent("projects") as Array<{
    slug: string
    frontmatter: ProjectFrontmatter
  }>

  return allProjects.filter(
    (project) => project.frontmatter.featured === true
  )
}

export function getPublishedJournalPosts(): Array<{
  slug: string
  frontmatter: JournalFrontmatter
}> {
  const allPosts = getAllContent("journal") as Array<{
    slug: string
    frontmatter: JournalFrontmatter
  }>

  return allPosts.filter(
    (post) => post.frontmatter.published !== false
  )
}
