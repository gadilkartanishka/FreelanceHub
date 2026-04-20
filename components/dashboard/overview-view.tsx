"use client"

import { useState } from "react"
import { colors } from "@/lib/colors"
import { AlertTriangle, Clock3, Plus, TrendingDown, TrendingUp } from "lucide-react"
import { CreateProjectModal } from "@/components/dashboard/create-project-modal"
import { UpcomingDeadlines, type DeadlineProject } from "@/components/dashboard/upcoming-deadlines"
import {
  AreaChart,
  Area,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"

type Metrics = {
  revenueThisMonth: number
  activeProjects: number
  pendingPayments: number
  overdueProjects: number
}

type RevenueData = { month: string; amount: number }
type AttentionItem = {
  id: string
  title: string
  subtitle: string
  tone: "danger" | "warn" | "neutral"
  value: string
}
type FocusStats = {
  dueThisWeek: number
  awaitingReview: number
  unpaidInvoices: number
}

type RevenueTooltipProps = {
  active?: boolean
  label?: string
  payload?: Array<{ value: number | string }>
}

function formatMoney(amount: number) {
  return `$${amount.toLocaleString()}`
}

function RevenueTooltip({ active, payload, label }: RevenueTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        background: "#0F172A",
        borderRadius: 10,
        padding: "8px 12px",
        fontFamily: "system-ui, sans-serif",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.18)",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 10,
          color: "#94A3B8",
          marginBottom: 2,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </p>
      <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
        {formatMoney(Number(payload[0].value))}
      </p>
    </div>
  )
}

function GoalRing({
  revenueThisMonth,
  monthlyGoal,
  focusStats,
}: {
  revenueThisMonth: number
  monthlyGoal: number
  focusStats: FocusStats
}) {
  const achieved = Math.min(revenueThisMonth, monthlyGoal)
  const remaining = Math.max(monthlyGoal - revenueThisMonth, 0)
  const progress = monthlyGoal > 0 ? Math.min((revenueThisMonth / monthlyGoal) * 100, 100) : 0
  const ringData = [
    { name: "Achieved", value: Math.max(achieved, 0), fill: colors.rose },
    { name: "Remaining", value: Math.max(remaining, 0), fill: "#E2E8F0" },
  ]

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #F1F5F9",
        borderRadius: 10,
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        minHeight: 320,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: colors.navy }}>Monthly goal</p>
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: progress >= 100 ? "#166534" : "#92400E",
            background: progress >= 100 ? "#ECFDF5" : "#FFF7ED",
            border: `1px solid ${progress >= 100 ? "#BBF7D0" : "#FED7AA"}`,
            borderRadius: 999,
            padding: "4px 8px",
          }}
        >
          {Math.round(progress)}% reached
        </div>
      </div>

      <div style={{ height: 210, position: "relative" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ringData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius="68%"
              outerRadius="86%"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {ringData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
            width: "72%",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: colors.navy, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {formatMoney(revenueThisMonth)}
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: "#64748B" }}>
            of {formatMoney(monthlyGoal)}
          </div>
          <div style={{ marginTop: 12, fontSize: 11, fontWeight: 600, color: remaining === 0 ? "#166534" : "#C2410C" }}>
            {remaining === 0 ? "Goal hit" : `${formatMoney(remaining)} to go`}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: "auto" }}>
        <div style={{ borderRadius: 8, background: "#F8FAFC", padding: "10px 12px" }}>
          <div style={{ fontSize: 10, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Due</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: colors.navy, marginTop: 2 }}>{focusStats.dueThisWeek}</div>
        </div>
        <div style={{ borderRadius: 8, background: "#F8FAFC", padding: "10px 12px" }}>
          <div style={{ fontSize: 10, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Review</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: colors.navy, marginTop: 2 }}>{focusStats.awaitingReview}</div>
        </div>
        <div style={{ borderRadius: 8, background: "#F8FAFC", padding: "10px 12px" }}>
          <div style={{ fontSize: 10, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Unpaid</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: colors.navy, marginTop: 2 }}>{focusStats.unpaidInvoices}</div>
        </div>
      </div>
    </div>
  )
}

