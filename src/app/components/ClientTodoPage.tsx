'use client'

import { useState } from 'react'
import TodoInputForm from './todocomponent/TodoInputForm'
import TodoList from './todocomponent/TodoList'
import DeleteConfirmDialog from './todocomponent/DeleteConfirmDialog'
import { useTodos } from './todocomponent/useTodos'
import { toast } from 'sonner'

type Props = {
  userEmail: string | null
}

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
  } = useTodos(userEmail)

  const toggleComplete = async (id: number, completed: boolean) => {
    await fetch(`/api/data/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    })
    refetch()
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

  const handleEdit = (id: number, title: string, desc: string) => {
    setEditingId(id)
    setInputValue(title)
    setInputValueDes(desc)
  }

  if (!userEmail) {
    return <p className="text-center">Please login to view your todo list with Google ง่ายสุด</p>
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl text-center mb-4">Todo List</h1>

      <TodoInputForm
        userEmail={userEmail}
        inputValue={inputValue}
        inputValueDes={inputValueDes}
        editingId={editingId}
        setInputValue={setInputValue}
        setInputValueDes={setInputValueDes}
        setEditingId={setEditingId}
        refetch={refetch}
      />

      <TodoList
        items={items}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={setSelectedDeleteId}
        onToggle={toggleComplete}
      />

      <DeleteConfirmDialog
        open={selectedDeleteId !== null}
        onCancel={() => setSelectedDeleteId(null)}
        onConfirm={handleDelete}
        isDeleting={deletingId !== null}
      />
    </div>
  )
}
