import { Suspense } from 'react'
import SessionDisplay from './components/session-display'
import LoadingSkeleton from './components/LoadingSkeleton'

export default function Index() {
  return (
    <div className="flex flex-col gap-6 ">
      <h1 className="text-3xl font-bold">👋 ยินดีต้อนรับ</h1>
      <div>
        <p>จัดทำขึ้นเพื่อศึกษาหาความรู้และหางานครับ</p>
      </div>
      <div className="flex flex-col rounded-md bg-gray-100 dark:bg-gray-800">
        <div className="rounded-t-md bg-gray-200 dark:bg-gray-700 p-4 font-bold text-gray-900 dark:text-gray-100">Session ของคุณ</div>

        <Suspense fallback={<LoadingSkeleton />}>
          <SessionDisplay />
        </Suspense>
      </div>
    </div>
  )
}
