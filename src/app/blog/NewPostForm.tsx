'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type Props = {
  userEmail: string
}

export default function NewPostForm({ userEmail }: Props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const submit = async () => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, userEmail }),
    })

    if (res.ok) {
      toast('สร้างโพสต์แล้ว ✅')
      router.push('/blog')
      router.refresh()
    } else {
      toast('สร้างโพสต์ไม่สำเร็จ ❌')
    }
  }

  return (
    <div className="space-y-4">
      <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="หัวข้อ" />
      <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="เนื้อหา" />
      <Button onClick={submit}>บันทึก</Button>
    </div>
  )
}
