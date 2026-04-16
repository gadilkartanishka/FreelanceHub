"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function sendMessageAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect("/login")

  const projectId = formData.get("project_id") as string
  const body = formData.get("body") as string
  const attachmentUrl = (formData.get("attachment_url") as string) || null

  if (!body && !attachmentUrl) {
    return { error: "Message cannot be empty." }
  }

  const { error } = await supabase.from("messages").insert({
    project_id: projectId,
    sender_id: user.id,
    body: body,
    attachment_url: attachmentUrl,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
