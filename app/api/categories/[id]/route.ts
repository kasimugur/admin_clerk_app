import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await prisma.category.delete({
      where: {
        id
      }
    })
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { title, description } = await request.json();
  try {
    const updateCategory = await prisma.category.update({
      where: {
        id
      },
      data: {
        title,
        description
      }
    })
    return NextResponse.json(updateCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
