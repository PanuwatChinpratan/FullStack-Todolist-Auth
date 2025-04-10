import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma'
import { auth } from '@/auth' // ✅ ดึง session

// [PUT] - อัปเดตข้อมูล
export async function PUT(req: NextRequest): Promise<NextResponse> {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ✅ ดึง id จาก URL เช่น /api/data/abc123
  const id = req.nextUrl.pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { title, description, completed } = body

    await prisma.dota2.update({
      where: { id },
      data: {
        title,
        description: description || '',
        completed,
      },
    })

    return NextResponse.json({ message: 'Updated successfully' })
  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

// [DELETE] - ลบข้อมูล
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ดึง id จาก URL เช่น /api/data/abc123
  const id = req.nextUrl.pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  try {
    await prisma.dota2.delete({ where: { id } })
    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 })
  }
}
