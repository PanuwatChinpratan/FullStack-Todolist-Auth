import NextAuth from 'next-auth'

import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/prisma'
import type { Session } from 'next-auth'

const { handlers, signIn, signOut, auth: baseAuth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  // pages: {
  //   signIn: "/auth/login",
  // },
})

export { handlers, signIn, signOut }

export async function auth(...args: Parameters<typeof baseAuth>): Promise<Session | null> {
  if (process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true') {
    return {
      user: {
        email: process.env.NEXT_PUBLIC_BYPASS_EMAIL ?? 'demo@example.com',
      },
    } as Session
  }
  return baseAuth(...args)
}
