export interface ProjectFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  featured?: boolean
  thumbnail?: string
  metrics?: string
  tools?: string[]
}

export interface JournalFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  published?: boolean
}
