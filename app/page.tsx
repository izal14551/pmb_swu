import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProgramsSection } from "@/components/programs-section";
import { TimelineSection } from "@/components/timeline-section";
import { RequirementsSection } from "@/components/requirements-section";
import { ContactSection } from "@/components/contact-section";
import { RegistrationForm } from "@/components/registration-form";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <TimelineSection />
      <RequirementsSection />
      <ContactSection />
      <RegistrationForm />
      <FAQSection />
      <Footer />
    </main>
  );
}
