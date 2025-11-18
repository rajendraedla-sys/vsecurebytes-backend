import { useState } from 'react';
import { Link } from 'wouter';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-matrix-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center py-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-16 h-16">
                  <img 
                  src="/vsecurebytes-logo.png"
                  alt="vSecureBytes Logo" 
                  className="h-16 w-16 object-contain rounded-full p-1"
                  style={{ 
                    filter: 'brightness(1.5) contrast(1.2)',
                    maxHeight: '64px',
                    minWidth: '64px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(0, 255, 0, 0.2)'
                  }}
                  />
                </div>
                <div className="text-2xl font-bold font-mono-cyber pl-1">
                  <span className="text-matrix-green">vSecureBytes</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-matrix-green transition-colors">Home</Link>
            <Link href="/services" className="text-white hover:text-matrix-green transition-colors">Services</Link>
            <Link href="/products" className="text-white hover:text-matrix-green transition-colors">Products</Link>
            <Link href="/architecture" className="text-white hover:text-matrix-green transition-colors">Architecture</Link>
            <Link href="/contact" className="text-white hover:text-matrix-green transition-colors">Contact</Link>
          </div>
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white hover:text-matrix-green"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden glass-effect border-t border-matrix-green/20`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="block px-3 py-2 text-white hover:text-matrix-green" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/services" className="block px-3 py-2 text-white hover:text-matrix-green" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link href="/products" className="block px-3 py-2 text-white hover:text-matrix-green" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
          <Link href="/architecture" className="block px-3 py-2 text-white hover:text-matrix-green" onClick={() => setIsMobileMenuOpen(false)}>Architecture</Link>
          <Link href="/contact" className="block px-3 py-2 text-white hover:text-matrix-green" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}
