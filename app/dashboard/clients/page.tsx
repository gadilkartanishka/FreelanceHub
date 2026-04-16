// app/dashboard/clients/page.tsx — Server component fetching live data
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ClientsView } from "@/components/dashboard/clients-view"
import type { Client, Project } from "@/lib/types"

export default async function ClientsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return redirect("/login")

  // Fetch clients for this freelancer
  const { data: clientsData, error: clientsError } = await supabase
    .from("clients")
    .select("*, projects(*)")
    .eq("freelancer_id", user.id)
    .order("name", { ascending: true })

  if (clientsError) {
    console.error("Error fetching clients:", clientsError)
  }

  // Cast to ensure type safety with the related projects
  const clients = (clientsData || []).map((client) => ({
    ...client,
    projects: client.projects || [],
  })) as (Client & { projects: Project[] })[]

  return <ClientsView initialClients={clients} />
}
