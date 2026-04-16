// app/dashboard/page.tsx — Server component fetching live data
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { OverviewView } from "@/components/dashboard/overview-view"

export default async function OverviewPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return redirect("/login")

  // Active projects (status != completed)
  const { data: activeProjectsData } = await supabase
    .from("projects")
    .select("id, title, deadline, status, agreed_value, client_id, clients(id, name)")
    .neq("status", "completed")
    .order("deadline", { ascending: true })

  // All projects for recent list (limit 5)
  const { data: recentProjects } = await supabase
    .from("projects")
    .select("id, title, deadline, status, agreed_value, client_id, clients(id, name)")
    .order("updated_at", { ascending: false })
    .limit(5)

  // Payments this month
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0]
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0]

  const { data: monthlyPaidPayments } = await supabase
    .from("payments")
    .select("amount")
    .eq("status", "paid")
    .gte("date_received", monthStart)
    .lte("date_received", monthEnd)

  // Pending payments total
  const { data: pendingPayments } = await supabase
    .from("payments")
    .select("amount")
    .eq("status", "pending")

  // Overdue projects
  const today = new Date().toISOString().split("T")[0]
  const overdueProjects =
    activeProjectsData?.filter(
      (p) => p.deadline && p.deadline < today && p.status !== "completed"
    ) ?? []

  // Recent payments with project/client info
  const { data: recentPayments } = await supabase
    .from("payments")
    .select("id, amount, date_received, status, notes, project_id, projects(id, title, client_id, clients(id, name))")
    .order("date_received", { ascending: false })
    .limit(5)

  // All projects for the payment progress calculation
  const { data: allPayments } = await supabase
    .from("payments")
    .select("project_id, amount, status")

  // Compute per-project payment progress for recent projects
  const paymentsByProject = new Map<string, number>()
  allPayments?.forEach((p) => {
    if (p.status === "paid") {
      paymentsByProject.set(
        p.project_id,
        (paymentsByProject.get(p.project_id) || 0) + Number(p.amount)
      )
    }
  })

  // Clients for the create project modal
  const { data: clients } = await supabase
    .from("clients")
    .select("id, name")
    .eq("status", "active")
    .order("name")

  const revenueThisMonth =
    monthlyPaidPayments?.reduce((sum, p) => sum + Number(p.amount), 0) ?? 0
  const pendingTotal =
    pendingPayments?.reduce((sum, p) => sum + Number(p.amount), 0) ?? 0

  // Build projects for display
  const displayProjects = (recentProjects ?? [])
    .filter((p) => p.status !== "completed")
    .slice(0, 4)
    .map((p) => {
      const client = p.clients as unknown as { id: string; name: string } | null
      const paid = paymentsByProject.get(p.id) || 0
      const value = Number(p.agreed_value)
      const progress = value > 0 ? Math.round((paid / value) * 100) : 0
      const isOverdue =
        p.deadline < today && p.status !== "completed"
      return {
        name: p.title,
        client: client?.name ?? "—",
        status: p.status as "pending" | "in_progress" | "in_review" | "completed",
        progress,
        deadline: formatDate(p.deadline),
        value: `$${value.toLocaleString()}`,
        overdue: isOverdue,
      }
    })

  // Build payments for display
  const displayPayments = (recentPayments ?? []).slice(0, 4).map((p) => {
    const project = p.projects as unknown as {
      id: string
      title: string
      clients: { id: string; name: string } | null
    } | null
    return {
      client: project?.clients?.name ?? "—",
      project: project?.title ?? "—",
      amount: `$${Number(p.amount).toLocaleString()}`,
      date: formatDate(p.date_received),
      status: p.status as "paid" | "pending" | "overdue",
    }
  })

  const metrics = {
    revenueThisMonth,
    activeProjects: activeProjectsData?.length ?? 0,
    pendingPayments: pendingTotal,
    overdueProjects: overdueProjects.length,
  }

  return (
    <OverviewView
      metrics={metrics}
      projects={displayProjects}
      payments={displayPayments}
      clients={clients ?? []}
    />
  )
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—"
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
