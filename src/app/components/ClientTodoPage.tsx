'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import LoadingSkeleton from './LoadingSkeleton'
import { toast } from 'sonner'

type TodoType = {
  id: number
  title: string
  description?: string
  completed: boolean
}

type Props = {
  userEmail: string | null
}

export default function ClientTodoPage({ userEmail }: Props) {
  const [inputValue, setInputValue] = useState('')
  const [inputValueDes, setInputValueDes] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

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
    enabled: !!userEmail, // ไม่เรียก query ถ้า userEmail ยังไม่มา
  })

  const postData = async () => {
    if (!inputValue || !userEmail) return
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
      console.log(error);     
      toast('เกิดข้อผิดพลาดในการเพิ่ม todo ❌' )
    }
  }

  const deleteData = async (id: number) => {
    const res = await fetch(`/api/data/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast('ลบ todo แล้ว 🗑️')
      refetch()
    } else {
      toast('ลบไม่สำเร็จ ❌')
    }
  }

  const updateData = async () => {
    if (editingId === null) return
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
      console.log(error);    
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
            <Button onClick={() => toggleComplete(todo.id, todo.completed)}>
              {todo.completed ? 'Undo' : 'Done'}
            </Button>
            <Button variant="destructive" onClick={() => deleteData(todo.id)}>
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

      
    </div>
  )
}
