"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Lightbulb,
  Thermometer,
  Camera,
  Lock,
  Wifi,
  WifiOff,
  Search,
  MoreHorizontal,
  Power,
  Settings,
} from "lucide-react"

interface Device {
  id: string
  name: string
  type: "light" | "thermostat" | "camera" | "lock" | "sensor"
  room: string
  status: "online" | "offline" | "error"
  lastSeen: string
  battery?: number
  temperature?: number
  brightness?: number
  locked?: boolean
}

export function DeviceMonitoring() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: "Living Room Light",
      type: "light",
      room: "Living Room",
      status: "online",
      lastSeen: "2 minutes ago",
      brightness: 75,
    },
    {
      id: "2",
      name: "Main Thermostat",
      type: "thermostat",
      room: "Hallway",
      status: "online",
      lastSeen: "1 minute ago",
      temperature: 22,
    },
    {
      id: "3",
      name: "Front Door Camera",
      type: "camera",
      room: "Entrance",
      status: "online",
      lastSeen: "30 seconds ago",
    },
    {
      id: "4",
      name: "Bedroom Light",
      type: "light",
      room: "Bedroom",
      status: "offline",
      lastSeen: "2 hours ago",
      brightness: 0,
    },
    {
      id: "5",
      name: "Smart Lock",
      type: "lock",
      room: "Front Door",
      status: "online",
      lastSeen: "5 minutes ago",
      locked: true,
      battery: 85,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterRoom, setFilterRoom] = useState("all")

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "light":
        return Lightbulb
      case "thermostat":
        return Thermometer
      case "camera":
        return Camera
      case "lock":
        return Lock
      default:
        return Settings
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800"
      case "offline":
        return "bg-red-100 text-red-800"
      case "error":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.room.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || device.status === filterStatus
    const matchesRoom = filterRoom === "all" || device.room === filterRoom

    return matchesSearch && matchesStatus && matchesRoom
  })

  const rooms = [...new Set(devices.map((device) => device.room))]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Device Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search devices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRoom} onValueChange={setFilterRoom}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rooms</SelectItem>
                {rooms.map((room) => (
                  <SelectItem key={room} value={room}>
                    {room}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((device) => {
          const DeviceIcon = getDeviceIcon(device.type)

          return (
            <Card key={device.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <DeviceIcon className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{device.name}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  {device.status === "online" ? (
                    <Wifi className="h-4 w-4 text-green-600" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-600" />
                  )}
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Room:</span>
                  <span className="text-sm font-medium">{device.room}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge className={getStatusColor(device.status)}>{device.status}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Seen:</span>
                  <span className="text-sm">{device.lastSeen}</span>
                </div>

                {/* Device-specific information */}
                {device.temperature && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Temperature:</span>
                    <span className="text-sm font-medium">{device.temperature}°C</span>
                  </div>
                )}

                {device.brightness !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Brightness:</span>
                    <span className="text-sm font-medium">{device.brightness}%</span>
                  </div>
                )}

                {device.locked !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Lock Status:</span>
                    <Badge variant={device.locked ? "default" : "secondary"}>
                      {device.locked ? "Locked" : "Unlocked"}
                    </Badge>
                  </div>
                )}

                {device.battery && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Battery:</span>
                    <span className="text-sm font-medium">{device.battery}%</span>
                  </div>
                )}

                {/* Control buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Power className="h-3 w-3 mr-1" />
                    Control
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Settings className="h-3 w-3 mr-1" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {devices.filter((d) => d.status === "online").length}
              </div>
              <div className="text-sm text-gray-600">Online Devices</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {devices.filter((d) => d.status === "offline").length}
              </div>
              <div className="text-sm text-gray-600">Offline Devices</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{rooms.length}</div>
              <div className="text-sm text-gray-600">Total Rooms</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((devices.filter((d) => d.status === "online").length / devices.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Uptime Rate</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
