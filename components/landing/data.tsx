import { Hourglass, MessagesSquare, UserRound } from "lucide-react"

export const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.28,
      delayChildren: 0.3,
    },
  },
}

export const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export const featureRows = [
  {
    icon: UserRound,
    title: "Clients, projects, and payments stay connected",
    description:
      "The dashboard reflects the real shape of your work, so you can move from revenue to deadlines to client context without losing track of what matters.",
  },
  {
    icon: Hourglass,
    title: "The overview tells you what actually needs attention",
    description:
      "See revenue, active work, pending payments, overdue tasks, and upcoming deadlines in one calmer view instead of assembling that picture manually.",
  },
  {
    icon: MessagesSquare,
    title: "Less tab-hopping, less mental overhead",
    description:
      "When follow-ups, status checks, and payment tracking live in the same workspace, the admin side of freelancing stops fragmenting your day.",
  },
]

export const workflowSteps = [
  {
    number: "01",
    title: "Start with the essentials",
    description:
      "Add the client, define the project, and set the deadline so every engagement starts with clear context instead of scattered notes.",
  },
  {
    number: "02",
    title: "Track delivery in one workspace",
    description:
      "Use the dashboard to stay oriented as projects move forward, deadlines get closer, and priorities shift during the week.",
  },
  {
    number: "03",
    title: "Close out with fewer loose ends",
    description:
      "Wrap up with payment follow-ups, status visibility, and shared history still in front of you instead of buried across tools.",
  },
]

export const stats = [
  {
    eyebrow: "Overview",
    title: "A single view of revenue, project load, and risk.",
    description: "The landing page now reflects the real dashboard instead of placeholder analytics.",
  },
  {
    eyebrow: "Workflow",
    title: "Built around active work, pending payments, and deadlines.",
    description: "It mirrors the actual decisions freelancers need to make during the week.",
  },
  {
    eyebrow: "Focus",
    title: "More signal, fewer decorative stats and cards.",
    description: "The product story stays grounded in the workspace you’ve actually built.",
  },
]
