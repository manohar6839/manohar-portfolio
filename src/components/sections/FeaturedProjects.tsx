"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, type Variants, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectFrontmatter } from "@/types"

interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
}

interface FeaturedProjectsProps {
  projects: Project[]
}

// Default placeholders when no projects exist
const defaultProjects: Project[] = [
  {
    slug: "",
    frontmatter: {
      title: "100MW Solar Plant",
      description: "Utility-scale solar project from site assessment to financial close.",
      date: "2024-06-15",
      tags: ["Solar", "Finance"],
      metrics: "₹450 Cr project value",
    },
  },
  {
    slug: "",
    frontmatter: {
      title: "8760 Energy Modeling",
      description: "Hourly energy simulation for solar project feasibility analysis.",
      date: "2024-03-10",
      tags: ["Solar", "Modeling"],
      metrics: "99.2% accuracy achieved",
    },
  },
  {
    slug: "",
    frontmatter: {
      title: "IoT Sensor Dashboard",
      description: "Real-time monitoring system for environmental sensors using ESP32.",
      date: "2024-01-20",
      tags: ["IoT", "Web"],
      metrics: "Live deployment",
    },
  },
]

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const displayProjects = projects.length > 0 ? projects : defaultProjects

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

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Featured Work
            </span>
            <h2 className="text-3xl font-heading font-bold mt-2">
              Projects I&apos;ve worked on
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:inline-flex items-center gap-2 text-primary hover:underline"
          >
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          {displayProjects.slice(0, 3).map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link href={project.slug ? `/projects/${project.slug}` : "/projects"}>
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
                    <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {project.frontmatter.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {project.frontmatter.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.frontmatter.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all cursor-pointer">
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
        </motion.div>

        <Link
          href="/projects"
          className="md:hidden inline-flex items-center gap-2 text-primary hover:underline mt-6"
        >
          View all projects <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
