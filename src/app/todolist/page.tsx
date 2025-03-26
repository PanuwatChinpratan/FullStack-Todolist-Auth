'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { useEffect, useState } from 'react'

type TodoType = {
  id: number
  title: string
  description?: string
  completed: boolean
}
const Page = () => {
  const [items, setItems] = useState<TodoType[]>([])
  const [inputValue, setInputValue] = useState('')
  const [inputValueDes, setInputValueDes] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null) // ✅ State สำหรับเก็บ ID ที่กำลังแก้ไข

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await fetch('/api/data')
    const json = await data.json()
    setItems(json)
  }

  const postData = async () => {
    if (!inputValue) {
      return
    }
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: inputValue, description: inputValueDes }),
      })
      setInputValue('')
      setInputValueDes('')
      fetchData() // ✅ โหลดข้อมูลใหม่
    } catch (error) {
      console.error('Failed to add data')
    }
  }

  const deleteData = async (id: number) => {
    try {
      await fetch(`/api/data/${id}`, { method: 'DELETE' })
      fetchData()
    } catch (error) {
      console.error('Failed to delete data')
    }
  }

  const updateData = async () => {
    if (editingId === null) return // ✅ ถ้าไม่มี ID ไม่ต้องทำอะไร
    try {
      await fetch(`/api/data/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: inputValue, description: inputValueDes }),
      })
      setInputValue('')
      setInputValueDes('')
      setEditingId(null) // ✅ รีเซ็ตสถานะแก้ไข
      fetchData()
    } catch (error) {
      console.error('Failed to add data', error)
    }
  }
  const toggleComplete = async (id: number, completed: boolean) => {
    try {
      await fetch(`/api/data/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }), // ✅ เปลี่ยนสถานะ
      })
      fetchData() // ✅ โหลดข้อมูลใหม่
    } catch (error) {
      console.error('Failed to toggle completion status')
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl text-center mb-4">Todo List</h1>

      {/* ✅ ปรับ UI ให้รองรับการแก้ไข */}
      <div className="flex gap-2 mb-4">
        <Input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300" value={inputValue} placeholder="Title" onChange={e => setInputValue(e.target.value)} />
        <Input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300" value={inputValueDes} placeholder="Description" onChange={e => setInputValueDes(e.target.value)} />
        <Button
          className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
          onClick={async () => {
            if (editingId === null) {
              await postData() // รอให้โพสต์ข้อมูลเสร็จ
            } else {
              await updateData() // รอให้แก้ไขข้อมูลเสร็จ
            }
          }}
        >
          {editingId === null ? 'Add' : 'Update'}
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-center">No data found</p>
      ) : (
        items.map((todo: TodoType) => (
          <Card key={todo.id} className="mb-2">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              {/* ✅ จัดกลุ่ม Title & Description ให้ดูดีขึ้น */}
              <div className="flex flex-col min-w-0">
                <p className="text-lg font-semibold  leading-tight truncate">{todo.title}</p>
                <p className="text-sm  whitespace-normal break-words">{todo.description}</p>
              </div>

              {/* ✅ ปรับปุ่มให้ดูสมดุลขึ้น */}
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button className={`px-3 py-1 rounded-lg text-white ${todo.completed ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={() => toggleComplete(todo.id, todo.completed)}>
                  {todo.completed ? 'Undo' : 'Done'}
                </Button>

                <Button variant="destructive" onClick={() => deleteData(todo.id)}>
                  Delete
                </Button>
                <Button
                  className="bg-green-500 text-white hover:bg-green-600 px-3 py-1 rounded-lg"
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

export default Page
