"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Zap, Home, AlertTriangle, CheckCircle, XCircle, Clock, Wifi, WifiOff } from "lucide-react"
import { SystemOverview } from "@/components/system-overview"
import { DeviceMonitoring } from "@/components/device-monitoring"
import { AutomationStatus } from "@/components/automation-status"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { AlertsPanel } from "@/components/alerts-panel"

interface SystemHealth {
  status: "healthy" | "warning" |  "critical"
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

export default function MonitoringDashboard() {
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    status: "healthy",
    uptime: "7d 14h 32m",
    totalDevices: 24,
    onlineDevices: 22,
    offlineDevices: 2,
    activeAutomations: 8,
    recentAlerts: 3,
    systemLoad: 45,
    memoryUsage: 68,
    diskUsage: 34,
  })

  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth((prev) => ({
        ...prev,
        onlineDevices: Math.max(20, Math.min(24, prev.onlineDevices + (Math.random() > 0.5 ? 1 : -1))),
        systemLoad: Math.max(20, Math.min(80, prev.systemLoad + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(40, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 5)),
      }))
      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "critical":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Activity className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Home System Monitor</h1>
            <p className="text-gray-600 mt-1">Real-time System health and device monitoring</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isConnected ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-red-600" />}
              <span className="text-sm text-gray-600">{isConnected ? "Connected" : "Disconnected"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Last update: {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <Button variant="outline" size="sm">
              <Activity className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              {getStatusIcon(systemHealth.status)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                <span className={getStatusColor(systemHealth.status)}>{systemHealth.status}</span>
              </div>
              <p className="text-xs text-muted-foreground">Uptime: {systemHealth.uptime}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Devices Online</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {systemHealth.onlineDevices}/{systemHealth.totalDevices}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((systemHealth.onlineDevices / systemHealth.totalDevices) * 100)}% online
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Automations </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemHealth.activeAutomations}</div>
              <p className="text-xs text-muted-foreground">Running Smoothly</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemHealth.recentAlerts}</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <SystemOverview systemHealth={systemHealth} />
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <DeviceMonitoring />
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <AutomationStatus />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceMetrics systemHealth={systemHealth} />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <AlertsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
