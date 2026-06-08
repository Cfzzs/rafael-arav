'use client'

import { clientLogos } from '@/lib/data'

/**
 * Auto-scrolling ticker strip showing client company names.
 * The track is duplicated so the loop is seamless.
 */
export default function ClientsStrip() {
  // Duplicate so the loop is seamless
  const logos = [...clientLogos, ...clientLogos]

  return (
    <section
      id="clientes"
      aria-label="Empresas que já contrataram Rafael Aragão"
      className="relative bg-brand-graphite-dark border-y border-white/5 py-10 overflow-hidden"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-brand-graphite-dark to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-brand-graphite-dark to-transparent z-10" />

      <p className="text-center font-body text-xs uppercase tracking-[0.25em] text-brand-offwhite/40 mb-6">
        Mais de{' '}
        <span className="text-brand-amber font-semibold">200 empresas</span>
        {' '}já transformaram seus eventos
      </p>

      <div className="ticker-wrapper flex overflow-hidden">
        <div className="ticker-track flex gap-14 animate-ticker-left whitespace-nowrap">
          {logos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex flex-col items-center justify-center flex-shrink-0 group"
            >
              {/* Text-based logo — replace with <Image> when assets are available */}
              <span className="font-headline font-bold text-xl md:text-2xl text-brand-offwhite/25 group-hover:text-brand-amber/80 transition-colors duration-300 select-none">
                {logo.name}
              </span>
              <span className="font-body text-[10px] text-brand-offwhite/15 uppercase tracking-widest mt-0.5">
                {logo.sector}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
