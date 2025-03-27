import { auth } from '@/auth'

export default async function SessionDisplay() {
  const session = await auth()

  return (
    <pre className="whitespace-pre-wrap break-all px-4 py-6 text-gray-800 dark:text-gray-100 ">
      {JSON.stringify(session, null, 2)}
    </pre>
  )
}
