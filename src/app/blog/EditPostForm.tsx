'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type Props = {
  id: string
  title: string
  content: string | null
}

export default function EditPostForm({ id, title: initialTitle, content: initialContent }: Props) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent || '')
  const router = useRouter()

  const submit = async () => {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })

    if (res.ok) {
      toast('อัปเดตโพสต์แล้ว ✏️')
      router.push('/blog')
      router.refresh()
    } else {
      toast('อัปเดตโพสต์ไม่สำเร็จ ❌')
    }
  }

  return (
    <div className="space-y-4">
      <Input value={title} onChange={e => setTitle(e.target.value)} />
      <Textarea value={content} onChange={e => setContent(e.target.value)} />
      <Button onClick={submit}>บันทึก</Button>
    </div>
  )
}
