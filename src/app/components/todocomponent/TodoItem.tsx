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
          <p className="font-bold break-all">{todo.title}</p>
          <p className="text-sm break-all">{todo.description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button className={`cursor-pointer shadow-md ${todo.completed ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-green-500 text-white hover:bg-green-600'}`} onClick={() => onToggle(todo.id, todo.completed)}>
            {todo.completed ? 'Undo' : 'Done'}
          </Button>

          <Button className="cursor-pointer shadow-md bg-red-500 text-white hover:bg-red-800" onClick={() => onDelete(todo.id)}>
            Delete
          </Button>

          <Button className="cursor-pointer shadow-md bg-blue-500 text-white hover:bg-blue-600" onClick={() => onEdit(todo.id, todo.title, todo.description ?? '')}>
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
