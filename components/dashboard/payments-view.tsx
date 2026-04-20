"use client"

import { useState } from "react"
import { Plus, Search, Pencil, Trash2 } from "lucide-react"
import { colors } from "@/lib/colors"
import { useRouter, useSearchParams } from "next/navigation"
import { LogPaymentModal } from "./log-payment-modal"
import { EditPaymentModal } from "./edit-payment-modal"
import type { Project } from "@/lib/types"
import { deletePaymentAction } from "@/app/dashboard/payments/actions"

const BORDER = "1px solid #E2E8F0"
const BORDER_LIGHT = "1px solid #F1F5F9"

type Status = "paid" | "pending" | "overdue"

export type PaymentDisplay = {
  id: string
  client: string
  project: string
  amount: number
  date: string
  status: Status
  method: string
  notes: string
  proofUrl: string
}

const STATUS_STYLE: Record<
  Status,
  { bg: string; color: string; label: string }
> = {
  paid: { bg: "#ECFDF5", color: "#065F46", label: "Paid" },
  pending: { bg: "#F1F5F9", color: "#64748B", label: "Pending" },
  overdue: { bg: "#FEF2F2", color: "#991B1B", label: "Overdue" },
}

const FILTERS: { label: string; value: Status | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
  { label: "Overdue", value: "overdue" },
]

function Pill({ status }: { status: Status }) {
  const s = STATUS_STYLE[status]
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 10,
        fontWeight: 500,
        padding: "2px 8px",
        borderRadius: 2,
        background: s.bg,
        color: s.color,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {s.label}
    </span>
  )
}

