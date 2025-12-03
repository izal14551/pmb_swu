import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { success: false, message: "ID tidak ditemukan" },
      { status: 400 }
    );
  }
  const user = await prisma.mahasiswa.findUnique({
    where: { id: Number(id) },
    include: { documents: true }
  });
  if (!user) {
    return NextResponse.json(
      { success: false, message: "User tidak ditemukan" },
      { status: 404 }
    );
  }
  const { password, verificationToken, ...safeUser } = user;
  return NextResponse.json({ success: true, user: safeUser });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const userId = formData.get("userId")?.toString();
  if (!file || !userId) {
    return NextResponse.json(
      { success: false, message: "Data tidak lengkap" },
      { status: 400 }
    );
  }

  // simpan file ke folder public/uploads
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, fileName);
  await writeFile(filePath, buffer);

  // simpan metadata ke database
  const doc = await prisma.document.create({
    data: {
      name: file.name,
      filePath: `/uploads/${fileName}`,
      mahasiswaId: Number(userId)
    }
  });

  return NextResponse.json({ success: true, document: doc }, { status: 201 });
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, documents, ...fields } = data; // documents diabaikan
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID diperlukan" },
        { status: 400 }
      );
    }
    if (fields.dateOfBirth) {
      fields.dateOfBirth = new Date(fields.dateOfBirth);
    }
    const updated = await prisma.mahasiswa.update({
      where: { id: Number(id) },
      data: fields
    });
    const { password, verificationToken, ...safeUser } = updated;
    return NextResponse.json({ success: true, user: safeUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui data" },
      { status: 500 }
    );
  }
}
