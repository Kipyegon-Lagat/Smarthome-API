"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Zap, Clock, Play, Pause, Settings, Home, Shield } from "lucide-react"

interface AutomationRule {
  id: string
  name: string
  description: string
  isActive: boolean
  triggerType: "time" | "device" | "sensor"
  lastExecuted: string
  executionCount: number
  successRate: number
  nextExecution?: string
}

interface Scene {
  id: string
  name: string
  description: string
  deviceCount: number
  lastActivated: string
  icon: string
}

export function AutomationStatus() {
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: "1",
      name: "Morning Routine",
      description: "Turn on lights and adjust temperature at 7:00 AM",
      isActive: true,
      triggerType: "time",
      lastExecuted: "2 hours ago",
      executionCount: 156,
      successRate: 98.7,
      nextExecution: "Tomorrow at 7:00 AM",
    },
    {
      id: "2",
      name: "Security Mode",
      description: "Lock doors and arm cameras when everyone leaves",
      isActive: true,
      triggerType: "device",
      lastExecuted: "4 hours ago",
      executionCount: 89,
      successRate: 100,
    },
    {
      id: "3",
      name: "Energy Saver",
      description: "Turn off lights when no motion detected for 30 minutes",
      isActive: false,
      triggerType: "Sensor",
      lastExecuted: "1 day ago",
      executionCount: 234,
      successRate: 95.2,
    },
    {
      id: "4",
      name: "Night Mode",
      description: "Dim lights and lower temperature at 10:00 PM",
      isActive: true,
      triggerType: "time",
      lastExecuted: "12 hours ago",
      executionCount: 145,
      successRate: 97.9,
      nextExecution: "Today at 10:00 PM",
    },
  ])

  const [scenes, setScenes] = useState<Scene[]>([
    {
      id: "1",
      name: "Movie Night",
      description: "Dim lights, Close blinds, turn on TV",
      deviceCount: 5,
      lastActivated: "2 days ago",
      icon: "🎬",
    },
    {
      id: "2",
      name: "Good Morning",
      description: "Gradual light increase, coffee maker on",
      deviceCount: 8,
      lastActivated: "1 hour ago",
      icon: "☀️",
    },
    {
      id: "3",
      name: "Away Mode",
      description: "All lights off, security armed, temperature down",
      deviceCount: 12,
      lastActivated: "6 hours ago",
      icon: "🏠",
    },
    {
      id: "4",
      name: "Sleep Time",
      description: "All lights off, doors locked, temperature optimal",
      deviceCount: 10,
      lastActivated: "8 hours ago",
      icon: "🌙",
    },
  ])

  const toggleAutomation = (id: string) => {
    setAutomationRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, isActive: !rule.isActive } : rule)))
  }

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case "time":
        return Clock
      case "device":
        return Home
      case "sensor":
        return Shield
      default:
        return Zap
    }
  }

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 95) return "text-green-600"
    if (rate >= 85) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Automation Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Automation Rules</span>
          </CardTitle>
          <CardDescription>Manage and monitor your automation rules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automationRules.map((rule) => {
              const TriggerIcon = getTriggerIcon(rule.triggerType)

              return (
                <div key={rule.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <TriggerIcon className="h-5 w-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold">{rule.name}</h3>
                        <p className="text-sm text-gray-600">{rule.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">Success Rate:</span>
                          <span className={`font-semibold ${getSuccessRateColor(rule.successRate)}`}>
                            {rule.successRate}%
                          </span>
                        </div>
                        <div className="text-gray-500">Executed {rule.executionCount} times</div>
                      </div>

                      <Switch checked={rule.isActive} onCheckedChange={() => toggleAutomation(rule.id)} />

                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                    <span>Last executed: {rule.lastExecuted}</span>
                    {rule.nextExecution && <span>Next: {rule.nextExecution}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Scenes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Scenes</span>
          </CardTitle>
          <CardDescription>Quick access to your favorite device configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scenes.map((scene) => (
              <Card key={scene.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="text-center space-y-3">
                    <div className="text-3xl">{scene.icon}</div>
                    <div>
                      <h3 className="font-semibold">{scene.name}</h3>
                      <p className="text-xs text-gray-600">{scene.description}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      <div>{scene.deviceCount} devices</div>
                      <div>Last: {scene.lastActivated}</div>
                    </div>
                    <Button size="sm" className="w-full">
                      <Play className="h-3 w-3 mr-1" />
                      Activate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automation Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Execution Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Today</span>
                <span className="font-semibold">24 executions</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">This Week</span>
                <span className="font-semibold">156 executions</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Success Rate</span>
                <span className="font-semibold text-green-600">97.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Active Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Energy Saver</span>
                <Badge variant="secondary">234</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Morning Routine</span>
                <Badge variant="secondary">156</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Night Mode</span>
                <Badge variant="secondary">145</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Play className="h-3 w-3 mr-2" />
                Test All Rules
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Pause className="h-3 w-3 mr-2" />
                Pause All
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Settings className="h-3 w-3 mr-2" />
                Rule Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
