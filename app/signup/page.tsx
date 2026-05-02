"use client"

import { useState } from "react"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agree: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signup submitted:", formData)
  }

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-slate-100 p-6">
      <div className="relative flex h-[80vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="relative flex-1 overflow-hidden bg-slate-50">
          <div className="absolute inset-0">
            <img
              src="/login%20img.png"
              alt="Brand visual"
              className="h-full w-full object-cover object-right"
            />
          </div>
        </div>

        <div className="absolute top-5 left-5 z-20">
          <button
            onClick={() => router.push("/")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all hover:bg-gray-200"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center bg-white">
          <div className="w-full max-w-sm p-6">
            <div className="mb-8">
              <h1 className="mb-2 text-2xl font-bold text-gray-900">Create Account</h1>
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => router.push("/login")}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Log in
                </button>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 hover:bg-gray-100"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <label htmlFor="agree" className="flex items-center space-x-2 text-sm text-gray-600">
                <Checkbox
                  id="agree"
                  checked={formData.agree}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, agree: checked === true }))
                  }
                  className="border-gray-400 bg-white data-[state=checked]:border-[#22223B] data-[state=checked]:bg-white data-[state=checked]:text-[#22223B]"
                />
                <span>I agree to Terms and Privacy Policy</span>
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#22223B] px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[#2563eb] hover:via-[#7c3aed] hover:to-[#ec4899] hover:text-white hover:shadow-[0_12px_34px_rgba(124,58,237,0.35)]"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
