import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  // Fetch profile to get the full name
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single()

  const userData = {
    name: profile?.full_name || user.email?.split("@")[0] || "User",
    role: profile?.role || "Freelancer",
  }

  // Redirect clients away from freelancer dashboard
  if (userData.role === 'client') {
    return redirect("/portal")
  }

  return <DashboardShell user={userData}>{children}</DashboardShell>
}

