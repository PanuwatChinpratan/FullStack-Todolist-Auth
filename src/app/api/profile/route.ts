import { NextResponse } from 'next/server'

const profile = {
  name: 'PlayerOne',
  avatar: '/placeholder.svg',
  inventory: [
    { id: 1, name: 'Epic Sword', image: '/placeholder.svg' },
    { id: 2, name: 'Mystic Wand', image: '/placeholder.svg' },
  ],
}

export async function GET() {
  return NextResponse.json(profile)
}
