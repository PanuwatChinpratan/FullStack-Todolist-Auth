import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  todo: {
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
  };
  onEdit: (id: string, title: string, desc: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
};
export default function TodoItem({ todo, onEdit, onDelete, onToggle }: Props) {
  return (
    <Card className="mb-2">
      <CardContent className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-bold break-all">{todo.title}</p>
          <p className="text-sm break-all">{todo.description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
         <Button
            className="cursor-pointer shadow-md"
            variant={todo.completed ? 'secondary' : 'default'}
            onClick={() => onToggle(todo.id, todo.completed)}
          >
            {todo.completed ? 'Undo' : 'Done'}
          </Button>

         <Button
            className="cursor-pointer shadow-md"
            variant="destructive"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </Button>

               <Button
            className="cursor-pointer shadow-md"
            variant="outline"
            onClick={() => onEdit(todo.id, todo.title, todo.description ?? '')}
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
