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
    return  NextResponse.json({message:"success"}, {status:200});
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}