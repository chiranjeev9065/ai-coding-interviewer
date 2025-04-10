import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { concept } = await request.json()

    if (!concept) {
      return NextResponse.json({ error: "Missing concept" }, { status: 400 })
    }

    // Initialize the Google Generative AI client
    const { GoogleGenerativeAI } = await import("@google/generative-ai")
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const prompt = `You are an expert technical interviewer preparing candidates for coding interviews.
    
    Provide a comprehensive but concise explanation of the concept: ${concept}
    
    Include:
    1. A clear definition
    2. Key properties and characteristics
    3. Common use cases and applications
    4. Time/space complexity (if applicable)
    5. Common interview questions about this topic
    6. Tips for explaining this concept in an interview
    
    Format your response in markdown with clear sections.`

    const result = await model.generateContent(prompt)
    const content = result.response.text()

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error in concept API:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

