import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'บล็อก',
}

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
    <section className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-center text-3xl">บล็อก</h1>
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
    </section>
  )
}

