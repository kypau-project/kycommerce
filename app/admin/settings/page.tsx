import { requireAdmin } from "@/lib/admin-auth"
import { SettingsForm } from "@/components/admin/settings-form"

export const dynamic = "force-dynamic"

export default async function SettingsPage() {
  await requireAdmin()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage store settings and configuration</p>
      </div>

      <SettingsForm />
    </div>
  )
}
