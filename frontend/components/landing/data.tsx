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
    title: "Every client has a clearer home",
    description:
      "Store key details, notes, and shared context in one place so client work feels easier to pick up and continue.",
  },
  {
    icon: Hourglass,
    title: "Your weekly priorities stay in view",
    description:
      "See what needs attention now, what is coming up next, and where timelines may need a closer look.",
  },
  {
    icon: MessagesSquare,
    title: "Admin work stops breaking your flow",
    description:
      "Handle follow-ups, status checks, and conversations in the same place instead of chasing updates across tools.",
  },
]

export const workflowSteps = [
  {
    number: "01",
    title: "Set up the work clearly",
    description:
      "Create a shared starting point for each engagement so the important details are easy to find from the beginning.",
  },
  {
    number: "02",
    title: "Keep momentum through delivery",
    description:
      "Use one workspace to stay oriented while projects move, priorities shift, and deadlines get closer.",
  },
  {
    number: "03",
    title: "Wrap up without loose ends",
    description:
      "Close the loop with communication and payment follow-ups while the project context is still right in front of you.",
  },
]

export const stats = [
  { value: "120+", label: "Freelancers onboarded" },
  { value: "3.5k+", label: "Projects organized" },
  { value: "96%", label: "Tasks delivered on time" },
  { value: "$480k+", label: "Payments tracked" },
]
