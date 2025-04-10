"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Loader2, SearchIcon } from "lucide-react"
import { MarkdownRenderer } from "@/components/markdown-renderer"

const CONCEPT_CATEGORIES = [
  {
    id: "data-structures",
    title: "Data Structures",
    concepts: ["Arrays", "Linked Lists", "Stacks", "Queues", "Hash Tables", "Trees", "Heaps", "Graphs", "Tries"],
  },
  {
    id: "algorithms",
    title: "Algorithms",
    concepts: [
      "Sorting",
      "Searching",
      "Recursion",
      "Dynamic Programming",
      "Greedy Algorithms",
      "Backtracking",
      "Divide and Conquer",
    ],
  },
  {
    id: "system-design",
    title: "System Design",
    concepts: [
      "Scalability",
      "Load Balancing",
      "Caching",
      "Database Sharding",
      "Microservices",
      "API Design",
      "Distributed Systems",
    ],
  },
  {
    id: "languages",
    title: "Programming Languages",
    concepts: ["JavaScript", "Python", "Java", "C++", "Go", "TypeScript", "Rust", "Swift"],
  },
]

export function ConceptReviewUI() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [conceptContent, setConceptContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("data-structures")

  const handleConceptClick = async (concept: string) => {
    setSelectedConcept(concept)
    setIsLoading(true)

    try {
      const response = await fetch("/api/concept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept }),
      })

      if (!response.ok) throw new Error("Failed to get concept")

      const data = await response.json()
      setConceptContent(data.content)
    } catch (error) {
      console.error("Error:", error)
      setConceptContent("Sorry, I encountered an error retrieving this concept. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredConcepts = CONCEPT_CATEGORIES.map((category) => ({
    ...category,
    concepts: category.concepts.filter((concept) => concept.toLowerCase().includes(searchQuery.toLowerCase())),
  })).filter((category) => category.concepts.length > 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Concepts</CardTitle>
            <CardDescription>Browse or search for interview concepts</CardDescription>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search concepts..."
                className="pl-8 bg-card border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {searchQuery ? (
              <div className="space-y-4 p-4">
                {filteredConcepts.map((category) => (
                  <div key={category.id}>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">{category.title}</h3>
                    <div className="space-y-1">
                      {category.concepts.map((concept) => (
                        <Button
                          key={concept}
                          variant="ghost"
                          className="w-full justify-start text-left"
                          onClick={() => handleConceptClick(concept)}
                        >
                          {concept}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
                {filteredConcepts.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No concepts found matching "{searchQuery}"</p>
                )}
              </div>
            ) : (
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <div className="border-b border-border">
                  <TabsList className="w-full justify-start rounded-none h-auto p-0">
                    {CONCEPT_CATEGORIES.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-2"
                      >
                        {category.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                {CONCEPT_CATEGORIES.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="m-0 p-0">
                    <div className="space-y-1 p-4">
                      {category.concepts.map((concept) => (
                        <Button
                          key={concept}
                          variant="ghost"
                          className="w-full justify-start text-left"
                          onClick={() => handleConceptClick(concept)}
                        >
                          {concept}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="h-full bg-card">
          <CardHeader>
            <CardTitle>{selectedConcept || "Select a Concept"}</CardTitle>
            <CardDescription>
              {selectedConcept
                ? "Review key information about this concept"
                : "Click on a concept from the list to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : selectedConcept ? (
              <MarkdownRenderer content={conceptContent} />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Select a concept from the list to view detailed information</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

