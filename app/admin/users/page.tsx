import { requireAdmin } from "@/lib/admin-auth"
import { UsersTable } from "@/components/admin/users-table"

export const dynamic = "force-dynamic"

export default async function UsersPage() {
  const { supabase } = await requireAdmin()

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching users:", error)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground">Manage user accounts and permissions ({profiles?.length || 0} users)</p>
      </div>

      <UsersTable users={profiles || []} />
    </div>
  )
}
