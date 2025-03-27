import { auth } from '@/auth'

export default async function Index() {
  const session = await auth()

  return (
    <div className="flex flex-col gap-6 ">
      <h1 className="text-3xl font-bold">👋 ยินดีต้อนรับ</h1>
      <div>
        <p>จัดทำขึ้นเพื่อศึกษาหาความรู้และหางานครับ</p>
      </div>
      <div>! เตื่อนตัวเอง Optional ถ้าอยากทำ WebAuthn ให้เปิด model ที่ comment ไว้ใน schema.prisma แต่ต้องไปศึกษาก่อนนะครับ</div>
      <div className="flex flex-col rounded-md bg-gray-100 dark:bg-gray-800">
        <div className="rounded-t-md bg-gray-200 dark:bg-gray-700 p-4 font-bold text-gray-900 dark:text-gray-100">Session ของคุณ</div>
        <pre className="whitespace-pre-wrap break-all px-4 py-6 text-gray-800 dark:text-gray-100 ">{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  )
}
