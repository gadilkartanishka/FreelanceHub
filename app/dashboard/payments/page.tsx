import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { PaymentsView, PaymentDisplay } from "@/components/dashboard/payments-view"

export default async function PaymentsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return redirect("/login")

  // Fetch payments uniquely belonging to the freelancer by joining through projects -> clients
  const { data: paymentsData, error: paymentsError } = await supabase
    .from("payments")
    .select("*, projects!inner(id, title, clients!inner(freelancer_id, name))")
    .eq("projects.clients.freelancer_id", user.id)
    .order("date_received", { ascending: false })

  if (paymentsError) {
    console.error("Error fetching payments:", paymentsError)
  }

  // Map to the shape expected by PaymentsView
  const displayPayments: PaymentDisplay[] = (paymentsData || []).map((p: any) => ({
    id: p.id,
    client: p.projects?.clients?.name || "Unknown Client",
    project: p.projects?.title || "Unknown Project",
    amount: Number(p.amount) || 0,
    date: p.date_received || "",
    status: p.status,
    method: p.method || "",
    notes: p.notes || "",
    proofUrl: p.proof_url || "",
  }))

  // We also need the user's projects to populate the "Log Payment" modal dropdown
  const { data: projectsData } = await supabase
    .from("projects")
    .select("id, title, clients!inner(freelancer_id)")
    .eq("clients.freelancer_id", user.id)
    .order("title", { ascending: true })

  const projects = (projectsData || []).map((p: any) => ({
    id: p.id,
    title: p.title,
  }))

  return <PaymentsView initialPayments={displayPayments} projects={projects} />
}
