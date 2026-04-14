"use client"

import { PulsingBorder, MeshGradient } from "@paper-design/shaders-react"
import type React from "react"

export function ShaderBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#22223B", "#4A4E69", "#9A8C98", "#C9ADA7", "#F2E9E4"]}
        speed={0.3}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-60"
        colors={["#22223B", "#9A8C98", "#4A4E69", "#F2E9E4"]}
        speed={0.2}
      />

      {children}
    </div>
  )
}

export function PulsingCircle() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-30">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <PulsingBorder
          colors={["#F2E9E4", "#C9ADA7", "#9A8C98", "#4A4E69", "#22223B", "#C9ADA7", "#F2E9E4"]}
          colorBack="#00000000"
          speed={1.5}
          roundness={1}
          thickness={0.1}
          softness={0.2}
          intensity={5}
          spotSize={0.1}
          pulse={0.1}
          smoke={0.5}
          smokeSize={4}
          scale={0.65}
          rotation={0}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  )
}