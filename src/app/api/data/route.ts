import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma"

// [GET] - ดึงข้อมูลทั้งหมด
export async function GET() {
  try {
    const alldata = await prisma.dota2.findMany()
    return NextResponse.json(alldata)
  } catch (error) {
    console.error("GET Error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

// [POST] - สร้างรายการใหม่
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, description } = body

    const newPost = await prisma.dota2.create({
      data: { title, description },
    })

    return NextResponse.json(newPost)
  } catch (error) {
    console.error("POST Error:", error)
    return NextResponse.json({ error: "Failed to create data" }, { status: 500 })
  }
}
