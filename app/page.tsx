'use client'

import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ClientsStrip from '@/components/ClientsStrip'
import PainSolutionSection from '@/components/PainSolutionSection'
import ShowFormatsSection from '@/components/ShowFormatsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import BudgetForm from '@/components/BudgetForm'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col font-body">
      <Header />
      
      <HeroSection />
      
      <ClientsStrip />
      
      <PainSolutionSection />
      
      <ShowFormatsSection />
      
      <TestimonialsSection />
      
      {/* ── Budget Form Section ────────────────────────────────────────── */}
      <section 
        id="orcamento" 
        className="py-24 lg:py-32 bg-brand-offwhite relative"
        aria-labelledby="budget-heading"
      >
        <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-graphite pointer-events-none" aria-hidden="true" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-card-dark border border-gray-100 overflow-hidden">
            
            {/* Form header */}
            <div className="bg-brand-graphite p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23F5A623\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-spin-slow pointer-events-none" />
              
              <h2 id="budget-heading" className="relative z-10 font-headline text-3xl sm:text-4xl font-bold text-brand-offwhite mb-3">
                Vamos criar algo <span className="text-gradient-brand">único</span> para o seu time?
              </h2>
              <p className="relative z-10 font-body text-brand-offwhite/60 text-base max-w-xl mx-auto">
                Preencha o formulário abaixo. Retornamos em até <strong className="text-brand-amber">24 horas úteis</strong> com uma proposta personalizada.
              </p>
            </div>

            {/* Form body */}
            <div className="p-8 sm:p-12">
              <BudgetForm />
            </div>
            
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-brand-graphite-dark border-t border-white/5 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          
          <div>
            <div className="flex items-center gap-2.5 justify-center md:justify-start mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-brand-glow-sm">
                <span className="font-headline font-extrabold text-brand-graphite text-xs">RA</span>
              </div>
              <span className="font-headline font-bold text-brand-offwhite text-lg tracking-tight">
                Rafael Aragão
              </span>
            </div>
            <p className="font-body text-brand-offwhite/40 text-sm max-w-xs">
              Stand-up corporativo, palestras e intervenções que engajam, motivam e conectam equipes.
            </p>
          </div>

          <div className="font-body text-sm text-brand-offwhite/30 flex flex-col items-center md:items-end gap-2">
            <p>&copy; {new Date().getFullYear()} Rafael Aragão. Todos os direitos reservados.</p>
            <p>CNPJ: 00.000.000/0001-00</p>
          </div>

        </div>
      </footer>
    </main>
  )
}
