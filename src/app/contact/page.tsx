"use client";
import Link from "next/link";
import { 
  ArrowLeft, Mail, Phone, MapPin, Clock, 
  MessageCircle, Send, CheckCircle2, AlertCircle,
  ExternalLink, Zap, User, Globe, Shield, 
  Github, Twitter, Linkedin, MailCheck,
  Headphones, HelpCircle, FileText, Star
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    // Simulate form submission
    try {
      // Replace with your actual API endpoint
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={20} />,
      title: "WhatsApp Support",
      description: "Fast response for technical issues",
      contact: "+62 877-9188-9957",
      action: "https://wa.me/6287791889957",
      actionText: "Chat Now",
      color: "green"
    },
    {
      icon: <Mail size={20} />,
      title: "Email Support",
      description: "For detailed inquiries and business",
      contact: "yab9145@gmail.com",
      action: "mailto:yab9145@gmail.com",
      actionText: "Send Email",
      color: "blue"
    },
    {
      icon: <MessageCircle size={20} />,
      title: "Live Chat",
      description: "Mon-Fri, 9 AM - 6 PM WIB",
      contact: "Available now",
      action: "https://wa.me/6287791889957",
      actionText: "Start Chat",
      color: "purple"
    }
  ];

  const faqs = [
    {
      question: "How do I report a bug or technical issue?",
      answer: "You can report bugs directly via WhatsApp at +62 877-9188-9957 with screenshots and steps to reproduce the issue."
    },
    {
      question: "Is KyTools free to use?",
      answer: "Yes, all core features are completely free. We may introduce premium features in the future, but basic tools will remain free."
    },
    {
      question: "How do I request a new feature?",
      answer: "Feature requests are welcome! Send your suggestions via WhatsApp or email with detailed description of what you'd like to see."
    },
    {
      question: "What is your response time?",
      answer: "We typically respond within 24 hours on weekdays. Urgent issues via WhatsApp are addressed within 2-4 hours."
    },
    {
      question: "Do you offer API access?",
      answer: "Yes, we provide API documentation for developers. Contact us to get API credentials and documentation access."
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.01)_25%,rgba(99,102,241,0.01)_50%,transparent_50%,transparent_75%,rgba(99,102,241,0.01)_75%)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* Navigation */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>

        {/* Header Section */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 text-xs font-semibold mb-6">
            <Headphones size={14} />
            24/7 Support Available
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
            Get in <span className="text-indigo-600">Touch</span>
          </h1>
          
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Have questions, feedback, or need assistance? We're here to help. 
            Reach out through any channel below.
          </p>
        </header>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info) => (
            <a
              key={info.title}
              href={info.action}
              target={info.action.startsWith('http') ? '_blank' : '_self'}
              rel={info.action.startsWith('http') ? 'noopener noreferrer' : ''}
              className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-${info.color}-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <div className={`text-${info.color}-600`}>
                  {info.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{info.title}</h3>
              <p className="text-sm text-slate-500 mb-2">{info.description}</p>
              <p className="text-sm font-mono text-indigo-600 mb-3">{info.contact}</p>
              <div className="flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
                {info.actionText}
                <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <MailCheck size={20} className="text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">Send a Message</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Subject
                </label>
                <div className="relative">
                  <FileText size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="What is this regarding?"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
                  placeholder="Describe your question or feedback..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? "bg-slate-400 cursor-not-allowed" 
                    : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
              
              {submitStatus === "success" && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm text-center flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} />
                  Message sent successfully! We'll respond shortly.
                </div>
              )}
              
              {submitStatus === "error" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center flex items-center justify-center gap-2">
                  <AlertCircle size={16} />
                  Failed to send. Please try again or contact via WhatsApp.
                </div>
              )}
            </form>
          </div>
          
          {/* FAQ Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle size={20} className="text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            {/* Quick Contact Note */}
            <div className="mt-6 p-5 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="flex items-start gap-3">
                <Star size={18} className="text-indigo-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-indigo-900">Need urgent help?</p>
                  <p className="text-xs text-indigo-700 mt-1">
                    For immediate assistance, reach us directly on WhatsApp. We typically respond within minutes during business hours.
                  </p>
                  <a
                    href="https://wa.me/6287791889957"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    <MessageCircle size={14} />
                    Contact via WhatsApp
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Clock size={20} className="text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Business Hours</h3>
              <p className="text-sm text-slate-500">Monday - Friday: 9:00 AM - 6:00 PM WIB</p>
              <p className="text-sm text-slate-500">Saturday - Sunday: Limited support via WhatsApp</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Globe size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Office Location</h3>
              <p className="text-sm text-slate-500">Jawa Tengah, Klaten, Indonesia</p>
              <p className="text-sm text-slate-500">Remote support worldwide</p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-slate-900">KyTools</span>
            </div>
            
            <div className="flex gap-6">
              <Link href="/terms" className="text-xs text-slate-500 hover:text-indigo-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-xs text-slate-500 hover:text-indigo-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/reviews" className="text-xs text-slate-500 hover:text-indigo-600 transition-colors">
                Reviews
              </Link>
            </div>
          </div>
          
          <div className="mt-6 text-center text-[10px] text-slate-400">
            <p>© {new Date().getFullYear()} KyTools. All rights reserved. | Operated by Fadhillah Dzaki Nasrullah</p>
          </div>
        </div>
      </div>
    </main>
  );
}