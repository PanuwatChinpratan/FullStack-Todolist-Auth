import { getTodos } from "@/app/todolist/action";
import { useQuery } from "@tanstack/react-query";

export const useTodos = (userEmail: string | null) => {
  return useQuery({
    queryKey: ["todos", userEmail],
    queryFn: async () => {
      if (!userEmail) return [];
      return await getTodos(userEmail);
    },
    enabled: !!userEmail,
  });
};
