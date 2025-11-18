import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CompanyOverview from '@/components/CompanyOverview';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-cyber text-white">
      <Navigation />
      <Hero />
      <CompanyOverview />
      <Footer />
    </div>
  );
}
