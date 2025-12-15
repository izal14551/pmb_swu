// app/api/documents/[id]/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const docId = Number(params.id);
  const doc = await prisma.document.findUnique({ where: { id: docId } });
  if (!doc) {
    return NextResponse.json(
      { success: false, message: "Dokumen tidak ditemukan" },
      { status: 404 }
    );
  }

  // hapus file dari disk
  const fileOnDisk = path.join(process.cwd(), "public", doc.filePath);
  try {
    await unlink(fileOnDisk);
  } catch (err) {
    // file mungkin sudah tidak ada; abaikan error
  }

  await prisma.document.delete({ where: { id: docId } });
  return NextResponse.json({ success: true });
}
