// components/todo/TodoInputForm.tsx
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { toast } from 'sonner'

const todoSchema = z.object({
  title: z
    .string()
    .min(1, 'กรุณาใส่ Title ด้วยนะ')
    .regex(/[ก-ฮa-zA-Z0-9]/, 'Title ต้องมีพยัญชนะหรืออักษรอย่างน้อย 1 ตัว'),
  description: z.string().optional(),
})

type Props = {
  userEmail: string
  inputValue: string
  inputValueDes: string
  editingId: number | null
  setInputValue: (v: string) => void
  setInputValueDes: (v: string) => void
  setEditingId: (id: number | null) => void
  refetch: () => void
}

export default function TodoInputForm({
  userEmail,
  inputValue,
  inputValueDes,
  editingId,
  setInputValue,
  setInputValueDes,
  setEditingId,
  refetch,
}: Props) {
  const submit = async () => {
    const parsed = todoSchema.safeParse({ title: inputValue, description: inputValueDes })
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message || 'กรอกข้อมูลให้ถูกต้องนะ')
      return
    }

    const url = editingId === null ? '/api/data' : `/api/data/${editingId}`
    const method = editingId === null ? 'POST' : 'PUT'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: inputValue,
        description: inputValueDes,
        ...(editingId === null ? { userEmail } : {}),
      }),
    })

    if (res.ok) {
      toast(editingId === null ? 'เพิ่ม todo เรียบร้อยแล้ว ✅' : 'อัปเดต todo สำเร็จ ✏️')
      setInputValue('')
      setInputValueDes('')
      setEditingId(null)
      refetch()
    } else {
      toast('เกิดข้อผิดพลาด ❌')
    }
  }

  return (
    <div className="flex gap-2 mb-4">
      <Input value={inputValue} placeholder="Title" onChange={e => setInputValue(e.target.value)} />
      <Input value={inputValueDes} placeholder="Description" onChange={e => setInputValueDes(e.target.value)} />
      <Button onClick={submit}>{editingId === null ? 'Add' : 'Update'}</Button>
    </div>
  )
}