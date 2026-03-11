import { getAllContent } from "@/lib/mdx"
import { JournalFrontmatter } from "@/types"

export async function GET() {
  const posts = getAllContent("journal")

  const sortedPosts = posts.sort((a, b) => {
    const dateA = (a.frontmatter as JournalFrontmatter).date
    const dateB = (b.frontmatter as JournalFrontmatter).date
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })

  const siteUrl = "https://manohargupta.com"

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Manohar Gupta - Journal</title>
    <description>Portfolio of Manohar Gupta — Manager at ReNew, IIT Roorkee engineer, IIM Rohtak gold medalist. Writing about renewable energy, solar finance, and technology.</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>manohar.gupta@example.com (Manohar Gupta)</managingEditor>
    <webMaster>manohar.gupta@example.com (Manohar Gupta)</webMaster>
    ${sortedPosts
      .map((post) => {
        const frontmatter = post.frontmatter as JournalFrontmatter
        const url = `${siteUrl}/journal/${post.slug}`
        const pubDate = new Date(frontmatter.date).toUTCString()
        const description = frontmatter.description?.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") || ""
        const title = frontmatter.title?.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") || ""

        return `
    <item>
      <title><![CDATA[${title}]]></title>
      <description><![CDATA[${description}]]></description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`
      })
      .join("")}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
