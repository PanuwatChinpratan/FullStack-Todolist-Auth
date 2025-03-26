'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

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
  const [items, setItems] = useState<TodoType[]>([])
  const [inputValue, setInputValue] = useState('')
  const [inputValueDes, setInputValueDes] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    if (userEmail) {
      fetchData()
    }
  }, [userEmail])

  const fetchData = async () => {
    const res = await fetch(`/api/data?email=${userEmail}`)
    const json = await res.json()
    setItems(json)
  }

  const postData = async () => {
    if (!inputValue || !userEmail) return

    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: inputValue,
          description: inputValueDes,
          userEmail, // ✅ ส่ง email ไป
        }),
      })
      setInputValue('')
      setInputValueDes('')
      fetchData()
    } catch (error) {
      console.error('Failed to add data', error)
    }
  }

  const deleteData = async (id: number) => {
    await fetch(`/api/data/${id}`, { method: 'DELETE' })
    fetchData()
  }

  const updateData = async () => {
    if (editingId === null) return
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

  const toggleComplete = async (id: number, completed: boolean) => {
    await fetch(`/api/data/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    })
    fetchData()
  }

  if (!userEmail) {
    return <p className="text-center">Please login to view your todos.</p>
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl text-center mb-4">Todo List</h1>

      <div className="flex gap-2 mb-4">
        <Input value={inputValue} placeholder="Title" onChange={e => setInputValue(e.target.value)} />
        <Input value={inputValueDes} placeholder="Description" onChange={e => setInputValueDes(e.target.value)} />
        <Button onClick={editingId === null ? postData : updateData}>
          {editingId === null ? 'Add' : 'Update'}
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-center">No data found</p>
      ) : (
        items.map(todo => (
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
        ))
      )}
    </div>
  )
}
