"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectFrontmatter } from "@/types"
import { ArrowLeft, ExternalLink } from "lucide-react"

interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
}

interface ProjectsDeckProps {
  projects: Project[]
}

const CARD_COLORS = [
  { from: "#0ea5e9", to: "#0f172a" },
  { from: "#10b981", to: "#0f172a" },
  { from: "#f59e0b", to: "#1a0a00" },
  { from: "#8b5cf6", to: "#1a0a2e" },
  { from: "#ec4899", to: "#1a0020" },
  { from: "#06b6d4", to: "#0a1628" },
]

export function ProjectsDeck({ projects }: ProjectsDeckProps) {
  const router = useRouter()
  const sceneRef = useRef<HTMLDivElement>(null)
  const [scrollPos, setScrollPos] = useState(0)
  const scrollTarget = useRef(0)
  const scrollCurrent = useRef(0)
  const [focused, setFocused] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef(0)
  const dragMoved = useRef(false)
  const rafRef = useRef<number>(0)
  const COUNT = projects.length

  // Animation loop
  useEffect(() => {
    function tick() {
      scrollCurrent.current += (scrollTarget.current - scrollCurrent.current) * 0.1
      // Only update state when there's meaningful change to avoid excessive renders
      setScrollPos(scrollCurrent.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Wheel handler
  useEffect(() => {
    function onWheel(e: WheelEvent) {
      if (focused !== null) return
      e.preventDefault()
      scrollTarget.current += e.deltaY * 0.003
      scrollTarget.current = Math.max(0, Math.min(COUNT - 1, scrollTarget.current))
    }
    const el = sceneRef.current
    if (el) el.addEventListener("wheel", onWheel, { passive: false })
    return () => { if (el) el.removeEventListener("wheel", onWheel) }
  }, [focused, COUNT])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (focused !== null) return
    setIsDragging(true)
    dragMoved.current = false
    dragStart.current = e.clientX
  }, [focused])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || focused !== null) return
    const delta = e.clientX - dragStart.current
    if (Math.abs(delta) > 3) dragMoved.current = true
    scrollTarget.current -= delta * 0.006
    scrollTarget.current = Math.max(0, Math.min(COUNT - 1, scrollTarget.current))
    dragStart.current = e.clientX
  }, [isDragging, focused, COUNT])

  const onPointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleCardClick = useCallback((idx: number) => {
    if (dragMoved.current) return
    if (focused !== null) return
    const diff = Math.abs(idx - scrollCurrent.current)
    if (diff < 0.5) {
      setFocused(idx)
    } else {
      scrollTarget.current = idx
    }
  }, [focused])

  const exitFocus = useCallback(() => {
    setFocused(null)
  }, [])

  const activeIdx = Math.round(scrollPos)
  const focusedProject = focused !== null ? projects[focused] : null

  return (
    <div className="relative w-full" style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}>
      {/* Ambient glow */}
      <div
        className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none transition-colors duration-1000"
        style={{
          background: CARD_COLORS[activeIdx % CARD_COLORS.length]?.from || "#0ea5e9",
          filter: "blur(120px)",
          opacity: 0.1,
        }}
      />
      <div
        className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: CARD_COLORS[(activeIdx + 2) % CARD_COLORS.length]?.from || "#8b5cf6",
          filter: "blur(120px)",
          opacity: 0.08,
        }}
      />

      {/* Counter */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-full px-5 py-2 flex items-center gap-3">
          <span className="text-xs opacity-60 tabular-nums font-medium">
            {String(activeIdx + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
          </span>
          <div className="h-3 w-px bg-white/10" />
          <span className="text-[10px] opacity-30 tracking-wider">
            {focused !== null ? "Click outside to close" : "Scroll to browse"}
          </span>
        </div>
      </div>

      {/* Scene */}
      <div
        ref={sceneRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        style={{ perspective: "1200px" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

        {/* Cards */}
        {projects.map((project, i) => {
          const diff = i - scrollPos
          const absDiff = Math.abs(diff)
          const colors = CARD_COLORS[i % CARD_COLORS.length]

          // Layout calculations
          let x = diff * 280
          let z = absDiff * -100
          let y = Math.max(0, 1 - absDiff) * 15
          let rotY = diff * -14
          let rotZ = diff * -2
          let scale = 1 + Math.max(0, 1 - absDiff) * 0.12
          let opacity = Math.max(0.1, 1 - absDiff * 0.3)
          let zIndex = Math.round(100 - absDiff * 10)

          // Focused state
          if (focused === i) {
            x = -160
            y = 0
            z = 80
            rotY = 6
            rotZ = 0
            scale = 1.05
            opacity = 1
            zIndex = 200
          } else if (focused !== null) {
            opacity = 0
            scale = 0.6
            z = -200
          }

          return (
            <motion.div
              key={project.slug}
              className="absolute cursor-pointer select-none"
              style={{
                width: 300,
                height: 420,
                transformStyle: "preserve-3d",
                zIndex,
              }}
              animate={{
                x,
                y: -y,
                z,
                rotateY: rotY,
                rotateZ: rotZ,
                scale,
                opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 0.8,
              }}
              onClick={() => handleCardClick(i)}
            >
              <div
                className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] hover:border-white/20 transition-colors"
                style={{
                  background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                }}
              >
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Card number watermark */}
                <div className="absolute top-4 right-4 text-[100px] font-extrabold leading-none opacity-[0.06] select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Tag */}
                <div className="absolute top-5 left-6 z-10">
                  <span className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1 text-[11px] font-medium tracking-wide">
                    {project.frontmatter.tags.join(" • ")}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent -z-[1]" />
                  <h3 className="text-xl font-bold leading-tight mb-2">
                    {project.frontmatter.title}
                  </h3>
                  <p className="text-[13px] opacity-50 leading-relaxed line-clamp-2 mb-2">
                    {project.frontmatter.description}
                  </p>
                  {project.frontmatter.metrics && (
                    <p className="text-xs text-emerald-400 font-medium">
                      {project.frontmatter.metrics}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {focusedProject && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-[320px] bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-7 z-[60]"
          >
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-[0.15em] opacity-35">Category</span>
              <p className="text-sm mt-1">{focusedProject.frontmatter.tags.join(" • ")}</p>
            </div>

            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-[0.15em] opacity-35">Description</span>
              <p className="text-sm opacity-70 leading-relaxed mt-1">
                {focusedProject.frontmatter.description}
              </p>
            </div>

            {focusedProject.frontmatter.metrics && (
              <div className="mb-4">
                <span className="text-[10px] uppercase tracking-[0.15em] opacity-35">Impact</span>
                <p className="text-sm text-emerald-400 font-semibold mt-1">
                  {focusedProject.frontmatter.metrics}
                </p>
              </div>
            )}

            {focusedProject.frontmatter.tools && focusedProject.frontmatter.tools.length > 0 && (
              <div className="mb-5">
                <span className="text-[10px] uppercase tracking-[0.15em] opacity-35">Tools</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {focusedProject.frontmatter.tools.map((tool) => (
                    <span
                      key={tool}
                      className="bg-white/[0.06] border border-white/10 rounded-md px-2.5 py-1 text-[11px]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => router.push(`/projects/${focusedProject.slug}`)}
              className="w-full py-3 rounded-xl bg-white/[0.06] border border-white/10 text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              View Full Project
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button */}
      <AnimatePresence>
        {focused !== null && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            onClick={exitFocus}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-full px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Deck
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hint */}
      {focused === null && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-20">
            Scroll / Drag to Browse • Click to Focus
          </p>
        </div>
      )}
    </div>
  )
}
