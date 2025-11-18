import Navigation from "@/components/Navigation";
import ProductSpotlight from "@/components/ProductSpotlight";
import Footer from "@/components/Footer";

export default function Products() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ProductSpotlight />
      </main>
      <Footer />
    </div>
  );
}