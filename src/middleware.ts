import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('__Secure-authjs.session-token') || request.cookies.get('authjs.session-token')

  // If session cookie exists, allow to proceed
  if (session?.value) {
    return NextResponse.next()
  }

  // Otherwise, redirect to home or login
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: '/todolist/:path*',
}
