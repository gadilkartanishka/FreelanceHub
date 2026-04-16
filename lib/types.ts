// ============================================================
// FreelanceHub — Shared TypeScript types
// Mirror the Supabase database schema
// ============================================================

// ── Status Enums ────────────────────────────────────────────
export type ClientStatus = 'active' | 'inactive' | 'archived'
export type ProjectStatus = 'pending' | 'in_progress' | 'in_review' | 'completed'
export type PaymentStatus = 'paid' | 'pending' | 'overdue'
export type UserRole = 'freelancer' | 'client'

// ── Database Row Types ──────────────────────────────────────

export type Profile = {
  id: string
  email: string | null
  role: UserRole
  full_name: string | null
  avatar_url: string | null
  phone: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

export type Client = {
  id: string
  freelancer_id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  status: ClientStatus
  notes: string | null
  tags: string[]
  created_at: string
  updated_at: string
}

export type Project = {
  id: string
  client_id: string
  title: string
  description: string | null
  agreed_value: number
  start_date: string | null
  deadline: string
  status: ProjectStatus
  internal_notes: string | null
  created_at: string
  updated_at: string
}

export type Payment = {
  id: string
  project_id: string
  amount: number
  date_received: string
  method: string | null
  status: PaymentStatus
  proof_url: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export type Message = {
  id: string
  project_id: string
  sender_id: string
  body: string
  attachment_url: string | null
  created_at: string
}

export type ClientAccess = {
  id: string
  client_record_id: string
  user_id: string
  invited_at: string
  accepted_at: string | null
}

// ── Joined / View Types (for frontend display) ──────────────

/** Project with its parent client name */
export type ProjectWithClient = Project & {
  client: Pick<Client, 'id' | 'name' | 'company'>
}

/** Payment with its parent project + client info */
export type PaymentWithProject = Payment & {
  project: Pick<Project, 'id' | 'title'> & {
    client: Pick<Client, 'id' | 'name'>
  }
}

/** Client with computed aggregates */
export type ClientWithStats = Client & {
  active_projects: number
  total_billed: number
  projects: Pick<Project, 'id' | 'title' | 'status' | 'agreed_value'>[]
}

/** Message with sender profile */
export type MessageWithSender = Message & {
  sender: Pick<Profile, 'id' | 'full_name' | 'avatar_url' | 'role'>
}

/** Chat thread summary (one per project that has messages) */
export type ChatThread = {
  project_id: string
  project_title: string
  client_name: string
  last_message: string
  last_message_at: string
  unread_count: number
}

// ── Dashboard Metric Types ──────────────────────────────────

export type DashboardMetrics = {
  activeProjects: number
  revenueThisMonth: number
  pendingPayments: number
  overdueProjects: number
}