function AttentionPanel({ items }: { items: AttentionItem[] }) {
  const toneStyles = {
    danger: { bg: "#FEF2F2", border: "#FECACA", text: "#991B1B" },
    warn: { bg: "#FFF7ED", border: "#FED7AA", text: "#C2410C" },
    neutral: { bg: "#F8FAFC", border: "#E2E8F0", text: "#475569" },
  } as const

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #F1F5F9",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "14px 18px", borderBottom: "1px solid #F8FAFC" }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: colors.navy }}>Attention needed</p>
        <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94A3B8" }}>Only the most important items</p>
      </div>

      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        {items.length === 0 ? (
          <div style={{ padding: "18px 8px", textAlign: "center", fontSize: 12, color: "#94A3B8" }}>
            No urgent issues right now
          </div>
        ) : (
          items.map((item) => {
            const tone = toneStyles[item.tone]
            return (
              <div
                key={item.id}
                style={{
                  borderRadius: 10,
                  border: `1px solid ${tone.border}`,
                  background: tone.bg,
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    {item.tone === "danger" ? <AlertTriangle size={13} color={tone.text} /> : <Clock3 size={13} color={tone.text} />}
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: colors.navy }}>{item.title}</p>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 11, color: "#64748B", lineHeight: 1.45 }}>{item.subtitle}</p>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: tone.text, whiteSpace: "nowrap" }}>{item.value}</div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export function OverviewView({
  metrics,
  revenueData,
  upcomingDeadlines,
  clients,
  monthlyGoal,
  attentionItems,
  focusStats,
}: {
  metrics: Metrics
  revenueData: RevenueData[]
  upcomingDeadlines: DeadlineProject[]
  clients: { id: string; name: string }[]
  monthlyGoal: number
  attentionItems: AttentionItem[]
  focusStats: FocusStats
}) {
  const [showProjectModal, setShowProjectModal] = useState(false)

  const today = new Date()
  const dateStr = today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

  const lastTwo = revenueData.slice(-2)
  const prevAmt = lastTwo[0]?.amount ?? 0
  const thisAmt = lastTwo[1]?.amount ?? metrics.revenueThisMonth
  const revTrend = prevAmt > 0 ? Math.round(((thisAmt - prevAmt) / prevAmt) * 100) : null

  const METRICS = [
    {
      label: "Revenue this month",
      value: formatMoney(metrics.revenueThisMonth),
      sub: revTrend !== null ? `${revTrend >= 0 ? "+" : ""}${revTrend}% vs last month` : "Current month",
      subPositive: revTrend === null || revTrend >= 0,
      trending: revTrend !== null ? (revTrend >= 0 ? "up" : "down") : null,
      alert: false,
    },
    {
      label: "Active projects",
      value: String(metrics.activeProjects),
      sub: metrics.activeProjects > 0 ? `${metrics.activeProjects} in progress` : "None active",
      subPositive: true,
      trending: null,
      alert: false,
    },
    {
      label: "Pending payments",
      value: formatMoney(metrics.pendingPayments),
      sub: metrics.pendingPayments > 0 ? "Awaiting payment" : "All clear",
      subPositive: metrics.pendingPayments === 0,
      trending: null,
      alert: metrics.pendingPayments > 0,
    },
    {
      label: "Overdue tasks",
      value: String(metrics.overdueProjects),
      sub: metrics.overdueProjects > 0 ? "Needs attention" : "All on track",
      subPositive: metrics.overdueProjects === 0,
      trending: null,
      alert: metrics.overdueProjects > 0,
    },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", fontFamily: "system-ui, sans-serif" }}>
      <div
        style={{
          height: 52,
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #F1F5F9",
          background: "#fff",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: colors.navy, letterSpacing: "-0.01em" }}>Overview</span>
          <span style={{ fontSize: 12, color: "#CBD5E1" }}>·</span>
          <span style={{ fontSize: 12, color: "#94A3B8" }}>{dateStr}</span>
        </div>
        <button
          onClick={() => setShowProjectModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "6px 14px",
            background: colors.navy,
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            borderRadius: 4,
            border: "none",
          }}
        >
          <Plus size={11} strokeWidth={2.5} />
          New project
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "18px 24px 24px",
          background: "#F8FAFC",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10, flexShrink: 0 }}>
          {METRICS.map(({ label, value, sub, subPositive, trending, alert }) => (
            <div
              key={label}
              style={{
                background: "#fff",
                border: `1px solid ${alert ? "#FECACA" : "#F1F5F9"}`,
                borderRadius: 8,
                padding: "14px 16px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {alert && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#EF4444" }} />}
              <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 500, color: "#94A3B8", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</p>
              <p style={{ margin: "0 0 5px", fontSize: 22, fontWeight: 700, color: colors.navy, letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                {trending === "up" && <TrendingUp size={10} color="#16A34A" />}
                {trending === "down" && <TrendingDown size={10} color="#DC2626" />}
                <span style={{ fontSize: 11, color: subPositive ? "#16A34A" : "#DC2626" }}>{sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.8fr) minmax(320px, 0.95fr)", gap: 10, flexShrink: 0 }}>
          <div
            style={{
              background: "#fff",
              border: "1px solid #F1F5F9",
              borderRadius: 10,
              padding: "16px 18px 12px",
              display: "flex",
              flexDirection: "column",
              minHeight: 320,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexShrink: 0 }}>
              <div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: colors.navy }}>Revenue trend</p>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94A3B8" }}>Last 6 months</p>
              </div>
              {revTrend !== null && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "3px 8px",
                    background: revTrend >= 0 ? "#F0FDF4" : "#FEF2F2",
                    border: `1px solid ${revTrend >= 0 ? "#BBF7D0" : "#FECACA"}`,
                    borderRadius: 20,
                  }}
                >
                  {revTrend >= 0 ? <TrendingUp size={11} color="#16A34A" /> : <TrendingDown size={11} color="#DC2626" />}
                  <span style={{ fontSize: 11, fontWeight: 600, color: revTrend >= 0 ? "#16A34A" : "#DC2626" }}>
                    {revTrend >= 0 ? "+" : ""}
                    {revTrend}%
                  </span>
                </div>
              )}
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={colors.rose} stopOpacity={0.12} />
                      <stop offset="100%" stopColor={colors.rose} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "system-ui" }} dy={6} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "system-ui" }} tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} />
                  <RechartsTooltip content={<RevenueTooltip />} cursor={{ stroke: "#F1F5F9", strokeWidth: 1 }} />
                  <Area type="monotone" dataKey="amount" stroke={colors.rose} strokeWidth={1.75} fill="url(#revGrad)" dot={false} activeDot={{ r: 4, fill: colors.rose, strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <GoalRing revenueThisMonth={metrics.revenueThisMonth} monthlyGoal={monthlyGoal} focusStats={focusStats} />
        </div>

        <div style={{ flexShrink: 0 }}>
          <AttentionPanel items={attentionItems.slice(0, 3)} />
        </div>

        <div style={{ flexShrink: 0 }}>
          <UpcomingDeadlines projects={upcomingDeadlines} />
        </div>
      </div>

      <CreateProjectModal open={showProjectModal} onClose={() => setShowProjectModal(false)} clients={clients} />
    </div>
  )
}
