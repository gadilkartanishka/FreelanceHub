'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPaymentAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  const project_id = formData.get('project_id') as string
  const amount = parseFloat(formData.get('amount') as string) || 0
  const date_received = formData.get('date_received') as string
  const method = (formData.get('method') as string) || null
  const status = (formData.get('status') as string) || 'pending'
  const notes = (formData.get('notes') as string) || null

  const { error } = await supabase.from('payments').insert({
    project_id,
    amount,
    date_received,
    method,
    status,
    notes,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/payments')
  revalidatePath('/dashboard/projects')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updatePaymentAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  const id = formData.get('id') as string
  const amount = parseFloat(formData.get('amount') as string) || 0
  const date_received = formData.get('date_received') as string
  const method = (formData.get('method') as string) || null
  const status = (formData.get('status') as string) || 'pending'
  const notes = (formData.get('notes') as string) || null

  let updateData: any = { amount, date_received, method, status, notes }

  const { error } = await supabase
    .from('payments')
    .update(updateData)
    .eq('id', id)


  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/payments')
  revalidatePath('/dashboard/projects')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function deletePaymentAction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  const { error } = await supabase.from('payments').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/payments')
  revalidatePath('/dashboard/projects')
  revalidatePath('/dashboard')
  return { success: true }
}
