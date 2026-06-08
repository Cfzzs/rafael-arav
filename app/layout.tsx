import type { Metadata, Viewport } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'

/* ── Google Fonts ────────────────────────────────── */
const sora = Sora({
  subsets:  ['latin'],
  variable: '--font-sora',
  weight:   ['400', '600', '700', '800'],
  display:  'swap',
})

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  weight:   ['400', '500', '600'],
  display:  'swap',
})

/* ── SEO Metadata ────────────────────────────────── */
export const metadata: Metadata = {
  title:       'Rafael Aragão | Stand-up Corporativo & Palestras Humorísticas para Empresas',
  description:
    'Transforme seu evento corporativo com humor inteligente e personalizado. Stand-up corporativo, CIPA/SIPAT, convenções de vendas e palestras humorísticas. Mais de 200 empresas atendidas. Solicite um orçamento.',
  keywords: [
    'stand-up corporativo',
    'palestrante humorístico',
    'show para empresa',
    'comédia corporativa',
    'CIPA SIPAT',
    'convenção de vendas humor',
    'Rafael Aragão',
    'humorista empresas',
  ],
  authors:   [{ name: 'Rafael Aragão' }],
  openGraph: {
    type:        'website',
    locale:      'pt_BR',
    title:       'Rafael Aragão | Stand-up Corporativo para Empresas',
    description: 'Humor inteligente que engaja, motiva e transforma eventos corporativos.',
    siteName:    'Rafael Aragão Corporate',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Rafael Aragão | Stand-up Corporativo',
    description: 'Humor inteligente que engaja, motiva e transforma eventos corporativos.',
  },
  robots: {
    index:  true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor:    '#1A1A2E',
  width:         'device-width',
  initialScale:  1,
  maximumScale:  5,
}

/* ── Root Layout ─────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body bg-brand-graphite text-brand-offwhite antialiased">
        {children}
      </body>
    </html>
  )
}
