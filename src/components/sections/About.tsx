"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Award, Briefcase, Building2, ArrowRight } from "lucide-react"

const highlights = [
  { icon: Building2, label: "Current", sublabel: "Manager at ReNew" },
  { icon: Award, label: "IIM Rohtak", sublabel: "MBA, Gold Medal (Rank #3)" },
  { icon: GraduationCap, label: "IIT Roorkee", sublabel: "B.Tech Mechanical" },
  { icon: Briefcase, label: "6+ Years", sublabel: "Finance & Renewable Energy" },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-5 gap-12 items-start"
        >
          {/* Left column - About text */}
          <div className="md:col-span-3">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              About
            </span>
            <h2 className="text-3xl font-heading font-bold mt-2 mb-6">
              Bridging Finance and Clean Energy
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I&apos;m a Manager at ReNew, one of India&apos;s leading renewable energy
                companies, where I specialize in project finance for utility-scale
                solar projects. My work involves everything from site assessment
                and technical design to financial modeling and securing capital.
              </p>
              <p>
                My background spans engineering (IIT Roorkee) and finance (IIM Rohtak,
                where I graduated as Gold Medalist). Before joining ReNew, I gained
                experience at PwC in project finance due diligence and at Thomson
                Reuters in financial analysis.
              </p>
              <p>
                What drives me is the intersection of technical knowledge and
                financial acumen — finding ways to make renewable energy projects
                economically viable while contributing to a sustainable future.
              </p>
            </div>
            <Link
              href="/resume"
              onClick={() => typeof umami !== "undefined" && umami.track("cta-click", { button: "resume", page: "home" })}
              className="inline-flex items-center gap-2 mt-6 text-primary hover:underline"
            >
              More on my resume <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right column - Highlights */}
          <div className="md:col-span-2">
            <div className="bg-card border rounded-xl p-6 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:border-primary/50 transition-all duration-300">
              <h3 className="font-heading font-semibold mb-4">Quick Facts</h3>
              <ul className="space-y-4">
                {highlights.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.sublabel}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
