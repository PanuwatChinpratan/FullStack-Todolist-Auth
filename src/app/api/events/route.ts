import { NextResponse } from 'next/server'

const events = [
  { id: 1, name: 'Spring Tournament', date: '2024-06-01', description: '5v5 battle' },
  { id: 2, name: 'Summer Fest', date: '2024-07-15', description: 'Co-op quests' },
]

export async function GET() {
  return NextResponse.json(events)
}
