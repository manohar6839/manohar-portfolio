"use client"

interface LinkedInEmbedProps {
  postUrl: string
  title?: string
}

export function LinkedInEmbed({
  postUrl,
  title = "View LinkedIn Post",
}: LinkedInEmbedProps) {
  return (
    <div className="my-8 rounded-lg border border-border overflow-hidden">
      <a
        href={postUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-6 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#0077B5] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground">{title}</p>
            <p className="text-sm text-muted-foreground truncate">{postUrl}</p>
          </div>
          <svg className="w-5 h-5 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </a>
    </div>
  )
}
