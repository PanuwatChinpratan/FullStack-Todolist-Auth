import { NextRequest, NextResponse } from 'next/server'

type Item = { id: number; name: string; image: string; price: number }

const items: Item[] = [
  { id: 1, name: 'Sword of Dawn', image: '/placeholder.svg', price: 1000 },
  { id: 2, name: 'Shield of Night', image: '/placeholder.svg', price: 750 },
]

export async function GET() {
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const { name, image, price } = await req.json()
  if (!name || !image || typeof price !== 'number') {
    return NextResponse.json({ error: 'name, image and price are required' }, { status: 400 })
  }
  const item: Item = { id: Date.now(), name, image, price }
  items.push(item)
  return NextResponse.json(item, { status: 201 })
}
