import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Github, Loader2, Mail, MapPin, Phone, Send, type LucideIcon } from 'lucide-react'
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

type Status = 'idle' | 'sending' | 'success' | 'error'

type FormSubmitResponse = { success?: string | boolean; message?: string }

export function Contact() {
  const { t } = useLang()
  const form = t.contact.form
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return

    const formEl = event.currentTarget
    const data = new FormData(formEl)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const subject = String(data.get('subject') ?? '').trim() || form.defaultSubject
    const message = String(data.get('message') ?? '').trim()

    // Honeypot: real users never see this field, bots tend to fill it.
    if (String(data.get('_honey') ?? '')) {
      formEl.reset()
      setStatus('success')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(profile.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _subject: `[Portfolio] ${subject}`,
          _replyto: email,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const json = (await res.json().catch(() => null)) as FormSubmitResponse | null
      const ok = res.ok && (json?.success === 'true' || json?.success === true)
      if (!ok) throw new Error(json?.message ?? `HTTP ${res.status}`)

      formEl.reset()
      setStatus('success')
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setStatus('error')
    }
  }

  const sending = status === 'sending'

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
          <form onSubmit={onSubmit} noValidate={false} className="card p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-text">{form.title}</h3>

            {/* Honeypot (hidden from people, visible to naive bots) */}
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-2 block text-muted">{form.name}</span>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={form.namePlaceholder}
                  className="field"
                  disabled={sending}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-muted">{form.email}</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={form.emailPlaceholder}
                  className="field"
                  disabled={sending}
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-2 block text-muted">{form.subject}</span>
                <input name="subject" type="text" placeholder={form.subjectPlaceholder} className="field" disabled={sending} />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-2 block text-muted">{form.message}</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder={form.messagePlaceholder}
                  className="field resize-y"
                  disabled={sending}
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted">{form.hint}</p>
              <button type="submit" className="btn btn-primary group disabled:cursor-wait disabled:opacity-70" disabled={sending}>
                {sending ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Send size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
                {sending ? form.sending : form.submit}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.p
                  key="success"
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-5 flex items-start gap-2.5 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-text"
                >
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" />
                  <span>{form.success}</span>
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  key="error"
                  role="alert"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-5 flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-text"
                >
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
                  <span>
                    {form.error}{' '}
                    <a href={`mailto:${profile.email}`} className="underline underline-offset-2 hover:text-accent">
                      {profile.email}
                    </a>
                    .
                  </span>
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
