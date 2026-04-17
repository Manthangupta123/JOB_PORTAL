"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Users, TrendingUp, GraduationCap, Building2, Search, Plus } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { StudentDrillDown } from "@/components/student-drill-down"

interface Student {
  id: string
  name: string
  avatar?: string
  department: string
  year: number
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

export default function TPAdminDashboard() {
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [mounted, setMounted] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    department: "",
    year: 1,
    avatarUrl: "",
    githubUrl: "",
    projectTitle: "",
  })

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students")
        if (response.ok) {
          const data = await response.json()
          setStudents(data)
        }
      } catch (error) {
        console.error("Failed to fetch students:", error)
        setStudents([
          {
            id: "1",
            name: "John Doe",
            department: "Computer Science",
            year: "4th Year",
            jriScore: 92,
            projectTitle: "AI-Powered Task Management System",
          },
          {
            id: "2",
            name: "Jane Smith",
            department: "Electronics",
            year: "3rd Year",
            jriScore: 78,
            projectTitle: "IoT Home Automation Platform",
          },
          {
            id: "3",
            name: "Mike Johnson",
            department: "Mechanical",
            year: "4th Year",
            jriScore: 65,
            projectTitle: "Automated Manufacturing Control System",
          },
          {
            id: "4",
            name: "Sarah Wilson",
            department: "Information Technology",
            year: "2nd Year",
            jriScore: 88,
            projectTitle: "E-commerce Analytics Dashboard",
          },
        ])
      }
    }

    fetchStudents()
    setMounted(true)
  }, [])

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getJRIBadgeColor = (score: number) => {
    if (score > 85) return "bg-green-100 text-green-800 hover:bg-green-100"
    if (score >= 70) return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    return "bg-red-100 text-red-800 hover:bg-red-100"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student)
    setIsDialogOpen(true)
  }

  const handleAddStudent = async () => {
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      })

      if (response.ok) {
        const addedStudent = await response.json()
        setStudents([...students, addedStudent])
        setIsAddDialogOpen(false)
        setNewStudent({
          name: "",
          email: "",
          department: "",
          year: 1,
          avatarUrl: "",
          githubUrl: "",
          projectTitle: "",
        })
      } else {
        console.error("Failed to add student")
      }
    } catch (error) {
      console.error("Error adding student:", error)
    }
  }

  const generateMockAuditReport = (student: Student): AuditReport => {
    return {
      aiSummary: {
        overview: `${student.name}'s project demonstrates strong technical capabilities with well-structured code architecture and innovative problem-solving approaches. The implementation shows good understanding of modern development practices.`,
        keyStrengths: [
          "Clean and maintainable code structure",
          "Effective use of design patterns",
          "Strong problem-solving approach",
          "Good documentation practices",
          "Innovative feature implementation",
        ],
        areasForImprovement: [
          "Error handling could be more comprehensive",
          "Test coverage needs improvement",
          "Performance optimization opportunities",
          "Security considerations could be enhanced",
        ],
      },
      detailedBreakdown: [
        {
          metric: "Code Quality",
          score: student.jriScore > 85 ? 90 : student.jriScore > 70 ? 75 : 60,
          summary: "Well-structured code with good naming conventions and organization",
        },
        {
          metric: "Performance",
          score: student.jriScore > 85 ? 85 : student.jriScore > 70 ? 70 : 55,
          summary: "Application performs well under normal load conditions",
        },
        {
          metric: "Security",
          score: student.jriScore > 85 ? 80 : student.jriScore > 70 ? 65 : 50,
          summary: "Basic security measures implemented, room for enhancement",
        },
        {
          metric: "Innovation",
          score: student.jriScore > 85 ? 95 : student.jriScore > 70 ? 80 : 65,
          summary: "Creative approach to solving complex problems",
        },
        {
          metric: "Documentation",
          score: student.jriScore > 85 ? 88 : student.jriScore > 70 ? 72 : 58,
          summary: "Good documentation with clear explanations and examples",
        },
      ],
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <Navigation mounted={mounted} />

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">T&P Admin Dashboard</h1>
          <p className="text-lg text-slate-500">Manage training and placement activities for all students</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average JRI</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.5</div>
              <p className="text-xs text-muted-foreground">+2.1% from last semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Placed Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">72.3% placement rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+8 new partnerships</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Students Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Student</span>
              </Button>
            </div>

            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Department</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Year</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">JRI Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b transition-colors hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleStudentClick(student)}
                      >
                        <td className="p-4 align-middle">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                              <AvatarFallback className="text-xs">{getInitials(student.name)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge variant="secondary">{student.department}</Badge>
                        </td>
                        <td className="p-4 align-middle">{student.year}</td>
                        <td className="p-4 align-middle text-right">
                          <Badge className={getJRIBadgeColor(student.jriScore)}>{student.jriScore}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

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

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Department</label>
                <Select value={newStudent.department} onValueChange={(value) => setNewStudent({ ...newStudent, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSE">Computer Science</SelectItem>
                    <SelectItem value="IT">Information Technology</SelectItem>
                    <SelectItem value="ECE">Electronics</SelectItem>
                    <SelectItem value="ME">Mechanical</SelectItem>
                    <SelectItem value="CE">Civil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Year</label>
                <Select value={newStudent.year.toString()} onValueChange={(value) => setNewStudent({ ...newStudent, year: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">LeetCode Profile (optional)</label>
                <Input
                  value={newStudent.avatarUrl}
                  onChange={(e) => setNewStudent({ ...newStudent, avatarUrl: e.target.value })}
                  placeholder="Enter LeetCode profile URL"
                />
              </div>
              <div>
                <label className="text-sm font-medium">GitHub URL (optional)</label>
                <Input
                  value={newStudent.githubUrl}
                  onChange={(e) => setNewStudent({ ...newStudent, githubUrl: e.target.value })}
                  placeholder="Enter GitHub repository URL"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Project Title (optional)</label>
                <Textarea
                  value={newStudent.projectTitle}
                  onChange={(e) => setNewStudent({ ...newStudent, projectTitle: e.target.value })}
                  placeholder="Enter project title"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStudent} disabled={!newStudent.name || !newStudent.email || !newStudent.department || !newStudent.year}>
                  Add Student
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
