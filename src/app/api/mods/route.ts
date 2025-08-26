import { NextRequest, NextResponse } from 'next/server'

type Mod = { id: number; name: string; description: string; rating: number }

const mods: Mod[] = [
  { id: 1, name: 'Ultra HD Texture', description: 'Makes game prettier', rating: 5 },
  { id: 2, name: 'Night Mode', description: 'Adds dark theme', rating: 3 },
]

export async function GET() {
  return NextResponse.json(mods)
}

export async function POST(req: NextRequest) {
  const { name, description } = await req.json()
  if (!name || !description) {
    return NextResponse.json({ error: 'name and description are required' }, { status: 400 })
  }
  const mod: Mod = { id: Date.now(), name, description, rating: 0 }
  mods.push(mod)
  return NextResponse.json(mod, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const { id } = await req.json()
  const mod = mods.find((m) => m.id === id)
  if (!mod) {
    return NextResponse.json({ error: 'mod not found' }, { status: 404 })
  }
  mod.rating += 1
  return NextResponse.json(mod)
}
