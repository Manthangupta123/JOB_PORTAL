"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trophy, Medal, Award, Building2, Calendar, Code } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { StudentDrillDown } from "@/components/student-drill-down"

interface Student {
  id: string
  name: string
  avatar?: string
  department: string
  year: string
  techStack: string
  jriScore: number
  placementStatus: "Placed" | "In Process" | "Not Started"
  company?: string
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

export default function LeaderboardsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [mounted, setMounted] = useState(false)
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [selectedTechStack, setSelectedTechStack] = useState<string>("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students")
        const data = await response.json()
        const sortedStudents = data.sort((a: Student, b: Student) => b.jriScore - a.jriScore)
        setStudents(sortedStudents)
        setFilteredStudents(sortedStudents)
      } catch (error) {
        console.error("Failed to fetch students:", error)
        const mockData = [
          {
            id: "1",
            name: "Alice Johnson",
            department: "CSE",
            year: "4th Year",
            techStack: "React/Node.js",
            jriScore: 96,
            placementStatus: "Placed" as const,
            company: "Google",
          },
          {
            id: "2",
            name: "Bob Smith",
            department: "IT",
            year: "4th Year",
            techStack: "Python/Django",
            jriScore: 94,
            placementStatus: "Placed" as const,
            company: "Microsoft",
          },
          {
            id: "3",
            name: "Carol Davis",
            department: "Mechanical",
            year: "3rd Year",
            techStack: "Java/Spring",
            jriScore: 92,
            placementStatus: "In Process" as const,
          },
          {
            id: "4",
            name: "David Wilson",
            department: "Civil",
            year: "4th Year",
            techStack: "C++/Qt",
            jriScore: 90,
            placementStatus: "Placed" as const,
            company: "Tesla",
          },
          {
            id: "5",
            name: "Eva Brown",
            department: "CSE",
            year: "3rd Year",
            techStack: "React/Node.js",
            jriScore: 88,
            placementStatus: "In Process" as const,
          },
        ]
        setStudents(mockData)
        setFilteredStudents(mockData)
      }
    }

    fetchStudents()
    setMounted(true)
  }, [])

  useEffect(() => {
    let filtered = students

    if (selectedYear !== "all") {
      filtered = filtered.filter((student) => student.year === selectedYear)
    }

    if (selectedDepartment !== "all") {
      filtered = filtered.filter((student) => student.department === selectedDepartment)
    }

    if (selectedTechStack !== "all") {
      filtered = filtered.filter((student) => student.techStack === selectedTechStack)
    }

    setFilteredStudents(filtered)
  }, [students, selectedYear, selectedDepartment, selectedTechStack])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getPlacementBadgeColor = (status: string) => {
    switch (status) {
      case "Placed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "In Process":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const topThree = filteredStudents.slice(0, 3)
  const restOfStudents = filteredStudents.slice(3)

  const uniqueYears = [...new Set(students.map((s) => s.year))].sort()
  const uniqueDepartments = [...new Set(students.map((s) => s.department))].sort()
  const uniqueTechStacks = [...new Set(students.map((s) => s.techStack))].sort()

  const generateMockAuditReport = (student: Student): AuditReport => {
    return {
      aiSummary: {
        overview: `${student.name}'s performance demonstrates strong technical capabilities with excellent problem-solving skills. Their JRI score of ${student.jriScore}% reflects consistent academic and project excellence.`,
        keyStrengths: [
          "Strong technical foundation",
          "Excellent problem-solving skills",
          "Consistent academic performance",
          "Good project implementation",
          "Leadership qualities",
        ],
        areasForImprovement: [
          "Communication skills enhancement",
          "Industry exposure expansion",
          "Advanced technology adoption",
          "Team collaboration improvement",
        ],
      },
      detailedBreakdown: [
        {
          metric: "Technical Skills",
          score: student.jriScore > 85 ? 92 : student.jriScore > 70 ? 78 : 65,
          summary: "Strong grasp of core technical concepts and implementation",
        },
        {
          metric: "Problem Solving",
          score: student.jriScore > 85 ? 88 : student.jriScore > 70 ? 75 : 62,
          summary: "Effective analytical thinking and solution development",
        },
        {
          metric: "Project Quality",
          score: student.jriScore > 85 ? 90 : student.jriScore > 70 ? 77 : 64,
          summary: "Well-executed projects with good documentation",
        },
        {
          metric: "Academic Performance",
          score: student.jriScore > 85 ? 85 : student.jriScore > 70 ? 72 : 58,
          summary: "Consistent academic excellence across subjects",
        },
      ],
    }
  }

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <Navigation mounted={mounted} />

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Student Leaderboard</h1>
          <p className="text-muted-foreground">Top performing students ranked by JRI Score</p>
        </div>

        <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="space-y-2">
            <label className="text-sm font-medium">Year</label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {[...new Set(uniqueYears)].map((year, idx) => (
                  <SelectItem key={`${year}-${idx}`} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Civil">Civil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tech Stack</label>
            <Select value={selectedTechStack} onValueChange={setSelectedTechStack}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Tech Stacks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tech Stacks</SelectItem>
                {[...new Set(uniqueTechStacks)].map((stack, idx) => (
                  <SelectItem key={`${stack}-${idx}`} value={stack}>
                    {stack}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {topThree.map((student, index) => {
            const position = index + 1
            const icons = [
              <Trophy key="trophy" className="h-8 w-8 text-yellow-500" />,
              <Medal key="medal" className="h-8 w-8 text-gray-400" />,
              <Award key="award" className="h-8 w-8 text-amber-600" />,
            ]

            return (
              <Card
                key={student.id}
                className={`relative cursor-pointer hover:shadow-lg transition-shadow ${position === 1 ? "ring-2 ring-yellow-500/20" : ""}`}
                onClick={() => {
                  console.log("[v0] Top 3 card clicked:", student.name)
                  handleStudentClick(student)
                }}
              >
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-2">{icons[index]}</div>
                  <CardTitle className="text-lg">#{position}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <Avatar className="h-16 w-16 mx-auto">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.department}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-primary">{student.jriScore}%</div>
                    <Badge className={getPlacementBadgeColor(student.placementStatus)}>{student.placementStatus}</Badge>
                    {student.company && <p className="text-sm font-medium">{student.company}</p>}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Complete Rankings</h2>
          <div className="space-y-3">
            {restOfStudents.map((student, index) => {
              const position = index + 4
              return (
                <Card
                  key={student.id}
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    console.log("[v0] Student card clicked:", student.name)
                    handleStudentClick(student)
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted font-semibold">
                        #{position}
                      </div>

                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                      </Avatar>

                      <div className="space-y-1">
                        <h3 className="font-semibold">{student.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Building2 className="h-3 w-3" />
                            <span>{student.department}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{student.year}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Code className="h-3 w-3" />
                            <span>{student.techStack}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Badge className={getPlacementBadgeColor(student.placementStatus)}>
                        {student.placementStatus}
                      </Badge>
                      {student.company && <span className="text-sm font-medium">{student.company}</span>}
                      <div className="text-xl font-bold text-primary min-w-[60px] text-right">{student.jriScore}%</div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Student Details</DialogTitle>
            </DialogHeader>
            {selectedStudent && (
              <StudentDrillDown student={selectedStudent} auditReport={generateMockAuditReport(selectedStudent)} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
