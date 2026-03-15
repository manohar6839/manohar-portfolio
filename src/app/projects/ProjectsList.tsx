"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectFrontmatter } from "@/types"
import { ProjectsDeck } from "./ProjectsDeck"
import { LayoutGrid, Layers } from "lucide-react"

interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
}

interface ProjectsListProps {
  projects: Project[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [activeFilter, setActiveFilter] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "deck">("grid")

  // Get unique tags from all projects
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.frontmatter.tags))
  ).sort()

  const filters = ["All", ...allTags]

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.frontmatter.tags.includes(activeFilter))

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className="container py-12 max-w-6xl mx-auto px-4">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-4">Projects</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A collection of work spanning renewable energy, finance, IoT, and web development.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-accent/50 rounded-lg p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("deck")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "deck"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Deck View"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter
                ? "bg-primary text-primary-foreground"
                : "bg-accent text-accent-foreground hover:bg-primary/20"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Views */}
      {viewMode === "deck" ? (
        <ProjectsDeck projects={filteredProjects} />
      ) : (
        <>
          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.slug}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-all cursor-pointer group">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-xl" />
                      <CardContent className="p-4">
                        <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                          {project.frontmatter.title}
                        </h3>
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {project.frontmatter.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.frontmatter.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {project.frontmatter.metrics && (
                          <p className="text-sm text-primary font-medium">
                            {project.frontmatter.metrics}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <p className="text-muted-foreground text-center py-12">
              No projects found with this filter.
            </p>
          )}
        </>
      )}
    </div>
  )
}
