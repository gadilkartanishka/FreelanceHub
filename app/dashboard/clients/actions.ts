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
  // Logic removed as per request for a simplified UI-only approach
  console.log(`Manual invite requested for ${email}`)
  return { success: true }
}

