'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedCounter from '@/components/AnimatedCounter'
import { heroStats } from '@/lib/data'
import { openWhatsApp } from '@/lib/utils'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden:   { opacity: 0, y: 32 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  /* Subtle parallax on the video layer */
  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const scrollToForm = () => {
    document.getElementById('orcamento')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToFormats = () => {
    document.getElementById('formatos')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-brand-graphite-dark"
      aria-label="Seção principal"
    >
      {/* ── Video / background layer ─────────────────── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[110%] -top-[5%]"
        aria-hidden="true"
      >
        {/*
          Replace the src with your actual show reel video.
          Fallback gradient is shown when video can't play.
        */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          aria-hidden="true"
          preload="none"
        >
          <source src="/hero-loop.mp4"  type="video/mp4" />
          <source src="/hero-loop.webm" type="video/webm" />
        </video>

        {/* Fallback gradient when no video */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-graphite-dark via-brand-graphite to-brand-graphite-mid" />

        {/* Overlay for readability */}
        <div className="absolute inset-0 video-overlay" />

        {/* Decorative amber glow orb */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-brand-amber/10 blur-[100px]" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-orange/8 blur-[100px]" />
      </motion.div>

      {/* ── Content ──────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Eyebrow tag */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 font-body text-sm font-medium text-brand-amber bg-brand-amber/10 border border-brand-amber/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse" />
              Stand-up Corporativo · SIPAT · Palestras Humorísticas
            </span>
          </motion.div>

          {/* H1 — Headline principal */}
          <motion.h1
            variants={itemVariants}
            className="font-headline text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            Cansado de eventos que{' '}
            <span className="text-gradient-brand">
              sua equipe esquece
            </span>{' '}
            antes de chegar em casa?
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="font-body text-lg sm:text-xl text-brand-offwhite/75 leading-relaxed mb-10 max-w-2xl"
          >
            Rafael Aragão combina humor inteligente com conteúdo personalizado para
            a realidade da <em className="not-italic text-brand-offwhite font-medium">sua empresa</em>.
            Mais de{' '}
            <strong className="text-brand-amber font-semibold">200 organizações</strong>
            {' '}já descobriram que rir junto é a forma mais poderosa de conectar equipes.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              id="hero-cta-primary"
              onClick={scrollToForm}
              className="btn-primary text-base px-8 py-4"
            >
              Solicitar Proposta Personalizada →
            </button>
            <button
              id="hero-cta-secondary"
              onClick={scrollToFormats}
              className="btn-secondary text-base px-8 py-4"
            >
              Ver Como Funciona ↓
            </button>
          </motion.div>

          {/* Urgency nudge */}
          <motion.p
            variants={itemVariants}
            className="mt-5 font-body text-sm text-brand-offwhite/40 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse flex-shrink-0" />
            Agenda com vagas limitadas para o 2º semestre
          </motion.p>
        </motion.div>

        {/* ── Stats row ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 pt-10 border-t border-white/10"
          aria-label="Números do Rafael Aragão"
        >
          {heroStats.map(stat => (
            <AnimatedCounter
              key={stat.label}
              end={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              duration={2200}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-body text-xs text-brand-offwhite/30 uppercase tracking-widest">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-amber/60 to-transparent animate-float" />
      </motion.div>
    </section>
  )
}
