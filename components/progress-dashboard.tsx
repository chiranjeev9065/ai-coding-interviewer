"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, Code2, FileText, MessageSquare } from "lucide-react"

export function ProgressDashboard() {
  // Mock data - in a real app, this would come from a database
  const mockData = {
    overallProgress: 68,
    completedChallenges: 24,
    completedInterviews: 12,
    conceptsReviewed: 18,

    topicProgress: [
      { name: "Arrays & Strings", progress: 85 },
      { name: "Linked Lists", progress: 70 },
      { name: "Trees & Graphs", progress: 60 },
      { name: "Dynamic Programming", progress: 45 },
      { name: "System Design", progress: 55 },
    ],

    recentActivity: [
      {
        type: "challenge",
        title: "Two Sum Problem",
        date: "2 hours ago",
        status: "completed",
        score: 92,
      },
      {
        type: "interview",
        title: "Mock Interview: Algorithms",
        date: "1 day ago",
        status: "completed",
        score: 85,
      },
      {
        type: "concept",
        title: "Hash Tables",
        date: "2 days ago",
        status: "reviewed",
      },
      {
        type: "challenge",
        title: "Merge K Sorted Lists",
        date: "3 days ago",
        status: "completed",
        score: 78,
      },
      {
        type: "interview",
        title: "Mock Interview: System Design",
        date: "5 days ago",
        status: "completed",
        score: 80,
      },
    ],

    recommendations: [
      "Practice more Dynamic Programming problems",
      "Review System Design concepts",
      "Try a mock interview focused on Trees & Graphs",
      "Revisit Hash Tables implementation details",
    ],
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overallProgress}%</div>
            <Progress value={mockData.overallProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Challenges Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.completedChallenges}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <Code2 className="inline h-3 w-3 mr-1" />
              Across various topics
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mock Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.completedInterviews}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <MessageSquare className="inline h-3 w-3 mr-1" />
              Practice sessions completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Concepts Reviewed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.conceptsReviewed}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <FileText className="inline h-3 w-3 mr-1" />
              Key topics studied
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Topic Progress</CardTitle>
            <CardDescription>Your progress across different interview topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.topicProgress.map((topic) => (
                <div key={topic.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{topic.name}</div>
                    <div className="text-sm text-muted-foreground">{topic.progress}%</div>
                  </div>
                  <Progress value={topic.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Personalized suggestions to improve</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockData.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-0.5 text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest interview preparation activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {activity.type === "challenge" && <Code2 className="h-5 w-5 text-blue-500" />}
                    {activity.type === "interview" && <MessageSquare className="h-5 w-5 text-green-500" />}
                    {activity.type === "concept" && <FileText className="h-5 w-5 text-purple-500" />}
                  </div>
                  <div>
                    <div className="font-medium">{activity.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs font-normal">
                        {activity.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.date}
                      </span>
                    </div>
                  </div>
                </div>
                {activity.score && <div className="text-sm font-medium">Score: {activity.score}%</div>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

