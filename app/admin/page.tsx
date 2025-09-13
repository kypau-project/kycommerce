import { requireAdmin } from "@/lib/admin-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const { supabase } = await requireAdmin()

  // Get dashboard statistics
  const [{ count: totalProducts }, { count: totalUsers }, { count: totalOrders }, { data: revenueData }] =
    await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("total_amount").eq("status", "delivered"),
    ])

  const totalRevenue = revenueData?.reduce((sum, order) => sum + order.total_amount, 0) || 0

  const stats = [
    {
      title: "Total Products",
      value: totalProducts || 0,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Total Users",
      value: totalUsers || 0,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Total Orders",
      value: totalOrders || 0,
      icon: ShoppingCart,
      color: "text-orange-600",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
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
          <RecentOrders />
        </CardContent>
      </Card>
    </div>
  )
}

async function RecentOrders() {
  const { supabase } = await requireAdmin()

  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      profiles(first_name, last_name, email)
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  if (!orders?.length) {
    return <p className="text-muted-foreground">No recent orders</p>
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-medium">
              {order.profiles?.first_name} {order.profiles?.last_name}
            </p>
            <p className="text-sm text-muted-foreground">{order.profiles?.email}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">${order.total_amount.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
