import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

// Get the Gemini 2.0 Flash model
export const gemini = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

export async function generateInterviewQuestion(topic: string) {
  const prompt = `Generate a challenging coding interview question about ${topic}. 
  Include a detailed problem statement, example inputs and outputs, and constraints.
  Format your response in markdown.`

  const result = await gemini.generateContent(prompt)
  return result.response.text()
}

export async function evaluateAnswer(question: string, answer: string) {
  const prompt = `You are an expert technical interviewer. Evaluate the following answer to a coding interview question.
  
  Question: ${question}
  
  Answer: ${answer}
  
  Provide detailed feedback on:
  1. Correctness: Is the solution correct? Does it handle all edge cases?
  2. Efficiency: What is the time and space complexity? Can it be improved?
  3. Code quality: Is the code clean, well-structured, and well-named?
  4. Communication: Did the candidate explain their approach clearly?
  
  Format your response in markdown with clear sections.`

  const result = await gemini.generateContent(prompt)
  return result.response.text()
}

export async function generateMockInterviewResponse(
  interviewHistory: { role: "user" | "assistant"; content: string }[],
  currentTopic: string,
) {
  const formattedHistory = interviewHistory
    .map((msg) => `${msg.role === "user" ? "Candidate" : "Interviewer"}: ${msg.content}`)
    .join("\n\n")

  const prompt = `You are a technical interviewer at a top tech company conducting a coding interview about ${currentTopic}.
  
  Interview history:
  ${formattedHistory}
  
  Respond as the interviewer. Ask follow-up questions, provide hints if needed, or move on to the next question if appropriate.
  Keep your responses concise and focused. Don't solve the problem for the candidate.`

  const result = await gemini.generateContent(prompt)
  return result.response.text()
}

