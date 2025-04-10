import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma'
import { auth } from '@/auth' // ✅ ดึง session

// [PUT] - อัปเดตข้อมูล
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const session = await auth() // ✅ ตรวจ login
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const body = await req.json()
    const { title, description, completed } = body

    await prisma.dota2.update({
      where: { id },
      data: {
        title,
        description: description ? description : '',
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
export async function DELETE({ params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const session = await auth() // ✅ ตรวจ login
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    await prisma.dota2.delete({ where: { id } })
    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 })
  }
}
