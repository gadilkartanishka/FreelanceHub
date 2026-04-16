import { createClient } from '@/lib/supabase/client'

/**
 * Upload a payment proof file to Supabase Storage.
 * Returns the file path for generating signed URLs.
 */
export async function uploadPaymentProof(file: File, paymentId: string): Promise<{ path: string | null; error: string | null }> {
  const supabase = createClient()

  const fileExt = file.name.split('.').pop()
  const fileName = `${paymentId}-${Date.now()}.${fileExt}`
  const filePath = `proofs/${fileName}`

  const { error } = await supabase.storage
    .from('payment-proofs')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    return { path: null, error: error.message }
  }

  return { path: filePath, error: null }
}

/**
 * Get a signed URL for a payment proof (15 min expiry).
 */
export async function getSignedProofUrl(path: string): Promise<string | null> {
  const supabase = createClient()

  const { data, error } = await supabase.storage
    .from('payment-proofs')
    .createSignedUrl(path, 60 * 15) // 15 minutes

  if (error || !data?.signedUrl) return null
  return data.signedUrl
}
