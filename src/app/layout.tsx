import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from './components/header'
import Footer from './components/footer'
import { ThemeProvider } from './components/theme-provider'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'MiloList — Conquer Chaos, One Task at a Time',
  description: 'A quirky to-do app built by Milo, because even chaos needs structure 🧠⚡️',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-full min-h-screen w-full flex-col justify-between">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            <main className="mx-auto w-full max-w-3xl flex-auto px-4 py-4 sm:px-6 md:py-6">{children}</main>
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
