import Link from 'next/link'
import { auth } from '@/auth'
import { prisma } from '@/prisma'
import BlogList from './BlogList'
import { Button } from '@/components/ui/button'

export default async function BlogPage() {
  const session = await auth()

  if (!session) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <p className="text-center">กรุณาเข้าสู่ระบบเพื่อดูโพสต์</p>
      </main>
    )
  }

  const posts = await prisma.post.findMany({
    where: { userEmail: session.user?.email || undefined },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">บล็อก</h1>
        <Button asChild>
          <Link href="/blog/new">สร้างโพสต์</Link>
        </Button>
      </div>
      <BlogList posts={posts} />
    </main>
  )
}

