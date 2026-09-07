import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

type Parsed = { target: number; suffix: string; decimals: number } | null

function parse(value: string): Parsed {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(value.trim())
  if (!match) return null
  const [, num, suffix] = match
  const decimals = num.includes('.') ? num.split('.')[1].length : 0
  return { target: parseFloat(num), suffix, decimals }
}

/**
 * Renders a stat like "7.5/10" or "4+" and counts the leading number up from 0
 * the first time it scrolls into view. Falls back to plain text when the value
 * has no leading number or the user prefers reduced motion.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const parsed = parse(value)
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const animated = parsed !== null && !reduceMotion
  const [display, setDisplay] = useState(() =>
    animated && parsed ? `${(0).toFixed(parsed.decimals)}${parsed.suffix}` : value,
  )

  useEffect(() => {
    if (!inView || !animated || !parsed) return
    const controls = animate(0, parsed.target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(`${latest.toFixed(parsed.decimals)}${parsed.suffix}`),
    })
    return () => controls.stop()
  }, [inView, animated, parsed?.target, parsed?.suffix, parsed?.decimals]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
