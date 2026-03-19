"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
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

type Status = "completed" | "in-progress" | "planned"

export function ProjectsList({ projects }: ProjectsListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "deck">("grid")

  // Separate projects by status
  const completedProjects = projects.filter(
    (p) => p.frontmatter.status === "completed" || !p.frontmatter.status
  )
  // Combine in-progress and planned into one section
  const wipProjects = projects.filter(
    (p) => p.frontmatter.status === "in-progress" || p.frontmatter.status === "planned"
  )

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

  const ProjectCard = ({ project }: { project: Project }) => (
    <motion.div
      variants={itemVariants}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer group border border-transparent overflow-hidden">
          {project.frontmatter.thumbnail ? (
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={project.frontmatter.thumbnail}
                alt={project.frontmatter.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-xl" />
          )}
          <CardContent className="p-4">
            <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
              {project.frontmatter.title}
            </h3>
            <p className="text-muted-foreground mb-3 line-clamp-2">
              {project.frontmatter.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {project.frontmatter.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all cursor-pointer"
                >
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
  )

  const SectionHeader = ({
    title,
    count,
  }: {
    title: string
    count: number
  }) => (
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-2xl font-heading font-bold">{title}</h2>
      <Badge variant="outline" className="text-sm">
        {count}
      </Badge>
    </div>
  )

  return (
    <div className="container py-12 max-w-6xl mx-auto px-4">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-4">Projects</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A collection of work spanning renewable energy, finance, IoT, and
            web development.
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

      {/* Deck View - Only for completed projects */}
      {viewMode === "deck" ? (
        <ProjectsDeck projects={completedProjects} />
      ) : (
        <>
          {/* Completed Projects */}
          {completedProjects.length > 0 && (
            <section className="mb-12">
              <SectionHeader
                title="Completed"
                count={completedProjects.length}
              />
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {completedProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </section>
          )}

          {/* In Progress / Planned Projects */}
          {wipProjects.length > 0 && (
            <section>
              <SectionHeader
                title="In Progress / Planned"
                count={wipProjects.length}
              />
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {wipProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
