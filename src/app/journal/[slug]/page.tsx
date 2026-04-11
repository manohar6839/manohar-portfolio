import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getContentBySlug, getAllContent } from "@/lib/mdx"
import { JournalFrontmatter } from "@/types"
import { Badge } from "@/components/ui/badge"
import MDXComponents from "@/components/mdx/MDXComponents"
import { LinkedInEmbed } from "@/components/mdx/LinkedInEmbed"
import { MDXRemote } from "next-mdx-remote/rsc"
import { TrackPageView } from "@/components/TrackPageView"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllContent("journal")
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const { frontmatter } = getContentBySlug("journal", slug) as {
      frontmatter: JournalFrontmatter
    }
    return {
      title: `${frontmatter.title} | Journal`,
      description: frontmatter.description,
      alternates: {
        canonical: `https://manohargupta.com/journal/${slug}`,
      },
    }
  } catch {
    return {
      title: "Journal Post Not Found",
    }
  }
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Journal-specific components with serif font
const journalComponents = {
  ...MDXComponents,
  LinkedInEmbed,
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-heading font-bold mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-heading font-bold mt-8 mb-4">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-heading font-semibold mt-6 mb-3">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="font-serif text-lg leading-8 mb-6">{children}</p>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="font-serif text-lg leading-7 text-muted-foreground">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary pl-6 italic my-6 font-serif text-lg text-muted-foreground">
      {children}
    </blockquote>
  ),
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params

  let frontmatter: JournalFrontmatter
  let content: string

  try {
    const result = getContentBySlug("journal", slug)
    frontmatter = result.frontmatter as JournalFrontmatter
    content = result.content
  } catch {
    notFound()
  }

  const readingTime = calculateReadingTime(content)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    author: {
      "@type": "Person",
      name: "Manohar Gupta",
      url: "https://manohargupta.com",
    },
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    image: "/og-image.png",
    url: `https://manohargupta.com/journal/${slug}`,
  }

  return (
    <div className="container py-12 max-w-3xl mx-auto px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackPageView event="journal-read" data={{ post: slug }} />
      <Link
        href="/journal"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Journal
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl font-heading font-bold mb-4">{frontmatter.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
          <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
          <span>•</span>
          <span>{readingTime}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all cursor-pointer">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {frontmatter.coverImage && (
        <div className="mb-10 rounded-xl overflow-hidden border border-border">
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            width={1280}
            height={720}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      <article>
        <MDXRemote source={content} components={journalComponents} />
      </article>

      <div className="mt-12 pt-8 border-t">
        <Link
          href="/contact"
          className="text-primary hover:underline"
        >
          Enjoyed this? Let&apos;s connect →
        </Link>
      </div>
    </div>
  )
}
