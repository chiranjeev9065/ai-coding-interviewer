"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { startMockInterview } from "@/app/actions"
import { Loader2, SendIcon, User, Bot } from "lucide-react"
import { MarkdownRenderer } from "@/components/markdown-renderer"

const INTERVIEW_TOPICS = [
  { value: "algorithms", label: "Algorithms & Data Structures" },
  { value: "system-design", label: "System Design" },
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "backend", label: "Backend Development" },
  { value: "database", label: "Database Systems" },
]

export function MockInterviewUI() {
  const [selectedTopic, setSelectedTopic] = useState<string>("")
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleStartInterview = async () => {
    if (!selectedTopic) return

    setIsLoading(true)
    setInterviewStarted(true)

    try {
      const initialQuestion = await startMockInterview(selectedTopic)
      setMessages([{ role: "assistant", content: initialQuestion }])
    } catch (error) {
      console.error("Failed to start interview:", error)
      setMessages([
        {
          role: "assistant",
          content: "Sorry, I encountered an error starting the interview. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue("")
    setIsLoading(true)

    // Add user message to chat
    const updatedMessages = [...messages, { role: "user", content: userMessage }]
    setMessages(updatedMessages)

    try {
      // Get AI response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          topic: selectedTopic,
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      // Add AI response to chat
      setMessages([...updatedMessages, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error("Error:", error)
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {!interviewStarted ? (
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Start a Mock Interview</CardTitle>
            <CardDescription>
              Choose a topic to begin your mock technical interview with our AI interviewer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="topic" className="text-sm font-medium">
                  Interview Topic
                </label>
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger id="topic">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {INTERVIEW_TOPICS.map((topic) => (
                      <SelectItem key={topic.value} value={topic.value}>
                        {topic.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStartInterview} disabled={!selectedTopic || isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Preparing Interview...
                </>
              ) : (
                "Start Interview"
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-6 rounded-md border border-border mb-4 bg-card/50">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      message.role === "user" ? "bg-primary ml-2" : "bg-secondary mr-2"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <MarkdownRenderer content={message.content} />
                    ) : (
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && messages.length > 0 && (
              <div className="flex justify-start">
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary mr-2 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-lg p-4 bg-secondary">
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your response..."
              className="flex-1 resize-none bg-card border-border"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="bg-primary hover:bg-primary/90"
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

