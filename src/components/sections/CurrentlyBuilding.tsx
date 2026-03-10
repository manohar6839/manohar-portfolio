"use client"

import Link from "next/link"
import { motion, type Variants, useInView } from "framer-motion"
import { useRef } from "react"
import { Wrench, Zap, Cpu } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Status = "in-progress" | "live" | "planned"

interface CurrentProject {
  title: string
  description: string
  status: Status
  link: string
  icon: React.ReactNode
}

const currentProjects: CurrentProject[] = [
  {
    title: "IoT Sensor Dashboard",
    description: "Real-time monitoring for temperature and humidity sensors",
    status: "in-progress",
    link: "/",
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    title: "Solar Calculator",
    description: "Estimate rooftop solar potential and ROI",
    status: "planned",
    link: "/",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Energy Analysis Tools",
    description: "Financial models for renewable energy projects",
    status: "in-progress",
    link: "/",
    icon: <Wrench className="h-6 w-6" />,
  },
]

function getStatusColor(status: Status): string {
  switch (status) {
    case "in-progress":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "live":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "planned":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }
}

function getStatusLabel(status: Status): string {
  switch (status) {
    case "in-progress":
      return "In Progress"
    case "live":
      return "Live"
    case "planned":
      return "Planned"
  }
}

export function CurrentlyBuilding() {
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
          {currentProjects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                href={project.link}
                className="block p-6 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors group"
              >
                <div className="text-primary mb-4">{project.icon}</div>
                <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <Badge className={getStatusColor(project.status)}>
                  {getStatusLabel(project.status)}
                </Badge>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
