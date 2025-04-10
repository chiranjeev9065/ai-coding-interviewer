import type { Metadata } from "next"
import { ProgressDashboard } from "@/components/progress-dashboard"

export const metadata: Metadata = {
  title: "Progress Tracking - AI Coding Interview Coach",
  description: "Track your interview preparation progress",
}

export default function ProgressPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Progress Tracking</h1>
      <ProgressDashboard />
    </div>
  )
}

