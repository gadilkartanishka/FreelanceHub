import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { OverviewView } from "@/components/dashboard/overview-view"

type ClientRelation = { id?: string; name?: string | null; freelancer_id?: string } | null
type ProjectRelation = {
  id: string
  title?: string | null
  clients?: ClientRelation | ClientRelation[]
} | null
type PaymentRow = {
  id: string
  amount: number | string | null
  date_received: string | null
  status: "paid" | "pending" | "overdue"
  created_at: string
  projects?: ProjectRelation | ProjectRelation[]
}
type ProjectRow = {
  id: string
  title: string
  status: "pending" | "in_progress" | "in_review" | "completed"
  deadline: string
  created_at: string
  updated_at: string
  clients?: ClientRelation | ClientRelation[]
}

function startOfDay(date: Date) {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function formatRelativeDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return "Today"
  if (diffDays === 1) return "1d ago"
  if (diffDays < 7) return `${diffDays}d ago`

  const diffWeeks = Math.floor(diffDays / 7)
  if (diffWeeks === 1) return "1w ago"
  if (diffWeeks < 5) return `${diffWeeks}w ago`

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function roundGoal(value: number) {
  if (value <= 2500) return 2500
  return Math.ceil(value / 500) * 500
}

function getRelation<T>(value: T | T[] | null | undefined): T | null {
  if (Array.isArray(value)) return value[0] ?? null
  return value ?? null
}

export default async function OverviewPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return redirect("/login")

  const now = new Date()
  const currentMonthName = now.toLocaleString("en-US", { month: "short" })
  const today = startOfDay(now)
  const todayStr = now.toISOString().split("T")[0]
  const weekFromNow = new Date(now)
  weekFromNow.setDate(weekFromNow.getDate() + 7)

  const { data: paymentsData } = await supabase
    .from("payments")
    .select("id, amount, date_received, status, created_at, projects!inner(id, title, clients!inner(freelancer_id, name))")
    .eq("projects.clients.freelancer_id", user.id)

  const { data: projectsData } = await supabase
    .from("projects")
    .select("id, title, status, deadline, created_at, updated_at, clients!inner(id, freelancer_id, name)")
    .eq("clients.freelancer_id", user.id)

  const { data: clientsData } = await supabase
    .from("clients")
    .select("id, name")
    .eq("freelancer_id", user.id)
    .order("name", { ascending: true })

  const revenueByMonth = new Map<string, number>()
  const cashFlowByMonth = new Map<string, { month: string; paid: number; outstanding: number }>()

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthName = d.toLocaleString("en-US", { month: "short" })
    revenueByMonth.set(monthName, 0)
    cashFlowByMonth.set(monthName, { month: monthName, paid: 0, outstanding: 0 })
  }

  let revenueThisMonth = 0
  let pendingTotal = 0
  let unpaidInvoices = 0
  const paymentActivity: {
    id: string
    title: string
    subtitle: string
    timestamp: string
    kind: "payment" | "milestone"
    sortTime: number
  }[] = []

  for (const payment of (paymentsData || []) as PaymentRow[]) {
    const sourceDate = payment.date_received || payment.created_at
    if (!sourceDate) continue

    const d = new Date(`${sourceDate}${sourceDate.includes("T") ? "" : "T00:00:00"}`)
    const monthName = d.toLocaleString("en-US", { month: "short" })
    const amount = Number(payment.amount) || 0
    const relatedProject = getRelation(payment.projects)
    const relatedClient = getRelation(relatedProject?.clients)

    if (payment.status === "paid") {
      if (revenueByMonth.has(monthName)) {
        revenueByMonth.set(monthName, revenueByMonth.get(monthName)! + amount)
      }
      if (cashFlowByMonth.has(monthName)) {
        cashFlowByMonth.get(monthName)!.paid += amount
      }
      if (monthName === currentMonthName && d.getFullYear() === now.getFullYear()) {
        revenueThisMonth += amount
      }
    } else {
      unpaidInvoices += 1
      pendingTotal += amount
      if (cashFlowByMonth.has(monthName)) {
        cashFlowByMonth.get(monthName)!.outstanding += amount
      }
    }

    paymentActivity.push({
      id: `payment-${payment.id}`,
      title: payment.status === "paid" ? `Payment received: $${amount.toLocaleString()}` : `Invoice ${payment.status}`,
      subtitle: `${relatedProject?.title || "Project"} · ${relatedClient?.name || "Unknown client"}`,
      timestamp: formatRelativeDate(sourceDate),
      kind: payment.status === "paid" ? "payment" : "milestone",
      sortTime: d.getTime(),
    })
  }

  const revenueData = Array.from(revenueByMonth.entries()).map(([month, amount]) => ({ month, amount }))

  const distributionMap = {
    pending: { name: "Pending", value: 0, fill: "#64748B" },
    in_progress: { name: "In Progress", value: 0, fill: "#8F2D56" },
    in_review: { name: "In Review", value: 0, fill: "#D81159" },
    completed: { name: "Completed", value: 0, fill: "#FFBC42" },
  }

  let activeProjectsCount = 0
  let overdueProjectsCount = 0
  let dueThisWeek = 0
  let awaitingReview = 0
  const upcomingDeadlines: {
    id: string
    name: string
    clientName: string
    deadline: string
    status: "pending" | "in_progress" | "in_review" | "completed"
  }[] = []
  const attentionItems: {
    id: string
    title: string
    subtitle: string
    tone: "danger" | "warn" | "neutral"
    value: string
    priority: number
  }[] = []
  const projectActivity: {
    id: string
    title: string
    subtitle: string
    timestamp: string
    kind: "project" | "milestone"
    sortTime: number
  }[] = []

  for (const project of (projectsData || []) as ProjectRow[]) {
    const projectStatus = project.status as keyof typeof distributionMap
    const relatedClient = getRelation(project.clients)
    if (projectStatus in distributionMap) {
      distributionMap[projectStatus].value += 1
    }

    const deadlineDate = project.deadline ? new Date(`${project.deadline}T00:00:00`) : null
    const isActive = project.status !== "completed"
    const isOverdue = Boolean(deadlineDate && isActive && project.deadline < todayStr)

    if (isActive) {
      activeProjectsCount += 1
    }
    if (isOverdue) {
      overdueProjectsCount += 1
    }
    if (project.status === "in_review") {
      awaitingReview += 1
    }

    if (deadlineDate && isActive) {
      if (deadlineDate >= today && deadlineDate <= weekFromNow) {
        dueThisWeek += 1
      }

      upcomingDeadlines.push({
        id: project.id,
        name: project.title,
        clientName: relatedClient?.name ?? "Unknown",
        deadline: project.deadline,
        status: project.status as "pending" | "in_progress" | "in_review" | "completed",
      })

      const diffDays = Math.round((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      if (isOverdue) {
        attentionItems.push({
          id: `overdue-${project.id}`,
          title: project.title,
          subtitle: `Deadline passed for ${relatedClient?.name ?? "Unknown client"}`,
          tone: "danger",
          value: `${Math.abs(diffDays)}d overdue`,
          priority: 0,
        })
      } else if (diffDays <= 3) {
        attentionItems.push({
          id: `soon-${project.id}`,
          title: project.title,
          subtitle: `Due soon for ${relatedClient?.name ?? "Unknown client"}`,
          tone: "warn",
          value: diffDays === 0 ? "Today" : `${diffDays}d left`,
          priority: 1,
        })
      }
    }

    const activityDate = project.updated_at || project.created_at
    if (activityDate) {
      const activityTime = new Date(activityDate).getTime()
      projectActivity.push({
        id: `project-${project.id}`,
        title: project.status === "completed" ? `Project completed: ${project.title}` : `Project updated: ${project.title}`,
        subtitle: `${relatedClient?.name || "Unknown client"} · ${project.status.replace("_", " ")}`,
        timestamp: formatRelativeDate(activityDate),
        kind: project.status === "completed" ? "project" : "milestone",
        sortTime: activityTime,
      })
    }
  }

  if (pendingTotal > 0) {
    attentionItems.push({
      id: "payments-outstanding",
      title: "Outstanding invoices",
      subtitle: unpaidInvoices === 1 ? "1 invoice still awaiting payment" : `${unpaidInvoices} invoices still awaiting payment`,
      tone: unpaidInvoices > 2 ? "danger" : "neutral",
      value: `$${pendingTotal.toLocaleString()}`,
      priority: unpaidInvoices > 2 ? 1 : 2,
    })
  }

  const sortedDeadlines = upcomingDeadlines
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 5)

  const topAttentionItems = attentionItems
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 4)
    .map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      tone: item.tone,
      value: item.value,
    }))

  const recentRevenueAverage =
    revenueData.length > 0
      ? revenueData.reduce((sum, month) => sum + month.amount, 0) / revenueData.length
      : 0
  const monthlyGoal = roundGoal(Math.max(recentRevenueAverage * 1.15, revenueThisMonth, 2500))

  const metrics = {
    revenueThisMonth,
    activeProjects: activeProjectsCount,
    pendingPayments: pendingTotal,
    overdueProjects: overdueProjectsCount,
  }

  const clients = (clientsData || []).map((client) => ({
    id: client.id,
    name: client.name,
  }))

  return (
    <OverviewView
      metrics={metrics}
      revenueData={revenueData}
      upcomingDeadlines={sortedDeadlines}
      clients={clients}
      monthlyGoal={monthlyGoal}
      attentionItems={topAttentionItems}
      focusStats={{
        dueThisWeek,
        awaitingReview,
        unpaidInvoices,
      }}
    />
  )
}
