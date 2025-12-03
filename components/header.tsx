"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Tentang", href: "#tentang" },
  { label: "Program Studi", href: "#program" },
  { label: "Alur Pendaftaran", href: "#alur" },
  { label: "Biaya", href: "#biaya" },
  { label: "FAQ", href: "#faq" }
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/LOGO-SWU-BERWARNA.png"
              alt="Logo Kampus"
              className="w-10 h-10  object-cover"
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-tight">STMIK</span>
              <span className="font-bold text-sm leading-tight">
                Widya Utama
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button className="border border-primary text-primary bg-transparant hover:bg-primary hover:text-primary-foreground transition">
                Masuk
              </Button>
            </Link>
            <Link href="#daftar">
              <Button>Daftar Sekarang</Button>
            </Link>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Masuk
                </Button>
              </Link>
              <Link href="#daftar" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Daftar Sekarang</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
