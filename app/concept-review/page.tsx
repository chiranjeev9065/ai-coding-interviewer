import type { Metadata } from "next"
import { ConceptReviewUI } from "@/components/concept-review-ui"
import { VerificationBanner } from "@/components/verification-banner"

export const metadata: Metadata = {
  title: "Concept Review - AI Coding Interview Coach",
  description: "Review key technical concepts for interviews",
}

export default function ConceptReviewPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Concept Review</h1>
      <VerificationBanner />
      <ConceptReviewUI />
    </div>
  )
}

