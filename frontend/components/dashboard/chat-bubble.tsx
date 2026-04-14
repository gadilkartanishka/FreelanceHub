"use client"

import { colors } from "@/lib/colors"

interface ChatBubbleProps {
  content: string
  time: string
  sender: "me" | "them"
}

export function ChatBubble({ content, time, sender }: ChatBubbleProps) {
  const isMe = sender === "me"

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isMe ? "flex-end" : "flex-start",
        gap: 4,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          maxWidth: "80%",
          padding: "10px 14px",
          borderRadius: 8,
          background: isMe ? colors.navy : "#F5F2EF",
          color: isMe ? "#fff" : colors.navy,
          fontSize: 13,
          lineHeight: 1.5,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {content}
      </div>
      <span
        style={{
          fontSize: 10,
          color: "#9A8C98",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {time}
      </span>
    </div>
  )
}
