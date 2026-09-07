import type { FormEvent } from 'react'
import { Github, Mail, MapPin, Phone, Send, type LucideIcon } from 'lucide-react'
import { Section } from './ui/Section'
import { Reveal } from './ui/Reveal'
import { StaggerGroup, StaggerItem } from './ui/Stagger'
import { useLang } from '../i18n/LanguageContext'
import { profile } from '../data/content'

type InfoCardProps = { icon: LucideIcon; label: string; value: string; href?: string }

function InfoCard({ icon: Icon, label, value, href }: InfoCardProps) {
  const inner = (
    <>
      <div className="rounded-xl border border-border bg-surface-2 p-2.5 transition-transform duration-300 group-hover:scale-110">
        <Icon size={18} className="text-accent" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium text-text">{value}</p>
      </div>
    </>
  )
  const className = 'card card-hover group flex items-center gap-4 p-4'

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={className}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
      >
        {inner}
      </a>
    )
  }
  return <div className={className}>{inner}</div>
}

export function Contact() {
  const { t } = useLang()
  const form = t.contact.form

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const subject = String(data.get('subject') ?? '').trim() || form.defaultSubject
    const message = String(data.get('message') ?? '').trim()

    const body = `${message}\n\n--\n${name}\n${email}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <Section id="contact" label={t.contact.label} title={t.contact.title} subtitle={t.contact.subtitle}>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div>
          <StaggerGroup className="grid gap-3" stagger={0.08}>
            <StaggerItem>
              <InfoCard icon={Mail} label={t.contact.cards.email} value={profile.email} href={`mailto:${profile.email}`} />
            </StaggerItem>
            <StaggerItem>
              <InfoCard icon={Phone} label={t.contact.cards.phone} value={profile.phoneIntlDisplay} href={profile.phoneHref} />
            </StaggerItem>
            <StaggerItem>
              <InfoCard
                icon={Github}
                label={t.contact.cards.github}
                value={profile.github.replace(/^https?:\/\//, '')}
                href={profile.github}
              />
            </StaggerItem>
            <StaggerItem>
              <InfoCard icon={MapPin} label={t.contact.cards.location} value={`${profile.location} (${profile.timezone})`} />
            </StaggerItem>
          </StaggerGroup>
          <Reveal delay={0.3}>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted">
              <span className="inline-block h-2 w-2 rounded-full bg-success" />
              {t.contact.availability}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form onSubmit={onSubmit} className="card p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-text">{form.title}</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-2 block text-muted">{form.name}</span>
                <input name="name" type="text" required autoComplete="name" placeholder={form.namePlaceholder} className="field" />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-muted">{form.email}</span>
                <input name="email" type="email" required autoComplete="email" placeholder={form.emailPlaceholder} className="field" />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-2 block text-muted">{form.subject}</span>
                <input name="subject" type="text" placeholder={form.subjectPlaceholder} className="field" />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-2 block text-muted">{form.message}</span>
                <textarea name="message" required rows={5} placeholder={form.messagePlaceholder} className="field resize-y" />
              </label>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted">{form.hint}</p>
              <button type="submit" className="btn btn-primary group">
                <Send size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                {form.submit}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
