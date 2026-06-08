'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { testimonials } from '@/lib/data'

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function TestimonialsSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section
      id="depoimentos"
      className="py-24 lg:py-32 bg-brand-graphite relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-amber/30 to-transparent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block font-body text-xs uppercase tracking-[0.3em] text-brand-amber mb-4">
            Prova social
          </span>
          <h2
            id="testimonials-heading"
            className="font-headline text-4xl sm:text-5xl font-bold text-brand-offwhite"
          >
            O que as empresas dizem{' '}
            <span className="text-gradient-brand">depois do show</span>
          </h2>
          <p className="mt-4 font-body text-brand-offwhite/50 text-lg">
            Resultados reais. Empresas reais. Sem roteiro ensaiado.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          role="list"
          aria-label="Depoimentos de clientes"
        >
          {testimonials.map((t, i) => (
            <motion.article
              key={i}
              variants={itemVariants}
              role="listitem"
              className="group relative bg-brand-graphite-mid border border-white/5 rounded-2xl p-8
                         hover:border-brand-amber/20 hover:shadow-card-hover transition-all duration-500"
            >
              {/* Quote mark */}
              <div className="text-6xl font-headline text-brand-amber/15 leading-none mb-4 select-none" aria-hidden="true">
                "
              </div>

              <blockquote className="font-body text-brand-offwhite/75 text-base leading-relaxed mb-8 italic">
                {t.quote}
              </blockquote>

              <footer className="flex items-center gap-4 pt-6 border-t border-white/5">
                {/* Avatar placeholder */}
                <div className="w-11 h-11 rounded-full bg-gradient-brand flex items-center justify-center flex-shrink-0 shadow-brand-glow-sm">
                  <span className="font-headline font-bold text-brand-graphite text-sm">
                    {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold text-brand-offwhite text-sm">{t.name}</p>
                  <p className="font-body text-brand-offwhite/40 text-xs">{t.role} · {t.company}</p>
                </div>
              </footer>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
