"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Search,
  Filter,
  Bell,
  BellOff,
  Trash2,
  Eye,
  Clock,
} from "lucide-react"

interface Alert {
  id: string
  type: "critical" | "warning" | "info" | "success"
  title: string
  message: string
  timestamp: string
  source: string
  isRead: boolean
  isResolved: boolean
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "critical",
      title: "Offline",
      message: "Bedroom Light has been offline for more than 2 hours",
      timestamp: "2 hours ago",
      source: "Device Monitor",
      isRead: false,
      isResolved: false,
    },
    {
      id: "2",
      type: "Warning",
      title: "High Memory Usage",
      message: "System memory usage has exceeded 80% threshold",
      timestamp: "15 minutes ago",
      source: "System Monitor",
      isRead: false,
      isResolved: false,
    },
    {
      id: "3",
      type: "Warning",
      title: "Automation Failed",
      message: "Morning Routine automation failed to execute completely",
      timestamp: "3 hours ago",
      source: "Automation Engine",
      isRead: true,
      isResolved: false,
    },
    {
      id: "4",
      type: "info",
      title: "Firmware Update Available",
      message: "Smart Lock firmware update v2.1.3 is available",
      timestamp: "1 day ago",
      source: "Update Manager",
      isRead: true,
      isResolved: false,
    },
    {
      id: "5",
      type: "Success",
      title: "Backup Completed",
      message: "Daily system backup completed successfully",
      timestamp: "1 day ago",
      source: "Backup Service",
      isRead: true,
      isResolved: true,
    },
    {
      id: "6",
      type: "critical",
      title: "Security Alert",
      message: "Multiple failed login attempts detected",
      timestamp: "2 days ago",
      source: "Security Monitor",
      isRead: true,
      isResolved: true,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "info":
        return <Info className="h-5 w-5 text-blue-600" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <Info className="h-5 w-5 text-gray-600" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const markAsRead = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, isRead: true } : alert)))
  }

  const markAsResolved = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, isResolved: true, isRead: true } : alert)))
  }

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.source.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || alert.type === filterType
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "unread" && !alert.isRead) ||
      (filterStatus === "unresolved" && !alert.isResolved) ||
      (filterStatus === "resolved" && alert.isResolved)

    return matchesSearch && matchesType && matchesStatus
  })

  const unreadCount = alerts.filter((alert) => !alert.isRead).length
  const unresolvedCount = alerts.filter((alert) => !alert.isResolved).length

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {alerts.filter((a) => a.type === "critical").length}
                </div>
                <div className="text-sm text-gray-600">Critical</div>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {alerts.filter((a) => a.type === "warning").length}
                </div>
                <div className="text-sm text-gray-600">Warnings</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
                <div className="text-sm text-gray-600">Unread</div>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{unresolvedCount}</div>
                <div className="text-sm text-gray-600">Unresolved</div>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="unresolved">Unresolved</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>System Alerts</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <BellOff className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Clear Resolved
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border transition-colors ${
                  !alert.isRead ? "bg-blue-50 border-blue-200" : "bg-white"
                } ${alert.isResolved ? "opacity-60" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-semibold ${!alert.isRead ? "text-blue-900" : ""}`}>{alert.title}</h3>
                        <Badge className={getAlertColor(alert.type)}>{alert.type}</Badge>
                        {alert.isResolved && <Badge variant="secondary">Resolved</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{alert.source}</span>
                        <span>•</span>
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {!alert.isRead && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(alert.id)} title="Mark as read">
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}

                    {!alert.isResolved && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsResolved(alert.id)}
                        title="Mark as resolved"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}

                    <Button variant="ghost" size="sm" onClick={() => deleteAlert(alert.id)} title="Delete alert">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredAlerts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No alerts match your current filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alert Activity</CardTitle>
          <CardDescription>Timeline of recent system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Critical alert generated</div>
                <div className="text-xs text-gray-500">Device offline detection triggered</div>
              </div>
              <div className="text-xs text-gray-500">2 hours ago</div>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Warning threshold exceeded</div>
                <div className="text-xs text-gray-500">Memory usage monitoring alert</div>
              </div>
              <div className="text-xs text-gray-500">15 minutes ago</div>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Alert resolved</div>
                <div className="text-xs text-gray-500">Security alert marked as resolved</div>
              </div>
              <div className="text-xs text-gray-500">1 hour ago</div>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">System notification</div>
                <div className="text-xs text-gray-500">Firmware update notification sent</div>
              </div>
              <div className="text-xs text-gray-500">1 day ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
