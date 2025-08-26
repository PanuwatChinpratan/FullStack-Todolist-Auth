import { auth } from '@/auth'
import { prisma } from '@/prisma'
import EditPostForm from '../../EditPostForm'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditPage({ params }: Props) {
  const { id } = await params
  const session = await auth()

  if (!session) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <p className="text-center">กรุณาเข้าสู่ระบบก่อน</p>
      </main>
    )
  }

  const post = await prisma.post.findUnique({ where: { id } })

  if (!post) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <p className="text-center">ไม่พบโพสต์</p>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl">แก้ไขโพสต์</h1>
      <EditPostForm id={post.id} title={post.title} content={post.content} />
    </main>
  )
}
