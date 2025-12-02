import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto"; // Library bawaan Node.js untuk buat token acak
import { sendVerificationEmail } from "@/lib/mail"; // Import fungsi yang kita buat tadi
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. Cek User Ada atau Tidak
    const existingUser = await prisma.mahasiswa.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email atau Username sudah terdaftar" },
        { status: 409 }
      );
    }

    // 2. Buat Token Verifikasi Unik
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Simpan User ke Database (Status isVerified = false)
    const newMahasiswa = await prisma.mahasiswa.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        school: data.school,
        program: data.program,
        username: data.username,
        password: hashedPassword,
        isVerified: false,
        verificationToken: verificationToken
      }
    });

    // 4. Kirim Email Verifikasi
    await sendVerificationEmail(data.email, verificationToken, data.firstName);

    return NextResponse.json({
      success: true,
      message: "Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.",
      data: { id: newMahasiswa.id, email: newMahasiswa.email }
    });
  } catch (error) {
    console.error("Error registration:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
