import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function TechnicalArchitecture() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="architecture" ref={ref} className={`py-20 bg-cyber-blue code-rain transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-roboto font-bold mb-6">
            <span className="text-gradient">Technical Architecture</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Enterprise-grade infrastructure designed for scalability, security, and performance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-matrix-green">Private AI Infrastructure</h3>
            <div className="bg-gradient-to-br from-cyber-blue/20 to-matrix-green/10 rounded-xl mb-6 w-full h-48 relative border border-matrix-green/30 overflow-hidden">
              {/* Data Center Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-3">
                  {/* Server Rack Icons */}
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="text-center">
                      <i className="fas fa-server text-matrix-green text-2xl mb-1 animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></i>
                      <div className="w-1 h-6 bg-matrix-green/30 mx-auto rounded-full">
                        <div className="w-1 h-2 bg-matrix-green rounded-full animate-pulse" style={{animationDelay: `${i * 0.3}s`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Network Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-30">
                <defs>
                  <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00FF88" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#0A0E27" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                <path d="M20,24 Q120,50 220,24 T420,24" stroke="url(#networkGradient)" strokeWidth="2" fill="none" className="animate-pulse"/>
                <path d="M20,120 Q120,90 220,120 T420,120" stroke="url(#networkGradient)" strokeWidth="2" fill="none" className="animate-pulse"/>
              </svg>
              <div className="absolute bottom-4 left-4 text-matrix-green text-sm font-semibold">
                Private Data Center Infrastructure
              </div>
              <div className="absolute top-4 right-4 text-xs text-gray-400">
                Enterprise Security
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <i className="fas fa-server text-matrix-green mr-3"></i>
                <span>On-premise or private cloud deployment</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-lock text-matrix-green mr-3"></i>
                <span>End-to-end encryption and data sovereignty</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-chart-line text-matrix-green mr-3"></i>
                <span>Scalable compute resources and GPU acceleration</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-shield-alt text-matrix-green mr-3"></i>
                <span>Zero-trust security architecture</span>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-neon-blue">AI Model Training Pipeline</h3>
            <img 
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600" 
              alt="Advanced AI neural network visualization with data processing and machine learning algorithms" 
              className="rounded-xl mb-6 w-full h-48 object-cover"
            />
            <div className="space-y-4">
              <div className="flex items-center">
                <i className="fas fa-brain text-neon-blue mr-3"></i>
                <span>Custom LoRA model training and fine-tuning</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-database text-neon-blue mr-3"></i>
                <span>Private data ingestion and preprocessing</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-cogs text-neon-blue mr-3"></i>
                <span>Automated model deployment and versioning</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-tachometer-alt text-neon-blue mr-3"></i>
                <span>Real-time performance monitoring and optimization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="glass-effect rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-8 text-center text-gradient">System Architecture Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-matrix-green/20 rounded-2xl p-6 mb-4">
                <i className="fas fa-desktop text-matrix-green text-4xl mb-4"></i>
                <h4 className="text-xl font-semibold text-matrix-green mb-2">Control Center</h4>
                <p className="text-sm text-gray-300">React TypeScript Interface<br />Real-time Dashboard<br />Session Management</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-neon-blue/20 rounded-2xl p-6 mb-4">
                <i className="fas fa-cloud text-neon-blue text-4xl mb-4"></i>
                <h4 className="text-xl font-semibold text-neon-blue mb-2">AI Processing Layer</h4>
                <p className="text-sm text-gray-300">OLLAMA Integration<br />Custom LoRA Models<br />RAG+LLM Pipeline</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-security-orange/20 rounded-2xl p-6 mb-4">
                <i className="fas fa-network-wired text-security-orange text-4xl mb-4"></i>
                <h4 className="text-xl font-semibold text-security-orange mb-2">Agent Network</h4>
                <p className="text-sm text-gray-300">Distributed Agents<br />SSL/TLS Encryption<br />Auto-upgrade Capability</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
