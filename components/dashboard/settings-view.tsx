"use client"

import { useState, useTransition } from "react"
import { colors } from "@/lib/colors"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Bell, ChevronRight, CheckCircle2 } from "lucide-react"
import { updateProfileAction } from "@/app/dashboard/settings/actions"

const BORDER = "1px solid #E8E4E0"

const TABS = [
  { id: "profile", label: "Profile", Icon: User },
  { id: "notifications", label: "Notifications", Icon: Bell },
]

interface Profile {
  full_name: string | null
  email: string | null
  phone: string | null
  bio: string | null
  role: string
}

export function SettingsView({ profile }: { profile: Profile }) {
  const [activeTab, setActiveTab] = useState("profile")
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = (formData: FormData) => {
    setMessage(null)
    startTransition(async () => {
      const res = await updateProfileAction(formData)
      if (res?.error) {
        setMessage({ type: 'error', text: res.error })
      } else {
        setMessage({ type: 'success', text: "Profile updated successfully!" })
      }
    })
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <div
        style={{
          height: 52,
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          borderBottom: BORDER,
          background: "#fff",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: colors.navy, fontFamily: "system-ui, sans-serif" }}>Settings</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex" }}>
        <div style={{ width: 240, padding: "24px 12px", borderRight: BORDER, flexShrink: 0 }}>
          {TABS.map(({ id, label, Icon }) => {
            const active = activeTab === id
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: 4,
                  background: active ? "#F5F2EF" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: active ? colors.navy : "#9A8C98",
                  fontSize: 13,
                  fontWeight: active ? 500 : 400,
                  transition: "all 0.1s",
                  fontFamily: "system-ui, sans-serif",
                  marginBottom: 2,
                }}
              >
                <Icon size={16} />
                <span style={{ flex: 1, textAlign: "left" }}>{label}</span>
                {active && <ChevronRight size={14} />}
              </button>
            )
          })}
        </div>

        <div style={{ flex: 1, padding: "40px 60px", maxWidth: 800 }}>
          {message && (
            <div style={{ 
              marginBottom: 24, 
              padding: '12px 16px', 
              borderRadius: 6, 
              background: message.type === 'success' ? '#ECFDF5' : '#FEF2F2',
              color: message.type === 'success' ? '#065F46' : '#991B1B',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              border: `1px solid ${message.type === 'success' ? '#D1FAE5' : '#FEE2E2'}`
            }}>
              {message.type === 'success' && <CheckCircle2 size={16} />}
              {message.text}
            </div>
          )}

          {activeTab === "profile" && (
            <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <section>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.navy, marginBottom: 4 }}>Personal Information</h3>
                <p style={{ fontSize: 13, color: "#9A8C98", marginBottom: 24 }}>Update your profile details and your bio.</p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-[#4A4E69]">Full Name</Label>
                      <Input name="full_name" defaultValue={profile.full_name || ""} className="border-[#F0EDE9] bg-[#FAFAFA]" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-[#4A4E69]">Email Address (View-only)</Label>
                      <Input disabled value={profile.email || ""} className="border-[#F0EDE9] bg-[#F5F2EF] opacity-70" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-[#4A4E69]">Phone Number</Label>
                    <Input name="phone" defaultValue={profile.phone || ""} placeholder="+1 (555) 000-0000" className="border-[#F0EDE9] bg-[#FAFAFA]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-[#4A4E69]">Bio</Label>
                    <textarea 
                      name="bio"
                      defaultValue={profile.bio || ""}
                      placeholder="Tell us about yourself..." 
                      style={{ width: "100%", minHeight: 100, padding: "10px 12px", borderRadius: 6, border: "1px solid #F0EDE9", background: "#FAFAFA", fontSize: 14, outline: "none", fontFamily: "system-ui, sans-serif", resize: "vertical" }}
                    />
                  </div>
                </div>
              </section>

              <Separator className="bg-[#F0EDE9]" />

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <Button type="submit" disabled={isPending} className="bg-[#22223B] text-white">
                  {isPending ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </form>
          )}

          {activeTab === "notifications" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <section>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.navy, marginBottom: 4 }}>Notifications</h3>
                <p style={{ fontSize: 13, color: "#9A8C98", marginBottom: 24 }}>These settings are currently read-only in the MVP.</p>
                {/* Notification toggles... */}
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
