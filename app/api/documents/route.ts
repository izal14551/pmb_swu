import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const formData = await request.formData();
  const userId = formData.get("userId")?.toString();

  // pastikan userId ada
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User ID diperlukan" },
      { status: 400 }
    );
  }

  const uploads = [];

  // iterasi setiap entry FormData, simpan setiap file
  for (const [key, value] of formData.entries()) {
    if (key === "userId") continue;
    const file = value as File;
    if (!file || file.size === 0) continue;

    // tulis file ke /public/uploads
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // simpan metadata ke database
    const doc = await prisma.document.create({
      data: {
        type: key, // misalnya "kk" atau "ktp"
        name: file.name,
        filePath: `/uploads/${fileName}`,
        mahasiswaId: Number(userId)
      }
    });
    uploads.push(doc);
  }

  return NextResponse.json({ success: true, uploads }, { status: 201 });
}
