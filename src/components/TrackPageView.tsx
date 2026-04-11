"use client"

import { useEffect } from "react"

interface TrackPageViewProps {
  event: string
  data?: Record<string, string | number>
}

export function TrackPageView({ event, data }: TrackPageViewProps) {
  useEffect(() => {
    if (typeof umami !== "undefined") {
      umami.track(event, data)
    }
  }, [event, data])

  return null
}
