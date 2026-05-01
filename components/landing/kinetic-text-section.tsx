"use client"

import { useState, useEffect, useRef } from "react"
import {
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
  animate,
} from "framer-motion"

// ─── Types ────────────────────────────────────────────────────────────────────

interface WordDef {
  text: string
  highlight?: boolean
}

interface Scene {
  // Words that appear sequentially, each with the rack-focus wipe
  words: WordDef[]
  // For scene 3: after all words appear, slide left and reveal suffix words
  slideAndReveal?: WordDef[]
  holdMs: number // how long to hold before exit
}

// ─── Scenes ───────────────────────────────────────────────────────────────────

const SCENES: Scene[] = [
  {
    words: [{ text: "Every" }, { text: "Client" }],
    holdMs: 700,
  },
  {
    words: [{ text: "Every" }, { text: "Payment" }],
    holdMs: 700,
  },
  {
    words: [{ text: "Nothing" }, { text: "slips" }, { text: "—" }],
    slideAndReveal: [
      { text: "FreelanceHub", highlight: true },
      { text: "handles", highlight: true },
      { text: "it.", highlight: true },
    ],
    holdMs: 850,
  },
]

// ─── Timing ───────────────────────────────────────────────────────────────────

const WORD_FOCUS_DURATION = 0.26 // s — faster sharpen
const WORD_STAGGER = 0.2 // s — faster sequence
const SLIDE_DURATION = 0.5 // s — faster but smooth slide
const EXIT_DURATION = 0.26 // s — faster blur-out

// ─── Rack-focus word component ────────────────────────────────────────────────

function RackWord({
  text,
  highlight,
  progress,
  exiting,
}: {
  text: string
  highlight?: boolean
  progress: MotionValue<number>
  exiting: boolean
}) {
  const blur = useTransform(progress, [0, 1], [16, 0])
  const opacity = useTransform(progress, [0, 0.2, 1], [0, 0.3, 1])
  const scale = useTransform(progress, [0, 1], [1.12, 1])
  const filter = useTransform(blur, (b) => `blur(${b.toFixed(2)}px)`)
  const scaleStr = useTransform(scale, (s) => `scale(${s.toFixed(4)})`)

  const colorT = useTransform(progress, [0.5, 1], [0, 1])
  const color = useTransform(colorT, (t) => {
    if (!highlight) return "#0d0d0d"
    // Fade into hero palette rose (#C9ADA7) instead of bright blue.
    const r = Math.round(13 + (201 - 13) * t)
    const g = Math.round(13 + (173 - 13) * t)
    const b = Math.round(13 + (167 - 13) * t)
    return `rgb(${r},${g},${b})`
  })

  if (exiting) {
    return (
      <motion.span
        style={{ display: "inline-block", whiteSpace: "pre" }}
        animate={{ opacity: 0, filter: "blur(16px)", scale: 1.08 }}
        transition={{ duration: EXIT_DURATION, ease: [0.4, 0, 0.7, 0.5] }}
      >
        {text}
      </motion.span>
    )
  }

  return (
    <motion.span
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        filter,
        opacity,
        transform: scaleStr,
        color,
        transformOrigin: "center 85%",
        willChange: "filter, opacity, transform, color",
      }}
    >
      {text}
    </motion.span>
  )
}

// ─── Scene A: "Every Bet" / "Every Trade" ─────────────────────────────────────

