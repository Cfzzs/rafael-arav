import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely, resolving conflicts */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/** Format a number to a human-readable string (e.g. 1500 → "1.5k") */
export function formatCount(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`
  }
  return value.toString()
}

/** Slugify a string for use in IDs */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** Open WhatsApp with a pre-filled message */
export function openWhatsApp(message?: string): void {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5511999999999'
  const text = encodeURIComponent(
    message ??
      'Olá! Vi o site do Rafael Aragão e tenho interesse em contratar um show para minha empresa. Pode me ajudar?'
  )
  window.open(`https://wa.me/${number}?text=${text}`, '_blank', 'noopener')
}
