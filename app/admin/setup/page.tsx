"use client"

import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function AdminSetupPage() {
  const supabase = createServerClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Access Required</CardTitle>
          <CardDescription>You need admin privileges to access the admin panel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            <p>
              <strong>Current user:</strong> {user.email}
            </p>
            <p className="mt-2">To grant admin access, run this SQL command in your Supabase dashboard:</p>
            <div className="mt-2 p-3 bg-gray-100 rounded-md font-mono text-xs">
              UPDATE profiles SET is_admin = true WHERE email = '{user.email}';
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <a href="/">Back to Home</a>
            </Button>
            <Button asChild className="flex-1">
              <a href="/admin" onClick={() => window.location.reload()}>
                Try Again
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
