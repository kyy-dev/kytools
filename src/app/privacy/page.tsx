"use client";
import Link from "next/link";
import { 
  ArrowLeft, Shield, Lock, Eye, Database, 
  Cookie, Clock, FileText, CheckCircle2, 
  Globe, Server, UserCheck, Trash2,
  ExternalLink, Zap, ChevronRight, BookOpen
} from "lucide-react";

export default function PrivacyPage() {
  const effectiveDate = "March 26, 2026";
  const lastUpdated = "March 28, 2026";

  const sections = [
    {
      id: "01",
      title: "Information We Collect",
      subtitle: "Minimal data collection for optimal service delivery.",
      content: "KyTools collects only the minimum information necessary to provide and improve our services. This includes:",
      items: [
        "Technical logs (IP address, browser type, device information) for security monitoring and service optimization",
        "Usage patterns to improve user experience and identify performance issues",
        "Voluntary information you provide when submitting reviews or contacting support",
        "Session data that is automatically deleted upon browser closure"
      ],
      note: "We do not store downloaded media files on our servers. All processing occurs in real-time through encrypted API connections.",
      icon: <Database size={20} />,
      color: "blue"
    },
    {
      id: "02",
      title: "How We Use Your Information",
      subtitle: "Transparent data usage for service improvement.",
      content: "Your information is used exclusively for legitimate operational purposes:",
      items: [
        "Service delivery and technical functionality of our tools",
        "Security monitoring and fraud prevention",
        "Performance optimization and bug fixes",
        "User support and communication",
        "Compliance with legal obligations"
      ],
      icon: <Eye size={20} />,
      color: "emerald"
    },
    {
      id: "03",
      title: "Data Storage & Security",
      subtitle: "Enterprise-grade security protecting your information.",
      content: "We implement industry-standard security measures to protect your data:",
      items: [
        "End-to-end encryption for all data transmission",
        "No permanent storage of user-uploaded content",
        "Regular security audits and vulnerability assessments",
        "Access controls and authentication protocols",
        "Automatic data purging after session completion"
      ],
      note: "All data is processed in accordance with Indonesian Personal Data Protection Law (UU PDP) No. 27 Tahun 2022.",
      icon: <Shield size={20} />,
      color: "indigo"
    },
    {
      id: "04",
      title: "Cookies & Local Storage",
      subtitle: "Simple, transparent data storage.",
      content: "We use minimal browser storage to enhance your experience:",
      items: [
        "Theme preferences (light/dark mode)",
        "Recent tool usage history (stored locally only)",
        "Session identifiers for service continuity",
        "No third-party tracking cookies are used"
      ],
      note: "You can clear this data at any time through your browser settings without affecting core functionality.",
      icon: <Cookie size={20} />,
      color: "amber"
    },
    {
      id: "05",
      title: "Third-Party Services",
      subtitle: "Limited integration with trusted providers.",
      content: "KyTools integrates with select third-party services to provide functionality:",
      items: [
        "API endpoints for downloader functionality",
        "CDN services for content delivery",
        "Payment processors (if applicable for premium features)"
      ],
      note: "These third parties are contractually obligated to maintain data confidentiality and comply with applicable privacy laws.",
      icon: <Globe size={20} />,
      color: "purple"
    },
    {
      id: "06",
      title: "Your Rights",
      subtitle: "You maintain control over your information.",
      content: "Under applicable privacy laws, you have the right to:",
      items: [
        "Access information we hold about you",
        "Request correction of inaccurate data",
        "Request deletion of your data (where applicable)",
        "Opt-out of non-essential data collection",
        "Withdraw consent for processing"
      ],
      note: "To exercise these rights, please contact our support team.",
      icon: <UserCheck size={20} />,
      color: "teal"
    },
    {
      id: "07",
      title: "Data Retention",
      subtitle: "Limited retention for security and compliance.",
      content: "We retain data only as long as necessary:",
      items: [
        "Technical logs: 30 days for security monitoring",
        "User-submitted reviews: Until user requests removal",
        "Support communications: 1 year for service improvement",
        "Session data: Automatically deleted upon browser closure"
      ],
      icon: <Clock size={20} />,
      color: "cyan"
    },
    {
      id: "08",
      title: "Children's Privacy",
      subtitle: "Special protections for young users.",
      content: "KyTools does not knowingly collect personal information from children under 13 years of age. If we discover that a child under 13 has provided us with personal information, we will delete it immediately. Parents or guardians who believe their child has provided such information should contact us.",
      icon: <Lock size={20} />,
      color: "rose"
    },
    {
      id: "09",
      title: "International Data Transfers",
      subtitle: "Global service, local protections.",
      content: "Your information may be processed on servers located in various jurisdictions. We ensure appropriate safeguards are in place for international data transfers, including standard contractual clauses and compliance with applicable data protection regulations.",
      icon: <Server size={20} />,
      color: "slate"
    },
    {
      id: "10",
      title: "Policy Updates",
      subtitle: "Continuous improvement with transparent changes.",
      content: "We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify users of significant changes through:",
      items: [
        "Website announcement banners",
        "Updated effective date at the top of this page",
        "Email notification for registered users"
      ],
      note: "Your continued use of KyTools after policy updates constitutes acceptance of the revised terms.",
      icon: <FileText size={20} />,
      color: "orange"
    }
  ];

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
            <Shield size={14} />
            Security & Privacy
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
            Privacy <span className="text-indigo-600">Policy</span>
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
              <span>GDPR Compliant</span>
            </div>
          </div>
          
          <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-3xl">
            Your privacy is important to us. This Privacy Policy explains how KyTools collects, 
            uses, and protects your information when you use our services.
          </p>
        </header>

        {/* Table of Contents */}
        <div className="mb-12 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen size={16} className="text-indigo-500" />
            Table of Contents
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
        <div className="space-y-6">
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
                    <div className="space-y-3">
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {section.content}
                      </p>
                      
                      {/* Items List */}
                      {'items' in section && section.items && (
                        <ul className="space-y-2 mt-3">
                          {section.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {/* Note */}
                      {'note' in section && section.note && (
                        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                          <p className="text-xs text-slate-500 leading-relaxed flex items-start gap-2">
                            <span className="font-semibold text-slate-600">Note:</span>
                            {section.note}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 p-8 bg-indigo-50 rounded-2xl border border-indigo-100">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Lock size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-indigo-900 mb-2">Questions About Privacy?</h4>
              <p className="text-sm text-indigo-700 leading-relaxed">
                If you have any questions about this Privacy Policy or how we handle your data, 
                please don't hesitate to contact our privacy team.
              </p>
              <div className="flex gap-4 mt-4">
                <a 
                  href="mailto:privacy@kytools.com" 
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                >
                  yab9145@gmail.com
                  <ExternalLink size={12} />
                </a>
                <a 
                  href="https://wa.me/6287791889957" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                >
                  Contact Support
                  <ExternalLink size={12} />
                </a>
              </div>
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
              <Link href="/terms" className="text-xs text-slate-500 hover:text-indigo-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-xs text-slate-500 hover:text-indigo-600 transition-colors">
                Contact
              </Link>
              <a 
                href="https://kytools.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
              >
                System Status
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
          
          <div className="mt-6 text-center text-[10px] text-slate-400">
            <p>© {new Date().getFullYear()} KyTools. All rights reserved. | Operated by Fadhillah Dzaki Nasrullah</p>
            <p className="mt-1">Compliant with Indonesian Personal Data Protection Law (UU PDP) No. 27 Tahun 2022</p>
          </div>
        </div>
      </div>
    </main>
  );
}