function SimplePairScene({
  scene,
  isLastScene,
  onDone,
}: {
  scene: Scene
  isLastScene: boolean
  onDone: () => void
}) {
  const mv0 = useMotionValue(0)
  const mv1 = useMotionValue(0)
  const mvs = [mv0, mv1]
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    mv0.set(0)
    mv1.set(0)

    const controls: ReturnType<typeof animate>[] = []

    // Word 0 starts immediately
    controls.push(
      animate(mv0, 1, {
        duration: WORD_FOCUS_DURATION,
        ease: [0.25, 0.46, 0.45, 0.94],
      })
    )

    // Word 1 starts after stagger
    const t1 = setTimeout(() => {
      controls.push(
        animate(mv1, 1, {
          duration: WORD_FOCUS_DURATION,
          ease: [0.25, 0.46, 0.45, 0.94],
        })
      )
    }, WORD_STAGGER * 1000)

    // Hold then exit
    const totalIn = (WORD_STAGGER + WORD_FOCUS_DURATION) * 1000
    const exitT = setTimeout(() => {
      if (isLastScene) return
      setExiting(true)
      setTimeout(onDone, EXIT_DURATION * 1000 + 60)
    }, totalIn + scene.holdMs)

    return () => {
      controls.forEach((c) => c.stop())
      clearTimeout(t1)
      clearTimeout(exitT)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLastScene, mv0, mv1, onDone, scene.holdMs])

  return (
    <div style={{ display: "flex", gap: "0.22em", alignItems: "baseline" }}>
      {scene.words.map((w, i) => (
        <RackWord
          key={i}
          text={w.text}
          highlight={w.highlight}
          progress={mvs[i]}
          exiting={exiting}
        />
      ))}
    </div>
  )
}

// ─── Suffix word with expanding container ─────────────────────────────────────

function SuffixWord({
  def,
  progress,
  expand,
  naturalWidth,
  exiting,
  measuredRef,
}: {
  def: WordDef
  progress: MotionValue<number>
  expand: MotionValue<number>
  naturalWidth: number
  exiting: boolean
  measuredRef: (el: HTMLSpanElement | null) => void
}) {
  const expandW = useTransform(expand, [0, 1], [0, naturalWidth || 120])
  const widthStr = useTransform(expandW, (v) => `${v.toFixed(1)}px`)

  return (
    <motion.span
      style={{
        display: "inline-block",
        width: widthStr,
        overflow: "visible",
        flexShrink: 0,
      }}
    >
      <span ref={measuredRef} style={{ display: "inline-block" }}>
        <RackWord
          text={def.text}
          highlight={def.highlight}
          progress={progress}
          exiting={exiting}
        />
      </span>
    </motion.span>
  )
}

// ─── Scene B: "Someone wins —" pushed left as "just not you." expands in ──────

