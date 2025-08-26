'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export type BlogPost = {
  id: string
  title: string
  content: string | null
}

type Props = {
  posts: BlogPost[]
}

export default function BlogList({ posts: initialPosts }: Props) {
  const [posts, setPosts] = useState(initialPosts)

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setPosts(posts.filter(p => p.id !== id))
      toast('ลบโพสต์แล้ว 🗑️')
    } else {
      toast('ลบโพสต์ไม่สำเร็จ ❌')
    }
  }

  if (posts.length === 0) {
    return <p className="text-center">ยังไม่มีโพสต์</p>
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <Card key={post.id}>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>{post.title}</CardTitle>
            <div className="space-x-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/blog/${post.id}/edit`}>แก้ไข</Link>
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                ลบ
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
