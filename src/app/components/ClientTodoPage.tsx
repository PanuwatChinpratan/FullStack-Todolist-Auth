"use client";

import { useState } from "react";
import TodoInputForm from "./todocomponent/TodoInputForm";
import TodoList from "./todocomponent/TodoList";
import DeleteConfirmDialog from "./todocomponent/DeleteConfirmDialog";
import { useTodos } from "./todocomponent/useTodos";
import { toast } from "sonner";
import { useTodoStore } from "./todocomponent/useTodoStore";
import { deleteTodo, toggleTodo } from "../todolist/action";
type Props = {
  userEmail: string | null;
};

export default function ClientTodoPage({ userEmail }: Props) {
  const { setInputValue, setInputValueDes, setEditingId } = useTodoStore();
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: items = [], isLoading, refetch } = useTodos(userEmail);

  const toggleComplete = async (id: string, completed: boolean) => {
    await toggleTodo(id, !completed);
    refetch();
  };

  const handleDelete = async () => {
    if (selectedDeleteId === null) return;
    setDeletingId(selectedDeleteId);
    try {
      await deleteTodo(selectedDeleteId);
      toast("ลบ todo แล้ว 🗑️");
      refetch();
    } catch (error) {
      console.log(error);
      toast("ลบไม่สำเร็จ ❌");
    } finally {
      setDeletingId(null);
      setSelectedDeleteId(null);
    }
  };

  const handleEdit = (id: string, title: string, desc: string) => {
    setEditingId(id);
    setInputValue(title);
    setInputValueDes(desc);
  };

  if (!userEmail) {
    return (
      <p className="text-center">
        Please login to view your todo list with Google ง่ายสุด
      </p>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl text-center mb-4">Todo List</h1>
      <TodoInputForm userEmail={userEmail} refetch={refetch} />

      <TodoList
        items={items}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={(id) => setSelectedDeleteId(id)}
        onToggle={toggleComplete}
      />

      <DeleteConfirmDialog
        open={selectedDeleteId !== null}
        onCancel={() => setSelectedDeleteId(null)}
        onConfirm={handleDelete}
        isDeleting={deletingId !== null}
      />
    </div>
  );
}
