"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Users, Package, TrendingUp } from "lucide-react"

interface AnalyticsProps {
  analytics: {
    totalOrders: number
    totalUsers: number
    totalProducts: number
    recentOrders: any[]
  }
}

export function AnalyticsDashboard({ analytics }: AnalyticsProps) {
  const stats = [
    {
      title: "Total Orders",
      value: analytics.totalOrders,
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Total Users",
      value: analytics.totalUsers,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Total Products",
      value: analytics.totalProducts,
      icon: Package,
      color: "text-purple-600",
    },
    {
      title: "Growth",
      value: "+12%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.recentOrders.length > 0 ? (
              analytics.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      {order.profiles?.first_name && order.profiles?.last_name
                        ? `${order.profiles.first_name} ${order.profiles.last_name}`
                        : "Guest"}
                    </p>
                    <p className="text-sm text-muted-foreground">{order.profiles?.email || "No email"}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Rp {order.total_amount.toLocaleString()}</p>
                    <Badge variant={order.status === "delivered" ? "default" : "secondary"}>{order.status}</Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No recent orders found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
