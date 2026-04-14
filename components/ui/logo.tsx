// components/ui/logo.tsx
import { JSX, SVGProps } from "react"

export const Logo = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Outer dashed orbit ring */}
    <circle
      cx="20"
      cy="20"
      r="14"
      stroke="#4A4E69"
      strokeWidth="1.2"
      strokeDasharray="3 3"
      strokeLinecap="round"
    />

    {/* Inner solid ring */}
    <circle cx="20" cy="20" r="8" stroke="#22223B" strokeWidth="1.8" />

    {/* Center dot — navy */}
    <circle cx="20" cy="20" r="2.5" fill="#22223B" />

    {/* Orbiting dot — rose, top right of outer ring */}
    <circle cx="30.9" cy="11.1" r="3" fill="#C9ADA7" />
    {/* Small inner highlight on orbiting dot */}
    <circle cx="30.9" cy="11.1" r="1.2" fill="#F2E9E4" />
  </svg>
)
