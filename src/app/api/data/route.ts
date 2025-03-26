import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma"

// [GET] - ดึงข้อมูลทั้งหมด
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email') // ✅ ดึง email จาก query

  try {
    const result = await prisma.dota2.findMany({
      where: { userEmail: email || undefined }, // ✅ ถ้าไม่มี email จะไม่ filter
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

// [POST] - สร้างรายการใหม่
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, description, userEmail } = body  

    const newPost = await prisma.dota2.create({
      data: { title, description, userEmail }, 
    })

    return NextResponse.json(newPost)
  } catch (error) {
    console.error("POST Error:", error)
    return NextResponse.json({ error: "Failed to create data" }, { status: 500 })
  }
}
