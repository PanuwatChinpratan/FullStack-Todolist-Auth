import TodoItem from './TodoItem'
import LoadingSkeleton from '../LoadingSkeleton'

type Props = {
  items: {
    id: number
    title: string
    description?: string
    completed: boolean
  }[]
  isLoading: boolean
  onEdit: (id: number, title: string, desc: string) => void
  onDelete: (id: number) => void
  onToggle: (id: number, completed: boolean) => void
}

export default function TodoList({ items, isLoading, onEdit, onDelete, onToggle }: Props) {
  if (isLoading) {
    return (
      <>
        <p className="text-center">กำลังโหลดข้อมูล...</p>
        <LoadingSkeleton />
      </>
    )
  }

  if (items.length === 0) {
    return <p className="text-center text-muted-foreground">ยังไม่มี todo ลองเพิ่มสักรายการเลย 🚀</p>
  }

  return (
    <div className="h-[300px] sm:h-[400px] md:h-[500px] overflow-y-auto scrollbar-thin pr-2">
      {items.map(todo => (
        <TodoItem key={todo.id} todo={todo} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </div>
  )
}
