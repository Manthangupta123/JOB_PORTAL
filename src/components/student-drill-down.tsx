"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// Update the import path if the Tabs components are located elsewhere, for example:
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Or, if you need to create the file, add the Tabs components to src/components/ui/tabs.tsx
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, AlertTriangle, Code, Star, BookOpen, Users } from "lucide-react"

interface Student {
  id: string
  name: string
  avatar?: string
  department: string
  year: string
  jriScore: number
  projectTitle?: string
}

interface AuditReport {
  aiSummary: {
    overview: string
    keyStrengths: string[]
    areasForImprovement: string[]
  }
  detailedBreakdown: Array<{
    metric: string
    score: number
    summary: string
  }>
}

interface StudentDrillDownProps {
  student: Student
  auditReport: AuditReport
}

export function StudentDrillDown({ student, auditReport }: StudentDrillDownProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getScoreBadgeColor = (score: number) => {
    if (score > 85) return "bg-green-100 text-green-800 hover:bg-green-100"
    if (score >= 70) return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    return "bg-red-100 text-red-800 hover:bg-red-100"
  }

  const defaultAuditReport = {
    aiSummary: {
      overview: "AI audit report is being generated for this student's project.",
      keyStrengths: ["Strong technical foundation", "Good problem-solving approach"],
      areasForImprovement: ["Code documentation", "Test coverage"],
    },
    detailedBreakdown: [
      { metric: "Code Quality", score: 85, summary: "Well-structured and readable code" },
      { metric: "Performance", score: 78, summary: "Good optimization practices" },
      { metric: "Documentation", score: 70, summary: "Basic documentation present" },
    ],
  }

  const safeAuditReport = auditReport || defaultAuditReport

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-start space-x-6">
        <Avatar className="h-24 w-24 ring-2 ring-primary/20">
          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
          <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            {getInitials(student.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <DialogTitle className="text-3xl font-bold tracking-tight">{student.name}</DialogTitle>
          <p className="text-lg text-muted-foreground">
            {student.department} • {student.year}
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-12 p-1 bg-muted/50 rounded-lg">
          <TabsTrigger
            value="overview"
            className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="dsa"
            className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            DSA
          </TabsTrigger>
          <TabsTrigger
            value="academics"
            className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            Academics
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="overview" className="space-y-8 mt-0">
            <div className="text-center space-y-4 p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 rounded-xl">
              <div className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {student.jriScore}
              </div>
              <p className="text-xl text-muted-foreground font-medium">Overall JRI Score</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">JRI Components Breakdown</h3>
              <div className="grid gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Project Score</span>
                    <Badge variant="outline" className="font-semibold">
                      85/100
                    </Badge>
                  </div>
                  <Progress value={85} className="h-3" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">DSA Score</span>
                    <Badge variant="outline" className="font-semibold">
                      78/100
                    </Badge>
                  </div>
                  <Progress value={78} className="h-3" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Academics</span>
                    <Badge variant="outline" className="font-semibold">
                      92/100
                    </Badge>
                  </div>
                  <Progress value={92} className="h-3" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Soft Skills</span>
                    <Badge variant="outline" className="font-semibold">
                      88/100
                    </Badge>
                  </div>
                  <Progress value={88} className="h-3" />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Projects Tab - Full AI Audit Report */}
          <TabsContent value="projects" className="space-y-8 mt-0">
            <div className="p-6 bg-muted/30 rounded-lg border-l-4 border-blue-500">
              <p className="text-muted-foreground leading-relaxed text-lg">{safeAuditReport.aiSummary?.overview}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-green-200 dark:border-green-800">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-green-700 dark:text-green-400 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Key Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {safeAuditReport.aiSummary?.keyStrengths?.map((strength, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{strength}</span>
                      </li>
                    )) || []}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 dark:border-yellow-800">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {safeAuditReport.aiSummary?.areasForImprovement?.map((improvement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{improvement}</span>
                      </li>
                    )) || []}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Detailed Metrics</h3>
              <div className="grid gap-4">
                {safeAuditReport.detailedBreakdown?.map((metric, index) => (
                  <Card key={index} className="p-6 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold text-lg">{metric.metric}</h5>
                      <Badge className={`${getScoreBadgeColor(metric.score)} font-semibold text-sm`}>
                        {metric.score}/100
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{metric.summary}</p>
                  </Card>
                )) || []}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dsa" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="p-5 h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Code className="h-5 w-5 text-orange-500" />
                    LeetCode
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Problems Solved</span>
                      <span className="text-xl font-bold text-orange-500">247</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Easy: 89 • Medium: 132 • Hard: 26</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Contest Rating</span>
                      <span className="text-xl font-bold text-orange-500">1,847</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Max Rating: 1,923</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-5 h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Star className="h-5 w-5 text-green-500" />
                    HackerRank
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Stars</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Badges Earned</span>
                      <span className="text-xl font-bold text-green-500">12</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Gold: 4 • Silver: 5 • Bronze: 3</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academics" className="space-y-8 mt-0">
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-500" />
                Academic Performance
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">CGPA</span>
                    <span className="text-xl font-bold">8.7/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Semester Rank</span>
                    <span className="text-xl font-bold">12/120</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Attendance</span>
                    <span className="text-xl font-bold">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Assignments</span>
                    <span className="text-xl font-bold">28/30</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Users className="h-6 w-6 text-green-500" />
                Community Engagement
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Peer Reviews Given</span>
                    <span className="text-xl font-bold">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Hackathons Participated</span>
                    <span className="text-xl font-bold">7</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Study Groups Led</span>
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Mentoring Hours</span>
                    <span className="text-xl font-bold">45</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
