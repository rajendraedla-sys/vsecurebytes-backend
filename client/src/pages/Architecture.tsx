import Navigation from "@/components/Navigation";
import TechnicalArchitecture from "@/components/TechnicalArchitecture";
import Footer from "@/components/Footer";

export default function Architecture() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <TechnicalArchitecture />
      </main>
      <Footer />
    </div>
  );
}