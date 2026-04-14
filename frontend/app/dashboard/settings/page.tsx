"use client"

import { useState } from "react"
import { colors } from "@/lib/colors"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Bell, ChevronRight } from "lucide-react"

const BORDER = "1px solid #E8E4E0"

const TABS = [
  { id: "profile", label: "Profile", Icon: User },
  { id: "notifications", label: "Notifications", Icon: Bell },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

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
      {/* Topbar */}
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
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: colors.navy,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Settings
        </span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex" }}>
        {/* Settings Nav */}
        <div
          style={{
            width: 240,
            padding: "24px 12px",
            borderRight: BORDER,
            flexShrink: 0,
          }}
        >
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

        {/* Settings Content */}
        <div style={{ flex: 1, padding: "40px 60px", maxWidth: 800 }}>
          {activeTab === "profile" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <section>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.navy, marginBottom: 4, fontFamily: "system-ui, sans-serif" }}>Personal Information</h3>
                <p style={{ fontSize: 13, color: "#9A8C98", marginBottom: 24, fontFamily: "system-ui, sans-serif" }}>Update your photo and personal details here.</p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-[#4A4E69]">Full Name</Label>
                      <Input defaultValue="John Doe" className="border-[#F0EDE9] bg-[#FAFAFA]" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-[#4A4E69]">Email Address</Label>
                      <Input defaultValue="john@example.com" className="border-[#F0EDE9] bg-[#FAFAFA]" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-[#4A4E69]">Phone Number</Label>
                    <Input placeholder="+1 (555) 000-0000" className="border-[#F0EDE9] bg-[#FAFAFA]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-[#4A4E69]">Bio</Label>
                    <textarea 
                      placeholder="Tell us about yourself..." 
                      style={{ 
                        width: "100%", 
                        minHeight: 100, 
                        padding: "10px 12px", 
                        borderRadius: 6, 
                        border: "1px solid #F0EDE9", 
                        background: "#FAFAFA", 
                        fontSize: 14, 
                        outline: "none",
                        fontFamily: "system-ui, sans-serif",
                        resize: "vertical"
                      }}
                    />
                  </div>
                </div>
              </section>

              <Separator className="bg-[#F0EDE9]" />

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <Button variant="outline" className="border-[#F0EDE9] text-[#4A4E69]">Cancel</Button>
                <Button className="bg-[#22223B] text-white">Save changes</Button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <section>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.navy, marginBottom: 4, fontFamily: "system-ui, sans-serif" }}>Notifications</h3>
                <p style={{ fontSize: 13, color: "#9A8C98", marginBottom: 24, fontFamily: "system-ui, sans-serif" }}>Decide how you want to be notified about updates.</p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: colors.navy, margin: 0, fontFamily: "system-ui, sans-serif" }}>Email Notifications</p>
                      <p style={{ fontSize: 12, color: "#9A8C98", margin: 0, fontFamily: "system-ui, sans-serif" }}>Receive daily activity summaries via email.</p>
                    </div>
                    <div style={{ width: 36, height: 20, background: colors.navy, borderRadius: 10, position: "relative", cursor: "pointer" }}>
                      <div style={{ width: 14, height: 14, background: "#fff", borderRadius: "50%", position: "absolute", top: 3, right: 3 }} />
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: colors.navy, margin: 0, fontFamily: "system-ui, sans-serif" }}>Project Updates</p>
                      <p style={{ fontSize: 12, color: "#9A8C98", margin: 0, fontFamily: "system-ui, sans-serif" }}>Get notified when a client sends a message.</p>
                    </div>
                    <div style={{ width: 36, height: 20, background: colors.navy, borderRadius: 10, position: "relative", cursor: "pointer" }}>
                      <div style={{ width: 14, height: 14, background: "#fff", borderRadius: "50%", position: "absolute", top: 3, right: 3 }} />
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: colors.navy, margin: 0, fontFamily: "system-ui, sans-serif" }}>Payment Reminders</p>
                      <p style={{ fontSize: 12, color: "#9A8C98", margin: 0, fontFamily: "system-ui, sans-serif" }}>Reminders for overdue or pending payments.</p>
                    </div>
                    <div style={{ width: 36, height: 20, background: "#E8E4E0", borderRadius: 10, position: "relative", cursor: "pointer" }}>
                      <div style={{ width: 14, height: 14, background: "#fff", borderRadius: "50%", position: "absolute", top: 3, left: 3 }} />
                    </div>
                  </div>
                </div>
              </section>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <Button variant="outline" className="border-[#F0EDE9] text-[#4A4E69]">Cancel</Button>
                <Button className="bg-[#22223B] text-white">Save changes</Button>
              </div>
            </div>
          )}

      
         </div>
       </div>
     </div>
   )
 }
