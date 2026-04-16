// app/dashboard/messages/page.tsx
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { MessagesView } from "@/components/dashboard/messages-view"
import type { Project, Client } from "@/lib/types"

export default async function MessagesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect("/login")

  // Fetch projects (threads) for this freelancer
  // We need to fetch projects through their clients
  const { data: projectsData, error } = await supabase
    .from("projects")
    .select("*, clients!inner(*)")
    .eq("clients.freelancer_id", user.id)
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Error fetching chat threads:", error)
  }

  // Cast type properly
  const threads = (projectsData || []).map((p: any) => ({
    id: p.id,
    name: p.title,
    client: p.clients.name,
    project_id: p.id,
  }))

  return <MessagesView initialThreads={threads} currentUserId={user.id} />
}
