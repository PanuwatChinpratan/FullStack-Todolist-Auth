import { auth } from '@/auth'
import { prisma } from '@/prisma'

export default async function Page() {
  const session = await auth()
  const email = session?.user?.email

  if (!email) {
    return (
      <main className="max-w-lg mx-auto p-6">
        <h1 className="text-3xl mb-4 text-center">สถิติความสำเร็จ</h1>
        <p className="text-center">Please login to view your stats</p>
      </main>
    )
  }

  const todos = await prisma.dota2.findMany({
    where: { userEmail: email },
  })

  const total = todos.length
  const completed = todos.filter(t => t.completed).length

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl mb-4 text-center">สถิติความสำเร็จ</h1>
      <div className="space-y-2 text-center">
        <p>งานทั้งหมด: {total}</p>
        <p>ทำเสร็จแล้ว: {completed}</p>
      </div>
    </main>
  )
}
