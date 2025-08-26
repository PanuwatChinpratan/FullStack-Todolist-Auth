import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const ALLOWED_EMAIL = process.env.ALLOWED_EMAIL!.toLowerCase();



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

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ...post, description: (post as any).des ?? null });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase() ?? null;
  if (!email || email !== ALLOWED_EMAIL.toLowerCase()) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const json = await req.json();
  const parsed = PatchInput.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;

  // กรองเฉพาะ key ที่ schema มีจริง
  const dataToUpdate: any = {};
  if (payload.title !== undefined) dataToUpdate.title = payload.title;
  if (payload.content !== undefined) dataToUpdate.content = payload.content;
  if (payload.des !== undefined) dataToUpdate.des = payload.des; 
  if (payload.tags !== undefined) dataToUpdate.tags = payload.tags;
  if (payload.lang !== undefined) dataToUpdate.lang = payload.lang;
  if (payload.url !== undefined) dataToUpdate.url = payload.url;
  if (payload.stars !== undefined) dataToUpdate.stars = payload.stars;

  const post = await prisma.post.update({
    where: { id: params.id },
    data: dataToUpdate,
  });

  return NextResponse.json({ ...post, description: (post as any).des ?? null });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase() ?? null;
  if (!email || email !== ALLOWED_EMAIL.toLowerCase()) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.post.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
