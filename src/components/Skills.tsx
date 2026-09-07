import { motion } from 'framer-motion'
import { Code2, Database, Languages, Radio, Server, type LucideIcon } from 'lucide-react'
import { Section } from './ui/Section'
import { Reveal } from './ui/Reveal'
import { StaggerGroup, StaggerItem, scaleIn, staggerContainer } from './ui/Stagger'
import { useLang } from '../i18n/LanguageContext'
import type { SkillGroupKey } from '../data/content'

const ICONS: Record<SkillGroupKey, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  devops: Radio,
}

export function Skills() {
  const { t } = useLang()

  return (
    <Section id="skills" label={t.skills.label} title={t.skills.title} subtitle={t.skills.subtitle}>
      <StaggerGroup className="grid gap-5 sm:grid-cols-2" stagger={0.1}>
        {t.skills.groups.map((group) => {
          const Icon = ICONS[group.key]
          return (
            <StaggerItem key={group.key} className="h-full">
              <div className="card card-hover group h-full p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-border bg-surface-2 p-2.5 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-text">{group.title}</h3>
                </div>
                <motion.ul variants={staggerContainer(0.04, 0.15)} className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <motion.li
                      key={item}
                      variants={scaleIn}
                      whileHover={{ y: -3 }}
                      className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm text-text/90 transition-colors hover:border-accent/50 hover:text-text"
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerGroup>

      <Reveal delay={0.1}>
        <div className="card mt-5 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-border bg-surface-2 p-2.5">
              <Languages size={18} className="text-accent" />
            </div>
            <h3 className="text-base font-semibold text-text">{t.skills.languages.title}</h3>
          </div>
          <dl className="grid flex-1 gap-4 sm:grid-cols-2">
            {t.skills.languages.items.map((item) => (
              <div key={item.name}>
                <dt className="text-sm font-medium text-text">{item.name}</dt>
                <dd className="text-sm text-muted">{item.level}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  )
}
