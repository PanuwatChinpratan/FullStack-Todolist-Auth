import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { z } from "zod";
import type { Post, Prisma } from "@prisma/client";

const ALLOWED_EMAIL = (process.env.ALLOWED_EMAIL ?? "").toLowerCase();

const PatchInput = z
  .object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    description: z.string().optional(),
    des: z.string().optional(),
    tags: z.array(z.string()).optional(),
    lang: z.string().optional(),
    url: z.string().url().optional(),
    stars: z.number().int().optional(),
  })
  .transform(({ description, des, ...rest }) => ({
    ...rest,
    des: des ?? description ?? undefined,
  }));

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const post: Post | null = await prisma.post.findUnique({
    where: { id: params.id },
  });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // ❌ ลบ (post as any).des
  // ✅ ใช้ชนิด Post แล้วอ้าง post.des ได้ตรงๆ
  return NextResponse.json({ ...post, description: post.des ?? null });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
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

  const payload = parsed.data;

  // ❌ ลบ dataToUpdate: any
  // ✅ ใช้ Prisma.PostUpdateInput (รองรับ partial update)
  const dataToUpdate = {
    ...(payload.title !== undefined && { title: payload.title }),
    ...(payload.content !== undefined && { content: payload.content }),
    ...(payload.des !== undefined && { des: payload.des }),
    // หมายเหตุ: ถ้า field tags เป็น scalar list ของ Prisma ใช้ใส่เป็น array ตรงๆได้
    // หรือจะใช้ { set: payload.tags } ก็ได้ ตาม schema
    ...(payload.tags !== undefined && { tags: payload.tags }),
    ...(payload.lang !== undefined && { lang: payload.lang }),
    ...(payload.url !== undefined && { url: payload.url }),
    ...(payload.stars !== undefined && { stars: payload.stars }),
  } satisfies Prisma.PostUpdateInput;

  const post: Post = await prisma.post.update({
    where: { id: params.id },
    data: dataToUpdate,
  });

  // ❌ ลบ (post as any).des
  // ✅ ใช้ post.des โดยตรง
  return NextResponse.json({ ...post, description: post.des ?? null });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase() ?? null;
  if (!email || email !== ALLOWED_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.post.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
