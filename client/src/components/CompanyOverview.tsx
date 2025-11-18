import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function CompanyOverview() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section ref={ref} className={`py-20 bg-dark-slate transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Us Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-roboto font-bold mb-6">
            <span className="text-gradient">About vSecureBytes</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            A cutting-edge cybersecurity and GenAI innovation company focused on building scalable, 
            AI-driven applications across offensive security, defensive operations, and IT governance. 
            Our mission is to empower organizations with locally hosted, privacy-first AI solutions 
            that enhance security, visibility, and operational efficiency.
          </p>
        </div>

        {/* Founders Section */}
        <div className="glass-effect rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-matrix-green mb-8 text-center">Founded by Industry Expert</h3>
          <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-neon-blue/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-tie text-neon-blue text-3xl"></i>
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Srinivas Poodari</h4>
              <p className="text-matrix-green font-semibold">Founder</p>
            </div>
          </div>
          <p className="text-center text-gray-300 mt-6">
            Leading experts in cybersecurity and AI, bringing deep expertise in enterprise infrastructure, 
            ethical hacking, and intelligent automation to drive innovation in security solutions.
          </p>
        </div>

        {/* Core Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-gradient-matrix rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 hover-glow">
              <i className="fas fa-shield-alt text-matrix-green text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-matrix-green">Offense</h3>
            <p className="text-gray-300">Autonomous penetration testing and vulnerability assessment using AI-driven attack simulations that adapt to your environment.</p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-matrix rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 hover-glow">
              <i className="fas fa-fortress text-neon-blue text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-neon-blue">Defense</h3>
            <p className="text-gray-300">Continuous monitoring and threat detection with intelligent response systems and real-time analysis powered by local AI.</p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-matrix rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 hover-glow">
              <i className="fas fa-clipboard-check text-security-orange text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-security-orange">Governance</h3>
            <p className="text-gray-300">AI-driven compliance automation, risk reporting, and audit readiness with continuous monitoring aligned to regulatory standards.</p>
          </div>
        </div>

        {/* Vision & Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-neon-blue mb-4">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              To become a central force in AI-powered cybersecurity—bridging automation, compliance, 
              and intelligent decision-making. As threats evolve, we believe AI must be embedded 
              natively within the organization's infrastructure to provide real-time, contextual, 
              and proactive security insights.
            </p>
          </div>
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-matrix-green mb-4">Our Approach</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-server text-matrix-green mr-3"></i>
                <span className="text-gray-300"><strong>Local AI-First:</strong> All models deployed privately, ensuring full data control</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-puzzle-piece text-matrix-green mr-3"></i>
                <span className="text-gray-300"><strong>Modular Design:</strong> Solutions integrate seamlessly with existing ecosystems</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-expand-arrows-alt text-matrix-green mr-3"></i>
                <span className="text-gray-300"><strong>Scalable Architecture:</strong> Built for growing enterprises with adaptable modules</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
