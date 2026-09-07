import { useLang } from '../i18n/LanguageContext'

/** Slow, infinite strip of the tech stack, paused on hover. Two copies of the list make the loop seamless. */
export function TechMarquee() {
  const { t } = useLang()
  const items = Array.from(new Set(t.skills.groups.flatMap((group) => group.items)))
  const loop = [...items, ...items]

  return (
    <div
      aria-hidden
      className="marquee relative overflow-hidden border-y border-border bg-surface/40 py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="marquee-track flex w-max items-center gap-10 pl-10">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{item}</span>
            <span className="h-1 w-1 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  )
}
