"use client"

import { useState, useTransition } from "react"
import { X } from "lucide-react"
import { colors } from "@/lib/colors"
import { updatePaymentAction } from "@/app/dashboard/payments/actions"
import { type PaymentDisplay } from "@/components/dashboard/payments-view"

const BORDER = "1px solid #E2E8F0"

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: "#334155",
  fontFamily: "system-ui, sans-serif",
  marginBottom: 4,
  display: "block",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  fontSize: 12.5,
  border: "1px solid #E2E8F0",
  borderRadius: 3,
  background: "#F8FAFC",
  color: colors.navy,
  fontFamily: "system-ui, sans-serif",
  outline: "none",
  boxSizing: "border-box",
}

export function EditPaymentModal({
  open,
  onClose,
  payment,
}: {
  open: boolean
  onClose: () => void
  payment: PaymentDisplay | null
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  if (!open || !payment) return null

  const handleSubmit = (formData: FormData) => {
    setError(null)
    startTransition(async () => {
      formData.append("id", payment.id)
      const result = await updatePaymentAction(formData)
      if (result && "error" in result && result.error) {
        setError(result.error)
      } else {
        onClose()
      }
    })
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(34,34,59,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        style={{
          background: "#fff",
          border: BORDER,
          width: 460,
          maxHeight: "85vh",
          overflowY: "auto",
          padding: "28px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: colors.navy,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Edit Payment
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#64748B",
              padding: 4,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: "8px 12px",
              borderRadius: 3,
              background: "#FEF2F2",
              color: "#991B1B",
              fontSize: 12,
              marginBottom: 16,
              border: "1px solid #FEE2E2",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {error}
          </div>
        )}

        <form action={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
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
                  defaultValue={payment.amount}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>
                  Date Received <span style={{ color: "#991B1B" }}>*</span>
                </label>
                <input name="date_received" type="date" required defaultValue={payment.date} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>Payment Method</label>
                <input name="method" defaultValue={payment.method} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select name="status" defaultValue={payment.status} style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Notes</label>
              <textarea
                name="notes"
                defaultValue={payment.notes}
                rows={2}
                style={{ ...inputStyle, resize: "vertical", minHeight: 52 }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 24,
              paddingTop: 16,
              borderTop: "1px solid #E2E8F0",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "7px 16px",
                fontSize: 12,
                border: BORDER,
                background: "#fff",
                color: colors.indigo,
                borderRadius: 3,
                cursor: "pointer",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              style={{
                padding: "7px 16px",
                fontSize: 12,
                border: "none",
                background: colors.navy,
                color: "#fff",
                borderRadius: 3,
                cursor: isPending ? "not-allowed" : "pointer",
                fontFamily: "system-ui, sans-serif",
                opacity: isPending ? 0.7 : 1,
              }}
            >
              {isPending ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
