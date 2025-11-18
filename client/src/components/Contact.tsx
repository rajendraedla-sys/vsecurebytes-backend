import { useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface ContactForm {
  fullName: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}

export default function Contact() {
  const [ref, isVisible] = useIntersectionObserver();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactForm>({
    fullName: '',
    email: '',
    company: '',
    interest: '',
    message: ''
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Consultation Request Sent",
        description: "Thank you for your interest! We will contact you within 24 hours.",
      });
      setFormData({
        fullName: '',
        email: '',
        company: '',
        interest: '',
        message: ''
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send consultation request. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.company || !formData.interest) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" ref={ref} className={`py-20 bg-cyber-blue transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-roboto font-bold mb-6">
            <span className="text-gradient">Get Started</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your cybersecurity with AI? Let's discuss your enterprise requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-matrix-green">Enterprise Consultation</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-matrix-green/20 rounded-lg p-3 mr-4">
                  <i className="fas fa-calendar text-matrix-green"></i>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Free Security Assessment</h4>
                  <p className="text-gray-300">Comprehensive evaluation of your current security posture and AI readiness.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-neon-blue/20 rounded-lg p-3 mr-4">
                  <i className="fas fa-users text-neon-blue"></i>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Partnership Opportunities</h4>
                  <p className="text-gray-300">Strategic partnerships for cybersecurity firms and technology integrators.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-security-orange/20 rounded-lg p-3 mr-4">
                  <i className="fas fa-cog text-security-orange"></i>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Custom Solutions</h4>
                  <p className="text-gray-300">Tailored AI cybersecurity solutions designed for your specific industry and requirements.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <i className="fas fa-envelope text-matrix-green mr-4"></i>
                <span className="text-gray-300">contact@vsecurebytes.com</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone text-matrix-green mr-4"></i>
                <span className="text-gray-300">+1 (555) 123-SECURE</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt text-matrix-green mr-4"></i>
                <span className="text-gray-300">Global Enterprise Support</span>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full bg-dark-slate border-matrix-green/30 text-white focus:border-matrix-green"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-dark-slate border-matrix-green/30 text-white focus:border-matrix-green"
                  placeholder="your.email@company.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
                <Input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full bg-dark-slate border-matrix-green/30 text-white focus:border-matrix-green"
                  placeholder="Your company name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Interest Area *</label>
                <Select value={formData.interest} onValueChange={(value) => handleInputChange('interest', value)}>
                  <SelectTrigger className="w-full bg-dark-slate border-matrix-green/30 text-white focus:border-matrix-green">
                    <SelectValue placeholder="Select your interest area" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-slate border-matrix-green/30">
                    <SelectItem value="custom-lora">Custom LoRA Models</SelectItem>
                    <SelectItem value="rag-llm">RAG+LLM Applications</SelectItem>
                    <SelectItem value="penetration-testing">Penetration Testing</SelectItem>
                    <SelectItem value="surface-monitoring">External Surface Monitoring</SelectItem>
                    <SelectItem value="complete-platform">Complete Platform</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Details</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="w-full bg-dark-slate border-matrix-green/30 text-white focus:border-matrix-green"
                  placeholder="Tell us about your cybersecurity requirements and goals..."
                />
              </div>
              
              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-matrix-green text-cyber-blue py-3 px-6 rounded-lg font-semibold hover:bg-matrix-green/90 transition-all transform hover:scale-105"
              >
                {contactMutation.isPending ? 'Sending...' : 'Request Consultation'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
