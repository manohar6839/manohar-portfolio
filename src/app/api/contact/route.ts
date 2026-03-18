import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const googleSheetsUrl = process.env.GOOGLE_SHEETS_URL

    if (!googleSheetsUrl) {
      return NextResponse.json(
        { error: "Google Sheets URL not configured" },
        { status: 500 }
      )
    }

    const response = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: "Failed to submit to Google Sheets" },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
