"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Scissors, Zap, Type, FileJson, FileImage, 
  ShieldCheck, Star, ImageIcon, Layers, 
  ArrowRight, Code2, ExternalLink, Menu, X, ChevronRight, 
  AlertCircle, Share2, Info, Key, Globe, Search, Radar,
  Sparkles, Cpu, Database, Shield, Lock, Palette, Wand2
} from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasApiKey] = useState(false); 
  const [lastTarget] = useState("example.com");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tools = [
    {
      title: "Background Remover",
      desc: "AI-powered background removal with precision edge detection and instant preview.",
      icon: <Scissors className="w-6 h-6" />,
      href: "/remove-bg",
      color: "from-blue-600 to-indigo-500",
      category: "Creative",
      tags: ["AI", "Image", "Edit"]
    },
    {
      title: "Brat Generator",
      desc: "Create aesthetic minimalist text art with trending Brat-style typography.",
      icon: <Type className="w-6 h-6" />,
      href: "/brat",
      color: "from-slate-700 to-zinc-800",
      category: "Creative",
      tags: ["Text", "Design", "Viral"]
    },
    {
      title: "Canvas Magic",
      desc: "Apply dramatic effects like Affect and Invert to your photos instantly.",
      icon: <Palette className="w-6 h-6" />,
      href: "/canvas",
      color: "from-orange-500 to-red-500",
      category: "Creative",
      tags: ["Effects", "Edit", "Filter"]
    },
    {
      title: "Social Media Downloader",
      desc: "Download media from Instagram, Facebook, Spotify, and more with one click.",
      icon: <Share2 className="w-6 h-6" />,
      href: "/downloader",
      color: "from-green-600 to-emerald-500",
      category: "Media",
      tags: ["Video", "Audio", "Social"]
    },
    {
      title: "JSON Formatter",
      desc: "Format, validate, and beautify JSON data with syntax highlighting.",
      icon: <FileJson className="w-6 h-6" />,
      href: "/tools/json-formatter",
      color: "from-amber-500 to-orange-500",
      category: "Developer",
      tags: ["JSON", "Validator", "Beautify"]
    },
    {
      title: "Image Converter",
      desc: "Convert between JPG, PNG, WEBP, and other formats instantly in browser.",
      icon: <FileImage className="w-6 h-6" />,
      href: "/tools/image-converter",
      color: "from-teal-500 to-green-500",
      category: "Media",
      tags: ["Image", "Converter", "Optimize"]
    },
    {
      title: "Base64 Toolkit",
      desc: "Encode and decode Base64 strings with support for multiple character sets.",
      icon: <ShieldCheck className="w-6 h-6" />,
      href: "/tools/base64",
      color: "from-indigo-500 to-purple-500",
      category: "Developer",
      tags: ["Encode", "Decode", "Security"]
    },
    {
      title: "Security Audit",
      desc: "Professional penetration testing suite for web application security assessment.",
      icon: <Radar className="w-6 h-6" />,
      href: "/tools/dork",
      color: "from-emerald-600 to-teal-500",
      category: "Security",
      tags: ["Pentest", "Audit", "Security"],
      statusInfo: (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-600">ACTIVE</span>
            </div>
            {lastTarget && (
              <span className="text-[10px] text-slate-400 font-mono">
                Last: {lastTarget.substring(0, 20)}
              </span>
            )}
          </div>
        </div>
      )
    },
    {
      title: "User Reviews",
      desc: "Read authentic user feedback and share your experience with our services.",
      icon: <Star className="w-6 h-6" />,
      href: "/reviews",
      color: "from-yellow-500 to-amber-500",
      category: "Community",
      tags: ["Reviews", "Feedback", "Community"]
    },
    {
      title: "AI Photo Editor",
      desc: "Advanced AI enhancement tools for professional photo editing.",
      icon: <ImageIcon className="w-6 h-6" />,
      href: "#",
      color: "from-purple-500 to-pink-500",
      category: "Creative",
      tags: ["AI", "Coming Soon"],
      isSoon: true
    },
  ];

  // Group tools by category
  const categories = [...new Set(tools.map(tool => tool.category))];

  // Footer links configuration
  const footerLinks = {
    videoServices: [
      { name: "TikTok Downloader", href: "/downloader" },
      { name: "YouTube Saver", href: "/downloader" },
      { name: "Instagram Downloader", href: "/downloader" },
      { name: "Reels Saver", href: "/downloader" }
    ],
    developer: [
      { name: "JSON Formatter", href: "/tools/json-formatter" },
      { name: "Base64 Encoder", href: "/tools/base64" },
      { name: "Image Converter", href: "/tools/image-converter" },
      { name: "API Docs", href: "https://api.danzy.web.id/docs", external: true }
    ],
    creative: [
      { name: "Background Remover", href: "/remove-bg" },
      { name: "Brat Generator", href: "/brat" },
      { name: "Canvas Magic", href: "/canvas" },
      { name: "AI Photo Editor", href: "#", comingSoon: true }
    ],
    legal: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Contact", href: "/contact" }
    ]
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.02)_25%,rgba(99,102,241,0.02)_50%,transparent_50%,transparent_75%,rgba(99,102,241,0.02)_75%)] bg-[size:32px_32px]" />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-500 p-2 rounded-xl text-white shadow-lg">
                <Zap size={20} className="fill-current" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Ky<span className="text-indigo-600">Tools</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {categories.map(cat => (
              <a key={cat} href={`#${cat.toLowerCase()}`} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                {cat}
              </a>
            ))}
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Menu size={20} className="text-slate-600" />
            </button>
          </div>

          <button 
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Menu size={20} className="text-slate-600" />
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`} 
          onClick={() => setIsOpen(false)} 
        />
        <div className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Menu</h3>
                <p className="text-xs text-slate-500 mt-0.5">Tools & Resources</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Navigation Links */}
              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Navigation</p>
                {categories.map(cat => (
                  <a
                    key={cat}
                    href={`#${cat.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <span className="text-sm font-medium text-slate-700">{cat}</span>
                    <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Legal</p>
                <Link 
                  href="/terms"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <span className="text-sm font-medium text-slate-700">Terms of Service</span>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/privacy"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <span className="text-sm font-medium text-slate-700">Privacy Policy</span>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/contact"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <span className="text-sm font-medium text-slate-700">Contact</span>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Developer Resources */}
              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Developer</p>
                <Link 
                  href="https://api.danzy.web.id/docs" 
                  target="_blank"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Code2 size={16} className="text-indigo-600" />
                    <span className="text-sm font-medium text-slate-700">API Documentation</span>
                  </div>
                  <ExternalLink size={14} className="text-slate-400" />
                </Link>
                <Link 
                  href="https://app.siputzx.my.id/" 
                  target="_blank"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-purple-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles size={16} className="text-purple-600" />
                    <span className="text-sm font-medium text-slate-700">Siputzx App</span>
                  </div>
                  <ExternalLink size={14} className="text-slate-400" />
                </Link>
              </div>

              {/* System Status */}
              <div className="pt-6 border-t border-slate-100">
                <div className="bg-amber-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={16} className="text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-amber-800">System Notice</p>
                      <p className="text-[11px] text-amber-700 mt-1">
                        Downloader services currently under maintenance. Alternative mirrors available.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">Developer</p>
              <p className="text-sm font-medium text-slate-900">Fadhillah Dzaki Nasrullah</p>
              <div className="flex gap-3 mt-3">
                <a href="https://github.com/kyy-dev" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors text-xs">
                  GitHub
                </a>
                <a href="https://x.com/Kyy_Reacher" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors text-xs">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium text-slate-600 border border-slate-200 shadow-sm mb-8">
            <Sparkles size={12} className="text-indigo-500" />
            Designed by Fadhillah Dzaki Nasrullah
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 mb-6">
            Ky<span className="text-indigo-600 bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">Tools</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Complete ecosystem for all your digital needs — from creative editing to security assessment
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      {categories.map(category => (
        <section key={category} id={category.toLowerCase()} className="max-w-7xl mx-auto px-6 py-16 scroll-mt-24">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{category}</h2>
            <div className="w-12 h-0.5 bg-indigo-500 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.filter(tool => tool.category === category).map((tool) => (
              <Link 
                key={tool.title} 
                href={tool.href} 
                className={`group relative bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  tool.isSoon ? 'cursor-not-allowed opacity-60' : ''
                }`}
              >
                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {tool.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{tool.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{tool.desc}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {tool.statusInfo}
                  
                  {/* Action */}
                  <div className="mt-6 flex items-center text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
                    <span>{tool.isSoon ? 'Coming Soon' : 'Launch Tool'}</span>
                    {!tool.isSoon && <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />}
                  </div>
                </div>
                
                {/* Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            {/* Video Services */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Video Services</h4>
              <ul className="space-y-2">
                {footerLinks.videoServices.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Developer */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Developer</h4>
              <ul className="space-y-2">
                {footerLinks.developer.map((item) => (
                  <li key={item.name}>
                    {item.external ? (
                      <a 
                        href={item.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link href={item.href} className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Creative */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Creative</h4>
              <ul className="space-y-2">
                {footerLinks.creative.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className={`text-sm ${item.comingSoon ? 'text-slate-400 cursor-not-allowed' : 'text-slate-600 hover:text-indigo-600 transition-colors'}`}
                    >
                      {item.name}
                      {item.comingSoon && <span className="ml-1 text-[10px]">(Soon)</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-slate-900">KyTools</span>
            </div>
            <p className="text-sm text-slate-400">
              © 2026 KyTools. All rights reserved. Built with Next.js
            </p>
            <div className="flex gap-4">
              <Shield size={14} className="text-slate-300" />
              <Lock size={14} className="text-slate-300" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}