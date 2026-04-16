// app/portal/[projectId]/page.tsx
import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { colors } from "@/lib/colors"
import { MessagesView } from "@/components/dashboard/messages-view"
import { FolderKanban, Calendar, CreditCard, Clock } from "lucide-react"

const BORDER = "1px solid #E8E4E0"

export default async function ClientProjectPortal({
  params,
}: {
  params: { projectId: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect("/login")

  const { projectId } = params

  // 1. Fetch project with security check (via client_access)
  // This query ensures the user has access to this project
  const { data: project, error } = await supabase
    .from("projects")
    .select(`
      *,
      clients!inner (
        *,
        client_access!inner (*)
      )
    `)
    .eq("id", projectId)
    .eq("clients.client_access.user_id", user.id)
    .single()

  if (error || !project) {
    console.error("Access denied or project not found:", error)
    return notFound()
  }

  // 2. Fetch payments for this project
  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .eq("project_id", projectId)
    .order("date_received", { ascending: false })

  // 3. Prepare threads for MessagesView (single thread in portal context)
  const thread = {
    id: project.id,
    name: project.title,
    client: "Freelancer", // From client's perspective, they talk to the freelancer
    project_id: project.id,
  }

  const agreedValue = project.agreed_value || 0
  const paidValue = payments?.reduce((sum, p) => sum + (p.status === 'paid' ? p.amount : 0), 0) || 0
  const remainingValue = Math.max(0, agreedValue - paidValue)

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#FAFAFA' }}>
      {/* Top Header */}
      <div style={{ padding: '16px 32px', background: '#fff', borderBottom: BORDER, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <FolderKanban size={18} color={colors.navy} />
          <h1 style={{ fontSize: 16, fontWeight: 600, color: colors.navy, margin: 0 }}>{project.title}</h1>
        </div>
        <div style={{ fontSize: 13, color: '#9A8C98' }}>
          Portal View
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left - Project Info & Payments */}
        <div style={{ width: 400, borderRight: BORDER, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Status Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ padding: 16, background: '#fff', border: BORDER, borderRadius: 6 }}>
              <p style={{ fontSize: 11, color: '#9A8C98', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Status</p>
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.navy }}>{project.status.toUpperCase()}</div>
            </div>
            <div style={{ padding: 16, background: '#fff', border: BORDER, borderRadius: 6 }}>
              <p style={{ fontSize: 11, color: '#9A8C98', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Deadline</p>
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.navy }}>{new Date(project.deadline).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Payment Summary */}
          <div style={{ background: '#fff', border: BORDER, borderRadius: 8, padding: 20 }}>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: colors.rose, textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CreditCard size={14} /> Payments
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#9A8C98' }}>Agreed Value</span>
                <span style={{ fontWeight: 600 }}>${agreedValue.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#9A8C98' }}>Paid</span>
                <span style={{ color: '#065F46', fontWeight: 600 }}>${paidValue.toLocaleString()}</span>
              </div>
              <div style={{ height: 1, background: '#F5F2EF' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: colors.navy, fontWeight: 500 }}>Remaining</span>
                <span style={{ color: colors.rose, fontWeight: 700 }}>${remainingValue.toLocaleString()}</span>
              </div>
            </div>
            
            <button style={{ width: '100%', marginTop: 20, padding: '10px', background: colors.navy, color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              Log Payment Proof
            </button>
          </div>

          {/* Activity/Timeline Placeholder */}
          <div style={{ background: '#fff', border: BORDER, borderRadius: 8, padding: 20 }}>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: colors.rose, textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={14} /> Timeline
            </h3>
            <div style={{ fontSize: 13, color: '#9A8C98', textAlign: 'center', padding: '20px 0' }}>
              Project started on {new Date(project.start_date || project.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Right - Chat Integration */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <MessagesView 
            initialThreads={[thread]} 
            currentUserId={user.id} 
          />
        </div>
      </div>
    </div>
  )
}
