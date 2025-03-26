import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma'

// PUT handler
export const PUT = async (
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> => {
  const id = context.params.id

  try {
    const body = await req.json()
    const { title, description, completed } = body

    await prisma.dota2.update({
      where: { id },
      data: { title, description, completed },
    })

    return NextResponse.json({ message: 'Updated successfully' })
  } catch (err: unknown) {
    console.error('PUT Error:', err)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE handler
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params

  try {
    await prisma.dota2.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (err: unknown) {
    console.error('DELETE Error:', err)
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 })
  }
}
