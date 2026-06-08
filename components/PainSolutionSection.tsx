'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { painSolutionCards } from '@/lib/data'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}

const cardVariants = {
  hidden:   { opacity: 0, y: 36 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function PainSolutionSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section
      id="sobre"
      className="relative bg-gradient-dark-section py-24 lg:py-32 overflow-hidden"
      aria-labelledby="pain-solution-heading"
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-amber/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-orange/5 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-xs uppercase tracking-[0.3em] text-brand-amber mb-4">
            Reconhece algum destes cenários?
          </span>
          <h2
            id="pain-solution-heading"
            className="font-headline text-4xl sm:text-5xl font-bold text-brand-offwhite leading-tight"
          >
            Eventos que deveriam{' '}
            <span className="text-gradient-brand">motivar</span>
            ,<br className="hidden sm:block" />
            mas acabam sendo só{' '}
            <span className="relative inline-block">
              <span className="line-through text-brand-offwhite/30">mais do mesmo</span>
            </span>
          </h2>
          <p className="mt-5 font-body text-brand-offwhite/60 text-lg max-w-2xl mx-auto">
            O humor corporativo não é entretenimento — é uma ferramenta estratégica de engajamento. Veja como o Rafael transforma cada desafio.
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label="Problemas e soluções"
        >
          {painSolutionCards.map((card, idx) => (
            <motion.article
              key={idx}
              variants={cardVariants}
              role="listitem"
              className="group relative rounded-2xl overflow-hidden bg-brand-graphite-mid border border-white/5 hover:border-brand-amber/20 transition-all duration-500 hover:shadow-card-hover"
            >
              {/* Hover glow overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-amber/5 to-transparent pointer-events-none" />

              <div className="relative p-8">
                {/* Icon */}
                <div className="text-4xl mb-6" role="img" aria-label={`Ícone ${card.icon}`}>
                  {card.icon}
                </div>

                {/* Pain block */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-400/70 flex-shrink-0" />
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-red-400/70">
                      O problema
                    </span>
                  </div>
                  <p className="font-body text-brand-offwhite/50 text-base leading-relaxed line-through decoration-red-400/30">
                    {card.pain}
                  </p>
                </div>

                {/* Divider */}
                <div className="relative my-6 flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/10" />
                  <div className="w-7 h-7 rounded-full bg-gradient-brand flex items-center justify-center flex-shrink-0 shadow-brand-glow-sm">
                    <svg className="w-3.5 h-3.5 text-brand-graphite" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Solution block */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-amber flex-shrink-0" />
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-brand-amber">
                      A solução
                    </span>
                  </div>
                  <p className="font-body text-brand-offwhite font-medium text-base leading-relaxed">
                    {card.solution}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center mt-14"
        >
          <p className="font-body text-brand-offwhite/50 text-base mb-6">
            Cada show é 100% pesquisado e customizado para a cultura da sua empresa.{' '}
            <span className="text-brand-amber">Nenhum show é igual ao anterior.</span>
          </p>
          <button
            onClick={() => document.getElementById('orcamento')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Solicitar Proposta Personalizada →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
