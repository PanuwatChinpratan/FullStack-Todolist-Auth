import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma'
import { auth } from '@/auth' // ✅ ดึง session

// [GET] - ดึงข้อมูลทั้งหมด
export async function GET() {
  const session = await auth() // ✅ ตรวจ session

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const email = session.user?.email

  try {
    const result = await prisma.dota2.findMany({
      where: { userEmail: email || undefined },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

// [POST] - สร้างรายการใหม่
export async function POST(req: NextRequest) {
  const session = await auth() // ✅ ตรวจ session

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, description, userEmail } = body

    const newPost = await prisma.dota2.create({
      data: {
        title,
        description: description || '',
        userEmail,
      },
    })

    return NextResponse.json(newPost)
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json({ error: 'Failed to create data' }, { status: 500 })
  }
}
