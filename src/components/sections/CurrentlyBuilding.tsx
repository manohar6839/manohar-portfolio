"use client"

import Link from "next/link"
import { motion, type Variants, useInView } from "framer-motion"
import { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { ProjectFrontmatter } from "@/types"

interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
}

interface CurrentlyBuildingProps {
  projects: Project[]
}

type Status = "in-progress" | "planned"

function getStatusColor(status: Status): string {
  switch (status) {
    case "in-progress":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "planned":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }
}

function getStatusLabel(status: Status): string {
  switch (status) {
    case "in-progress":
      return "In Progress"
    case "planned":
      return "Planned"
  }
}

export function CurrentlyBuilding({ projects }: CurrentlyBuildingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  }

  // Don't render section if no WIP projects
  if (projects.length === 0) {
    return null
  }

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Currently Building
          </span>
          <h2 className="text-3xl font-heading font-bold mt-2">
            What I&apos;m tinkering with
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                href="/projects"
                className="block p-6 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-300 group"
              >
                <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {project.frontmatter.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.frontmatter.description}
                </p>
                {project.frontmatter.status && (
                  <Badge className={getStatusColor(project.frontmatter.status as Status)}>
                    {getStatusLabel(project.frontmatter.status as Status)}
                  </Badge>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
