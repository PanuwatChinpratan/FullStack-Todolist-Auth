'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import LoadingSkeleton from './LoadingSkeleton'
import { toast } from 'sonner'
import { z } from 'zod'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

type TodoType = {
  id: number
  title: string
  description?: string
  completed: boolean
}

type Props = {
  userEmail: string | null
}

const todoSchema = z.object({
  title: z
    .string()
    .min(1, 'กรุณาใส่ Title ด้วยนะ')
    .regex(/[ก-ฮa-zA-Z0-9]/, 'Title ต้องมีพยัญชนะหรืออักษรอย่างน้อย 1 ตัว'),
  description: z.string().optional(),
})

export default function ClientTodoPage({ userEmail }: Props) {
  const [inputValue, setInputValue] = useState('')
  const [inputValueDes, setInputValueDes] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const {
    data: items = [],
    isLoading,
    refetch,
  } = useQuery<TodoType[]>({
    queryKey: ['todos', userEmail],
    queryFn: async () => {
      if (!userEmail) return []
      const res = await fetch(`/api/data?email=${userEmail}`)
      return await res.json()
    },
    enabled: !!userEmail,
  })

  const postData = async () => {
    const parsed = todoSchema.safeParse({
      title: inputValue,
      description: inputValueDes,
    })

    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message || 'กรอกข้อมูลให้ถูกต้องนะ')
      return
    }

    if (!userEmail) return
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: inputValue,
          description: inputValueDes,
          userEmail,
        }),
      })

      if (res.ok) {
        toast('เพิ่ม todo เรียบร้อยแล้ว ✅')
        setInputValue('')
        setInputValueDes('')
        refetch()
      } else {
        toast('เพิ่มไม่สำเร็จ 😢')
      }
    } catch (error) {
      console.log(error)
      toast('เกิดข้อผิดพลาดในการเพิ่ม todo ❌')
    }
  }

  const handleDelete = async () => {
    if (selectedDeleteId === null) return

    setDeletingId(selectedDeleteId)
    try {
      const res = await fetch(`/api/data/${selectedDeleteId}`, { method: 'DELETE' })
      if (res.ok) {
        toast('ลบ todo แล้ว 🗑️')
        refetch()
      } else {
        toast('ลบไม่สำเร็จ ❌')
      }
    } catch (error) {
      console.log(error)
      toast('เกิดข้อผิดพลาดในการลบ ❌')
    } finally {
      setDeletingId(null)
      setSelectedDeleteId(null)
    }
  }

  const updateData = async () => {
    if (editingId === null) return

    const parsed = todoSchema.safeParse({
      title: inputValue,
      description: inputValueDes,
    })

    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message || 'กรอกข้อมูลให้ถูกต้องนะ')
      return
    }

    try {
      const res = await fetch(`/api/data/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: inputValue,
          description: inputValueDes,
        }),
      })

      if (res.ok) {
        toast('อัปเดต todo สำเร็จ ✏️')
        setInputValue('')
        setInputValueDes('')
        setEditingId(null)
        refetch()
      } else {
        toast('อัปเดตไม่สำเร็จ 😓')
      }
    } catch (error) {
      console.log(error)
      toast('เกิดข้อผิดพลาดในการอัปเดต ❌')
    }
  }

  const toggleComplete = async (id: number, completed: boolean) => {
    await fetch(`/api/data/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    })
    refetch()
  }

  if (!userEmail) {
    return <p className="text-center">Please login to view your todos.</p>
  }

  return (
    <div className="max-w-lg mx-auto p-6 ">
      <h1 className="text-3xl text-center mb-4">Todo List</h1>

      <div className="flex gap-2 mb-4">
        <Input value={inputValue} placeholder="Title" onChange={e => setInputValue(e.target.value)} />
        <Input value={inputValueDes} placeholder="Description" onChange={e => setInputValueDes(e.target.value)} />
        <Button onClick={editingId === null ? postData : updateData}>{editingId === null ? 'Add' : 'Update'}</Button>
      </div>

      {isLoading ? (
        <>
          <p className="text-center">กำลังโหลดข้อมูล...</p>
          <LoadingSkeleton />
        </>
      ) : items.length === 0 ? (
        <p className="text-center text-muted-foreground">ยังไม่มี todo ลองเพิ่มสักรายการเลย 🚀</p>
      ) : (
        <div className="h-[300px] sm:h-[400px] md:h-[500px] overflow-y-auto scrollbar-thin pr-2">
          {items.map(todo => (
            <Card key={todo.id} className="mb-2">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold">{todo.title}</p>
                  <p className="text-sm">{todo.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => toggleComplete(todo.id, todo.completed)}>{todo.completed ? 'Undo' : 'Done'}</Button>
                  <Button variant="destructive" onClick={() => setSelectedDeleteId(todo.id)}>
                    Delete
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingId(todo.id)
                      setInputValue(todo.title)
                      setInputValueDes(todo.description ?? '')
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 🔐 AlertDialog สำหรับยืนยันการลบ */}
      <AlertDialog
        open={selectedDeleteId !== null}
        onOpenChange={(open: boolean) => {
          if (!open) setSelectedDeleteId(null)
        }}
      >
        <AlertDialogContent className="bg-[var(--background)]">
          <AlertDialogHeader>
            <AlertDialogTitle>คุณแน่ใจนะว่าจะลบ?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-900 dark:text-gray-100">ลบจริงโดยที่ลบออกจาก DB เลย!</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer" disabled={deletingId !== null}>
              ยกเลิก
            </AlertDialogCancel>
            <AlertDialogAction className="cursor-pointer" onClick={handleDelete} disabled={deletingId !== null}>
              {deletingId !== null ? 'กำลังลบ...' : 'ยืนยันการลบ'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
