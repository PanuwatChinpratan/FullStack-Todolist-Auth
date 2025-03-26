'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// แก้ id เป็น string ให้ตรงกับ Prisma (Mongo ObjectId)
type TodoType = {
  id: string
  title: string
  description?: string
  completed: boolean
}

export default function Page() {
  const [items, setItems] = useState<TodoType[]>([])
  const [inputValue, setInputValue] = useState('')
  const [inputValueDes, setInputValueDes] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  // โหลดข้อมูล
  const fetchData = async () => {
    try {
      const res = await fetch('/api/data')
      const json = await res.json()
      setItems(json)
    } catch (error) {
      console.error('Fetch data error:', error)
    }
  }

  // เพิ่มรายการ
  const postData = async () => {
    if (!inputValue) return
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: inputValue,
          description: inputValueDes,
        }),
      })
      setInputValue('')
      setInputValueDes('')
      fetchData()
    } catch (error) {
      console.error('Failed to add data', error)
    }
  }

  // ลบรายการ
  const deleteData = async (id: string) => {
    try {
      await fetch(`/api/data/${id}`, { method: 'DELETE' })
      fetchData()
    } catch (error) {
      console.error('Failed to delete data', error)
    }
  }

  // แก้ไขรายการ
  const updateData = async () => {
    if (!editingId) return
    try {
      await fetch(`/api/data/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: inputValue,
          description: inputValueDes,
        }),
      })
      setInputValue('')
      setInputValueDes('')
      setEditingId(null)
      fetchData()
    } catch (error) {
      console.error('Failed to update data', error)
    }
  }

  // เปลี่ยนสถานะ completed
  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      await fetch(`/api/data/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      })
      fetchData()
    } catch (error) {
      console.error('Failed to toggle completion status', error)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl text-center mb-4">Todo List</h1>

      {/* ฟอร์มเพิ่ม/แก้ไข */}
      <div className="flex gap-2 mb-4">
        <Input
          className="w-full"
          value={inputValue}
          placeholder="Title"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Input
          className="w-full"
          value={inputValueDes}
          placeholder="Description"
          onChange={(e) => setInputValueDes(e.target.value)}
        />
        <Button
          onClick={() => {
            if (!editingId) {
              postData()
            } else {
              updateData()
            }
          }}
        >
          {editingId ? 'Update' : 'Add'}
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-center">No data found</p>
      ) : (
        items.map((todo: TodoType) => (
          <Card key={todo.id} className="mb-2">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              {/* Title & Description */}
              <div className="flex flex-col min-w-0">
                <p className="text-lg font-semibold leading-tight truncate">{todo.title}</p>
                <p className="text-sm whitespace-normal break-words">{todo.description}</p>
              </div>

              {/* ปุ่ม */}
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button
                  className={todo.completed ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'}
                  onClick={() => toggleComplete(todo.id, todo.completed)}
                >
                  {todo.completed ? 'Undo' : 'Done'}
                </Button>

                <Button variant="destructive" onClick={() => deleteData(todo.id)}>
                  Delete
                </Button>

                <Button
                  className="bg-green-500 text-white"
                  onClick={() => {
                    setEditingId(todo.id)
                    setInputValue(todo.title)
                    setInputValueDes(todo.description || '')
                  }}
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
