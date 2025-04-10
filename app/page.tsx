import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { Shell } from "@/components/shell"
import { VerificationBanner } from "@/components/verification-banner"
import { CodeIcon, MessageSquareIcon, BrainIcon, TrophyIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Coding Interview Coach",
  description: "Prepare for technical interviews with AI-powered coaching",
}

export default function HomePage() {
  return (
    <Shell>
      <DashboardHeader
        heading="AI Coding Interview Coach"
        text="Prepare for technical interviews with AI-powered feedback and practice"
      />

      <VerificationBanner />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <MessageSquareIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Mock Interviews</CardTitle>
              <CardDescription>Practice with AI-simulated interviews</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              Experience realistic interview scenarios with our AI interviewer powered by Gemini 2.0 Flash. Get instant
              feedback on your responses.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/mock-interview" className="w-full">
              <Button className="w-full">Start Interview</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <CodeIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Coding Challenges</CardTitle>
              <CardDescription>Solve real interview problems</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              Practice with a curated collection of coding challenges from top tech companies. Write, test, and get AI
              feedback on your solutions.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/coding-challenges" className="w-full">
              <Button className="w-full">Solve Problems</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <BrainIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Concept Review</CardTitle>
              <CardDescription>Brush up on key concepts</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              Review essential computer science concepts, data structures, algorithms, and system design principles with
              interactive explanations.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/concept-review" className="w-full">
              <Button className="w-full">Review Concepts</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <TrophyIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>Monitor your improvement</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">
              Track your progress across different topics and skills. Identify strengths and areas for improvement with
              detailed analytics.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/progress" className="w-full">
              <Button className="w-full">View Progress</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </Shell>
  )
}

