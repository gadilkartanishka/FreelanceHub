"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updateProfileAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect("/login")

  const fullName = formData.get("full_name") as string
  const phone = (formData.get("phone") as string) || null
  const bio = (formData.get("bio") as string) || null
  // Avatar handling could be added here if needed

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      phone: phone,
      bio: bio,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/settings")
  revalidatePath("/dashboard")
  return { success: true }
}
