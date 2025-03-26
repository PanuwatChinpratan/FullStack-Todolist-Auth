import { prisma } from "@/prisma";
import { NextResponse } from "next/server";
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log("Deleting ID:", params.id);

  try {
    const body = await req.json();
    const { title, description ,completed } = body;
    await prisma.dota2.update({
      where: { id: params.id },
      data: { title, description ,completed },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete data" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log("Deleting ID:", params.id);

  try {
    await prisma.dota2.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete data" },
      { status: 500 }
    );
  }
}
