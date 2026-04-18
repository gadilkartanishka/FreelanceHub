"use client"

import { useState, useTransition } from "react"
import { colors } from "@/lib/colors"
import { createPaymentAction } from "@/app/dashboard/payments/actions"
import type { Project } from "@/lib/types"

const BORDER = "1px solid #E8E4E0"

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: "#4A4E69",
  fontFamily: "system-ui, sans-serif",
  marginBottom: 4,
  display: "block",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  fontSize: 12.5,
  border: "1px solid #F0EDE9",
  borderRadius: 3,
  background: "#FAFAFA",
  color: colors.navy,
  fontFamily: "system-ui, sans-serif",
  outline: "none",
  boxSizing: "border-box",
}

export function SimplePaymentForm({
  projects,
}: {
  projects: Pick<Project, "id" | "title">[]
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = (formData: FormData) => {
    setError(null)
    setSuccess(false)
    startTransition(async () => {
      const result = await createPaymentAction(formData)
      if (result && "error" in result && result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        const form = document.getElementById("simple-payment-form") as HTMLFormElement
        if (form) form.reset()
      }
    })
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 20px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: colors.navy,
            fontFamily: "system-ui, sans-serif",
            margin: "0 0 8px 0",
          }}
        >
          Add a Payment
        </h1>
        <p style={{ color: "#9A8C98", fontSize: 14, margin: 0 }}>
          Record a payment received for one of your active projects.
        </p>
      </div>

      <div style={{ background: "#fff", border: BORDER, borderRadius: 8, padding: 32 }}>
        {error && (
          <div
            style={{
              padding: "12px",
              borderRadius: 4,
              background: "#FEF2F2",
              color: "#991B1B",
              fontSize: 13,
              marginBottom: 24,
              border: "1px solid #FEE2E2",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              padding: "12px",
              borderRadius: 4,
              background: "#ECFDF5",
              color: "#065F46",
              fontSize: 13,
              marginBottom: 24,
              border: "1px solid #D1FAE5",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Payment logged successfully!
          </div>
        )}

        <form id="simple-payment-form" action={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Project */}
            <div>
              <label style={labelStyle}>
                Project <span style={{ color: "#991B1B" }}>*</span>
              </label>
              <select
                name="project_id"
                required
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="">Select a project…</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount & Date */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={labelStyle}>
                  Amount ($) <span style={{ color: "#991B1B" }}>*</span>
                </label>
                <input
                  name="amount"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>
                  Date Received <span style={{ color: "#991B1B" }}>*</span>
                </label>
                <input
                  name="date_received"
                  type="date"
                  required
                  defaultValue={new Date().toISOString().split("T")[0]}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Method & Status */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={labelStyle}>Payment Method</label>
                <input name="method" placeholder="e.g. Bank transfer, UPI" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select
                  name="status"
                  defaultValue="paid"
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label style={labelStyle}>Notes</label>
              <textarea
                name="notes"
                placeholder="e.g. Advance for phase 1"
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
            
            {/* Proof disabled as per request */}
          </div>

          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: BORDER,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="submit"
              disabled={isPending}
              style={{
                padding: "10px 24px",
                fontSize: 13,
                fontWeight: 500,
                border: "none",
                background: colors.navy,
                color: "#fff",
                borderRadius: 4,
                cursor: isPending ? "not-allowed" : "pointer",
                fontFamily: "system-ui, sans-serif",
                opacity: isPending ? 0.7 : 1,
              }}
            >
              {isPending ? "Saving…" : "Log Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
