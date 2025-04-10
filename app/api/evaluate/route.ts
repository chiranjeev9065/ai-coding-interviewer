import { type NextRequest, NextResponse } from "next/server"
import { evaluateAnswer } from "@/lib/ai"

export async function POST(request: NextRequest) {
  try {
    const { question, answer } = await request.json()

    if (!question || !answer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const feedback = await evaluateAnswer(question, answer)

    return NextResponse.json({ feedback })
  } catch (error) {
    console.error("Error in evaluate API:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

