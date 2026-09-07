import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { Section } from './ui/Section'
import { Reveal } from './ui/Reveal'
import { StaggerGroup, StaggerItem } from './ui/Stagger'
import { useLang } from '../i18n/LanguageContext'

function TimelineDot({ accent }: { accent: boolean }) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      className={`absolute -left-[8px] top-1.5 z-10 flex h-[17px] w-[17px] items-center justify-center rounded-full border-2 bg-bg ${
        accent ? 'border-accent' : 'border-border-strong'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${accent ? 'bg-accent' : 'bg-muted'}`} />
    </motion.span>
  )
}

export function Experience() {
  const { t } = useLang()
  const edu = t.experience.education

  // The accent line grows down the timeline as the list scrolls through the viewport.
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 70%'] })
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })

  return (
    <Section id="experience" label={t.experience.label} title={t.experience.title} subtitle={t.experience.subtitle}>
      <ol ref={listRef} className="relative ml-3 space-y-12 sm:ml-4">
        <div aria-hidden className="absolute inset-y-0 left-0 w-px bg-border" />
        <motion.div
          aria-hidden
          style={{ scaleY: lineScale }}
          className="absolute inset-y-0 left-0 w-px origin-top bg-linear-to-b from-accent to-accent-2"
        />

        {t.experience.items.map((item) => (
          <li key={item.title + item.company} className="relative pl-8 sm:pl-12">
            <TimelineDot accent />
            <Reveal>
              <p className="font-mono text-xs text-accent">{item.period}</p>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-semibold text-text">{item.title}</h3>
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <Briefcase size={14} />
                  {item.company}
                  {item.location ? `, ${item.location}` : ''}
                </p>
              </div>
            </Reveal>

            <StaggerGroup className="card card-hover mt-5 p-6" stagger={0.08} delay={0.1}>
              <StaggerItem>
                <p className="text-sm font-medium text-text">{item.tagline}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
              </StaggerItem>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {item.bullets.map((bullet) => (
                  <StaggerItem key={bullet.title} className="rounded-xl border border-border bg-surface-2 p-4">
                    <p className="text-sm font-medium text-text">{bullet.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">{bullet.desc}</p>
                  </StaggerItem>
                ))}
              </div>
            </StaggerGroup>
          </li>
        ))}

        <li className="relative pl-8 sm:pl-12">
          <TimelineDot accent={false} />
          <Reveal delay={0.1}>
            <p className="font-mono text-xs text-muted">{edu.period}</p>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-xl font-semibold text-text">{edu.title}</h3>
              <p className="flex items-center gap-1.5 text-sm text-muted">
                <GraduationCap size={14} />
                {edu.company}, {edu.location}
              </p>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{edu.summary}</p>
          </Reveal>
        </li>
      </ol>
    </Section>
  )
}
