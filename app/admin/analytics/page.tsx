import { requireAdmin } from "@/lib/admin-auth"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"

export const dynamic = "force-dynamic"

export default async function AnalyticsPage() {
  const { supabase } = await requireAdmin()

  // Get analytics data
  const [{ count: totalOrders }, { count: totalUsers }, { count: totalProducts }, { data: recentOrders }] =
    await Promise.all([
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase
        .from("orders")
        .select(`
          *,
          profiles!orders_user_id_fkey(first_name, last_name, email)
        `)
        .order("created_at", { ascending: false })
        .limit(10),
    ])

  const analytics = {
    totalOrders: totalOrders || 0,
    totalUsers: totalUsers || 0,
    totalProducts: totalProducts || 0,
    recentOrders: recentOrders || [],
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">View store performance and statistics</p>
      </div>

      <AnalyticsDashboard analytics={analytics} />
    </div>
  )
}
