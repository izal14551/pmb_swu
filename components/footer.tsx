import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
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
            <p className="text-background/70 text-sm leading-relaxed">
              Sekolah Tinggi Manajemen Informatika dan Komputer. Pusat inovasi
              dan teknologi di Purwokerto.
            </p>
          </div>

          {/* Tautan */}
          <div>
            <h4 className="font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              {[
                { label: "Tentang Kami", href: "#tentang" },
                { label: "Program Studi", href: "#program" },
                { label: "Alur Pendaftaran", href: "#alur" },
                { label: "Biaya Kuliah", href: "#biaya" }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PMB */}
          <div>
            {(() => {
              const currentYear = new Date().getFullYear();
              const nextYear = currentYear + 1;
              return (
                <h4 className="font-semibold mb-4">
                  PMB {currentYear}/{nextYear}
                </h4>
              );
            })()}
            <ul className="space-y-2">
              {[
                {
                  label: "Formulir Online",
                  href: "https://bit.ly/FormulirPPMB2025-2026"
                },
                { label: "Persyaratan", href: "#biaya" },
                { label: "FAQ", href: "#faq" }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  Jl. Sunan Kalijaga, Berkoh, Purwokerto Selatan, Banyumas Jawa
                  Tengah
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <span className="text-background/70 text-sm">
                  (0281) 6512290
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <span className="text-background/70 text-sm">
                  info.kampus@swu.ac.id
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © 2025 STMIK Widya Utama. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6 text-background/60 text-sm">
            <span>stmikwidyautama.swu</span>
            <span>Stmik Widya Utama</span>
            <span>swu.ac.id</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
