"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap, Home, Settings, User, Shield, Clock, CheckCircle, AlertTriangle } from "lucide-react"

interface ActivityItem {
  id: string
  type: "device" | "automation" | "user" | "system" | "security"
  title: string
  description: string
  timestamp: string
  status: "success" | "warning" | "error" | "info"
  user?: string
}

export function RecentActivity() {
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "device",
      title: "Living Room Light turned on",
      description: "Device controlled via mobile app",
      timestamp: "2 minutes ago",
      status: "success",
      user: "John Doe",
    },
    {
      id: "2",
      type: "automation",
      title: "Morning Routine executed",
      description: "Automated scene activated successfully",
      timestamp: "3 hours ago",
      status: "success",
    },
    {
      id: "3",
      type: "device",
      title: "Bedroom Light went offline",
      description: "Device lost connection to network",
      timestamp: "2 hours ago",
      status: "error",
    },
    {
      id: "4",
      type: "user",
      title: "New user registered",
      description: "Sarah Smith joined the system",
      timestamp: "4 hours ago",
      status: "info",
    },
    {
      id: "5",
      type: "security",
      title: "Security system armed",
      description: "All sensors activated for night mode",
      timestamp: "8 hours ago",
      status: "success",
      user: "John Doe",
    },
    {
      id: "6",
      type: "system",
      title: "System backup completed",
      description: "Daily backup process finished successfully",
      timestamp: "12 hours ago",
      status: "success",
    },
    {
      id: "7",
      type: "automation",
      title: "Energy Saver rule triggered",
      description: "Lights dimmed due to no motion detected",
      timestamp: "1 day ago",
      status: "success",
    },
    {
      id: "8",
      type: "device",
      title: "Smart Lock battery low",
      description: "Battery level dropped below 20%",
      timestamp: "1 day ago",
      status: "warning",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "device":
        return Home
      case "automation":
        return Zap
      case "user":
        return User
      case "system":
        return Settings
      case "security":
        return Shield
      default:
        return Activity
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-blue-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
        <CardDescription>Latest system events and user actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const ActivityIcon = getActivityIcon(activity.type)

            return (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <ActivityIcon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                    {getStatusIcon(activity.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    {activity.user && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">by {activity.user}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
