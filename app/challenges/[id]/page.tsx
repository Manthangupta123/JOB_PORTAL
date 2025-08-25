"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Users, Trophy, Calendar, CheckCircle, AlertCircle, ArrowLeft, MapPin, BookOpen } from "lucide-react"
import { Navigation } from "@/components/navigation"

interface Challenge {
  id: string
  title: string
  organizer: string
  endDate: string
  participants: number
  description: string
  type: "technical" | "aptitude" | "group" | "presentation"
  difficulty: "easy" | "medium" | "hard"
  duration: string
  maxParticipants: number
  status: "active" | "upcoming" | "completed"
  prize: string
  tags: string[]
  progress?: number
  fullDescription: string
  rules: string[]
  requirements: string[]
  venue: string
  startDate: string
  registrationDeadline: string
  organizers: Array<{
    name: string
    role: string
    avatar?: string
  }>
  timeline: Array<{
    phase: string
    date: string
    description: string
  }>
}

export default function ChallengeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [mounted, setMounted] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!params?.id) return

    const fetchChallenge = async () => {
      try {
        // load static JSON from public folder
        const res = await fetch("data/challenges.json")
        if (!res.ok) throw new Error("Failed to fetch challenges.json")
        const data: Challenge[] = await res.json()

        // find challenge by ID
        const found = data.find((c) => c.id === params.id)
        setChallenge(found || null)
      } catch (err) {
        console.error("Error fetching challenge:", err)
      }
    }

    fetchChallenge()
  }, [params?.id])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "upcoming":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Clock className="h-3 w-3 mr-1" />
            Upcoming
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <Trophy className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Easy</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "hard":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Hard</Badge>
      default:
        return <Badge variant="secondary">{difficulty}</Badge>
    }
  }

  if (!challenge) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <Navigation mounted={mounted} />

        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Challenges</span>
        </Button>

        {/* Challenge Header */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{challenge.title}</h1>
              <p className="text-muted-foreground">Organized by {challenge.organizer}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {getStatusBadge(challenge.status)}
              {getDifficultyBadge(challenge.difficulty)}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {challenge.participants}/{challenge.maxParticipants} participants
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{challenge.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{challenge.venue}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <span>{challenge.prize}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>About This Challenge</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{challenge.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>Rules & Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {challenge.rules.map((rule, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {challenge.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {challenge.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        {index < challenge.timeline.length - 1 && <div className="w-0.5 h-8 bg-border mt-2" />}
                      </div>
                      <div className="space-y-1 pb-4">
                        <div className="font-medium">{item.phase}</div>
                        <div className="text-sm text-muted-foreground">{item.date}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card>
              <CardHeader>
                <CardTitle>Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {challenge.progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Participation</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Registration Deadline:</span>
                    <span className="font-medium">{challenge.registrationDeadline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Challenge Date:</span>
                    <span className="font-medium">{challenge.startDate}</span>
                  </div>
                </div>

                <Separator />

                {challenge.status === "active" && (
                  <Button className="w-full" onClick={() => setIsRegistered(!isRegistered)}>
                    {isRegistered ? "Registered ✓" : "Join Challenge"}
                  </Button>
                )}
                {challenge.status === "upcoming" && (
                  <Button variant="outline" className="w-full bg-transparent">
                    Register Interest
                  </Button>
                )}
                {challenge.status === "completed" && (
                  <Button variant="secondary" className="w-full">
                    View Results
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {challenge.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Organizers */}
            <Card>
              <CardHeader>
                <CardTitle>Organizers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {challenge.organizers.map((organizer, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={organizer.avatar || "/placeholder.svg"} alt={organizer.name} />
                        <AvatarFallback>
                          {organizer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{organizer.name}</div>
                        <div className="text-xs text-muted-foreground">{organizer.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
