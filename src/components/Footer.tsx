import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { profile } from '../data/content'

const SECTIONS = ['about', 'experience', 'projects', 'skills', 'certifications', 'contact'] as const

export function Footer() {
  const { t, lang } = useLang()
  const displayName = lang === 'vi' ? profile.nameVi : profile.name

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
              <span className="text-text">{profile.initials}</span>
              <span className="text-accent">//</span>
              <span className="text-muted">DEV</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{t.footer.tagline}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <MapPin size={14} className="text-accent" />
              {profile.location} ({profile.timezone})
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted">{t.footer.navTitle}</h4>
            <ul className="mt-4 space-y-2.5">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-sm text-muted transition-colors hover:text-text">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted">{t.footer.channelsTitle}</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-muted transition-colors hover:text-text">
                  <Mail size={14} /> {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.phoneHref} className="inline-flex items-center gap-2 text-muted transition-colors hover:text-text">
                  <Phone size={14} /> {profile.phoneIntlDisplay}
                </a>
              </li>
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-text"
                >
                  <Github size={14} /> github.com/trimikey
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-text"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {profile.year} {displayName}. {t.footer.rights}
          </p>
          <p>{t.footer.built}</p>
        </div>
      </div>
    </footer>
  )
}
