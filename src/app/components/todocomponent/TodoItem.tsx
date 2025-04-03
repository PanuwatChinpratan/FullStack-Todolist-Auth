// components/todo/TodoItem.tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  todo: {
    id: number
    title: string
    description?: string
    completed: boolean
  }
  onEdit: (id: number, title: string, desc: string) => void
  onDelete: (id: number) => void
  onToggle: (id: number, completed: boolean) => void
}
export default function TodoItem({ todo, onEdit, onDelete, onToggle }: Props) {
  return (
    <Card className="mb-2">
      <CardContent className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-bold break-words">{todo.title}</p>
          <p className="text-sm break-words">{todo.description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button onClick={() => onToggle(todo.id, todo.completed)}>{todo.completed ? 'Undo' : 'Done'}</Button>
          <Button variant="destructive" onClick={() => onDelete(todo.id)}>
            Delete
          </Button>
          <Button onClick={() => onEdit(todo.id, todo.title, todo.description ?? '')}>Edit</Button>
        </div>
      </CardContent>
    </Card>
  )
}
