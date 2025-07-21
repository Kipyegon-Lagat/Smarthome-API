"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Activity, Cpu, Database, HardDrive, MemoryStick, Network, Clock, TrendingUp, TrendingDown } from "lucide-react"

interface SystemHealth {
  systemLoad: number
  memoryUsage: number
  diskUsage: number
}

interface PerformanceMetricsProps {
  systemHealth: SystemHealth
}

interface MetricData {
  timestamp: string
  value: number
}

export function PerformanceMetrics({ systemHealth }: PerformanceMetricsProps) {
  const [cpuHistory, setCpuHistory] = useState<MetricData[]>([])
  const [memoryHistory, setMemoryHistory] = useState<MetricData[]>([])
  const [networkStats, setNetworkStats] = useState({
    inbound: 2.4,
    outbound: 1.8,
    latency: 12,
    connections: 127,
  })

  const [databaseStats, setDatabaseStats] = useState({
    connections: 15,
    queries: 1247,
    avgResponseTime: 45,
    cacheHitRate: 94.2,
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString()

      setCpuHistory((prev) => [...prev.slice(-19), { timestamp: now, value: systemHealth.systemLoad }])

      setMemoryHistory((prev) => [...prev.slice(-19), { timestamp: now, value: systemHealth.memoryUsage }])

      setNetworkStats((prev) => ({
        ...prev,
        inbound: Math.max(0.5, Math.min(5, prev.inbound + (Math.random() - 0.5) * 0.5)),
        outbound: Math.max(0.3, Math.min(3, prev.outbound + (Math.random() - 0.5) * 0.3)),
        latency: Math.max(5, Math.min(50, prev.latency + (Math.random() - 0.5) * 5)),
        connections: Math.max(50, Math.min(200, prev.connections + Math.floor((Math.random() - 0.5) * 10))),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [systemHealth])

  const performanceAlerts = [
    {
      type: "warning",
      message: "Memory usage above 65%",
      timestamp: "2 minutes ago",
      severity: "medium",
    },
    {
      type: "info",
      message: "Database query optimization completed",
      timestamp: "15 minutes ago",
      severity: "low",
    },
    {
      type: "success",
      message: "System backup completed successfully",
      timestamp: "1 hour ago",
      severity: "low",
    },
  ]

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "success":
        return "bg-green-100 text-green-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">cpu usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.systemLoad}%</div>
            <Progress value={systemHealth.systemLoad} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {systemHealth.systemLoad > 70 ? (
                <span className="text-red-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  High usage
                </span>
              ) : (
                <span className="text-green-600 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Normal
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <MemoryStick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.memoryUsage}%</div>
            <Progress value={systemHealth.memoryUsage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">8.2 GB / 12 GB used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.diskUsage}%</div>
            <Progress value={systemHealth.diskUsage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">170 GB / 500 GB used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45ms</div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">-12ms from yesterday</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Network Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="h-5 w-5" />
            <span>Network Statistics</span>
          </CardTitle>
          <CardDescription>Real-time network performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Inbound Traffic</span>
                <span className="text-sm font-bold">{networkStats.inbound.toFixed(1)} MB/s</span>
              </div>
              <Progress value={(networkStats.inbound / 5) * 100} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Outbound Traffic</span>
                <span className="text-sm font-bold">{networkStats.outbound.toFixed(1)} MB/s</span>
              </div>
              <Progress value={(networkStats.outbound / 3) * 100} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Latency</span>
                <span className="text-sm font-bold">{networkStats.latency}ms</span>
              </div>
              <Progress value={(networkStats.latency / 50) * 100} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Connections</span>
                <span className="text-sm font-bold">{networkStats.connections}</span>
              </div>
              <Progress value={(networkStats.connections / 200) * 100} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Database Performance</span>
          </CardTitle>
          <CardDescription>PostgreSQL database metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{databaseStats.connections}</div>
              <div className="text-sm text-gray-600">Active Connections</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{databaseStats.queries.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Queries Today</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{databaseStats.avgResponseTime}ms</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{databaseStats.cacheHitRate}%</div>
              <div className="text-sm text-gray-600">Cache Hit Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Performance Alerts</span>
          </CardTitle>
          <CardDescription>Recent system performance notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {performanceAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <Badge className={getAlertColor(alert.type)}>{alert.type}</Badge>
                  <span className="text-sm">{alert.message}</span>
                </div>
                <span className="text-xs text-gray-500">{alert.timestamp}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Resources Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Resource Usage Timeline</span>
          </CardTitle>
          <CardDescription>Historical performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">CPU Usage History</span>
                <span className="text-sm text-gray-500">Last 20 readings</span>
              </div>
              <div className="flex items-end space-x-1 h-20">
                {cpuHistory.map((data, index) => (
                  <div
                    key={index}
                    className="bg-blue-500 rounded-t"
                    style={{
                      height: `${(data.value / 100) * 80}px`,
                      width: "12px",
                    }}
                    title={`${data.timestamp}: ${data.value}%`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Memory Usage History</span>
                <span className="text-sm text-gray-500">Last 20 readings</span>
              </div>
              <div className="flex items-end space-x-1 h-20">
                {memoryHistory.map((data, index) => (
                  <div
                    key={index}
                    className="bg-green-500 rounded-t"
                    style={{
                      height: `${(data.value / 100) * 80}px`,
                      width: "12px",
                    }}
                    title={`${data.timestamp}: ${data.value}%`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
