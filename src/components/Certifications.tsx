import { Award } from 'lucide-react'
import { Section } from './ui/Section'
import { StaggerGroup, StaggerItem } from './ui/Stagger'
import { useLang } from '../i18n/LanguageContext'

export function Certifications() {
  const { t } = useLang()

  return (
    <Section id="certifications" label={t.certs.label} title={t.certs.title} subtitle={t.certs.subtitle}>
      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {t.certs.items.map((cert) => (
          <StaggerItem key={cert.title} className="h-full">
            <div className="card card-hover group flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-xl border border-border bg-surface-2 p-2.5 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Award size={18} className="text-accent" />
                </div>
                <span className="font-mono text-xs text-muted">{cert.year}</span>
              </div>
              <h3 className="mt-5 text-base font-semibold leading-snug text-text">{cert.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{cert.desc}</p>
              <p className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-widest text-muted/80">
                {cert.issuer}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  )
}
