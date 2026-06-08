'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { showFormats } from '@/lib/data'
import { cn } from '@/lib/utils'
import type { ShowFormat } from '@/types'

const containerVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden:   { opacity: 0, y: 40 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

function FormatCard({ format }: { format: ShowFormat }) {
  const scrollToForm = () =>
    document.getElementById('orcamento')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        'group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-500',
        'hover:shadow-card-hover hover:-translate-y-1',
        format.accent
          ? 'bg-gradient-brand border-brand-amber/30 text-brand-graphite shadow-brand-glow-sm'
          : 'bg-white border-gray-100 text-brand-charcoal hover:border-brand-amber/30'
      )}
      aria-label={`Formato: ${format.title}`}
    >
      {/* Featured badge */}
      {format.accent && (
        <div className="absolute top-4 right-4">
          <span className="font-body text-[10px] font-semibold uppercase tracking-widest bg-brand-graphite/20 text-brand-graphite px-3 py-1 rounded-full backdrop-blur-sm">
            ⭐ Mais contratado
          </span>
        </div>
      )}

      <div className="p-8 flex flex-col flex-1">
        {/* Icon */}
        <div
          className={cn(
            'text-5xl mb-5 transition-transform duration-300 group-hover:scale-110 origin-left w-fit',
          )}
          role="img"
          aria-hidden="true"
        >
          {format.icon}
        </div>

        {/* Title */}
        <h3
          className={cn(
            'font-headline text-2xl font-bold mb-3 leading-tight',
            format.accent ? 'text-brand-graphite' : 'text-brand-charcoal'
          )}
        >
          {format.title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            'font-body text-base leading-relaxed mb-6 flex-1',
            format.accent ? 'text-brand-graphite/80' : 'text-brand-charcoal/65'
          )}
        >
          {format.description}
        </p>

        {/* Meta info */}
        <div className="space-y-2 mb-8">
          <div className="flex items-start gap-2">
            <span
              className={cn(
                'font-body text-xs uppercase tracking-widest flex-shrink-0 mt-0.5',
                format.accent ? 'text-brand-graphite/60' : 'text-brand-amber'
              )}
            >
              Ideal para
            </span>
            <span
              className={cn(
                'font-body text-xs font-medium',
                format.accent ? 'text-brand-graphite/80' : 'text-brand-charcoal/70'
              )}
            >
              {format.idealFor}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'font-body text-xs uppercase tracking-widest flex-shrink-0',
                format.accent ? 'text-brand-graphite/60' : 'text-brand-amber'
              )}
            >
              Duração
            </span>
            <span
              className={cn(
                'font-body text-xs font-medium',
                format.accent ? 'text-brand-graphite/80' : 'text-brand-charcoal/70'
              )}
            >
              {format.duration}
            </span>
          </div>
        </div>

        {/* CTA button */}
        <button
          id={`format-cta-${format.id}`}
          onClick={scrollToForm}
          className={cn(
            'w-full font-body font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-300',
            'hover:scale-[1.02] active:scale-[0.98]',
            format.accent
              ? 'bg-brand-graphite text-brand-amber hover:bg-brand-graphite-dark hover:shadow-brand-glow-sm'
              : 'bg-gradient-brand text-brand-graphite hover:shadow-brand-glow'
          )}
        >
          {format.ctaLabel} →
        </button>
      </div>
    </motion.article>
  )
}

export default function ShowFormatsSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 })

  return (
    <section
      id="formatos"
      className="py-24 lg:py-32 bg-brand-offwhite"
      aria-labelledby="formats-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-xs uppercase tracking-[0.3em] text-brand-amber mb-4">
            Formatos disponíveis
          </span>
          <h2
            id="formats-heading"
            className="font-headline text-4xl sm:text-5xl font-bold text-brand-charcoal leading-tight"
          >
            Um formato para cada{' '}
            <span className="text-gradient-brand">desafio do seu evento</span>
          </h2>
          <p className="mt-5 font-body text-brand-charcoal/60 text-lg max-w-2xl mx-auto">
            Cada apresentação é pensada do zero para a cultura, o vocabulário e os objetivos da sua empresa.
            Nenhum show é igual ao anterior.
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Formatos de show"
        >
          {showFormats.map(format => (
            <FormatCard key={format.id} format={format} />
          ))}
        </motion.div>

        {/* Bottom note */}
        <p className="text-center font-body text-sm text-brand-charcoal/40 mt-12">
          Não encontrou o formato ideal?{' '}
          <button
            onClick={() => document.getElementById('orcamento')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-brand-amber hover:underline transition-colors"
          >
            Fale conosco para um pacote personalizado
          </button>
        </p>
      </div>
    </section>
  )
}
