import { NextRequest, NextResponse } from 'next/server'

type Post = { id: number; user: string; message: string }

const posts: Post[] = [{ id: 1, user: 'Admin', message: 'Welcome to the forum' }]

export async function GET() {
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const { user, message } = await req.json()
  if (!user || !message) {
    return NextResponse.json({ error: 'user and message are required' }, { status: 400 })
  }
  const post: Post = { id: Date.now(), user, message }
  posts.push(post)
  return NextResponse.json(post, { status: 201 })
}
