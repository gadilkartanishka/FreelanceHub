"use client"

import { useState, useTransition } from "react"
import { X } from "lucide-react"
import { colors } from "@/lib/colors"
import { updateClientAction } from "@/app/dashboard/clients/actions"
import type { Client } from "@/lib/types"

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

export function EditClientModal({
  open,
  onClose,
  client,
}: {
  open: boolean
  onClose: () => void
  client: Client | null
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  if (!open || !client) return null

  const handleSubmit = (formData: FormData) => {
    setError(null)
    startTransition(async () => {
      // Append ID manually to the form data
      formData.append("id", client.id)
      const result = await updateClientAction(formData)
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
        {/* Header */}
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
            Edit Client
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
            {/* Name */}
            <div>
              <label style={labelStyle}>
                Full Name <span style={{ color: "#991B1B" }}>*</span>
              </label>
              <input
                name="name"
                required
                defaultValue={client.name}
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>
                Email Address <span style={{ color: "#991B1B" }}>*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                defaultValue={client.email}
                style={inputStyle}
              />
            </div>

            {/* Phone & Company */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>Phone</label>
                <input
                  name="phone"
                  defaultValue={client.phone || ""}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Company</label>
                <input
                  name="company"
                  defaultValue={client.company || ""}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label style={labelStyle}>Tags (comma-separated)</label>
              <input
                name="tags"
                defaultValue={client.tags?.join(", ") || ""}
                placeholder="design, branding, dev"
                style={inputStyle}
              />
            </div>

            {/* Status */}
            <div>
              <label style={labelStyle}>Status</label>
              <select
                name="status"
                defaultValue={client.status}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label style={labelStyle}>Internal Notes</label>
              <textarea
                name="notes"
                defaultValue={client.notes || ""}
                rows={3}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: 70,
                }}
              />
            </div>
          </div>

          {/* Actions */}
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
