import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from './Stagger'

type SectionProps = {
  id: string
  label?: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function Section({ id, label, title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`relative scroll-mt-20 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 max-w-2xl sm:mb-16"
        >
          {label && (
            <motion.p
              variants={fadeUp}
              className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent"
            >
              {label}
            </motion.p>
          )}
          <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p variants={fadeUp} className="mt-4 leading-relaxed text-muted">
              {subtitle}
            </motion.p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  )
}
