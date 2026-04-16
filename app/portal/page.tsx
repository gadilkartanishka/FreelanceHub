// app/portal/page.tsx
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { colors } from "@/lib/colors"
import { FolderKanban, ChevronRight, LayoutDashboard } from "lucide-react"

const BORDER = "1px solid #E8E4E0"

export default async function PortalLandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect("/login")

  // 1. Get client record via access
  const { data: accessData } = await supabase
    .from("client_access")
    .select("client_record_id")
    .eq("user_id", user.id)
    .single()

  if (!accessData) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA' }}>
        <div style={{ textAlign: 'center', padding: 40, background: '#fff', border: BORDER, borderRadius: 8 }}>
          <h1 style={{ color: colors.navy, marginBottom: 12 }}>No Access Found</h1>
          <p style={{ color: '#9A8C98' }}>You don't have access to any client portals yet. Please contact your freelancer.</p>
        </div>
      </div>
    )
  }

  // 2. Fetch projects for this client
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", accessData.client_record_id)
    .order("deadline", { ascending: true })

  // If there's only one project, we could redirect directly, but showing a list is safer
  // if (projects?.length === 1) redirect(`/portal/${projects[0].id}`)

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', padding: '60px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
          <div style={{ width: 40, height: 40, background: colors.navy, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: colors.navy, margin: 0 }}>Client Portal</h1>
            <p style={{ fontSize: 14, color: '#9A8C98', margin: 0 }}>Select a project to view details and updates</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {(projects || []).map((project) => (
            <Link 
              key={project.id} 
              href={`/portal/${project.id}`}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '24px', 
                background: '#fff', 
                border: BORDER, 
                borderRadius: 8, 
                textDecoration: 'none',
                transition: 'transform 0.1s, box-shadow 0.1s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, background: '#F5F2EF', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.navy }}>
                  <FolderKanban size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 600, color: colors.navy, margin: '0 0 4px 0' }}>{project.title}</h2>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 2, background: '#ECFDF5', color: '#065F46', fontWeight: 500 }}>{project.status.replace('_', ' ')}</span>
                    <span style={{ fontSize: 12, color: '#9A8C98' }}>Due {new Date(project.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <ChevronRight size={20} color="#9A8C98" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
