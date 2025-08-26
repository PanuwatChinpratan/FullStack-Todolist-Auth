'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type Post = { id: number; user: string; message: string }

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [form, setForm] = useState({ user: '', message: '' })

  const fetchPosts = async () => {
    const res = await fetch('/api/forum')
    setPosts(await res.json())
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const submit = async () => {
    if (!form.user || !form.message) return
    const res = await fetch('/api/forum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setForm({ user: '', message: '' })
      fetchPosts()
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Community Forum</h1>
      <div className="space-y-2">
        <Input
          placeholder="Your name"
          value={form.user}
          onChange={(e) => setForm({ ...form, user: e.target.value })}
        />
        <Textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <Button onClick={submit}>Post</Button>
      </div>
      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.id} className="border p-2 rounded">
            <div className="font-semibold">{p.user}</div>
            <div className="text-sm">{p.message}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
