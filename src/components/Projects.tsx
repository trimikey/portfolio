import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Github } from 'lucide-react'
import { Section } from './ui/Section'
import { Tag } from './ui/Tag'
import { StaggerGroup, StaggerItem, fadeUp, staggerContainer } from './ui/Stagger'
import { useLang } from '../i18n/LanguageContext'
import type { Project } from '../data/content'

type CardProps = { project: Project; roleLabel: string; sourceCode: string }

function ProjectCard({ project, roleLabel, sourceCode }: CardProps) {
  const repoLabel = project.github?.replace(/^https?:\/\/(www\.)?/, '')

  return (
    <article className="card card-hover flex h-full flex-col p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">{project.category}</p>
        <p className="font-mono text-xs text-muted">{project.period}</p>
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight text-text">{project.title}</h3>
      <p className="mt-1 text-sm text-muted">
        <span className="text-text/70">{roleLabel}:</span> {project.role}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

      <motion.ul variants={staggerContainer(0.07, 0.2)} className="mt-5 space-y-2.5">
        {project.highlights.map((point) => (
          <motion.li key={point} variants={fadeUp} className="flex items-start gap-2.5 text-sm text-muted">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" />
            <span>{point}</span>
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5 mt-6">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-text transition-colors hover:text-accent"
          >
            <Github size={16} />
            <span className="font-mono text-xs">{repoLabel}</span>
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="sr-only">{sourceCode}</span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm text-muted">
            <CheckCircle2 size={16} className="text-success" />
            {project.status}
          </span>
        )}
      </div>
    </article>
  )
}

export function Projects() {
  const { t } = useLang()

  return (
    <Section id="projects" label={t.projects.label} title={t.projects.title} subtitle={t.projects.subtitle}>
      <StaggerGroup className="grid gap-6 md:grid-cols-2" stagger={0.12}>
        {t.projects.items.map((project) => (
          <StaggerItem key={project.title} className="h-full">
            <ProjectCard project={project} roleLabel={t.projects.roleLabel} sourceCode={t.projects.sourceCode} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  )
}
