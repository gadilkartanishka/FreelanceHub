import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // This will refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const { data: { user } } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()

  // 1. Protected Routes: Redirect unauthenticated users to /login
  if (
    !user &&
    (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/portal'))
  ) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 2. Public-Only Routes: Redirect authenticated users to /dashboard
  if (
    user &&
    (url.pathname === '/login' || url.pathname === '/signup')
  ) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return response
}
