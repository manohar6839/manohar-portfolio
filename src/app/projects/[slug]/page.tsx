import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getContentBySlug, getAllContent } from "@/lib/mdx"
import { ProjectFrontmatter } from "@/types"
import MDXComponents from "@/components/mdx/MDXComponents"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Badge } from "@/components/ui/badge"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = getAllContent("projects")
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const { frontmatter } = getContentBySlug("projects", slug) as {
      frontmatter: ProjectFrontmatter
    }
    return {
      title: `${frontmatter.title} | Projects`,
      description: frontmatter.description,
      alternates: {
        canonical: `https://manohargupta.com/projects/${slug}`,
      },
    }
  } catch {
    return {
      title: "Project Not Found",
    }
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params

  let frontmatter: ProjectFrontmatter
  let content: string

  try {
    const result = getContentBySlug("projects", slug)
    frontmatter = result.frontmatter as ProjectFrontmatter
    content = result.content
  } catch {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: frontmatter.title,
    description: frontmatter.description,
    author: {
      "@type": "Person",
      name: "Manohar Gupta",
      url: "https://manohargupta.com",
    },
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    image: frontmatter.thumbnail || "/og-image.png",
    url: `https://manohargupta.com/projects/${slug}`,
    about: frontmatter.tags?.join(", "),
  }

  return (
    <div className="container py-12 max-w-4xl mx-auto px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl font-heading font-bold mb-4">{frontmatter.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {frontmatter.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all cursor-pointer">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground">{frontmatter.description}</p>
      </header>

      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-muted/30 rounded-lg">
        {frontmatter.tools && (
          <div>
            <span className="text-sm font-medium">Tools: </span>
            <span className="text-sm text-muted-foreground">
              {frontmatter.tools.join(", ")}
            </span>
          </div>
        )}
        {frontmatter.metrics && (
          <div>
            <span className="text-sm font-medium">Key Result: </span>
            <span className="text-sm text-primary">{frontmatter.metrics}</span>
          </div>
        )}
      </div>

      <article className="prose prose-lg max-w-none">
        <MDXRemote source={content} components={MDXComponents} />
      </article>
    </div>
  )
}
