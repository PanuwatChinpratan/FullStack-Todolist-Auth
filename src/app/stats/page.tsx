import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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

  const pending = total - completed

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl mb-6 text-center">สถิติความสำเร็จ</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>ทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-2xl font-bold">{total}</CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>ทำเสร็จแล้ว</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-2xl font-bold text-green-600">{completed}</CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>ค้างอยู่</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-2xl font-bold text-red-600">{pending}</CardContent>
        </Card>
      </div>
    </main>
  )
}
