import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function requireAdmin() {
  const supabase = createServerClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.log("[v0] No user found, redirecting to login")
      redirect("/auth/login")
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single()

    if (profileError) {
      console.log("[v0] Profile error:", profileError)
      const { error: insertError } = await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        first_name: user.user_metadata?.first_name || "",
        last_name: user.user_metadata?.last_name || "",
        is_admin: false, // Default to false, can be updated manually
      })

      if (insertError) {
        console.log("[v0] Insert profile error:", insertError)
      }

      redirect("/admin/setup")
    }

    if (!profile?.is_admin) {
      console.log("[v0] User is not admin, current user:", user.email)
      redirect("/admin/setup")
    }

    return { user, supabase }
  } catch (error) {
    console.log("[v0] Admin auth error:", error)
    redirect("/auth/login")
  }
}
