// src/app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

const ALLOWED_EMAIL = (process.env.ALLOWED_EMAIL ?? "").toLowerCase();

const PatchInput = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  description: z.string().optional(),
  des: z.string().optional(),
  tags: z.array(z.string()).optional(),
  lang: z.string().optional(),
  url: z.string().url().optional(),
  stars: z.number().int().optional(),
}).transform(({ description, des, ...rest }) => ({
  ...rest,
  des: des ?? description ?? undefined,
}));

function getIdFromPath(req: NextRequest) {
  // รองรับกรณีมี/ไม่มี trailing slash
  const parts = req.nextUrl.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? null;
}

export async function GET(req: NextRequest) {
  const id = getIdFromPath(req);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ...post, description: post.des ?? null });
}

export async function PATCH(req: NextRequest) {
  const id = getIdFromPath(req);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const session = await auth();
  const email = session?.user?.email?.toLowerCase() ?? null;
  if (!email || email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const json = await req.json();
  const parsed = PatchInput.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const p = parsed.data;
  const dataToUpdate = {
    ...(p.title !== undefined && { title: p.title }),
    ...(p.content !== undefined && { content: p.content }),
    ...(p.des !== undefined && { des: p.des }),
    ...(p.tags !== undefined && { tags: p.tags }),
    ...(p.lang !== undefined && { lang: p.lang }),
    ...(p.url !== undefined && { url: p.url }),
    ...(p.stars !== undefined && { stars: p.stars }),
  } satisfies Prisma.PostUpdateInput;

  const post = await prisma.post.update({ where: { id }, data: dataToUpdate });
  return NextResponse.json({ ...post, description: post.des ?? null });
}

export async function DELETE(req: NextRequest) {
  const id = getIdFromPath(req);
  if (!id) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const session = await auth();
  const email = session?.user?.email?.toLowerCase() ?? null;
  if (!email || email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
