"use server"

import { generateInterviewQuestion, generateMockInterviewResponse } from "@/lib/ai"

export async function startMockInterview(topic: string) {
  try {
    const introPrompt = `You are an expert technical interviewer at a top tech company. 
    You're conducting an interview about ${topic}.
    
    Start the interview with a brief introduction of yourself and the interview process.
    Then ask your first technical question related to ${topic}.
    
    Keep your response concise and professional.`

    const gemini = (await import("@/lib/ai")).gemini
    const result = await gemini.generateContent(introPrompt)
    return result.response.text()
  } catch (error) {
    console.error("Error starting mock interview:", error)
    return "Sorry, I encountered an error starting the interview. Please try again."
  }
}

export async function getInterviewResponse(messages: { role: "user" | "assistant"; content: string }[], topic: string) {
  try {
    return await generateMockInterviewResponse(messages, topic)
  } catch (error) {
    console.error("Error generating interview response:", error)
    return "Sorry, I encountered an error. Please try again."
  }
}

export async function getCodingChallenge(topic: string) {
  try {
    return await generateInterviewQuestion(topic)
  } catch (error) {
    console.error("Error generating coding challenge:", error)
    return "Sorry, I encountered an error generating a coding challenge. Please try again."
  }
}

