'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  /** Target number to count up to */
  end:        number
  /** Animation duration in milliseconds (default: 2000) */
  duration?:  number
  /** Text appended after the number (e.g. "+", "k") */
  suffix?:    string
  /** Text prepended before the number (e.g. "$") */
  prefix?:    string
  /** Label displayed below the number */
  label:      string
  /** Extra classes for the wrapper */
  className?: string
}

/**
 * Animates a number from 0 to `end` when the element enters the viewport.
 * Uses requestAnimationFrame for smooth 60fps counting.
 */
export default function AnimatedCounter({
  end,
  duration  = 2000,
  suffix    = '',
  prefix    = '',
  label,
  className,
}: AnimatedCounterProps) {
  const [count, setCount]         = useState(0)
  const animationRef              = useRef<number | null>(null)
  const { ref, inView }           = useInView<HTMLDivElement>({ threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    if (!inView) return

    const startTime = performance.now()

    const step = (currentTime: number) => {
      const elapsed  = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }

    animationRef.current = requestAnimationFrame(step)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [inView, end, duration])

  return (
    <div
      ref={ref}
      className={cn('flex flex-col items-center text-center', className)}
    >
      <span
        aria-live="polite"
        className="font-headline text-5xl md:text-6xl font-extrabold text-gradient-brand leading-none tabular-nums"
      >
        {prefix}{count}{suffix}
      </span>
      <span className="mt-2 font-body text-sm md:text-base text-brand-offwhite/60 uppercase tracking-widest">
        {label}
      </span>
    </div>
  )
}
