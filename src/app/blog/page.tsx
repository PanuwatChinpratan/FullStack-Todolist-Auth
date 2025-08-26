import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const posts = [
  {
    title: 'โพสต์แรก',
    content: 'ยินดีต้อนรับสู่บล็อกของเรา! นี่คือโพสต์แรกทดลองระบบ'
  },
  {
    title: 'โพสต์ถัดไป',
    content: 'ในอนาคตจะมีเนื้อหาสาระมาอัปเดตที่นี่เรื่อย ๆ'
  }
]

export default function BlogPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl text-center">บล็อก</h1>
      <div className="space-y-4">
        {posts.map((post, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}

