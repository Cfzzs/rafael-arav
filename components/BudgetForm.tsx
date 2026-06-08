'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { BudgetFormData, EventType, AttendeeRange, DateStatus } from '@/types'

// ─── Zod Schemas per step ────────────────────────────────────────────────────

const step1Schema = z.object({
  fullName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  role:     z.string().min(2, 'Cargo é obrigatório'),
  company:  z.string().min(2, 'Nome da empresa é obrigatório'),
  cnpj:     z.string().optional(),
  email:    z.string().email('E-mail corporativo inválido'),
  phone:    z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
})

const step2Schema = z.object({
  eventType:       z.enum(['convention','party','sipat','training','kickoff','other'] as const),
  eventTypeOther:  z.string().optional(),
  eventDate:       z.string().min(1, 'Data do evento é obrigatória'),
  city:            z.string().min(2, 'Cidade / Estado é obrigatório'),
  attendees:       z.enum(['50-100','100-300','300-500','500-1000','1000+'] as const),
  customTheme:     z.boolean().optional(),
})

const step3Schema = z.object({
  howFound:           z.enum(['instagram','referral','google','linkedin','seen_live','other']).optional(),
  hasConfirmedDate:   z.enum(['confirmed','planning','flexible'] as const),
  additionalMessage:  z.string().optional(),
})

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema)

type FormValues = z.infer<typeof fullSchema>

// ─── Helpers ─────────────────────────────────────────────────────────────────

const EVENT_TYPE_LABELS: Record<EventType, string> = {
  convention: '🏆 Convenção de Vendas',
  party:      '🎉 Confraternização / Festa',
  sipat:      '🔒 CIPA / SIPAT',
  training:   '🎓 Treinamento / Workshop',
  kickoff:    '🚀 Kick-off / Reunião de Estratégia',
  other:      '✏️ Outro (descrever abaixo)',
}

const ATTENDEE_OPTIONS: { value: AttendeeRange; label: string }[] = [
  { value: '50-100',    label: '50 – 100 colaboradores'    },
  { value: '100-300',   label: '100 – 300 colaboradores'   },
  { value: '300-500',   label: '300 – 500 colaboradores'   },
  { value: '500-1000',  label: '500 – 1.000 colaboradores' },
  { value: '1000+',     label: 'Mais de 1.000'             },
]

const HOW_FOUND_LABELS = {
  instagram:  'Instagram (@orafaelaragao)',
  referral:   'Indicação de parceiro',
  google:     'Google / Pesquisa',
  linkedin:   'LinkedIn',
  seen_live:  'Já vi ao vivo',
  other:      'Outro',
}

