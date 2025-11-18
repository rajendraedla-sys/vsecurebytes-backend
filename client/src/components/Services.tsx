import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function Services() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="services" ref={ref} className={`py-20 bg-cyber-blue transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-roboto font-bold mb-6">
            <span className="text-gradient">Core Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive AI-powered cybersecurity solutions tailored for enterprise environments
          </p>
        </div>

        {/* Core AI Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Custom LoRA Models */}
          <div className="glass-effect rounded-2xl p-8 hover-glow cyber-border">
            <div className="flex items-center mb-6">
              <div className="bg-matrix-green/20 rounded-lg p-3 mr-4">
                <i className="fas fa-brain text-matrix-green text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-matrix-green">Custom LoRA Model Creation</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Enterprise-specific AI model training and deployment for your unique security requirements. 
              Our custom LoRA (Low-Rank Adaptation) models are trained on your organization's data patterns 
              and security policies with complete data sovereignty.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-check text-matrix-green mr-3"></i>
                <span className="text-sm">Domain-specific security knowledge integration</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check text-matrix-green mr-3"></i>
                <span className="text-sm">Reduced training time and computational costs</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check text-matrix-green mr-3"></i>
                <span className="text-sm">Complete data privacy and model ownership</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check text-matrix-green mr-3"></i>
                <span className="text-sm">Seamless integration with existing infrastructure</span>
              </div>
            </div>
          </div>

          {/* RAG+LLM Applications */}
          <div className="glass-effect rounded-2xl p-8 hover-glow cyber-border">
            <div className="flex items-center mb-6">
              <div className="bg-neon-blue/20 rounded-lg p-3 mr-4">
                <i className="fas fa-database text-neon-blue text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-neon-blue">RAG+LLM Applications</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Private knowledge base integration with enterprise data through Retrieval-Augmented Generation. 
              Transform your organization's security documentation and incident data into intelligent, queryable systems 
              without data leaving your infrastructure.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-check text-neon-blue mr-3"></i>
                <span className="text-sm">Private knowledge base querying and analysis</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check text-neon-blue mr-3"></i>
                <span className="text-sm">Real-time security policy interpretation</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check text-neon-blue mr-3"></i>
                <span className="text-sm">Incident response automation and guidance</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check text-neon-blue mr-3"></i>
                <span className="text-sm">Context-aware decision support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Capabilities */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gradient mb-6">Expanding Capabilities</h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Building on our offensive security foundation, we are rapidly expanding into comprehensive 
            enterprise AI solutions that transform IT operations and governance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {/* AI-Powered Penetration Testing */}
          <div className="glass-effect rounded-2xl p-8 hover-glow cyber-border">
            <div className="flex items-center mb-6">
              <div className="bg-security-orange/20 rounded-lg p-3 mr-4">
                <i className="fas fa-crosshairs text-security-orange text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-security-orange">Offensive Security</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Autonomous vulnerability assessment and penetration testing using advanced AI algorithms 
              that continuously evolve attack strategies.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <i className="fas fa-check text-security-orange mr-2 text-xs"></i>
                <span className="text-xs text-gray-400">Automated vulnerability discovery</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check text-security-orange mr-2 text-xs"></i>
                <span className="text-xs text-gray-400">Intelligent attack path analysis</span>
              </div>
            </div>
          </div>

          {/* Internal AI Agents & Chatbots */}
          <div className="glass-effect rounded-2xl p-8 hover-glow cyber-border">
            <div className="flex items-center mb-6">
              <div className="bg-neon-blue/20 rounded-lg p-3 mr-4">
                <i className="fas fa-robot text-neon-blue text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-neon-blue">AI Agents & ChatOps</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Secure, role-based AI chatbots trained on internal documentation to support 
              IT teams, developers, and end-users with context-aware assistance.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <i className="fas fa-check text-neon-blue mr-2 text-xs"></i>
                <span className="text-xs text-gray-400">Role-based access control</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check text-neon-blue mr-2 text-xs"></i>
                <span className="text-xs text-gray-400">Internal knowledge integration</span>
              </div>
            </div>
          </div>

          {/* Infrastructure Monitoring */}
          <div className="glass-effect rounded-2xl p-8 hover-glow cyber-border">
            <div className="flex items-center mb-6">
              <div className="bg-cyber-purple/20 rounded-lg p-3 mr-4">
                <i className="fas fa-server text-cyber-purple text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-cyber-purple">Infrastructure AI</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              AI-driven anomaly detection, predictive insights, and cloud-native cost 
              optimization for enhanced IT monitoring and operational efficiency.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <i className="fas fa-check text-cyber-purple mr-2 text-xs"></i>
                <span className="text-xs text-gray-400">Predictive anomaly detection</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check text-cyber-purple mr-2 text-xs"></i>
                <span className="text-xs text-gray-400">Cost optimization insights</span>
              </div>
            </div>
          </div>

          {/* Governance & Compliance */}
          <div className="glass-effect rounded-2xl p-8 hover-glow cyber-border">
            <div className="flex items-center mb-6">
              <div className="bg-security-orange/20 rounded-lg p-3 mr-4">
                <i className="fas fa-clipboard-check text-security-orange text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-security-orange">Governance AI</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Automated compliance checks, log analysis, and risk reporting using 
              secure, locally hosted AI models aligned with regulatory standards.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <i className="fas fa-check text-security-orange mr-2 text-xs"></i>
                <span className="text-xs text-gray-400">Continuous compliance monitoring</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check text-security-orange mr-2 text-xs"></i>
                <span className="text-xs text-gray-400">Automated audit readiness</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
