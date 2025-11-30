import { Target, Eye } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="tentang" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">About Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Selamat datang di STMIK Widya Utama, pusat inovasi dan teknologi
              di Purwokerto! Kami adalah institusi pendidikan tinggi yang
              membekali Anda dengan pengetahuan dan keterampilan yang diperlukan
              untuk bersaing di era digital. Ditenagai oleh fasilitas modern dan
              dosen berpengalaman, kami siap membawa Anda menuju masa depan yang
              cemerlang. Mari bersama-sama menulis cerita sukses Anda di STMIK
              Widya Utama!
            </p>

            {/* Visi & Misi */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Visi</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Pada Tahun 2027 menjadi Sekolah Tinggi yang berkualitas
                    dalam bidang Teknologi Informasi dan berjiwa
                    technopreneurship.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Misi</h3>
                  <ul className="text-muted-foreground text-sm leading-relaxed space-y-2">
                    <li>
                      - Menyelenggarakan proses pembelajaran yang berkualitas
                      dalam bidang teknologi informasi yang mendorong jiwa
                      technopreneurship.
                    </li>
                    <li>
                      - Mengembangkan dan mengintegrasikan teknologi informasi
                      melalui kegiatan penelitian berkelanjutan.
                    </li>
                    <li>
                      - Menerapkan bidang ilmu teknologi informasi untuk
                      kesejahteraan masyarakat sebagai wujud partisipasi dalam
                      pembangunan nasional.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* International Program */}
          <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
            <h3 className="text-2xl font-bold mb-4">
              Program Mahasiswa Luar Negeri
            </h3>
            <p className="text-primary-foreground/90 leading-relaxed mb-6">
              Jelajahi dunia dengan program internasional STMIK Widya Utama!
              Kami bekerja sama dengan institusi terkemuka di Jepang untuk
              memberikanmu pengalaman belajar yang berharga, wawasan budaya yang
              mendalam, dan keterampilan profesional yang berkelas dunia.
            </p>
            <p className="text-primary-foreground/90 leading-relaxed">
              Melalui program ini, kamu akan mendapatkan peluang untuk
              pertukaran mahasiswa, magang, dan pengalaman budaya yang
              memperkaya perspektifmu.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Image
                src="/students-exchange-program-japan-ceremony.jpg"
                alt="Program Internasional"
                width={200}
                height={150}
                className="rounded-lg object-cover w-full h-32"
              />
              <Image
                src="/indonesian-students-in-japan-university.jpg"
                alt="Mahasiswa STMIK"
                width={200}
                height={150}
                className="rounded-lg object-cover w-full h-32"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
