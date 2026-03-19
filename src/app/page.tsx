import {
  Hero,
  About,
  FeaturedProjects,
  LatestJournal,
  CurrentlyBuilding,
  ContactCTA,
  NewsletterSignup,
} from "@/components/sections"
import { getFeaturedProjects, getPublishedJournalPosts, getWipProjects } from "@/lib/mdx"
import { siteConfig } from "@/config/site"

export default function Home() {
  const featuredProjects = getFeaturedProjects()
  const journalPosts = getPublishedJournalPosts()
  const wipProjects = getWipProjects()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.company,
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: siteConfig.education.iim,
      },
      {
        "@type": "EducationalOrganization",
        name: siteConfig.education.iit,
      },
    ],
    url: siteConfig.url,
    sameAs: [
      siteConfig.socialLinks.linkedin,
      siteConfig.socialLinks.github,
      siteConfig.socialLinks.twitter,
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
      <CurrentlyBuilding projects={wipProjects} />
      <NewsletterSignup />
      <ContactCTA />
    </>
  )
}
