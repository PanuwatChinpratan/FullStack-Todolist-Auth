"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type PostItem = {
  id: string;
  title: string;
  content: string;
  description?: string | null;
  tags: string[];
  lang?: string | null;
  url?: string | null;
  stars?: number | null;
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
};

type CreatePayload = {
  title: string;
  content: string;
  description?: string;
  tags?: string[];
  lang?: string;
  url?: string;
  stars?: number;
};

type UpdatePayload = {
  id: string;
  data: Partial<CreatePayload>;
};

export function usePosts(queryKeyExtra?: unknown) {
  const queryClient = useQueryClient();

  const postsQuery = useQuery<PostItem[]>({
    queryKey: ["posts", queryKeyExtra],
    queryFn: async () => {
      const res = await fetch("/api/posts", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreatePayload) => {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ? JSON.stringify(err.error) : "Create failed");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: UpdatePayload) => {
      const res = await fetch(`/api/posts/${payload.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload.data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ? JSON.stringify(err.error) : "Update failed");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ? JSON.stringify(err.error) : "Delete failed");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return { postsQuery, createMutation, updateMutation, deleteMutation };
}
