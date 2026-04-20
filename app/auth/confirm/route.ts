import { type NextRequest } from 'next/server'
import { type EmailOtpType } from '@supabase/supabase-js'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const code = searchParams.get('code')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/dashboard'

  const supabase = await createClient()

  // 1. Check if user is already logged in (handles scanner pre-clicks)
  const { data: { session: existingSession } } = await supabase.auth.getSession()
  if (existingSession) {
    return redirect(next)
  }

  // 2. Handle token_hash (OTP flow)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    
    if (!error) {
      return redirect(next)
    }
  }

  // 3. Handle code (PKCE flow)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return redirect(next)
    }
  }

  // 4. Final Fallback: If verification fails, it often means it was ALREADY verified
  // by an email scanner. Redirect to login with a neutral message instead of an error.
  return redirect('/login?message=Verification link processed. Please sign in to continue.')
}
