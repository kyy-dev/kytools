"use client";
import Link from "next/link";
import { 
  ShieldAlert, ArrowLeft, Gavel, CheckCircle2, 
  FileText, Scale, AlertTriangle, Clock, 
  Lock, Zap, ExternalLink, ChevronRight,
  BookOpen, Server, Users, RefreshCw
} from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      id: "01",
      title: "Acceptance of Terms",
      subtitle: "By accessing KyTools, you agree to be bound by these Terms of Service.",
      content: "By using the KyTools platform and its associated services (collectively, the 'Service'), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you must not access or use the Service. These terms constitute a legally binding agreement between you and KyTools (operated by Fadhillah Dzaki Nasrullah).",
      icon: <FileText size={20} />,
      color: "blue"
    },
    {
      id: "02",
      title: "Service Usage & Limitations",
      subtitle: "Personal use only. Commercial use requires explicit authorization.",
      content: "KyTools is provided for personal, non-commercial use only. You agree to use the Service in compliance with all applicable laws and regulations. Prohibited activities include, but are not limited to: (a) unauthorized access to third-party systems, (b) mass data scraping or automated queries exceeding reasonable limits, (c) distribution of malicious content, (d) reverse engineering or attempting to extract source code, and (e) any activity that could disrupt or damage the Service infrastructure.",
      icon: <Zap size={20} />,
      color: "emerald"
    },
    {
      id: "03",
      title: "Intellectual Property Rights",
      subtitle: "Content ownership remains with original creators.",
      content: "All content downloaded or accessed through our tools remains the exclusive property of the original content creators and copyright holders. KyTools acts solely as a technical intermediary and does not claim ownership over any user-accessed content. You are solely responsible for ensuring your use of downloaded content complies with applicable copyright laws, licensing terms, and intellectual property rights. KyTools does not grant any license or permission to use copyrighted material without proper authorization.",
      icon: <Scale size={20} />,
      color: "purple"
    },
    {
      id: "04",
      title: "Data Protection & Privacy",
      subtitle: "We respect your privacy and protect your data.",
      content: "KyTools processes user data in accordance with our Privacy Policy and applicable data protection regulations including the Indonesian Personal Data Protection Law (UU PDP) No. 27 Tahun 2022. We do not store downloaded files on our servers beyond the duration of your session. User credentials are never stored. For complete information about data handling practices, please review our detailed Privacy Policy.",
      icon: <Lock size={20} />,
      color: "indigo"
    },
    {
      id: "05",
      title: "Limitation of Liability",
      subtitle: "Use at your own risk. No warranties provided.",
      content: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, KyTools PROVIDES THE SERVICE 'AS IS' AND 'AS AVAILABLE' WITHOUT WARRANTIES OF ANY KIND. We do not warrant that the Service will be uninterrupted, error-free, or secure. Under no circumstances shall KyTools or its operators be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the Service, including but not limited to data loss, revenue loss, or unauthorized access to your accounts.",
      icon: <AlertTriangle size={20} />,
      color: "amber"
    },
    {
      id: "06",
      title: "Service Modifications",
      subtitle: "Continuous improvement with occasional changes.",
      content: "KyTools reserves the right to modify, suspend, or discontinue any aspect of the Service at any time, with or without notice. This includes feature updates, security patches, API changes, and pricing adjustments for premium features (if introduced). We will make reasonable efforts to notify users of significant changes, but you acknowledge that immediate updates may be necessary for security or operational reasons.",
      icon: <RefreshCw size={20} />,
      color: "slate"
    },
    {
      id: "07",
      title: "Termination",
      subtitle: "Violation of terms may result in permanent ban.",
      content: "We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the Service will cease immediately. Repeated violations, attempts to bypass restrictions, or engagement in illegal activities may result in permanent IP blocking from the entire KyTools ecosystem.",
      icon: <ShieldAlert size={20} />,
      color: "red"
    },
    {
      id: "08",
      title: "Governing Law",
      subtitle: "Disputes governed by Indonesian law.",
      content: "These Terms shall be governed and construed in accordance with the laws of the Republic of Indonesia, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be submitted to the exclusive jurisdiction of the courts located in Indonesia. You agree to resolve any claims individually and waive the right to participate in class actions.",
      icon: <Gavel size={20} />,
      color: "cyan"
    }
  ];

  const effectiveDate = "March 26, 2026";
  const lastUpdated = "March 28, 2026";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.01)_25%,rgba(99,102,241,0.01)_50%,transparent_50%,transparent_75%,rgba(99,102,241,0.01)_75%)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        
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
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 text-xs font-semibold mb-6">
            <Gavel size={14} />
            Legal Agreement
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
            Terms of <span className="text-indigo-600">Service</span>
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>Effective: {effectiveDate}</span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <div className="flex items-center gap-2">
              <FileText size={14} />
              <span>Last Updated: {lastUpdated}</span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Version 2.0</span>
            </div>
          </div>
          
          <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-3xl">
            These Terms of Service govern your use of the KyTools platform. 
            By accessing or using our services, you agree to be bound by these terms.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="mb-12 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen size={16} className="text-indigo-500" />
            Table of Contents
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#section-${section.id}`}
                className="text-xs text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1 group"
              >
                <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                {section.title}
              </a>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div 
              key={section.id} 
              id={`section-${section.id}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow scroll-mt-24"
            >
              <div className="p-8">
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-${section.color}-50 flex items-center justify-center`}>
                    <div className={`text-${section.color}-600`}>
                      {section.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-slate-400 font-semibold">
                        {section.id}
                      </span>
                      <div className="w-8 h-px bg-slate-200" />
                      <h3 className="text-xl font-bold text-slate-900">
                        {section.title}
                      </h3>
                    </div>
                    
                    {/* Subtitle */}
                    <p className="text-sm font-medium text-indigo-600 mb-4">
                      {section.subtitle}
                    </p>
                    
                    {/* Content */}
                    <div className="space-y-3 text-slate-600 leading-relaxed">
                      {section.content.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="text-sm">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Acknowledgment Section */}
        <div className="mt-12 p-8 bg-indigo-50 rounded-2xl border border-indigo-100">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-indigo-900 mb-2">Acknowledgment of Terms</h4>
              <p className="text-sm text-indigo-700 leading-relaxed">
                By continuing to use KyTools, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms of Service. If you do not agree with any 
                part of these terms, you must discontinue use of our services immediately.
              </p>
              <p className="text-xs text-indigo-600 mt-3">
                For questions regarding these terms, please contact our support team.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-slate-900">KyTools</span>
            </div>
            
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-slate-500 hover:text-indigo-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-xs text-slate-500 hover:text-indigo-600 transition-colors">
                Contact
              </Link>
              <a 
                href="https://wa.me/6287791889957" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
              >
                Support
                <ExternalLink size={10} />
              </a>
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