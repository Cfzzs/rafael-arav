'use client'

import { useEffect, useRef, useState, RefObject } from 'react'

interface UseInViewOptions {
  /** Fraction of the element visible to trigger (0–1). Default: 0.15 */
  threshold?: number
  /** Only trigger once and stay true. Default: true */
  triggerOnce?: boolean
  /** Root margin for the IntersectionObserver. Default: '0px' */
  rootMargin?: string
}

interface UseInViewReturn<T extends Element> {
  ref:      RefObject<T>
  inView:   boolean
}

/**
 * Lightweight hook that uses IntersectionObserver to detect
 * when an element enters the viewport.
 */
export function useInView<T extends Element = HTMLDivElement>({
  threshold   = 0.15,
  triggerOnce = true,
  rootMargin  = '0px',
}: UseInViewOptions = {}): UseInViewReturn<T> {
  const ref     = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce) observer.disconnect()
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, triggerOnce, rootMargin])

  return { ref, inView }
}
