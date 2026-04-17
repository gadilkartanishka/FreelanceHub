'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

function validatePassword(password: string): string | null {
  if (password.length < 8) return "Password must be at least 8 characters long."
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter."
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter."
  if (!/[0-9]/.test(password)) return "Password must contain at least one number."
  return null
}

export async function signUp(formData: FormData) {
  console.log('--- SIGNUP ACTION STARTED ---')
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string
  const role = formData.get('role') as string

  console.log('Signup Attempt:', { email, fullName, role })

  // 1. Validate Password Strength
  const passwordError = validatePassword(password)
  if (passwordError) {
    console.error('Validation Error:', passwordError)
    return redirect(`/signup?error=${encodeURIComponent(passwordError)}`)
  }

  // 2. Call Supabase Auth
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/confirm`,
    },
  })

  if (error) {
    console.error('Signup Error:', error.message)
    return redirect(`/signup?error=${encodeURIComponent(error.message)}`)
  }

  console.log('Signup Success: Redirecting to verification message')
  return redirect('/signup?message=Check your email to confirm your account')
}

export async function signIn(formData: FormData) {
  console.log('--- FRESH SIGNIN ATTEMPT ---')
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Signin Error:', error.message)
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  console.log('Signin Successful. Redirecting...')
  return redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}
