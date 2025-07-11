"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Server, Database, Cpu, HardDrive, MemoryStick, TrendingUp, TrendingDown } from "lucide-react"

interface SystemHealth {
  status: "healthy" | "warning" | "critical"
  uptime: string
  totalDevices: number
  onlineDevices: number
  offlineDevices: number
  activeAutomations: number
  recentAlerts: number
  systemLoad: number
  memoryUsage: number
  diskUsage: number
}

interface SystemOverviewProps {
  systemHealth: SystemHealth
}

export function SystemOverview({ systemHealth }: SystemOverviewProps) {
  const resourceMetrics = [
    {
      name: "CPU Usage",
      value: systemHealth.systemLoad,
      icon: Cpu,
      color:
        systemHealth.systemLoad > 70
          ? "text-red-500"
          : systemHealth.systemLoad > 50
            ? "text-yellow-500"
            : "text-green-500",
      trend: "up",
    },
    {
      name: "Memory Usage",
      value: systemHealth.memoryUsage,
      icon: MemoryStick,
      color:
        systemHealth.memoryUsage > 80
          ? "text-red-500"
          : systemHealth.memoryUsage > 60
            ? "text-yellow-500"
            : "text-green-500",
      trend: "down",
    },
    {
      name: "Disk Usage",
      value: systemHealth.diskUsage,
      icon: HardDrive,
      color:
        systemHealth.diskUsage > 80
          ? "text-red-500"
          : systemHealth.diskUsage > 60
            ? "text-yellow-500"
            : "text-green-500",
      trend: "up",
    },
  ]

  const serviceStatus = [
    { name: "API Server", status: "running", uptime: "7d 14h" },
    { name: "Database", status: "running", uptime: "7d 14h" },
    { name: "Redis Cache", status: "running", uptime: "7d 14h" },
    { name: "Celery Workers", status: "running", uptime: "7d 14h" },
    { name: "WebSocket Server", status: "running", uptime: "7d 14h" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Resource Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5" />
            <span>System Resources</span>
          </CardTitle>
          <CardDescription>Real-time resource utilization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {resourceMetrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                  <span className="text-sm font-medium">{metric.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold">{metric.value}%</span>
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-red-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-green-500" />
                  )}
                </div>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Service Status</span>
          </CardTitle>
          <CardDescription>Core system services health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceStatus.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {service.status}
                  </Badge>
                  <span className="text-xs text-gray-500">{service.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Network Activity</CardTitle>
          <CardDescription>Real-time network traffic</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Inbound Traffic</span>
              <span className="text-sm font-bold">2.4 MB/s</span>
            </div>
            <Progress value={65} className="h-2" />

            <div className="flex justify-between items-center">
              <span className="text-sm">Outbound Traffic</span>
              <span className="text-sm font-bold">1.8 MB/s</span>
            </div>
            <Progress value={45} className="h-2" />

            <div className="flex justify-between items-center">
              <span className="text-sm">Active Connections</span>
              <span className="text-sm font-bold">127</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Statistics</CardTitle>
          <CardDescription>Key metrics at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{systemHealth.totalDevices}</div>
              <div className="text-sm text-gray-600">Total Devices</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{systemHealth.activeAutomations}</div>
              <div className="text-sm text-gray-600">Automations</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">1,247</div>
              <div className="text-sm text-gray-600">Commands Today</div>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">99.8%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
