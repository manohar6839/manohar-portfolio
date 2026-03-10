import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { FeaturedProjects } from "@/components/sections/FeaturedProjects"
import { LatestJournal } from "@/components/sections/LatestJournal"
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding"
import { ContactCTA } from "@/components/sections/ContactCTA"
import { getFeaturedProjects, getPublishedJournalPosts } from "@/lib/mdx"

export default function Home() {
  const featuredProjects = getFeaturedProjects()
  const journalPosts = getPublishedJournalPosts()

  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects projects={featuredProjects} />
      <LatestJournal posts={journalPosts} />
      <CurrentlyBuilding />
      <ContactCTA />
    </>
  )
}
