"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { CheckCircle, ArrowRight } from "lucide-react";

const programStudiOptions = [
  "S1 Teknik Informatika",
  "S1 Sistem Informasi",
  "D3 Teknik Informatika",
  "D3 Komputerisasi Akuntansi"
];

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    school: "",
    program: programStudiOptions[0],
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProgramChange = (value: string) => {
    setForm({ ...form, program: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Gagal mendaftar");
    } catch (err) {
      // Handle error sesuai kebutuhan
    }
    setIsLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="daftar" className="py-24 bg-muted">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardContent className="pt-12 pb-12">
              <div className="w-16 h-16 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Pendaftaran Berhasil!</h3>
              <p className="text-muted-foreground mb-6">
                Terima kasih telah mendaftar. Tim kami akan menghubungi Anda
                melalui email dalam 1-2 hari kerja.
              </p>
              <Button onClick={() => setSubmitted(false)}>Daftar Lagi</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="daftar" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase mb-2">
              Mulai Perjalananmu
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
              Daftar Sekarang
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Isi formulir pendaftaran untuk memulai perjalanan akademikmu di
              STMIK Widya Utama. Tim admisi kami siap membantu setiap langkahmu.
            </p>

            <div className="space-y-4">
              {[
                "Proses pendaftaran mudah dan cepat",
                "Konsultasi gratis dengan tim admisi",
                "Program beasiswa USPI dan SPP tersedia",
                "Peluang kerja di Jepang"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-background" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Formulir Pendaftaran</CardTitle>
              <CardDescription>
                Lengkapi data diri Anda untuk mendaftar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nama Depan</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nama Belakang</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="08123456789"
                    required
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school">Asal Sekolah</Label>
                  <Input
                    id="school"
                    name="school"
                    placeholder="SMA Negeri 1 Purwokerto"
                    required
                    value={form.school}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program">Pilihan Program Studi</Label>
                  <Select
                    value={form.program}
                    onValueChange={handleProgramChange}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih program studi" />
                    </SelectTrigger>
                    <SelectContent>
                      {programStudiOptions.map((program) => (
                        <SelectItem key={program} value={program}>
                          {program}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    required
                    value={form.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Memproses..." : "Kirim Pendaftaran"}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Dengan mendaftar, Anda menyetujui syarat dan ketentuan yang
                  berlaku.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
