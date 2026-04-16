'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadPaymentProofServer } from '@/lib/supabase/storage-server'

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
  
  // Handle proof upload
  const proofFile = formData.get('proof') as File
  let proof_url = null
  
  if (proofFile && proofFile.size > 0) {
    // We need a temporary ID or just use a timestamp-based name if we don't have the final ID yet
    // Supabase insert returns the inserted row, so we can update it after, 
    // or just generate a UUID here.
    const tempId = crypto.randomUUID()
    const { path, error: uploadError } = await uploadPaymentProofServer(proofFile, tempId)
    if (!uploadError) {
      proof_url = path
    }
  }

  const { error } = await supabase.from('payments').insert({
    project_id,
    amount,
    date_received,
    method,
    status,
    proof_url,
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

  // Handle proof upload
  const proofFile = formData.get('proof') as File
  let updateData: any = { amount, date_received, method, status, notes }
  
  if (proofFile && proofFile.size > 0) {
    const { path, error: uploadError } = await uploadPaymentProofServer(proofFile, id)
    if (!uploadError) {
      updateData.proof_url = path
    }
  }

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
