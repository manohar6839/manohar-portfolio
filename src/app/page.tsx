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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Manohar Gupta",
    jobTitle: "Manager at ReNew",
    worksFor: {
      "@type": "Organization",
      name: "ReNew",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "IIM Rohtak",
      },
      {
        "@type": "EducationalOrganization",
        name: "IIT Roorkee",
      },
    ],
    url: "https://manohargupta.com",
    sameAs: [
      "https://www.linkedin.com/in/connectmanohar/",
      "https://github.com/manohar6839",
      "https://x.com/hiemanohar",
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <FeaturedProjects projects={featuredProjects} />
      <LatestJournal posts={journalPosts} />
      <CurrentlyBuilding />
      <ContactCTA />
    </>
  )
}
