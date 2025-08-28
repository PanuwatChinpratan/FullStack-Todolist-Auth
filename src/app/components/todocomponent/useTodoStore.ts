import { create } from 'zustand'

interface TodoState {
  inputValue: string
  inputValueDes: string
  editingId: number | null
  setInputValue: (v: string) => void
  setInputValueDes: (v: string) => void
  setEditingId: (id: number | null) => void
}

export const useTodoStore = create<TodoState>(set => ({
  inputValue: '',
  inputValueDes: '',
  editingId: null,
  setInputValue: v => set({ inputValue: v }),
  setInputValueDes: v => set({ inputValueDes: v }),
  setEditingId: id => set({ editingId: id }),
}))