import { type ReactNode } from 'react'
import { motion } from 'motion/react'
import { ScrambleText } from './ScrambleText'

interface SectionHeaderProps {
  id: string
  index: string
  command: string
  title: string
  description?: ReactNode
  aside?: ReactNode
}

/** "$ command" prompt + decrypting headline. */
export function SectionHeader({ id, index, command, title, description, aside }: SectionHeaderProps) {
  return (
    <div className="mb-14 flex flex-col gap-8 sm:mb-20 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 flex items-center gap-3 font-mono text-xs text-muted-foreground"
        >
          <span className="text-accent">[{index}]</span>
          <motion.span
            aria-hidden="true"
            className="h-px w-10 origin-left bg-border-highlight"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
          <span>
            <span className="text-subtle">$</span> {command}
          </span>
        </motion.p>
        <h2
          id={`${id}-heading`}
          className="text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-foreground"
        >
          <ScrambleText text={title} duration={900} />
        </h2>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
      {aside && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0"
        >
          {aside}
        </motion.div>
      )}
    </div>
  )
}
