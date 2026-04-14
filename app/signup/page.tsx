import { signUp } from "@/app/auth/actions"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const message = searchParams.get("message")

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2E9E4] py-12">
      <div className="w-full max-w-sm space-y-6 rounded-sm border border-[#E8E4E0] bg-white px-8 py-10 shadow-sm">
        {/* Header */}
        <div className="space-y-3 text-center">
          <Logo className="mx-auto h-10 w-10" />
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[#22223B]">
              Create an account
            </h2>
            <p className="mt-1 text-sm text-[#9A8C98]">
              Get started with FreelanceHub for free
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

        {/* Fields */}
        <form action={signUp} className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="role"
              className="text-xs font-medium text-[#4A4E69]"
            >
              I am a
            </Label>
            <Select name="role" defaultValue="freelancer">
              <SelectTrigger
                id="role"
                className="border-[#F0EDE9] bg-[#FAFAFA] text-[#22223B] focus:ring-[#9A8C98]/10 [&>span]:flex [&>span]:items-center [&>span]:gap-2"
              >
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freelancer">
                  <User size={14} />
                  <span>Freelancer</span>
                </SelectItem>
                <SelectItem value="client">
                  <Code size={14} />
                  <span>Client</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="full_name"
              className="text-xs font-medium text-[#4A4E69]"
            >
              Full name
            </Label>
            <Input
              id="full_name"
              name="full_name"
              required
              className="border-[#F0EDE9] bg-[#FAFAFA] text-[#22223B] focus-visible:border-[#9A8C98] focus-visible:ring-[#9A8C98]/10"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-xs font-medium text-[#4A4E69]"
            >
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="border-[#F0EDE9] bg-[#FAFAFA] text-[#22223B] placeholder:text-[#C9ADA7] focus-visible:border-[#9A8C98] focus-visible:ring-[#9A8C98]/10"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="password"
              className="text-xs font-medium text-[#4A4E69]"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="border-[#F0EDE9] bg-[#FAFAFA] pe-9 text-[#22223B] focus-visible:border-[#9A8C98] focus-visible:ring-[#9A8C98]/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 end-0 flex w-9 items-center justify-center text-[#9A8C98] hover:text-[#22223B]"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <Checkbox
              id="terms"
              required
              className="mt-0.5 border-[#C9ADA7] data-[state=checked]:border-[#22223B] data-[state=checked]:bg-[#22223B]"
            />
            <label
              htmlFor="terms"
              className="text-xs leading-relaxed text-[#9A8C98]"
            >
              I agree to the{" "}
              <Link href="#" className="text-[#22223B] hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-[#22223B] hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#22223B] text-white hover:bg-[#4A4E69]"
          >
            Create free account
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-[#9A8C98]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#22223B] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
