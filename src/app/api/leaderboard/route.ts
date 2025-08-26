import { NextResponse } from 'next/server'

type Player = { id: number; name: string; score: number; badges: string[] }

const players: Player[] = [
  { id: 1, name: 'Alice', score: 1500, badges: ['Champion'] },
  { id: 2, name: 'Bob', score: 1200, badges: ['Participant'] },
  { id: 3, name: 'Cindy', score: 900, badges: [] },
]

export async function GET() {
  return NextResponse.json([...players].sort((a, b) => b.score - a.score))
}
