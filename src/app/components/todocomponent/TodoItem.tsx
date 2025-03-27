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
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="font-bold">{todo.title}</p>
            <p className="text-sm">{todo.description}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => onToggle(todo.id, todo.completed)}>
              {todo.completed ? 'Undo' : 'Done'}
            </Button>
            <Button variant="destructive" onClick={() => onDelete(todo.id)}>
              Delete
            </Button>
            <Button onClick={() => onEdit(todo.id, todo.title, todo.description ?? '')}>
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }