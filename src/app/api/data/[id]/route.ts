import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma'

// Notice that the second argument expects `params` to be a Promise
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  // Await the params
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
      }
    })

    return NextResponse.json({ message: 'Updated successfully' })
  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  // Await the params here too
  const { id } = await params

  try {
    await prisma.dota2.delete({ where: { id } })
    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 })
  }
}
