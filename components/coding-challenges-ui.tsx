"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCodingChallenge } from "@/app/actions"
import { Loader2 } from "lucide-react"
import { CodeEditor } from "@/components/code-editor"
import { MarkdownRenderer } from "@/components/markdown-renderer"

const CHALLENGE_TOPICS = [
  { value: "arrays", label: "Arrays & Strings" },
  { value: "linked-lists", label: "Linked Lists" },
  { value: "trees", label: "Trees & Graphs" },
  { value: "dynamic-programming", label: "Dynamic Programming" },
  { value: "sorting", label: "Sorting & Searching" },
  { value: "system-design", label: "System Design" },
]

const DIFFICULTY_LEVELS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
]

export function CodingChallengesUI() {
  const [selectedTopic, setSelectedTopic] = useState<string>("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("medium")
  const [challenge, setChallenge] = useState<string>("")
  const [code, setCode] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("problem")

  const handleGenerateChallenge = async () => {
    if (!selectedTopic) return

    setIsLoading(true)
    setChallenge("")
    setCode("")
    setFeedback("")
    setActiveTab("problem")

    try {
      const challengeText = await getCodingChallenge(`${selectedTopic} at ${selectedDifficulty} difficulty level`)
      setChallenge(challengeText)
    } catch (error) {
      console.error("Failed to generate challenge:", error)
      setChallenge("Sorry, I encountered an error generating a challenge. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitSolution = async () => {
    if (!code.trim() || !challenge) return

    setIsLoading(true)
    setFeedback("")

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: challenge,
          answer: code,
        }),
      })

      if (!response.ok) throw new Error("Failed to get feedback")

      const data = await response.json()
      setFeedback(data.feedback)
      setActiveTab("feedback")
    } catch (error) {
      console.error("Error:", error)
      setFeedback("Sorry, I encountered an error evaluating your solution. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Generate a Coding Challenge</CardTitle>
          <CardDescription>
            Select a topic and difficulty level to generate a coding interview challenge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="topic" className="text-sm font-medium">
                Topic
              </label>
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger id="topic">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {CHALLENGE_TOPICS.map((topic) => (
                    <SelectItem key={topic.value} value={topic.value}>
                      {topic.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="difficulty" className="text-sm font-medium">
                Difficulty
              </label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTY_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerateChallenge} disabled={!selectedTopic || isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Challenge...
              </>
            ) : (
              "Generate Challenge"
            )}
          </Button>
        </CardFooter>
      </Card>

      {challenge && (
        <Card className="bg-card">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="problem">Problem</TabsTrigger>
                <TabsTrigger value="solution">Your Solution</TabsTrigger>
                <TabsTrigger value="feedback" disabled={!feedback}>
                  AI Feedback
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="problem" className="mt-0">
              <MarkdownRenderer content={challenge} />
            </TabsContent>
            <TabsContent value="solution" className="mt-0">
              <CodeEditor value={code} onChange={setCode} language="javascript" height="400px" />
            </TabsContent>
            <TabsContent value="feedback" className="mt-0">
              <MarkdownRenderer content={feedback} />
            </TabsContent>
          </CardContent>
          <CardFooter>
            {activeTab === "solution" && (
              <Button onClick={handleSubmitSolution} disabled={!code.trim() || isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Evaluating Solution...
                  </>
                ) : (
                  "Submit for Feedback"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

