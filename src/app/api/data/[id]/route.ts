import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma'

type ContextType = {
  params: {
    id: string
  }
}

export async function PUT(req: NextRequest, { params }: ContextType) {
  const { id } = params

  try {
    const body = await req.json()
    const { title, description, completed } = body

    await prisma.dota2.update({
      where: { id },
      data: { title, description, completed },
    })

    return NextResponse.json({ message: 'Updated successfully' })
  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: ContextType) {
  const { id } = params

  try {
    await prisma.dota2.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 })
  }
}
