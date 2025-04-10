import { type NextRequest, NextResponse } from "next/server"
import { getInterviewResponse } from "@/app/actions"

export async function POST(request: NextRequest) {
  try {
    const { messages, topic } = await request.json()

    if (!messages || !topic) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const response = await getInterviewResponse(messages, topic)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

