import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function ProductSpotlight() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="products" ref={ref} className={`py-20 bg-dark-slate transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-roboto font-bold mb-6">
            <span className="text-gradient">Product Portfolio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive AI-powered solutions designed for enterprise cybersecurity and IT operations
          </p>
        </div>

        {/* vSecureBytes Pro - Flagship */}
        <div className="glass-effect rounded-2xl p-8 mb-12 cyber-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
                alt="Advanced cybersecurity command center with multiple monitoring screens" 
                className="rounded-xl shadow-2xl w-full h-auto"
              />
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-matrix-green/20 rounded-lg p-3 mr-4">
                  <i className="fas fa-shield-alt text-matrix-green text-2xl"></i>
                </div>
                <h3 className="text-3xl font-bold text-matrix-green">vSecureBytes Pro</h3>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Our flagship AI platform combining autonomous offensive testing, external surface analysis, 
                and smart reporting powered by local AI models. Advanced penetration testing with continuous monitoring.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-robot text-matrix-green mr-3"></i>
                  <span className="text-gray-300">Autonomous penetration testing with OLLAMA integration</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-network-wired text-matrix-green mr-3"></i>
                  <span className="text-gray-300">Distributed agent network with SSL/TLS encryption</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-eye text-matrix-green mr-3"></i>
                  <span className="text-gray-300">24/7 external surface monitoring and threat detection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* vSecure ChatOps */}
          <div className="glass-effect rounded-2xl p-8 hover-glow cyber-border">
            <div className="flex items-center mb-6">
              <div className="bg-neon-blue/20 rounded-lg p-3 mr-4">
                <i className="fas fa-comments text-neon-blue text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-neon-blue">vSecure ChatOps</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Internal, role-based AI chatbots for IT support, knowledge retrieval, and automation. 
              Trained on your internal documentation and user profiles.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-user-shield text-neon-blue mr-3 text-sm"></i>
                <span className="text-sm text-gray-400">Role-based access control</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-book text-neon-blue mr-3 text-sm"></i>
                <span className="text-sm text-gray-400">Internal knowledge base integration</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-cogs text-neon-blue mr-3 text-sm"></i>
                <span className="text-sm text-gray-400">Automated IT support workflows</span>
              </div>
            </div>
          </div>

          {/* InfraSense AI */}
          <div className="glass-effect rounded-2xl p-8 hover-glow cyber-border">
            <div className="flex items-center mb-6">
              <div className="bg-cyber-purple/20 rounded-lg p-3 mr-4">
                <i className="fas fa-server text-cyber-purple text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-cyber-purple">InfraSense AI</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Real-time IT monitoring, anomaly detection, and cost optimization platform. 
              AI-driven insights for infrastructure management and predictive maintenance.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-chart-line text-cyber-purple mr-3 text-sm"></i>
                <span className="text-sm text-gray-400">Predictive anomaly detection</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-dollar-sign text-cyber-purple mr-3 text-sm"></i>
                <span className="text-sm text-gray-400">Cloud cost optimization</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-tachometer-alt text-cyber-purple mr-3 text-sm"></i>
                <span className="text-sm text-gray-400">Real-time performance monitoring</span>
              </div>
            </div>
          </div>

          {/* GovernIQ */}
          <div className="glass-effect rounded-2xl p-8 hover-glow cyber-border">
            <div className="flex items-center mb-6">
              <div className="bg-security-orange/20 rounded-lg p-3 mr-4">
                <i className="fas fa-clipboard-check text-security-orange text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-security-orange">GovernIQ</h3>
            </div>
            <p className="text-gray-300 mb-6">
              AI-driven governance and compliance automation suite with continuous audit readiness. 
              Automated compliance checks and risk reporting.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-shield-check text-security-orange mr-3 text-sm"></i>
                <span className="text-sm text-gray-400">Continuous compliance monitoring</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-file-alt text-security-orange mr-3 text-sm"></i>
                <span className="text-sm text-gray-400">Automated audit reporting</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-exclamation-triangle text-security-orange mr-3 text-sm"></i>
                <span className="text-sm text-gray-400">Risk assessment and scoring</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a 
            href="#contact" 
            className="bg-matrix-green text-cyber-blue px-12 py-4 rounded-lg font-semibold hover:bg-matrix-green/90 transition-all transform hover:scale-105 inline-block text-lg"
          >
            Explore Our Solutions
          </a>
        </div>
      </div>
    </section>
  );
}
