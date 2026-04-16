"use client"

import { useState, useEffect, useRef, useTransition } from "react"
import { createClient } from "@/lib/supabase/client"
import { colors } from "@/lib/colors"
import { ChatThread } from "@/components/dashboard/chat-thread"
import { ChatBubble } from "@/components/dashboard/chat-bubble"
import { Search, Send, Paperclip, MoreVertical, Loader2 } from "lucide-react"
import { sendMessageAction } from "@/app/dashboard/messages/actions"

const BORDER = "1px solid #E8E4E0"

interface Message {
  id: string
  project_id: string
  sender_id: string
  body: string
  attachment_url: string | null
  created_at: string
}

interface Thread {
  id: string
  name: string
  client: string
  project_id: string
}

interface MessagesViewProps {
  initialThreads: Thread[]
  currentUserId: string
}

export function MessagesView({ initialThreads, currentUserId }: MessagesViewProps) {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(initialThreads[0]?.id || null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const supabase = createClient()
  const activeThread = initialThreads.find((t) => t.id === activeThreadId)

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch initial messages for active thread
  useEffect(() => {
    if (!activeThreadId) return

    const fetchMessages = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("project_id", activeThreadId)
        .order("created_at", { ascending: true })

      if (!error && data) {
        setMessages(data)
      }
      setLoading(false)
    }

    fetchMessages()

    // Subscribe to new messages
    const channel = supabase
      .channel(`project-chat-${activeThreadId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `project_id=eq.${activeThreadId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message
          setMessages((prev) => [...prev, newMessage])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [activeThreadId, supabase])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim() || !activeThreadId) return

    const messageBody = inputValue
    setInputValue("") // Optimistic clear

    startTransition(async () => {
      const formData = new FormData()
      formData.append("project_id", activeThreadId)
      formData.append("body", messageBody)
      
      const result = await sendMessageAction(formData)
      if (result?.error) {
        console.error("Failed to send message:", result.error)
        // Ideally show a toast or revert optimistic update if we had one
      }
    })
  }

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
          {initialThreads.length === 0 ? (
            <p style={{ padding: "20px", fontSize: 12, color: "#9A8C98" }}>No active project chats.</p>
          ) : (
            initialThreads.map((thread) => (
              <ChatThread
                key={thread.id}
                name={thread.name}
                lastMessage={thread.client} // Using client name as secondary text for now
                time="" // We could fetch last message time later
                active={activeThreadId === thread.id}
                onClick={() => setActiveThreadId(thread.id)}
              />
            ))
          )}
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
        {!activeThread ? (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#9A8C98" }}>
            Select a project to start chatting
          </div>
        ) : (
          <>
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
                  {activeThread.name}
                </h2>
                <p
                  style={{
                    fontSize: 11,
                    color: "#9A8C98",
                    margin: 0,
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {activeThread.client}
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
              {loading ? (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Loader2 className="animate-spin" size={20} color="#9A8C98" />
                </div>
              ) : (
                messages.map((msg) => (
                  <ChatBubble
                    key={msg.id}
                    content={msg.body}
                    time={new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    sender={msg.sender_id === currentUserId ? "me" : "them"}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div style={{ padding: "20px 24px 24px", flexShrink: 0 }}>
              <form 
                onSubmit={handleSend}
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
                  type="button"
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
                  type="submit"
                  disabled={isPending || !inputValue.trim()}
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
                    opacity: isPending || !inputValue.trim() ? 0.5 : 1
                  }}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
