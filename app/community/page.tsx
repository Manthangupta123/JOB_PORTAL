"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  MessageCircle,
  Share2,
  Trophy,
  Briefcase,
  Users,
  Calendar,
  MapPin,
  ExternalLink,
  Plus,
  GraduationCap,
  UserCheck,
  Building2,
} from "lucide-react"
import { Navigation } from "@/components/navigation"

interface Post {
  id: string
  author: {
    name: string
    avatar?: string
    department: string
    year: string
    role: "student" | "faculty" | "department" | "admin"
    designation?: string
  }
  content: string
  type: "achievement" | "placement" | "event" | "discussion" | "announcement"
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  tags?: string[]
  company?: string
  eventDate?: string
  location?: string
}

interface Activity {
  id: string
  type: "placement" | "achievement" | "event"
  title: string
  description: string
  count: number
  icon: React.ReactNode
}

export default function CommunityFeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Mock community feed data with enhanced user roles
    setPosts([
      {
        id: "1",
        author: {
          name: "Sarah Johnson",
          department: "Computer Science",
          year: "4th Year",
          role: "student",
        },
        content:
          "Just got placed at Google as a Software Engineer! Thank you to all the professors and the T&P cell for the amazing support. The mock interviews really helped! 🎉",
        type: "placement",
        timestamp: "2 hours ago",
        likes: 45,
        comments: 12,
        shares: 8,
        isLiked: false,
        company: "Google",
        tags: ["Placement", "Software Engineer", "Google"],
      },
      {
        id: "2",
        author: {
          name: "Dr. Priya Sharma",
          department: "Computer Science",
          year: "Faculty",
          role: "faculty",
          designation: "Professor & Head of Department",
        },
        content:
          "Congratulations to all our students who participated in the Algorithm Mastery Challenge! Your dedication and problem-solving skills continue to impress. Special mention to Mike Chen for securing first place. Keep up the excellent work!",
        type: "announcement",
        timestamp: "4 hours ago",
        likes: 89,
        comments: 23,
        shares: 15,
        isLiked: false,
        tags: ["Congratulations", "Algorithm Challenge", "Faculty"],
      },
      {
        id: "3",
        author: {
          name: "Mike Chen",
          department: "Electronics",
          year: "3rd Year",
          role: "student",
        },
        content:
          "Won first place in the Algorithm Mastery Challenge! The competition was intense but really helped me improve my problem-solving skills. Looking forward to more challenges!",
        type: "achievement",
        timestamp: "5 hours ago",
        likes: 32,
        comments: 8,
        shares: 5,
        isLiked: true,
        tags: ["Achievement", "Algorithm", "Competition"],
      },
      {
        id: "4",
        author: {
          name: "Training & Placement Cell",
          department: "T&P Administration",
          year: "Official",
          role: "department",
        },
        content:
          "📢 IMPORTANT ANNOUNCEMENT: Upcoming Tech Talk - 'Future of AI in Industry' by Dr. Rajesh Kumar, Senior AI Researcher at Microsoft. Date: January 20, 2024. This is a great opportunity to learn from industry experts and network with professionals. Registration link in bio!",
        type: "event",
        timestamp: "1 day ago",
        likes: 156,
        comments: 34,
        shares: 67,
        isLiked: false,
        eventDate: "January 20, 2024",
        location: "Main Auditorium",
        tags: ["Tech Talk", "AI", "Microsoft", "Registration Open"],
      },
      {
        id: "5",
        author: {
          name: "Alex Rodriguez",
          department: "Mechanical",
          year: "4th Year",
          role: "student",
        },
        content:
          "Any tips for technical interviews at automotive companies? I have an interview with Tesla next week and would appreciate any advice from seniors who've been through similar processes. Thanks in advance!",
        type: "discussion",
        timestamp: "2 days ago",
        likes: 18,
        comments: 24,
        shares: 3,
        isLiked: false,
        tags: ["Interview Tips", "Tesla", "Automotive", "Help Needed"],
      },
      {
        id: "6",
        author: {
          name: "Prof. Anita Desai",
          department: "Mechanical Engineering",
          year: "Faculty",
          role: "faculty",
          designation: "Associate Professor",
        },
        content:
          "Great question, Alex! For automotive interviews, focus on: 1) Understanding of automotive systems and manufacturing processes, 2) Problem-solving with real-world constraints, 3) Sustainability and innovation in automotive tech. Best of luck! Feel free to reach out if you need more specific guidance.",
        type: "discussion",
        timestamp: "1 day ago",
        likes: 42,
        comments: 8,
        shares: 12,
        isLiked: false,
        tags: ["Interview Tips", "Faculty Advice", "Automotive"],
      },
      {
        id: "7",
        author: {
          name: "Student Council",
          department: "Student Affairs",
          year: "Official",
          role: "department",
        },
        content:
          "🎉 Celebrating our campus achievements this month: 23 new placements, 8 competition winners, and 5 upcoming industry events! Thank you to all students, faculty, and the T&P cell for making this possible. Together we achieve more! #CampusPride",
        type: "announcement",
        timestamp: "3 days ago",
        likes: 203,
        comments: 45,
        shares: 89,
        isLiked: true,
        tags: ["Campus Achievements", "Monthly Update", "Community"],
      },
    ])
    setMounted(true)
  }, [])

  const activities: Activity[] = [
    {
      id: "1",
      type: "placement",
      title: "Recent Placements",
      description: "Students placed this week",
      count: 23,
      icon: <Briefcase className="h-5 w-5 text-green-600" />,
    },
    {
      id: "2",
      type: "achievement",
      title: "Challenge Winners",
      description: "Competition achievements",
      count: 8,
      icon: <Trophy className="h-5 w-5 text-yellow-600" />,
    },
    {
      id: "3",
      type: "event",
      title: "Upcoming Events",
      description: "This month's schedule",
      count: 5,
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
    },
  ]

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "placement":
        return <Briefcase className="h-4 w-4 text-green-600" />
      case "achievement":
        return <Trophy className="h-4 w-4 text-yellow-600" />
      case "event":
        return <Calendar className="h-4 w-4 text-blue-600" />
      case "announcement":
        return <Users className="h-4 w-4 text-purple-600" />
      default:
        return <MessageCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getPostTypeBadge = (type: string) => {
    switch (type) {
      case "placement":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Placement</Badge>
      case "achievement":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Achievement</Badge>
      case "event":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Event</Badge>
      case "announcement":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Announcement</Badge>
      default:
        return <Badge variant="secondary">Discussion</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleNewPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: {
          name: "You",
          department: "Computer Science",
          year: "4th Year",
          role: "student",
        },
        content: newPost,
        type: "discussion",
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
      }
      setPosts([post, ...posts])
      setNewPost("")
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "faculty":
        return <GraduationCap className="h-4 w-4 text-blue-600" />
      case "department":
        return <Building2 className="h-4 w-4 text-purple-600" />
      case "admin":
        return <UserCheck className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getRoleBadge = (role: string, designation?: string) => {
    switch (role) {
      case "faculty":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
            <GraduationCap className="h-3 w-3 mr-1" />
            Faculty
          </Badge>
        )
      case "department":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 text-xs">
            <Building2 className="h-3 w-3 mr-1" />
            Official
          </Badge>
        )
      case "admin":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">
            <UserCheck className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        )
      default:
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
            <Users className="h-3 w-3 mr-1" />
            Student
          </Badge>
        )
    }
  }

  const getAuthorDisplayInfo = (author: Post["author"]) => {
    if (author.role === "faculty" && author.designation) {
      return {
        subtitle: author.designation,
        department: author.department,
      }
    }
    if (author.role === "department") {
      return {
        subtitle: author.department,
        department: "Official Account",
      }
    }
    return {
      subtitle: `${author.department} • ${author.year}`,
      department: null,
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <Navigation mounted={mounted} />

        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Community Feed</h1>
            <p className="text-lg text-slate-500">Connect with students, faculty, and campus community</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Create Post</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Activity Summary */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Campus Activity</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="text-lg font-bold text-primary">{activity.count}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold">Community Stats</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Students</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Faculty Members</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">This Week&apos;s Posts</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Engagement Rate</span>
                  <span className="font-medium">94%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
            {/* Create Post */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Share an update, ask a question, or celebrate an achievement..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                        <Plus className="h-3 w-3 mr-1" />
                        Achievement
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                        <Plus className="h-3 w-3 mr-1" />
                        Question
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                        <Plus className="h-3 w-3 mr-1" />
                        Event
                      </Badge>
                    </div>
                    <Button onClick={handleNewPost} disabled={!newPost.trim()}>
                      Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            {posts.map((post) => {
              const authorInfo = getAuthorDisplayInfo(post.author)

              return (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Post Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                            <AvatarFallback
                              className={`${
                                post.author.role === "faculty"
                                  ? "bg-blue-100 text-blue-700"
                                  : post.author.role === "department"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-green-100 text-green-700"
                              }`}
                            >
                              {getInitials(post.author.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-base">{post.author.name}</h4>
                              {getRoleIcon(post.author.role)}
                              {post.type !== "discussion" && (
                                <div className="flex items-center space-x-1">
                                  {post.type === "placement" && <Briefcase className="h-4 w-4 text-green-600" />}
                                  {post.type === "achievement" && <Trophy className="h-4 w-4 text-yellow-600" />}
                                  {post.type === "event" && <Calendar className="h-4 w-4 text-blue-600" />}
                                  {post.type === "announcement" && <Users className="h-4 w-4 text-purple-600" />}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>{authorInfo.subtitle}</span>
                              <span>•</span>
                              <span>{post.timestamp}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getRoleBadge(post.author.role, post.author.designation)}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">{getPostTypeBadge(post.type)}</div>
                      </div>

                      {/* Post Content */}
                      <div className="space-y-3">
                        <p className="text-sm leading-relaxed">{post.content}</p>

                        {/* Event Details */}
                        {post.type === "event" && (post.eventDate || post.location) && (
                          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-2 border-l-4 border-blue-500">
                            <div className="font-medium text-blue-900 dark:text-blue-100 text-sm">Event Details</div>
                            {post.eventDate && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                <span>{post.eventDate}</span>
                              </div>
                            )}
                            {post.location && (
                              <div className="flex items-center space-x-2 text-sm">
                                <MapPin className="h-4 w-4 text-blue-600" />
                                <span>{post.location}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Company Info for Placements */}
                        {post.type === "placement" && post.company && (
                          <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border-l-4 border-green-500">
                            <div className="flex items-center space-x-2 text-sm">
                              <Briefcase className="h-4 w-4 text-green-600" />
                              <span className="font-medium text-green-900 dark:text-green-100">
                                Placed at {post.company}
                              </span>
                              <ExternalLink className="h-3 w-3 text-muted-foreground" />
                            </div>
                          </div>
                        )}

                        {/* Tags */}
                        {post.tags && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={`space-x-2 ${post.isLiked ? "text-red-600" : ""}`}
                          >
                            <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="space-x-2">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="space-x-2">
                            <Share2 className="h-4 w-4" />
                            <span>{post.shares}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