export function PaymentsView({
  initialPayments,
  projects,
}: {
  initialPayments: PaymentDisplay[]
  projects: Pick<Project, "id" | "title">[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paymentParam = searchParams.get("id")

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<Status | "all">("all")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showLogModal, setShowLogModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const selected =
    initialPayments.find((p) => p.id === selectedId) ||
    (paymentParam ? initialPayments.find((p) => p.id === paymentParam) : null) ||
    initialPayments[0] ||
    null

  const filtered = initialPayments.filter((p) => {
    const matchesSearch =
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.project.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" ? true : p.status === filter
    return matchesSearch && matchesFilter
  })

  const handleDelete = async () => {
    if (!selected || isDeleting) return
    const confirmed = window.confirm(`Delete payment of $${selected.amount.toLocaleString()} for "${selected.project}"?`)
    if (!confirmed) return

    setIsDeleting(true)
    const result = await deletePaymentAction(selected.id)
    setIsDeleting(false)

    if (result && "error" in result && result.error) {
      window.alert(result.error)
      return
    }

    router.refresh()
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",
      }}
    >
      {/* Topbar */}
      <div
        style={{
          height: 52,
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: BORDER,
          background: "#fff",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: colors.navy,
            letterSpacing: "-0.01em",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Payments
        </span>
        <button
          onClick={() => setShowLogModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "6px 14px",
            background: colors.navy,
            color: "#fff",
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "system-ui, sans-serif",
            borderRadius: 3,
            border: "none",
          }}
        >
          <Plus size={11} strokeWidth={2.5} />
          Log payment
        </button>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left — payment list */}
        <div
          style={{
            width: 300,
            minWidth: 300,
            borderRight: BORDER,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            background: "#fff",
          }}
        >
          {/* Search */}
          <div style={{ padding: "12px 16px", borderBottom: BORDER_LIGHT }}>
            <div style={{ position: "relative" }}>
              <Search
                size={13}
                style={{
                  position: "absolute",
                  left: 9,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#64748B",
                }}
              />
              <input
                placeholder="Search clients or projects…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px 10px 6px 28px",
                  fontSize: 12,
                  border: "1px solid #E2E8F0",
                  borderRadius: 3,
                  background: "#F8FAFC",
                  color: colors.navy,
                  fontFamily: "system-ui, sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Filter tabs */}
          <div
            style={{
              display: "flex",
              borderBottom: BORDER,
              padding: "0 16px",
              gap: 2,
              overflowX: "auto",
            }}
          >
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                style={{
                  padding: "8px 10px",
                  fontSize: 11,
                  fontFamily: "system-ui, sans-serif",
                  background: "none",
                  border: "none",
                  borderBottom:
                    filter === f.value
                      ? `2px solid ${f.value === "overdue" ? "#991B1B" : colors.navy}`
                      : "2px solid transparent",
                  color:
                    filter === f.value
                      ? f.value === "overdue"
                        ? "#991B1B"
                        : colors.navy
                      : "#64748B",
                  cursor: "pointer",
                  fontWeight: filter === f.value ? 500 : 400,
                  marginBottom: -1,
                  whiteSpace: "nowrap",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* List */}
          <div style={{ overflowY: "auto", flex: 1 }}>
            {filtered.length === 0 ? (
              <p
                style={{
                  padding: "20px 16px",
                  fontSize: 12,
                  color: "#64748B",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                No payments found.
              </p>
            ) : (
              filtered.map((payment) => {
                const isSelected = selected?.id === payment.id
                return (
                  <div
                    key={payment.id}
                    onClick={() => setSelectedId(payment.id)}
                    style={{
                      padding: "12px 16px",
                      borderBottom: BORDER_LIGHT,
                      cursor: "pointer",
                      background: isSelected
                        ? "#F1F5F9"
                        : payment.status === "overdue"
                          ? "#FFFBFB"
                          : "transparent",
                      borderLeft: isSelected
                        ? `2px solid ${colors.rose}`
                        : payment.status === "overdue"
                          ? "2px solid #991B1B"
                          : "2px solid transparent",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.background = "#F8FAFC"
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.background =
                          payment.status === "overdue" ? "#FFFBFB" : "transparent"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 3,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12.5,
                          fontWeight: 500,
                          color: colors.navy,
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        ${payment.amount.toLocaleString()}
                      </span>
                      <Pill status={payment.status} />
                    </div>
                    <p
                      style={{
                        fontSize: 11,
                        color: "#64748B",
                        fontFamily: "system-ui, sans-serif",
                        marginBottom: 6,
                        marginTop: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {payment.project}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          color: "#64748B",
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        {payment.client}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: payment.status === "overdue" ? "#991B1B" : "#64748B",
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        {payment.date}
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right — payment detail */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "28px 32px",
            background: "#F8FAFC",
          }}
        >
          {selected ? (
            <>
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: 28,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 4,
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 24,
                        fontWeight: 600,
                        color: colors.navy,
                        letterSpacing: "-0.02em",
                        fontFamily: "system-ui, sans-serif",
                        margin: 0,
                      }}
                    >
                      ${selected.amount.toLocaleString()}
                    </h2>
                    <Pill status={selected.status} />
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#64748B",
                      fontFamily: "system-ui, sans-serif",
                      margin: "4px 0 0 0",
                    }}
                  >
                    Recorded on {selected.date}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setShowEditModal(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "6px 14px",
                      background: "#fff",
                      color: colors.navy,
                      fontSize: 12,
                      cursor: "pointer",
                      fontFamily: "system-ui, sans-serif",
                      borderRadius: 3,
                      border: BORDER,
                    }}
                  >
                    <Pencil size={11} />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "6px 14px",
                      background: "#fff",
                      color: "#991B1B",
                      fontSize: 12,
                      cursor: isDeleting ? "not-allowed" : "pointer",
                      fontFamily: "system-ui, sans-serif",
                      borderRadius: 3,
                      border: "1px solid #FECACA",
                      opacity: isDeleting ? 0.7 : 1,
                    }}
                  >
                    <Trash2 size={11} />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>

              {/* Stats strip */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  border: BORDER,
                  borderRight: "none",
                  background: "#fff",
                  marginBottom: 24,
                }}
              >
                {[
                  { label: "Client", value: selected.client },
                  { label: "Project", value: selected.project },
                  { label: "Method", value: selected.method || "—" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{ padding: "16px 20px", borderRight: BORDER }}
                  >
                    <p
                      style={{
                        fontSize: 11,
                        color: "#64748B",
                        marginBottom: 6,
                        marginTop: 0,
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: colors.navy,
                        letterSpacing: "-0.01em",
                        fontFamily: "system-ui, sans-serif",
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div
                style={{
                  background: "#fff",
                  border: BORDER,
                  padding: "20px",
                  marginBottom: 24,
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: colors.rose,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    fontFamily: "system-ui, sans-serif",
                    margin: "0 0 14px 0",
                  }}
                >
                  Payment Notes
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: colors.indigo,
                    fontFamily: "system-ui, sans-serif",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {selected.notes || "No notes provided for this payment."}
                </p>
              </div>

            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#64748B",
                fontSize: 13,
              }}
            >
              Select a payment to view details
            </div>
          )}
        </div>
      </div>

      <LogPaymentModal
        open={showLogModal}
        onClose={() => setShowLogModal(false)}
        projects={projects}
        // You can optionally pass defaultProjectId={...} here if filtering by a project
      />
      <EditPaymentModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        payment={selected}
      />
    </div>
  )
}
