import type { ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

export const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98]

/** Child variant: fade in while rising. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

/** Child variant: fade in while scaling up slightly. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
}

/** Parent variant: plays children one after another. */
export function staggerContainer(stagger = 0.08, delay = 0.05): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
}

type GroupProps = {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  /** Portion of the group that must be visible before it plays (0-1). */
  amount?: number
}

/** Wraps a list/grid and staggers every nested <StaggerItem> (or motion child with variants). */
export function StaggerGroup({ children, className, stagger = 0.08, delay = 0.05, amount = 0.1 }: GroupProps) {
  return (
    <motion.div
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type ItemProps = { children: ReactNode; className?: string; variants?: Variants }

export function StaggerItem({ children, className, variants = fadeUp }: ItemProps) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}
