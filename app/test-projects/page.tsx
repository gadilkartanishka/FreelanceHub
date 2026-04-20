import { Suspense } from "react"
import { ProjectsView, type ProjectDisplay } from "@/components/dashboard/projects-view"

function TestProjectsPageContent() {
  const dummyProjects: ProjectDisplay[] = [
    {
      id: "1",
      title: "E-commerce Redesign",
      client: "Aura Fashion",
      clientId: "c1",
      description: "Complete overhaul of the mobile shopping experience.",
      agreedValue: 4500,
      amountPaid: 2250,
      startDate: "2024-03-01",
      deadline: "2024-05-15",
      status: "in_progress",
      overdue: false,
      internalNotes: "Client requested focus on page speed.",
      attachments: [],
    },
    {
      id: "2",
      title: "Fintech App UI Kit",
      client: "WealthWise",
      clientId: "c2",
      description: "Design system for the new investment dashboard.",
      agreedValue: 3200,
      amountPaid: 3200,
      startDate: "2024-02-10",
      deadline: "2024-04-01",
      status: "completed",
      overdue: false,
      internalNotes: "Delivered all assets via Figma.",
      attachments: [],
    },
    {
      id: "3",
      title: "Brand Strategy",
      client: "Nova Coffee",
      clientId: "c3",
      description: "Defining brand voice and visual identity.",
      agreedValue: 1800,
      amountPaid: 0,
      startDate: "2024-04-10",
      deadline: "2024-04-20",
      status: "in_review",
      overdue: true,
      internalNotes: "Waiting on feedback for the moodboard.",
      attachments: [],
    }
  ]

  const dummyClients = [
    { id: "c1", name: "Aura Fashion" },
    { id: "c2", name: "WealthWise" },
    { id: "c3", name: "Nova Coffee" }
  ]

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      <ProjectsView initialProjects={dummyProjects} clients={dummyClients} />
    </div>
  )
}

export default function TestProjectsPage() {
  return (
    <Suspense fallback={null}>
      <TestProjectsPageContent />
    </Suspense>
  )
}
