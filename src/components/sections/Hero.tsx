"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mb-2"
            >
              Hi, I&apos;m
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-heading font-extrabold mb-4"
            >
              Manohar Gupta
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-6"
            >
              Renewable Energy Professional & Builder
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8 max-w-xl"
            >
              Manager at ReNew specializing in project finance for renewable energy.
              IIT Roorkee engineer, IIM Rohtak gold medalist. I build things —
              from solar plant financial models to IoT sensor dashboards.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/journal"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
              >
                Read Journal
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex-shrink-0"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <Image
                src="/profile.jpg"
                alt="Manohar Gupta"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
