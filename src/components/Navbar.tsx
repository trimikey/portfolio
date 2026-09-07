import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Menu, Moon, Sun, X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'
import { profile, type Lang } from '../data/content'
import { EASE, fadeUp, staggerContainer } from './ui/Stagger'

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { t } = useLang()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t.nav.switchToLight : t.nav.switchToDark}
      title={isDark ? t.nav.switchToLight : t.nav.switchToDark}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:border-border-strong hover:text-text"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

const SECTIONS = ['about', 'experience', 'projects', 'skills', 'certifications', 'contact'] as const
type SectionId = (typeof SECTIONS)[number]

type LangToggleProps = { id: string; lang: Lang; setLang: (l: Lang) => void }

function LangToggle({ id, lang, setLang }: LangToggleProps) {
  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex rounded-lg border border-border bg-surface p-0.5 font-mono text-xs"
    >
      {(['en', 'vi'] as Lang[]).map((code) => {
        const active = lang === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`relative rounded-md px-2.5 py-1 uppercase transition-colors ${
              active ? 'text-bg' : 'text-muted hover:text-text'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${id}`}
                className="absolute inset-0 rounded-md bg-text"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{code}</span>
          </button>
        )
      })}
    </div>
  )
}

/** Tracks which page section currently crosses a thin band near the middle of the viewport. */
function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId
          if (entry.isIntersecting) setActive(id)
          else setActive((current) => (current === id ? null : current))
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}

export function Navbar() {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  const links = SECTIONS.map((id) => ({ id, label: t.nav[id] }))
  const solid = scrolled || open

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? 'border-border bg-bg/80 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight" aria-label="Back to top">
          <span className="text-text">{profile.initials}</span>
          <span className="text-accent">//</span>
          <span className="text-muted">DEV</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`relative block rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? 'text-text' : 'text-muted hover:text-text'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-md border border-border bg-surface-2"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <LangToggle id="desktop" lang={lang} setLang={setLang} />
          <a href={`mailto:${profile.email}`} className="btn btn-primary">
            <Mail size={14} />
            {t.nav.hire}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-t border-border bg-bg/95 backdrop-blur-md md:hidden"
          >
            <div className="px-6 py-4">
              <motion.ul variants={staggerContainer(0.05, 0.05)} initial="hidden" animate="show" className="flex flex-col">
                {links.map((link) => (
                  <motion.li key={link.id} variants={fadeUp}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      className={`block rounded-md px-2 py-3 text-base transition-colors hover:text-text ${
                        active === link.id ? 'text-text' : 'text-muted'
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LangToggle id="mobile" lang={lang} setLang={setLang} />
                </div>
                <a href={`mailto:${profile.email}`} className="btn btn-primary">
                  <Mail size={14} />
                  {t.nav.hire}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
