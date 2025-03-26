import { auth } from '@/auth'


export default async function Index() {
  const session = await auth()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">MAIN PAGE</h1>
      <div>
        <p>รายละเอียดเพิ่มเติม</p>
      </div>
      <div>Optional for WebAuthn support ถ้าเปิดใช้งานใน schema.prisma</div>
      <div className="flex flex-col rounded-md bg-gray-100">
        <div className="rounded-t-md bg-gray-200 p-4 font-bold">Session ของคุณ</div>
        <pre className="whitespace-pre-wrap break-all px-4 py-6">{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  )
}
