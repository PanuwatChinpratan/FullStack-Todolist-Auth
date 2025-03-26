import { NextResponse } from "next/server";
import { prisma } from "@/prisma"; 

export async function GET() {
  const alldata = await prisma.dota2.findMany();

  return NextResponse.json(alldata);
}

export async function POST(req: Request) {

  
  const body = await req.json();

  
  const { title, description } = body;

  const newPost = await prisma.dota2.create({
    data: { title, description },
  });

  return NextResponse.json(newPost);
}
