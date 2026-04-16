import { createClient } from '@/lib/supabase/server'

/**
 * Upload a payment proof file to Supabase Storage from the server.
 * Returns the file path for generating signed URLs.
 */
export async function uploadPaymentProofServer(file: File, paymentId: string): Promise<{ path: string | null; error: string | null }> {
  const supabase = await createClient()

  const fileExt = file.name.split('.').pop()
  const fileName = `${paymentId}-${Date.now()}.${fileExt}`
  const filePath = `proofs/${fileName}`

  // Convert File to ArrayBuffer for upload
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { error } = await supabase.storage
    .from('payment-proofs')
    .upload(filePath, buffer, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (error) {
    return { path: null, error: error.message }
  }

  return { path: filePath, error: null }
}

/**
 * Get a signed URL for a payment proof from the server.
 */
export async function getSignedProofUrlServer(path: string): Promise<string | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.storage
    .from('payment-proofs')
    .createSignedUrl(path, 60 * 15) // 15 minutes

  if (error || !data?.signedUrl) return null
  return data.signedUrl
}
