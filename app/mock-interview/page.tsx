import type { Metadata } from "next"
import { MockInterviewUI } from "@/components/mock-interview-ui"
import { VerificationBanner } from "@/components/verification-banner"

export const metadata: Metadata = {
  title: "Mock Interview - AI Coding Interview Coach",
  description: "Practice with AI-simulated technical interviews",
}

export default function MockInterviewPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Mock Technical Interview</h1>
      <VerificationBanner />
      <MockInterviewUI />
    </div>
  )
}

