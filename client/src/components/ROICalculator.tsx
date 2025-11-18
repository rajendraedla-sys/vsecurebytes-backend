import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useState } from 'react';

export default function ROICalculator() {
  const [ref, isVisible] = useIntersectionObserver();
  const [savingsCount, setSavingsCount] = useState(0);

  useEffect(() => {
    if (isVisible && savingsCount === 0) {
      const target = 221000;
      const increment = target / 100;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setSavingsCount(Math.floor(current));
      }, 20);

      return () => clearInterval(timer);
    }
  }, [isVisible, savingsCount]);

  return (
    <section ref={ref} className={`py-20 bg-dark-slate transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-roboto font-bold mb-6">
            <span className="text-gradient">Cost Comparison</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how private AI infrastructure compares to subscription-based solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subscription Model */}
          <div className="glass-effect rounded-2xl p-8 border-2 border-red-500/50">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-red-400 mb-2">Subscription Model</h3>
              <p className="text-gray-400">Traditional SaaS AI Services</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span>Monthly AI API Costs</span>
                <span className="font-mono-cyber text-red-400">$15,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Data Transfer Fees</span>
                <span className="font-mono-cyber text-red-400">$3,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Compliance Overhead</span>
                <span className="font-mono-cyber text-red-400">$5,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Security Risks</span>
                <span className="font-mono-cyber text-red-400">High</span>
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Annual Cost</span>
                <span className="font-mono-cyber text-red-400">$276,000</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-red-500/20 rounded-lg p-4">
                <p className="text-red-400 font-semibold">Limited Control & Data Sovereignty</p>
              </div>
            </div>
          </div>

          {/* Private Infrastructure */}
          <div className="glass-effect rounded-2xl p-8 border-2 border-matrix-green/50">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-matrix-green mb-2">Private Infrastructure</h3>
              <p className="text-gray-400">vSecureBytes Solution</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span>Initial Setup & Training</span>
                <span className="font-mono-cyber text-matrix-green">$75,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Annual Maintenance</span>
                <span className="font-mono-cyber text-matrix-green">$25,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Infrastructure Costs</span>
                <span className="font-mono-cyber text-matrix-green">$30,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Data Sovereignty</span>
                <span className="font-mono-cyber text-matrix-green">100%</span>
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Annual Cost (Year 2+)</span>
                <span className="font-mono-cyber text-matrix-green">$55,000</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-matrix-green/20 rounded-lg p-4">
                <p className="text-matrix-green font-semibold">Complete Control & Data Ownership</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-matrix-green mb-4">Annual Savings</h3>
            <div className="text-5xl font-bold font-mono-cyber text-gradient mb-4">
              ${savingsCount.toLocaleString()}
            </div>
            <p className="text-gray-300">80% cost reduction with complete data sovereignty and enhanced security</p>
          </div>
        </div>
      </div>
    </section>
  );
}
