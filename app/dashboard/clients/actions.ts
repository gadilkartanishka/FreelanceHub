'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createClientAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = (formData.get('phone') as string) || null
  const company = (formData.get('company') as string) || null
  const status = (formData.get('status') as string) || 'active'
  const notes = (formData.get('notes') as string) || null
  const tagsRaw = formData.get('tags') as string
  const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : []

  const { error } = await supabase.from('clients').insert({
    freelancer_id: user.id,
    name,
    email,
    phone,
    company,
    status,
    notes,
    tags,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/clients')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateClientAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = (formData.get('phone') as string) || null
  const company = (formData.get('company') as string) || null
  const status = (formData.get('status') as string) || 'active'
  const notes = (formData.get('notes') as string) || null
  const tagsRaw = formData.get('tags') as string
  const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : []

  const { error } = await supabase
    .from('clients')
    .update({ name, email, phone, company, status, notes, tags })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/clients')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteClientAction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  const { error } = await supabase.from('clients').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/clients')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function inviteClientAction(clientId: string, email: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  // 1. Check if already invited
  const { data: existingAccess } = await supabase
    .from('client_access')
    .select('id')
    .eq('client_record_id', clientId)
    .single()

  if (existingAccess) {
    return { error: 'Client already has an active invitation or access.' }
  }

  // 2. In a real app, we'd use supabase.auth.admin.inviteUserByEmail(email)
  // or Resend to send a custom magic link. 
  // For now, we'll create the record and return a 'simulated' success.
  
  // Create a record in client_access
  // Note: We need a user_id. In a true invite flow, Supabase Auth creates the user first.
  // Since we don't have service role, we'll implement this as 'Pending Invite' 
  // and update the schema if necessary, or just plan for the admin key.
  
  // Let's assume for MVP we are logging the 'invite sent' status.
  console.log(`Invite sent to ${email} for client ${clientId}`)

  revalidatePath('/dashboard/clients')
  return { success: true, message: 'Invitation sent (simulated)' }
}

