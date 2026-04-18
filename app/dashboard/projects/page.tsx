import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProjectsView, ProjectDisplay } from "@/components/dashboard/projects-view"

export default async function ProjectsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return redirect("/login")

  // Fetch projects joined with client and payments
  const { data: projectsData, error: projectsError } = await supabase
    .from("projects")
    .select("*, clients(id, name), payments(amount, status)")
    .order("deadline", { ascending: true })

  // Fetch all clients for the "Create Project" modal dropdown
  const { data: clientsData, error: clientsError } = await supabase
    .from("clients")
    .select("id, name")
    .eq("freelancer_id", user.id)
    .order("name", { ascending: true })

  if (projectsError) {
    console.error("Error fetching projects:", projectsError)
  }

  const today = new Date().toISOString().split("T")[0]

  // Map Supabase payload to ProjectDisplay shape
  const displayProjects: ProjectDisplay[] = (projectsData || []).map((p: any) => {
    // Sum all 'paid' payments
    const amountPaid = (p.payments || []).reduce(
      (sum: number, payment: any) =>
        payment.status === "paid" ? sum + Number(payment.amount) : sum,
      0
    )

    const isOverdue = p.deadline < today && p.status !== "completed"

    return {
      id: p.id,
      title: p.title,
      client: p.clients?.name || "Unknown Client",
      clientId: p.clients?.id || "unknown",
      description: p.description || "",
      agreedValue: Number(p.agreed_value) || 0,
      amountPaid,
      startDate: p.start_date || "",
      deadline: p.deadline || "",
      status: p.status,
      overdue: isOverdue,
      internalNotes: p.internal_notes || "",
      attachments: [], // Feature not fully built out on the schema yet
    }
  })

  // Format clients list
  const clients = (clientsData || []).map((c: any) => ({
    id: c.id,
    name: c.name,
  }))

  return <ProjectsView initialProjects={displayProjects} clients={clients} />
}