const DATE_STATUS_LABELS: Record<DateStatus, string> = {
  confirmed: '✅ Sim, data já está confirmada',
  planning:  '📅 Ainda em fase de planejamento',
  flexible:  '🔄 Tenho flexibilidade de datas',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface FieldProps {
  label:     string
  error?:    string
  required?: boolean
  children:  React.ReactNode
  hint?:     string
}

function Field({ label, error, required, children, hint }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-sm font-medium text-brand-charcoal/80">
        {label}
        {required && <span className="text-brand-amber ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="font-body text-xs text-brand-charcoal/40">{hint}</p>
      )}
      {error && (
        <p role="alert" className="font-body text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

const inputCls = cn(
  'w-full font-body text-sm text-brand-charcoal bg-white',
  'border border-gray-200 rounded-xl px-4 py-3',
  'placeholder:text-brand-charcoal/30',
  'transition-all duration-200',
  'focus:outline-none focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/20',
  'hover:border-gray-300'
)

const selectCls = cn(inputCls, 'cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23999\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem] pr-10')

// ─── Step components ──────────────────────────────────────────────────────────

function Step1({ register, errors }: { register: any; errors: any }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Nome completo" error={errors.fullName?.message} required>
        <input
          {...register('fullName')}
          id="fullName"
          type="text"
          placeholder="Ex: João Silva"
          className={inputCls}
          autoComplete="name"
        />
      </Field>

      <Field label="Cargo / Função" error={errors.role?.message} required>
        <input
          {...register('role')}
          id="role"
          type="text"
          placeholder="Ex: Gerente de RH, Diretor de Marketing"
          className={inputCls}
          autoComplete="organization-title"
        />
      </Field>

      <Field label="Nome da empresa" error={errors.company?.message} required>
        <input
          {...register('company')}
          id="company"
          type="text"
          placeholder="Ex: Empresa S.A."
          className={inputCls}
          autoComplete="organization"
        />
      </Field>

      <Field
        label="CNPJ"
        error={errors.cnpj?.message}
        hint="Opcional — facilita a emissão de nota fiscal"
      >
        <input
          {...register('cnpj')}
          id="cnpj"
          type="text"
          placeholder="00.000.000/0001-00"
          className={inputCls}
          autoComplete="off"
        />
      </Field>

      <Field label="E-mail corporativo" error={errors.email?.message} required>
        <input
          {...register('email')}
          id="email"
          type="email"
          placeholder="voce@empresa.com.br"
          className={inputCls}
          autoComplete="email"
        />
      </Field>

      <Field label="Telefone / WhatsApp" error={errors.phone?.message} required>
        <input
          {...register('phone')}
          id="phone"
          type="tel"
          placeholder="(11) 99999-9999"
          className={inputCls}
          autoComplete="tel"
        />
      </Field>
    </div>
  )
}

function Step2({ register, errors, watch }: { register: any; errors: any; watch: any }) {
  const eventType = watch('eventType') as EventType | undefined

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="sm:col-span-2">
        <Field label="Tipo de evento" error={errors.eventType?.message} required>
          <select {...register('eventType')} id="eventType" className={selectCls} defaultValue="">
            <option value="" disabled>Selecione o tipo de evento</option>
            {(Object.entries(EVENT_TYPE_LABELS) as [EventType, string][]).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Conditional: show text field when "other" is selected */}
      <AnimatePresence>
        {eventType === 'other' && (
          <motion.div
            key="eventTypeOther"
            className="sm:col-span-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Field label="Descreva o tipo de evento" error={errors.eventTypeOther?.message}>
              <input
                {...register('eventTypeOther')}
                id="eventTypeOther"
                type="text"
                placeholder="Descreva brevemente o seu evento"
                className={inputCls}
              />
            </Field>
          </motion.div>
        )}
      </AnimatePresence>

      <Field label="Data estimada do evento" error={errors.eventDate?.message} required>
        <input
          {...register('eventDate')}
          id="eventDate"
          type="date"
          className={inputCls}
          min={new Date().toISOString().split('T')[0]}
        />
      </Field>

      <Field label="Cidade / Estado" error={errors.city?.message} required>
        <input
          {...register('city')}
          id="city"
          type="text"
          placeholder="Ex: São Paulo, SP"
          className={inputCls}
          autoComplete="address-level2"
        />
      </Field>

      <div className="sm:col-span-2">
        <Field label="Número estimado de colaboradores" error={errors.attendees?.message} required>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3" role="radiogroup" aria-label="Número de colaboradores">
            {ATTENDEE_OPTIONS.map(opt => (
              <label
                key={opt.value}
                className={cn(
                  'relative flex flex-col items-center justify-center text-center',
                  'border rounded-xl px-3 py-4 cursor-pointer transition-all duration-200',
                  'font-body text-xs font-medium',
                  'hover:border-brand-amber/50 hover:bg-brand-amber/5'
                )}
              >
                <input
                  {...register('attendees')}
                  type="radio"
                  value={opt.value}
                  className="sr-only peer"
                  aria-label={opt.label}
                />
                <span className="peer-checked:text-brand-amber text-brand-charcoal/60 transition-colors">
                  {opt.label}
                </span>
                {/* Checked ring */}
                <span className="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-brand-amber peer-checked:bg-brand-amber/5 transition-all duration-200 pointer-events-none" />
              </label>
            ))}
          </div>
          {errors.attendees && (
            <p role="alert" className="mt-1.5 font-body text-xs text-red-500">{errors.attendees.message}</p>
          )}
        </Field>
      </div>

      {/* Conditional: custom theme checkbox for convention */}
      <AnimatePresence>
        {eventType === 'convention' && (
          <motion.div
            key="customTheme"
            className="sm:col-span-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                {...register('customTheme')}
                id="customTheme"
                type="checkbox"
                className="mt-0.5 w-5 h-5 rounded border-gray-300 text-brand-amber focus:ring-brand-amber/30 cursor-pointer flex-shrink-0"
              />
              <span className="font-body text-sm text-brand-charcoal/70 group-hover:text-brand-charcoal transition-colors">
                Desejo incluir um{' '}
                <strong className="text-brand-charcoal">tema motivacional personalizado</strong>
                {' '}(metas, produtos, cultura) integrado ao roteiro do show
              </span>
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Step3({ register, errors }: { register: any; errors: any }) {
  return (
    <div className="flex flex-col gap-6">
      <Field label="Como você conheceu o Rafael Aragão?" error={errors.howFound?.message}>
        <select {...register('howFound')} id="howFound" className={selectCls} defaultValue="">
          <option value="">Selecione (opcional)</option>
          {(Object.entries(HOW_FOUND_LABELS) as [string, string][]).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
      </Field>

      <Field label="A data do evento já está confirmada?" error={errors.hasConfirmedDate?.message} required>
        <div className="flex flex-col gap-2" role="radiogroup" aria-label="Status da data do evento">
          {(Object.entries(DATE_STATUS_LABELS) as [DateStatus, string][]).map(([val, label]) => (
            <label
              key={val}
              className={cn(
                'flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer',
                'font-body text-sm text-brand-charcoal/70 transition-all duration-200',
                'hover:border-brand-amber/40 hover:bg-brand-amber/5 hover:text-brand-charcoal'
              )}
            >
              <input
                {...register('hasConfirmedDate')}
                type="radio"
                value={val}
                className="w-4 h-4 text-brand-amber focus:ring-brand-amber/30 border-gray-300 cursor-pointer flex-shrink-0"
                aria-label={label}
              />
              {label}
            </label>
          ))}
        </div>
        {errors.hasConfirmedDate && (
          <p role="alert" className="font-body text-xs text-red-500 mt-1">{errors.hasConfirmedDate.message}</p>
        )}
      </Field>

      <Field label="Mensagem adicional" error={errors.additionalMessage?.message} hint="Opcional — compartilhe qualquer detalhe relevante sobre o evento">
        <textarea
          {...register('additionalMessage')}
          id="additionalMessage"
          rows={4}
          placeholder="Ex: Temos um tema específico, um produto para lançar, ou um desafio cultural que gostaríamos de abordar..."
          className={cn(inputCls, 'resize-none')}
        />
      </Field>
    </div>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  const steps = [
    { label: 'Seus dados',    icon: '👤' },
    { label: 'O evento',      icon: '📅' },
    { label: 'Finalizar',     icon: '🚀' },
  ]
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between relative">
        {/* Track line */}
        <div className="absolute top-5 left-0 right-0 h-px bg-gray-200" aria-hidden="true" />
        <motion.div
          className="absolute top-5 left-0 h-px bg-gradient-brand origin-left"
          animate={{ scaleX: (step - 1) / (total - 1) }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        {steps.map((s, i) => {
          const n       = i + 1
          const done    = n < step
          const active  = n === step
          return (
            <div key={n} className="relative flex flex-col items-center gap-2 z-10">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300',
                  done   && 'bg-gradient-brand shadow-brand-glow-sm',
                  active && 'bg-gradient-brand shadow-brand-glow ring-4 ring-brand-amber/20',
                  !done && !active && 'bg-white border-2 border-gray-200 grayscale'
                )}
                aria-current={active ? 'step' : undefined}
              >
                {done
                  ? <svg className="w-5 h-5 text-brand-graphite" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  : <span>{s.icon}</span>
                }
              </div>
              <span className={cn(
                'font-body text-xs text-center whitespace-nowrap transition-colors duration-200',
                active ? 'text-brand-amber font-semibold' : 'text-brand-charcoal/40'
              )}>
                {s.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="text-center py-12 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 18 }}
        className="w-20 h-20 rounded-full bg-gradient-brand mx-auto mb-6 flex items-center justify-center shadow-brand-glow"
      >
        <svg className="w-10 h-10 text-brand-graphite" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
      <h3 className="font-headline text-3xl font-bold text-brand-charcoal mb-3">
        Proposta enviada! 🎉
      </h3>
      <p className="font-body text-brand-charcoal/60 text-lg mb-2">
        Recebemos sua solicitação com sucesso.
      </p>
      <p className="font-body text-brand-charcoal/50 text-base mb-8 max-w-md mx-auto">
        Nossa equipe vai analisar as informações do seu evento e retornar com uma{' '}
        <strong className="text-brand-amber">proposta personalizada em até 24 horas úteis</strong>.
      </p>
      <a
        href="https://wa.me/5511999999999?text=Ol%C3%A1%21+Acabei+de+enviar+uma+solicita%C3%A7%C3%A3o+de+or%C3%A7amento+pelo+site."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20c05c] text-white font-body font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-card"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        Falar no WhatsApp agora
      </a>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

const TOTAL_STEPS = 3

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
}

export default function BudgetForm() {
  const [step,      setStep]      = useState(1)
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(fullSchema),
    mode:     'onTouched',
    defaultValues: {
      hasConfirmedDate: 'planning',
    },
  })

  const stepFields: Record<number, (keyof FormValues)[]> = {
    1: ['fullName', 'role', 'company', 'email', 'phone'],
    2: ['eventType', 'eventDate', 'city', 'attendees'],
    3: ['hasConfirmedDate'],
  }

  const goNext = async () => {
    const valid = await trigger(stepFields[step])
    if (!valid) return
    setDirection(1)
    setStep(s => s + 1)
  }

  const goPrev = () => {
    setDirection(-1)
    setStep(s => s - 1)
  }

  const onSubmit: SubmitHandler<FormValues> = async (_data) => {
    // Replace this with your actual API call or Zapier webhook
    // await fetch('/api/budget', { method: 'POST', body: JSON.stringify(data) })
    await new Promise(r => setTimeout(r, 1200)) // simulate network
    setSubmitted(true)
  }

  if (submitted) return <SuccessState />

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Formulário de orçamento personalizado"
    >
      <ProgressBar step={step} total={TOTAL_STEPS} />

      {/* Step content with slide animation */}
      <div className="relative overflow-hidden min-h-[360px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 1 && <Step1 register={register} errors={errors} />}
            {step === 2 && <Step2 register={register} errors={errors} watch={watch} />}
            {step === 3 && <Step3 register={register} errors={errors} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={goPrev}
          disabled={step === 1}
          className={cn(
            'font-body text-sm font-medium px-5 py-3 rounded-xl border transition-all duration-200',
            step === 1
              ? 'border-gray-200 text-brand-charcoal/25 cursor-not-allowed'
              : 'border-gray-300 text-brand-charcoal/60 hover:border-brand-amber/40 hover:text-brand-charcoal'
          )}
        >
          ← Voltar
        </button>

        <p className="font-body text-xs text-brand-charcoal/30">
          Etapa {step} de {TOTAL_STEPS}
        </p>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            className="btn-primary text-sm px-6 py-3"
          >
            Próximo →
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'btn-primary text-sm px-8 py-3',
              isSubmitting && 'opacity-70 cursor-not-allowed scale-100'
            )}
          >
            {isSubmitting
              ? <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Enviando...
                </span>
              : 'Enviar e Aguardar Proposta em 24h ✓'
            }
          </button>
        )}
      </div>
    </form>
  )
}
