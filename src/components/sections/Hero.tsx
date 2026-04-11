"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"

// Underline Slide with mouse tracking - themed to match (teal)
const AnimatedName = () => {
  const [underlineStyle, setUnderlineStyle] = useState({ width: "0%", left: "0%" })
  const textRef = useRef<HTMLHeadingElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!textRef.current) return
    const rect = textRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left // mouse position from left of text

    // Underline expands from mouse position to cover the whole text
    const width = Math.max(x, rect.width - x) * 2
    const left = x - width / 2

    // Clamp to stay within text bounds
    const clampedWidth = Math.min(width, rect.width)
    const clampedLeft = Math.max(0, Math.min(left, rect.width - clampedWidth))

    setUnderlineStyle({
      width: `${clampedWidth}px`,
      left: `${clampedLeft}px`,
    })
  }

  const handleMouseLeave = () => {
    setUnderlineStyle({ width: "0%", left: "0%" })
  }

  return (
    <motion.h1
      ref={textRef}
      variants={itemVariants}
      className="text-5xl md:text-7xl font-heading font-extrabold mb-4 relative inline-block cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className="relative z-10">Manohar Gupta</span>
      <span
        className="absolute bottom-0 h-1 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-150 ease-out"
        style={{
          width: underlineStyle.width,
          left: underlineStyle.left,
        }}
      />
    </motion.h1>
  )
}

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

            <AnimatedName />

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
              Engineer turned finance professional driving renewable energy at ReNew (IIT Roorkee Grad, IIM Rohtak Gold Medalist). Whether it&apos;s structuring financial models, coding IoT dashboards, or building AI-integrated applications, I love creating technical solutions that solve complex problems and scale impact.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/projects"
                onClick={() => typeof umami !== "undefined" && umami.track("cta-click", { button: "view-projects", page: "home" })}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/journal"
                onClick={() => typeof umami !== "undefined" && umami.track("cta-click", { button: "read-journal", page: "home" })}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-300"
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
                src="/profile-new.jpeg"
                alt="Manohar Gupta"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
