"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { JSX, SVGProps, useState } from "react"

const GoogleIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
  </svg>
)

import { signIn } from "@/app/auth/actions"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false)
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const message = searchParams.get("message")

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2E9E4]">
      <div className="mx-auto w-full max-w-sm space-y-8 rounded-sm border border-[#E8E4E0] bg-white px-8 py-10 shadow-sm">
        {/* Header */}
        <div className="space-y-3 text-center">
          <Logo className="mx-auto h-10 w-10" />
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-[#22223B]">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-[#9A8C98]">
              Sign in to your FreelanceHub account
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-sm bg-red-50 p-3 text-xs text-red-600 border border-red-100">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-sm bg-green-50 p-3 text-xs text-green-700 border border-green-100">
            {message}
          </div>
        )}

        {/* Google */}
        <Button
          variant="outline"
          className="w-full justify-center gap-2 border-[#F0EDE9] bg-[#FAFAFA] text-[#4A4E69] hover:bg-[#F2E9E4] hover:text-[#22223B]"
        >
          <GoogleIcon className="h-4 w-4" />
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <Separator className="flex-1 bg-[#F0EDE9]" />
          <span className="text-xs text-[#9A8C98]">or</span>
          <Separator className="flex-1 bg-[#F0EDE9]" />
        </div>

        {/* Fields */}
        <form action={signIn} className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-xs font-medium text-[#4A4E69]"
            >
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="border-[#F0EDE9] bg-[#FAFAFA] ps-9 text-[#22223B] placeholder:text-[#C9ADA7] focus-visible:border-[#9A8C98] focus-visible:ring-[#9A8C98]/10"
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-[#9A8C98]">
                <Mail size={14} />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-xs font-medium text-[#4A4E69]"
              >
                Password
              </Label>
              <a
                href="#"
                className="text-xs text-[#9A8C98] hover:text-[#22223B] hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={isVisible ? "text" : "password"}
                required
                placeholder="••••••••"
                className="border-[#F0EDE9] bg-[#FAFAFA] ps-9 pe-9 text-[#22223B] placeholder:text-[#C9ADA7] focus-visible:border-[#9A8C98] focus-visible:ring-[#9A8C98]/10"
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-[#9A8C98]">
                <Lock size={14} />
              </div>
              <button
                type="button"
                onClick={() => setIsVisible((p) => !p)}
                className="absolute inset-y-0 end-0 flex w-9 items-center justify-center text-[#9A8C98] hover:text-[#22223B]"
              >
                {isVisible ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              className="border-[#C9ADA7] data-[state=checked]:border-[#22223B] data-[state=checked]:bg-[#22223B]"
            />
            <Label htmlFor="remember" className="text-xs text-[#9A8C98]">
              Remember me for 30 days
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#22223B] text-white hover:bg-[#4A4E69]"
          >
            Sign in
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-[#9A8C98]">
          No account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#22223B] hover:underline"
          >
            Create one free
          </Link>
        </p>
      </div>
    </div>
  )
}
