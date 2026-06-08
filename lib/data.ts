// ─────────────────────────────────────────────────────────────────────────────
// lib/data.ts  —  Static content data for the entire portal
// ─────────────────────────────────────────────────────────────────────────────
import type {
  HeroStat,
  PainSolutionCard,
  ShowFormat,
  ClientLogo,
  Testimonial,
} from '@/types'

/* ── Hero counters ──────────────────────────────────────────────────────────── */
export const heroStats: HeroStat[] = [
  { value: 200, suffix: '+',  label: 'Empresas Atendidas' },
  { value: 8,   suffix: '+',  label: 'Anos de Experiência' },
  { value: 500, suffix: '+',  label: 'Shows Realizados'   },
  { value: 22,  suffix: '',   label: 'Estados do Brasil'  },
]

/* ── Pain → Solution cards ──────────────────────────────────────────────────── */
export const painSolutionCards: PainSolutionCard[] = [
  {
    icon:     '😴',
    pain:     'Treinamentos que ninguém assiste até o fim — equipe no celular, olhar vago.',
    solution: 'Shows que prendem a atenção do começo ao fim com humor inteligente e conteúdo real.',
  },
  {
    icon:     '🎉',
    pain:     'Confraternizações sem engajamento real — mesas separadas, interação forçada.',
    solution: 'Intervenções que quebram o gelo e criam conexão genuína entre times inteiros.',
  },
  {
    icon:     '📉',
    pain:     'Convenções de vendas com equipe já desanimada antes de ouvir a primeira meta.',
    solution: 'Apresentações que energizam e motivam sem soar como mais um discurso motivacional.',
  },
  {
    icon:     '🏭',
    pain:     'CIPA e SIPAT que ninguém leva a sério — presença obrigatória, atenção zero.',
    solution: 'Conteúdo de segurança com humor inteligente: alto engajamento, aprendizado real.',
  },
]

/* ── Show formats ────────────────────────────────────────────────────────────── */
export const showFormats: ShowFormat[] = [
  {
    id:          'standup',
    icon:        '🎤',
    title:       'Stand-up Corporativo',
    description: 'Apresentação de comédia personalizada com a cultura, vocabulário e desafios da sua empresa. Cada detalhe é pesquisado antes do show.',
    idealFor:    'Confraternizações, kick-offs, encerramento de eventos',
    duration:    '30 – 60 min',
    ctaLabel:    'Quero este formato',
    accent:      false,
  },
  {
    id:          'convencao',
    icon:        '🏆',
    title:       'Convenção de Vendas',
    description: 'Abertura ou encerramento de convenções que energiza a equipe comercial. Humor estratégico que conecta os objetivos da empresa com a motivação do time.',
    idealFor:    'Convenções e kick-offs comerciais',
    duration:    '45 – 90 min',
    ctaLabel:    'Quero este formato',
    accent:      true,
  },
  {
    id:          'sipat',
    icon:        '🔒',
    title:       'CIPA & SIPAT',
    description: 'Segurança do trabalho nunca foi tão memorável. Conteúdo obrigatório apresentado com humor — sua equipe presta atenção e realmente aprende.',
    idealFor:    'Semana SIPAT, campanhas internas de segurança',
    duration:    '30 – 45 min',
    ctaLabel:    'Quero este formato',
    accent:      false,
  },
  {
    id:          'palestra',
    icon:        '🎓',
    title:       'Palestra Humorística',
    description: 'Temas customizados entregues com leveza e profundidade: liderança, diversidade, bem-estar, inovação. Conteúdo que permanece na memória muito depois do evento.',
    idealFor:    'Programas de D&I, saúde mental, liderança',
    duration:    '60 – 90 min',
    ctaLabel:    'Quero este formato',
    accent:      false,
  },
  {
    id:          'intervencao',
    icon:        '🎉',
    title:       'Intervenção em Evento',
    description: 'Icebreaker dinâmico entre blocos de conteúdo. Reacende a energia da plateia e garante que o próximo palestrante encontre uma audiência presente e engajada.',
    idealFor:    'Icebreaker, ativação entre blocos, dinâmicas',
    duration:    '15 – 30 min',
    ctaLabel:    'Quero este formato',
    accent:      false,
  },
  {
    id:          'pacote',
    icon:        '🎭',
    title:       'Pacote Temático',
    description: 'Combinação de formatos criada sob medida para eventos de longa duração. Um dia inteiro de conteúdo que equilibra profundidade com leveza estratégica.',
    idealFor:    'Eventos de 1 ou mais dias',
    duration:    'Sob consulta',
    ctaLabel:    'Solicitar proposta especial',
    accent:      false,
  },
]

/* ── Client logos ────────────────────────────────────────────────────────────── */
export const clientLogos: ClientLogo[] = [
  { name: 'Ambev',          sector: 'Bebidas'          },
  { name: 'Bradesco',       sector: 'Financeiro'       },
  { name: 'Embraer',        sector: 'Aeroespacial'     },
  { name: 'Natura',         sector: 'Cosméticos'       },
  { name: 'Totvs',          sector: 'Tecnologia'       },
  { name: 'Porto Seguro',   sector: 'Seguros'          },
  { name: 'Gerdau',         sector: 'Siderurgia'       },
  { name: 'Localiza',       sector: 'Mobilidade'       },
  { name: 'Cielo',          sector: 'Pagamentos'       },
  { name: 'Vivo',           sector: 'Telecom'          },
  { name: 'Itaú BBA',       sector: 'Financeiro'       },
  { name: 'Suzano',         sector: 'Papel & Celulose' },
]

/* ── Testimonials ────────────────────────────────────────────────────────────── */
export const testimonials: Testimonial[] = [
  {
    quote:   'Nossa equipe saiu completamente diferente. O Rafael pesquisou a nossa cultura antes de subir no palco e o resultado foi absurdo. Maior NPS de evento da nossa história.',
    name:    'Mariana Souza',
    role:    'Gerente de RH',
    company: 'Totvs',
  },
  {
    quote:   'Contratamos para a convenção de vendas e foi a melhor decisão do ano. A equipe começou o trimestre com energia que a gente não via há anos.',
    name:    'Ricardo Alves',
    role:    'Diretor Comercial',
    company: 'Porto Seguro',
  },
  {
    quote:   'Usamos na SIPAT e pela primeira vez em 12 anos a taxa de engajamento foi acima de 90%. O humor foi o veículo perfeito para a mensagem de segurança.',
    name:    'Camila Ferreira',
    role:    'Coord. de Segurança do Trabalho',
    company: 'Gerdau',
  },
]

/* ── Navigation links ────────────────────────────────────────────────────────── */
export const navLinks = [
  { label: 'Formatos',    href: '#formatos'    },
  { label: 'Clientes',   href: '#clientes'    },
  { label: 'Sobre',      href: '#sobre'       },
  { label: 'Depoimentos',href: '#depoimentos' },
]
