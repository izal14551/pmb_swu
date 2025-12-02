import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { identifier, password } = await request.json();

  // cari user berdasarkan email atau username
  const user = await prisma.mahasiswa.findFirst({
    where: { OR: [{ email: identifier }, { username: identifier }] }
  });
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Pengguna tidak ditemukan" },
      { status: 404 }
    );
  }
  // cek status verifikasi
  if (!user.isVerified) {
    return NextResponse.json(
      { success: false, message: "Akun belum diverifikasi" },
      { status: 401 }
    );
  }
  // verifikasi password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json(
      { success: false, message: "Password salah" },
      { status: 401 }
    );
  }

  // hapus informasi sensitif sebelum dikirim
  const { password: _pass, verificationToken, ...safeUser } = user;

  return NextResponse.json({ success: true, user: safeUser }, { status: 200 });
}
