import { GraduationCap } from 'lucide-react'
import { Section } from './ui/Section'
import { Reveal } from './ui/Reveal'
import { Tag } from './ui/Tag'
import { useLang } from '../i18n/LanguageContext'
import { profile } from '../data/content'

function ManifestCard() {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted">developer_manifest.json</span>
      </div>
      <pre className="max-w-full overflow-x-auto p-5 font-mono text-[13px] leading-6 text-muted">
        <code>
          {'{\n'}
          {'  '}<span className="text-accent-2">"profile"</span>: <span className="text-success">"{profile.name}"</span>,{'\n'}
          {'  '}<span className="text-accent-2">"role"</span>: <span className="text-success">"Fullstack Web Developer"</span>,{'\n'}
          {'  '}<span className="text-accent-2">"core"</span>: [<span className="text-success">"React"</span>, <span className="text-success">"NestJS"</span>, <span className="text-success">"TypeScript"</span>],{'\n'}
          {'  '}<span className="text-accent-2">"data"</span>: [<span className="text-success">"PostgreSQL"</span>, <span className="text-success">"MySQL"</span>, <span className="text-success">"MongoDB"</span>, <span className="text-success">"Redis"</span>],{'\n'}
          {'  '}<span className="text-accent-2">"realtime"</span>: [<span className="text-success">"Socket.io"</span>, <span className="text-success">"WebRTC"</span>],{'\n'}
          {'  '}<span className="text-accent-2">"status"</span>: <span className="text-success">"ready_for_deployment"</span>{'\n'}
          {'}'}
        </code>
      </pre>
    </div>
  )
}

export function About() {
  const { t } = useLang()
  const edu = t.about.education

  return (
    <Section id="about" label={t.about.label} title={t.about.title}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <div className="space-y-5 leading-relaxed text-muted">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <blockquote className="border-l-2 border-accent pl-5 text-text italic">
              &ldquo;{t.about.quote}&rdquo;
            </blockquote>
          </div>
        </Reveal>

        <div className="space-y-5">
          <Reveal delay={0.1}>
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl border border-border bg-surface-2 p-3">
                  <GraduationCap size={22} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">{edu.label}</p>
                  <h3 className="mt-1 text-lg font-semibold text-text">{edu.school}</h3>
                  <p className="text-sm text-muted">{edu.degree}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Tag>{edu.period}</Tag>
                    <Tag>{edu.gpa}</Tag>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{edu.desc}</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <ManifestCard />
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
