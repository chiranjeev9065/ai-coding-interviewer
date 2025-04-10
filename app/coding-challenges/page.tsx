import type { Metadata } from "next"
import { CodingChallengesUI } from "@/components/coding-challenges-ui"
import { VerificationBanner } from "@/components/verification-banner"

export const metadata: Metadata = {
  title: "Coding Challenges - AI Coding Interview Coach",
  description: "Practice coding challenges with AI feedback",
}

export default function CodingChallengesPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Coding Challenges</h1>
      <VerificationBanner />
      <CodingChallengesUI />
    </div>
  )
}

