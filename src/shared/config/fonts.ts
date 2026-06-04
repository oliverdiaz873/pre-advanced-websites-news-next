import { Domine, Inter } from 'next/font/google'

export const domine = Domine({
  subsets: ['latin'],
  variable: '--font-domine',
  weight: ['400', '500', '600', '700'],
})

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})
