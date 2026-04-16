'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProjectAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  const client_id = formData.get('client_id') as string
  const title = formData.get('title') as string
  const description = (formData.get('description') as string) || null
  const agreed_value = parseFloat(formData.get('agreed_value') as string) || 0
  const start_date = (formData.get('start_date') as string) || null
  const deadline = formData.get('deadline') as string
  const status = (formData.get('status') as string) || 'pending'
  const internal_notes = (formData.get('internal_notes') as string) || null

  const { error } = await supabase.from('projects').insert({
    client_id,
    title,
    description,
    agreed_value,
    start_date: start_date || null,
    deadline,
    status,
    internal_notes,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/projects')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateProjectAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const description = (formData.get('description') as string) || null
  const agreed_value = parseFloat(formData.get('agreed_value') as string) || 0
  const start_date = (formData.get('start_date') as string) || null
  const deadline = formData.get('deadline') as string
  const status = (formData.get('status') as string) || 'pending'
  const internal_notes = (formData.get('internal_notes') as string) || null

  const { error } = await supabase
    .from('projects')
    .update({ title, description, agreed_value, start_date, deadline, status, internal_notes })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/projects')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateProjectStatusAction(id: string, status: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  const { error } = await supabase
    .from('projects')
    .update({ status })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/projects')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteProjectAction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/projects')
  revalidatePath('/dashboard')
  return { success: true }
}
