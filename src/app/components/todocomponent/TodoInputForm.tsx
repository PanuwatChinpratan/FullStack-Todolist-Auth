import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { toast } from 'sonner'
import { useTodoStore } from './useTodoStore'
import { addTodo, updateTodo } from '@/app/todolist/action'
const todoSchema = z.object({
  title: z
    .string()
    .min(1, 'กรุณาใส่ Title ด้วยนะ')
    .regex(/[ก-ฮa-zA-Z0-9]/, 'Title ต้องมีพยัญชนะหรืออักษรอย่างน้อย 1 ตัว'),
  description: z.string().optional(),
})

type Props = {
  userEmail: string

  refetch: () => void
}

export default function TodoInputForm({ userEmail, refetch }: Props) {
  const { inputValue, inputValueDes, editingId, setInputValue, setInputValueDes, setEditingId } = useTodoStore()
  const submit = async () => {
    const parsed = todoSchema.safeParse({ title: inputValue, description: inputValueDes })
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message || 'กรอกข้อมูลให้ถูกต้องนะ')
      return
    }

      try {
      if (editingId === null) {
        await addTodo({
          title: inputValue,
          description: inputValueDes,
          userEmail,
        })
        toast('เพิ่ม todo เรียบร้อยแล้ว ✅')
      } else {
        await updateTodo({
          id: editingId,
          title: inputValue,
          description: inputValueDes,
        })
        toast('อัปเดต todo สำเร็จ ✏️')
      }
      setInputValue('')
      setInputValueDes('')
      setEditingId(null)
      refetch()
   
    } catch {
      toast('เกิดข้อผิดพลาด ❌')
    }
  }

  return (
    <div className="flex gap-2 mb-4">
      <Input value={inputValue} placeholder="Title" onChange={e => setInputValue(e.target.value)} />
      <Input value={inputValueDes} placeholder="Description" onChange={e => setInputValueDes(e.target.value)} />
      <Button className="cursor-pointer" onClick={submit}>
        {editingId === null ? 'Add' : 'Update'}
      </Button>
    </div>
  )
}
