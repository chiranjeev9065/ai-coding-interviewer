"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, User } from "lucide-react"

interface VerificationDetails {
  id: string
  name: string
  course: string
  batch: string
}

export function VerificationBanner() {
  // These would typically come from a database or authentication system
  const [verificationDetails] = useState<VerificationDetails>({
    id: "12311425",
    name: "Chiranjeev Kumar Jha",
    course: "K23SE",
    batch: "B63",
  })

  return (
    <Card className="bg-accent/20 border-accent mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent/20 p-2 rounded-full">
              <User className="h-4 w-4 text-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{verificationDetails.name}</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  <CheckCircle className="h-3 w-3 mr-1" /> Verified
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                ID: {verificationDetails.id} • Course: {verificationDetails.course} • Batch: {verificationDetails.batch}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

