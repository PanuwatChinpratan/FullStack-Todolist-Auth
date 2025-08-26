import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const ALLOWED_EMAIL = process.env.ALLOWED_EMAIL!.toLowerCase();

// รับได้ทั้ง description และ des แล้ว normalize → des เท่านั้น
const BaseFields = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  description: z.string().optional(),
  des: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  lang: z.string().optional(),
  url: z.string().url().optional(),
  stars: z.number().int().optional(),
});

const PostInput = BaseFields.transform(({ description, des, ...rest }) => ({
  ...rest,
  des: des ?? description ?? undefined,
}));

export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });

  const shaped = posts.map((p) => ({
    ...p,
    description: p.des ?? null,
  }));

  return NextResponse.json(shaped);
}

export async function POST(req: Request) {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase() ?? null;
  if (!email || email !== ALLOWED_EMAIL.toLowerCase()) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const json = await req.json();
  const parsed = PostInput.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      des: data.des,
      tags: data.tags ?? [],
      lang: data.lang,
      url: data.url,
      stars: data.stars,
      authorEmail: email,
    },
  });

  return NextResponse.json(
    { ...post, description: post.des ?? null },
    { status: 201 }
  );
}