function SlideRevealScene({
  scene,
  isLastScene,
  onDone,
}: {
  scene: Scene
  isLastScene: boolean
  onDone: () => void
}) {
  const mv0 = useMotionValue(0) // Someone
  const mv1 = useMotionValue(0) // wins
  const mv2 = useMotionValue(0) // —
  const mv3 = useMotionValue(0) // just
  const mv4 = useMotionValue(0) // not
  const mv5 = useMotionValue(0) // you.
  const suffixMvs = [mv3, mv4, mv5]

  // Each suffix word's container expands 0 → 1 to push prefix left
  const expand3 = useMotionValue(0)
  const expand4 = useMotionValue(0)
  const expand5 = useMotionValue(0)
  const expandMvs = [expand3, expand4, expand5]

  const [exiting, setExiting] = useState(false)
  // Store measured natural widths of each suffix word
  const suffixRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [suffixWidths, setSuffixWidths] = useState<number[]>([0, 0, 0])

  useEffect(() => {
    ;[mv0, mv1, mv2, mv3, mv4, mv5, expand3, expand4, expand5].forEach((mv) =>
      mv.set(0)
    )

    const controls: ReturnType<typeof animate>[] = []
    const timers: ReturnType<typeof setTimeout>[] = []
    const sched = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms)
      timers.push(id)
    }

    // Measure suffix word widths after mount
    const measureId = setTimeout(() => {
      const widths = suffixRefs.current.map((el) => el?.offsetWidth ?? 0)
      setSuffixWidths(widths)
    }, 20)
    timers.push(measureId)

    // Prefix words rack in sequentially
    controls.push(
      animate(mv0, 1, {
        duration: WORD_FOCUS_DURATION,
        ease: [0.25, 0.46, 0.45, 0.94],
      })
    )
    sched(() => {
      controls.push(
        animate(mv1, 1, {
          duration: WORD_FOCUS_DURATION,
          ease: [0.25, 0.46, 0.45, 0.94],
        })
      )
    }, WORD_STAGGER * 1000)
    sched(
      () => {
        controls.push(
          animate(mv2, 1, {
            duration: WORD_FOCUS_DURATION,
            ease: [0.25, 0.46, 0.45, 0.94],
          })
        )
      },
      WORD_STAGGER * 2 * 1000
    )

    const prefixDone = (WORD_STAGGER * 2 + WORD_FOCUS_DURATION) * 1000 + 180

    // Each suffix word: expand its container AND rack-focus simultaneously
    const suffixStagger = WORD_STAGGER * 0.9
    sched(() => {
      scene.slideAndReveal?.forEach((_, i) => {
        sched(
          () => {
            // Expand container to push prefix left
            controls.push(
              animate(expandMvs[i], 1, {
                duration: SLIDE_DURATION,
                ease: [0.22, 1, 0.36, 1],
              })
            )
            // Rack-focus the word itself
            controls.push(
              animate(suffixMvs[i], 1, {
                duration: WORD_FOCUS_DURATION,
                ease: [0.25, 0.46, 0.45, 0.94],
              })
            )
          },
          i * suffixStagger * 1000
        )
      })
    }, prefixDone)

    const totalIn =
      prefixDone +
      ((scene.slideAndReveal?.length ?? 0) - 1) * suffixStagger * 1000 +
      Math.max(SLIDE_DURATION, WORD_FOCUS_DURATION) * 1000

    sched(() => {
      if (isLastScene) return
      setExiting(true)
      sched(onDone, EXIT_DURATION * 1000 + 60)
    }, totalIn + scene.holdMs)

    return () => {
      controls.forEach((c) => c.stop())
      timers.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expand3, expand4, expand5, isLastScene, mv0, mv1, mv2, mv3, mv4, mv5, onDone, scene.holdMs, scene.slideAndReveal])

  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "0.18em",
        overflow: "visible",
      }}
    >
      {/* Prefix gets pushed left by expanding suffix containers */}
      <span
        style={{
          display: "inline-flex",
          gap: "0.18em",
          alignItems: "baseline",
          flexShrink: 0,
        }}
      >
        <RackWord
          text={scene.words[0]?.text ?? ""}
          progress={mv0}
          exiting={exiting}
        />
        <RackWord
          text={scene.words[1]?.text ?? ""}
          progress={mv1}
          exiting={exiting}
        />
        <RackWord
          text={scene.words[2]?.text ?? ""}
          progress={mv2}
          exiting={exiting}
        />
      </span>

      {/* Suffix: each word lives in an expanding container */}
      {scene.slideAndReveal?.map((w, i) => (
        <SuffixWord
          key={i}
          def={w}
          progress={suffixMvs[i]}
          expand={expandMvs[i]}
          naturalWidth={suffixWidths[i]}
          exiting={exiting}
          measuredRef={(el) => {
            suffixRefs.current[i] = el
          }}
        />
      ))}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export function KineticTextSection() {
  const [sceneIdx, setSceneIdx] = useState(0)
  const [layerKey, setLayerKey] = useState(0)

  const advance = () => {
    setSceneIdx((i) => {
      if (i >= SCENES.length - 1) return i
      return i + 1
    })
    setLayerKey((k) => k + 1)
  }

  const scene = SCENES[sceneIdx]
  const isSlide = !!scene.slideAndReveal
  const isLastScene = sceneIdx === SCENES.length - 1

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily:
          "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
        fontSize: "clamp(30px, 5.2vw, 68px)",
        fontWeight: 400,
        lineHeight: 1.05,
        letterSpacing: "-0.03em",
        userSelect: "none",
      }}
    >
      {isSlide ? (
        <SlideRevealScene
          key={layerKey}
          scene={scene}
          isLastScene={isLastScene}
          onDone={advance}
        />
      ) : (
        <SimplePairScene
          key={layerKey}
          scene={scene}
          isLastScene={isLastScene}
          onDone={advance}
        />
      )}
    </div>
  )
}

export default KineticTextSection
