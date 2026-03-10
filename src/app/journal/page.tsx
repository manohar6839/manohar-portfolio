import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Thoughts on renewable energy, technology, building things, and lessons learned along the way.',
}

export default function JournalPage() {
  return (
    <div className="container py-24">
      <h1>Journal</h1>
    </div>
  )
}
