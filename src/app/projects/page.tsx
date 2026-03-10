import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A collection of work spanning renewable energy, finance, IoT, and web development.',
}

export default function ProjectsPage() {
  return (
    <div className="container py-24">
      <h1>Projects</h1>
    </div>
  )
}
