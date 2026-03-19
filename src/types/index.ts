export type ProjectStatus = "completed" | "in-progress" | "planned"

export interface ProjectFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  featured?: boolean
  thumbnail?: string
  metrics?: string
  tools?: string[]
  status?: ProjectStatus
}

export interface JournalFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  published?: boolean
  coverImage?: string
  externalUrl?: string
  externalPlatform?: "linkedin" | "medium" | "devto"
}
