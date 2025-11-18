export default function Footer() {
  return (
    <footer className="bg-dark-slate border-t border-matrix-green/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold font-mono-cyber mb-4">
              <span className="text-matrix-green">vSecureBytes</span>
            </div>
            <p className="text-gray-400 mb-4">
              Enterprise AI-powered cybersecurity solutions with complete data sovereignty.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-matrix-green transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-matrix-green transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-matrix-green transition-colors">
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-matrix-green transition-colors">Custom LoRA Models</a></li>
              <li><a href="#" className="hover:text-matrix-green transition-colors">RAG+LLM Applications</a></li>
              <li><a href="#" className="hover:text-matrix-green transition-colors">Penetration Testing</a></li>
              <li><a href="#" className="hover:text-matrix-green transition-colors">Surface Monitoring</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-matrix-green transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-matrix-green transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-matrix-green transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-matrix-green transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-matrix-green transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-matrix-green transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-matrix-green transition-colors">Status Page</a></li>
              <li><a href="#" className="hover:text-matrix-green transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-matrix-green/20 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 vSecureBytes. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
