"use server";

import { prisma } from "@/prisma";
import { auth } from "@/auth";

export async function getTodos(userEmail: string) {
  const session = await auth();
  if (!session || session.user?.email !== userEmail) return [];
  return prisma.dota2.findMany({
    where: { userEmail },
    orderBy: { createdAt: "desc" },
  });
}

export async function addTodo({
  title,
  description,
  userEmail,
}: {
  title: string;
  description?: string;
  userEmail: string;
}) {
  const session = await auth();
  if (!session || session.user?.email !== userEmail) {
    throw new Error("Unauthorized");
  }
  const todo = await prisma.dota2.create({
    data: {
      title,
      description: description || "",
      userEmail,
    },
  });
  return todo;
}

export async function updateTodo({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  await prisma.dota2.update({
    where: { id },
    data: {
      title,
      description: description || "",
    },
  });
}

export async function toggleTodo(id: string, completed: boolean) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  await prisma.dota2.update({
    where: { id },
    data: { completed },
  });
}

export async function deleteTodo(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  await prisma.dota2.delete({ where: { id } });
}