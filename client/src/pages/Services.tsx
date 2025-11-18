import ServicesSection from "@/components/Services";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}