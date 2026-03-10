import { Metadata } from "next"
import { getAllContent } from "@/lib/mdx"
import { ProjectFrontmatter } from "@/types"
import { ProjectsList } from "./ProjectsList"

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of work spanning renewable energy, finance, IoT, and web development.",
}

interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
}

export default function ProjectsPage() {
  const projects = getAllContent("projects") as Project[]

  return <ProjectsList projects={projects} />
}
