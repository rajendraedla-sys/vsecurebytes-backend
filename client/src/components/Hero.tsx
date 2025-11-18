import { useEffect, useState } from 'react';
import { Link } from 'wouter';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const words = ['Private AI', 'Data Sovereignty', 'Zero Trust Security', 'Enterprise Control'];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      // Typing phase
      const currentWord = words[currentWordIndex];
      if (typedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setTypedText(currentWord.slice(0, typedText.length + 1));
        }, 100);
      } else {
        // Word complete, wait then start deleting
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      // Deleting phase
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(prev => prev.slice(0, -1));
        }, 50);
      } else {
        // Text cleared, move to next word
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedText, currentWordIndex, isTyping, words]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center neural-network particle-bg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-cyber opacity-90"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border border-matrix-green/20 rotate-45 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-neon-blue/20 rounded-full animate-float"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-security-orange/20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-matrix-green/20 border border-matrix-green/30 rounded-full text-matrix-green text-sm font-mono-cyber tracking-wider">
              ENTERPRISE CYBERSECURITY AI
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-roboto font-black mb-8 leading-tight">
            <span className="text-gradient block mb-2">Autonomous Security</span>
            <span className="text-white block">Through </span>
            <span className="text-matrix-green font-mono-cyber text-4xl md:text-5xl lg:text-6xl block mt-2">
              {typedText}<span className="animate-pulse">|</span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 font-inter leading-relaxed max-w-4xl mx-auto">
            Transform your cybersecurity with <span className="text-matrix-green font-semibold">locally hosted AI models</span>, 
            <span className="text-neon-blue font-semibold"> custom LoRA training</span>, and 
            <span className="text-security-orange font-semibold"> autonomous penetration testing</span> — 
            all while maintaining complete data ownership and control.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link 
              href="/services" 
              className="group bg-matrix-green text-cyber-blue px-10 py-4 rounded-lg font-semibold hover:bg-matrix-green/90 transition-all transform hover:scale-105 animate-glow flex items-center gap-3"
            >
              <i className="fas fa-rocket"></i>
              Explore Solutions
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </Link>
            <Link 
              href="/products" 
              className="group border-2 border-matrix-green text-matrix-green px-10 py-4 rounded-lg font-semibold hover:bg-matrix-green hover:text-cyber-blue transition-all transform hover:scale-105 flex items-center gap-3"
            >
              <i className="fas fa-cube"></i>
              View Products
            </Link>
          </div>
          
          {/* Value Proposition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/architecture" className="group">
              <div className="glass-effect rounded-lg p-4 border border-matrix-green/30 group-hover:border-matrix-green/60 transition-colors">
                <i className="fas fa-server text-matrix-green text-2xl mb-2"></i>
                <h3 className="font-semibold text-white mb-1">Local AI Deployment</h3>
                <p className="text-sm text-gray-400">Complete data sovereignty with on-premise AI infrastructure</p>
              </div>
            </Link>
            <Link href="/products" className="group">
              <div className="glass-effect rounded-lg p-4 border border-neon-blue/30 group-hover:border-neon-blue/60 transition-colors">
                <i className="fas fa-brain text-neon-blue text-2xl mb-2"></i>
                <h3 className="font-semibold text-white mb-1">Custom AI Models</h3>
                <p className="text-sm text-gray-400">LoRA fine-tuning tailored to your security requirements</p>
              </div>
            </Link>
            <Link href="/services" className="group">
              <div className="glass-effect rounded-lg p-4 border border-security-orange/30 group-hover:border-security-orange/60 transition-colors">
                <i className="fas fa-shield-virus text-security-orange text-2xl mb-2"></i>
                <h3 className="font-semibold text-white mb-1">Autonomous Testing</h3>
                <p className="text-sm text-gray-400">AI-driven penetration testing and vulnerability assessment</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Enhanced Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/6 animate-float">
          <div className="w-12 h-12 border border-matrix-green/30 rounded-lg flex items-center justify-center">
            <i className="fas fa-shield-alt text-matrix-green text-lg"></i>
          </div>
        </div>
        <div className="absolute top-1/3 right-1/6 animate-float" style={{animationDelay: '1s'}}>
          <div className="w-12 h-12 border border-neon-blue/30 rounded-full flex items-center justify-center">
            <i className="fas fa-lock text-neon-blue text-lg"></i>
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/4 animate-float" style={{animationDelay: '2s'}}>
          <div className="w-12 h-12 border border-security-orange/30 rounded-lg flex items-center justify-center rotate-45">
            <i className="fas fa-brain text-security-orange text-lg -rotate-45"></i>
          </div>
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-float" style={{animationDelay: '3s'}}>
          <div className="w-12 h-12 border border-cyber-purple/30 rounded-lg flex items-center justify-center">
            <i className="fas fa-network-wired text-cyber-purple text-lg"></i>
          </div>
        </div>
        <div className="absolute top-1/2 right-1/12 animate-float" style={{animationDelay: '4s'}}>
          <div className="w-8 h-8 border border-matrix-green/20 rounded-full animate-pulse-slow"></div>
        </div>
        <div className="absolute bottom-1/2 left-1/12 animate-float" style={{animationDelay: '5s'}}>
          <div className="w-8 h-8 border border-neon-blue/20 rounded-full animate-pulse-slow"></div>
        </div>
      </div>
    </section>
  );
}
