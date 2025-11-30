// lib/mail.ts
import nodemailer from "nodemailer";

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  // Konfigurasi Transporter (Gunakan Gmail atau SMTP Hosting Kampus)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Email pengirim (misal: pmb@swu.ac.id atau gmail)
      pass: process.env.EMAIL_PASS // App Password (BUKAN password email biasa)
    }
  });

  // Link verifikasi yang akan diklik user
  // Pastikan port 3000 sesuai dengan port aplikasi Anda berjalan
  const verifyUrl = `http://localhost:3000/verify?token=${token}`;

  const mailOptions = {
    from: '"PMB STMIK Widya Utama" <no-reply@swu.ac.id>',
    to: email,
    subject: "Verifikasi Pendaftaran Mahasiswa Baru",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Halo, ${name}!</h2>
        <p>Terima kasih telah mendaftar di STMIK Widya Utama.</p>
        <p>Silakan klik tombol di bawah ini untuk memverifikasi email Anda:</p>
        <a href="${verifyUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verifikasi Email Saya</a>
        <p>Atau klik link ini: <a href="${verifyUrl}">${verifyUrl}</a></p>
        <p>Jika Anda tidak merasa mendaftar, abaikan email ini.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};
