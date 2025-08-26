import { auth } from '@/auth'
import NewPostForm from '../NewPostForm'

export default async function NewPostPage() {
  const session = await auth()

  if (!session) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <p className="text-center">กรุณาเข้าสู่ระบบก่อน</p>
      </main>
    )
  }

  const email = session.user?.email

  if (!email) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <p className="text-center">ไม่พบอีเมลผู้ใช้</p>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl">สร้างโพสต์</h1>
      <NewPostForm userEmail={email} />
    </main>
  )
}
