"use client"

import { useState } from "react"
import { colors } from "@/lib/colors"
import { ChatThread } from "@/components/dashboard/chat-thread"
import { ChatBubble } from "@/components/dashboard/chat-bubble"
import { Search, Send, Paperclip, MoreVertical } from "lucide-react"

const BORDER = "1px solid #E8E4E0"

const THREADS = [
  { id: 1, name: "Brand refresh", client: "Acme Co", lastMessage: "Great, I'll review it today.", time: "10:30 AM" },
  { id: 2, name: "Mobile app", client: "NovaTech", lastMessage: "When can we expect the next build?", time: "昨天" },
  { id: 3, name: "API documentation", client: "Streamline", lastMessage: "The docs look clean. Good job.", time: "Monday" },
]

const MOCK_MESSAGES = [
  { id: 1, sender: "them" as const, content: "Hi! How is the progress on the brand refresh?", time: "9:00 AM" },
  { id: 2, sender: "me" as const, content: "It's going well! I've finished the logo variations and started on the color palette.", time: "9:15 AM" },
  { id: 3, sender: "them" as const, content: "That sounds good. Can you share a sneak peek?", time: "9:20 AM" },
  { id: 4, sender: "me" as const, content: "Sure, I've just uploaded a PDF draft to the project attachments.", time: "10:25 AM" },
  { id: 5, sender: "them" as const, content: "Great, I'll review it today.", time: "10:30 AM" },
]

export default function MessagesPage() {
  const [activeThreadId, setActiveThreadId] = useState(1)
  const [inputValue, setInputValue] = useState("")

  const activeThread = THREADS.find((t) => t.id === activeThreadId)

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        height: "100%",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* Search & Threads Sidebar */}
      <div
        style={{
          width: 300,
          borderRight: BORDER,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div style={{ padding: "20px 20px 10px" }}>
          <h1
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: colors.navy,
              marginBottom: 16,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Messages
          </h1>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search conversations..."
              style={{
                width: "100%",
                padding: "8px 12px 8px 34px",
                borderRadius: 4,
                border: "1px solid #F0EDE9",
                background: "#FAFAFA",
                fontSize: 12,
                outline: "none",
                fontFamily: "system-ui, sans-serif",
              }}
            />
            <Search
              size={14}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9A8C98",
              }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", marginTop: 10 }}>
          {THREADS.map((thread) => (
            <ChatThread
              key={thread.id}
              name={thread.name}
              lastMessage={thread.lastMessage}
              time={thread.time}
              active={activeThreadId === thread.id}
              onClick={() => setActiveThreadId(thread.id)}
            />
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            height: 64,
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: BORDER,
            flexShrink: 0,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: colors.navy,
                margin: 0,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {activeThread?.name}
            </h2>
            <p
              style={{
                fontSize: 11,
                color: "#9A8C98",
                margin: 0,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {activeThread?.client}
            </p>
          </div>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9A8C98",
              padding: 4,
            }}
          >
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Message History */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {MOCK_MESSAGES.map((msg) => (
            <ChatBubble
              key={msg.id}
              content={msg.content}
              time={msg.time}
              sender={msg.sender}
            />
          ))}
        </div>

        {/* Chat Input */}
        <div style={{ padding: "20px 24px 24px", flexShrink: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 12px",
              border: BORDER,
              borderRadius: 6,
              background: "#fff",
            }}
          >
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#9A8C98",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Paperclip size={18} />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 13,
                fontFamily: "system-ui, sans-serif",
              }}
            />
            <button
              style={{
                background: colors.navy,
                color: "#fff",
                border: "none",
                borderRadius: 4,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
