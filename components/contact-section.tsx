import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone, CreditCard } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            Informasi Pendaftaran
          </h2>
          <p className="text-muted-foreground">
            Hubungi kami untuk informasi lebih lanjut
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Alamat Kampus */}
          <Card className="bg-muted border-0">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Kampus STMIK Widya Utama</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Jalan Sunan Kalijaga, Berkoh, Purwokerto Selatan, Banyumas -
                Jawa Tengah
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                Jalan Soewatio No.94 Purwokerto Selatan, Banyumas - Jawa Tengah
              </p>
            </CardContent>
          </Card>

          {/* Waktu Pendaftaran */}
          <Card className="bg-muted border-0">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Waktu Pendaftaran</h3>
              <p className="text-sm text-muted-foreground">
                Setiap Hari Senin - Jum'at
                <br />
                Pukul 08.00 - 15.00 WIB
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Setiap Hari Sabtu
                <br />
                Pukul 08.00 - 13.00 WIB
              </p>
            </CardContent>
          </Card>

          {/* No Rekening */}
          <Card className="bg-muted border-0">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">No. Rekening Kampus</h3>
              <p className="text-sm text-muted-foreground">
                002 - BRI
                <br />
                <span className="font-mono font-medium text-foreground">
                  007701000774565
                </span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                a.n. STMIK WIDYA UTAMA
              </p>
            </CardContent>
          </Card>

          {/* Contact Person */}
          <Card className="bg-primary border-0">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/20 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2 text-primary-foreground">
                Contact Person
              </h3>
              <p className="text-2xl font-bold text-primary-foreground">
                0812-1237-2020
              </p>
              <p className="text-sm text-primary-foreground/80 mt-1">(Sari)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
