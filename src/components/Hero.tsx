import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Download, Github, MapPin } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { profile } from '../data/content'
import { CountUp } from './ui/CountUp'
import { EASE, fadeUp, staggerContainer } from './ui/Stagger'

/** Gentle up/down drift used on the portrait and its floating chips. */
function float(distance: number, duration: number, delay = 0) {
  return {
    animate: { y: [0, -distance, 0] },
    transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' as const },
  }
}

export function Hero() {
  const { t, lang } = useLang()
  const displayName = lang === 'vi' ? profile.nameVi : profile.name

  // Parallax: the portrait drifts down slightly as the user scrolls away from the hero.
  const { scrollY } = useScroll()
  const portraitY = useTransform(scrollY, [0, 600], [0, 70])

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background: subtle grid + slowly breathing glows */}
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/15 blur-[130px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-8%] top-1/3 h-[380px] w-[380px] rounded-full bg-accent-2/10 blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <motion.div variants={staggerContainer(0.09, 0.1)} initial="hidden" animate="show">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {t.hero.available}
          </motion.span>

          <motion.p variants={fadeUp} className="mt-8 font-mono text-sm text-accent">
            {t.hero.greeting}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-2 text-5xl font-extrabold tracking-tight text-text sm:text-6xl lg:text-7xl"
          >
            {displayName}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-2xl font-semibold sm:text-3xl">
            <span className="text-shimmer bg-linear-to-r from-accent via-accent-2 to-accent bg-clip-text text-transparent">
              {t.hero.role}
            </span>
          </motion.p>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t.hero.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary group">
              {t.hero.ctaProjects}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={profile.cvUrl} download className="btn btn-secondary">
              <Download size={16} />
              {t.hero.ctaCv}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
              <Github size={16} />
              GitHub
            </a>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-border border-y border-border py-5"
          >
            {t.hero.stats.map((stat) => (
              <div key={stat.label} className="px-4 first:pl-0 last:pr-0">
                <dd className="text-2xl font-bold tracking-tight text-text">
                  <CountUp value={stat.value} />
                </dd>
                <dt className="mt-1 text-xs leading-snug text-muted">{stat.label}</dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div style={{ y: portraitY }} className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-linear-to-br from-accent/30 via-transparent to-accent-2/30 blur-2xl" />

            <motion.div {...float(8, 6)} className="card relative overflow-hidden rounded-[2rem] p-2">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src={profile.avatar}
                  alt={displayName}
                  width={473}
                  height={591}
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg/55 via-transparent to-transparent" />
              </div>
            </motion.div>

            <motion.div
              {...float(6, 5, 0.6)}
              className="card absolute -bottom-5 -left-4 flex items-center gap-2 px-4 py-3 text-sm float-shadow sm:-left-8"
            >
              <MapPin size={14} className="text-accent" />
              <span>{t.hero.location}</span>
            </motion.div>

            <motion.div
              {...float(7, 7, 1.2)}
              className="card absolute -top-5 -right-4 px-4 py-3 font-mono text-xs float-shadow sm:-right-8"
            >
              <span className="text-accent-2">const</span> <span className="text-text">stack</span>{' '}
              <span className="text-muted">=</span> [<span className="text-success">'NestJS'</span>,{' '}
              <span className="text-success">'React'</span>]
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
