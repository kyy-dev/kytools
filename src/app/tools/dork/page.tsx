"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight,
  Zap, Globe, Server, LayoutGrid, Cpu, Lock, 
  Settings2, Activity, Terminal, ShieldAlert, Bug, Hash,
  ChevronRight, ShieldCheck, BookOpen, Search, Radar, Play, Rocket
} from "lucide-react";

const apiTools = [
  { id: 'subdomain', name: 'Subdomain Finder', desc: 'Scan active sub-assets', icon: <Globe size={18} />, color: 'text-blue-500' },
  { id: 'sql_injection', name: 'SQLi Scanner', desc: 'Injected parameter test', icon: <Hash size={18} />, color: 'text-red-500' },
  { id: 'xss', name: 'XSS Scanner', desc: 'Reflected script test', icon: <Activity size={18} />, color: 'text-indigo-500' },
  { id: 'port_scan', name: 'Port Scanner', desc: 'Common port discovery', icon: <Server size={18} />, color: 'text-emerald-500' },
];

export default function KyDorkPentest() {
  const [target, setTarget] = useState("");
  const [status, setStatus] = useState("IDLE");
  const [activeTool, setActiveTool] = useState("");
  const [scanResults, setScanResults] = useState<any[]>([]);
  const [progress, setProgress] = useState(0); // Untuk indikator proses
  const resultsRef = useRef<HTMLDivElement>(null);

  // Fungsi Scan Satuan
  const startScan = async (toolId: string, isFullAudit = false) => {
    if (!target) return alert("Target URL/Domain wajib diisi!");
    
    if(!isFullAudit) {
        setStatus("SCANNING");
        setScanResults([]);
    }
    
    setActiveTool(toolId);
    
    try {
      const response = await fetch("/api/pentest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target, toolId }),
      });

      const result = await response.json();
      
      if (result.status === "SUCCESS") {
        if (isFullAudit) {
            setScanResults(prev => [...prev, ...result.data]);
        } else {
            setScanResults(result.data);
        }
      }
    } catch (err) {
      console.error("Scan failed for", toolId);
    }
  };

  // FUNGSI BARU: RUN FULL AUDIT (Menjalankan semua tool otomatis)
  const runFullAudit = async () => {
    if (!target) return alert("Masukkan Target URL dulu!");
    
    setStatus("SCANNING");
    setScanResults([]);
    setProgress(0);

    for (let i = 0; i < apiTools.length; i++) {
      const tool = apiTools[i];
      setProgress(Math.round(((i + 1) / apiTools.length) * 100));
      await startScan(tool.id, true);
    }

    setStatus("IDLE");
    setActiveTool("");
    setProgress(100);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 300);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-800 font-sans selection:bg-emerald-100 overflow-x-hidden">
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black text-[10px] tracking-[0.3em] transition-all mb-10 uppercase group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Dashboard
        </Link>

        {/* Branding & Master Start Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4">
              <Radar size={12} className={status === "SCANNING" ? "animate-spin" : ""} /> SYSTEM STATUS: {status}
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-slate-900 uppercase leading-none">
              KY<span className="text-emerald-500">DORK</span><span className="text-[20px] not-italic align-top ml-2 text-slate-300">PRO</span>
            </h1>
          </div>

          {/* TOMBOL START UTAMA */}
          <button 
            onClick={runFullAudit}
            disabled={status === "SCANNING"}
            className="group relative px-8 py-5 bg-slate-900 text-white rounded-[25px] flex items-center gap-4 hover:bg-emerald-600 transition-all duration-500 shadow-2xl shadow-slate-200 disabled:opacity-50 active:scale-95"
          >
            <div className="bg-emerald-500 p-3 rounded-xl group-hover:rotate-[360deg] transition-all duration-700">
               <Play size={20} fill="currentColor" />
            </div>
            <div className="text-left">
               <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Initiate Protocol</p>
               <p className="text-lg font-black uppercase italic tracking-tighter">Start Full Audit</p>
            </div>
          </button>
        </div>

        {/* Input & Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl relative overflow-hidden">
               <label className="text-[9px] font-black uppercase text-slate-400 mb-4 block tracking-widest">Target Domain</label>
               <input 
                  type="text" 
                  placeholder="google.com"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-[20px] text-sm font-bold focus:ring-4 ring-emerald-500/10 outline-none transition-all"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
               />
               
               {/* Progress Bar Visual */}
               {status === "SCANNING" && (
                 <div className="mt-6">
                    <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                       <span className="text-emerald-600 animate-pulse italic">Scanning...</span>
                       <span className="text-slate-400">{progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                 </div>
               )}
            </div>

            {/* Live Stats */}
            <div className="bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative group">
               <div className="relative z-10">
                  <div className="flex items-center gap-2 text-emerald-400 mb-4">
                     <Activity size={16} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Live Analysis</span>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between text-[10px] font-bold border-b border-white/5 pb-2">
                        <span className="text-white/40">VULNERABILITIES</span>
                        <span className="text-red-400">{scanResults.length}</span>
                     </div>
                     <div className="flex justify-between text-[10px] font-bold border-b border-white/5 pb-2">
                        <span className="text-white/40">ENGINE MODE</span>
                        <span className="text-emerald-400">HYBRID-EDGE</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>

{/* Ethical Reminder - Letakkan di bawah Button Scan */}
<div className="mt-12 flex flex-col items-center border-t border-slate-100 pt-8">
  <div className="flex items-center gap-2 text-red-600 mb-2">
    <ShieldAlert size={12} className="animate-pulse" />
    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Legal Disclaimer Required</span>
  </div>
  
  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center max-w-md leading-relaxed">
    Dengan menggunakan KyDork Pro, Anda menyetujui seluruh kebijakan etika kami. 
    Penyalahgunaan alat ini sepenuhnya tanggung jawab pengguna.
  </p>

  <Link 
    href="/tools/pentest/setup" 
    className="mt-4 inline-flex items-center gap-2 text-slate-900 hover:text-red-600 transition-colors group"
  >
    <span className="text-[9px] font-black uppercase tracking-[0.3em] border-b border-slate-900 group-hover:border-red-600 pb-0.5">
      Review Ethical Policy
    </span>
    <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
  </Link>
</div>


          {/* Tools Grid & Individual Launchers */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {apiTools.map((tool) => (
                <button 
                  key={tool.id}
                  onClick={() => startScan(tool.id)}
                  className={`p-6 rounded-[30px] border transition-all text-left flex items-start justify-between ${activeTool === tool.id ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-100 hover:border-emerald-200'}`}
                >
                  <div>
                    <div className={`${tool.color} mb-3`}>{tool.icon}</div>
                    <h3 className="font-black uppercase text-[10px] tracking-widest">{tool.name}</h3>
                  </div>
                  {activeTool === tool.id && <Zap size={14} className="text-emerald-500 animate-bounce" />}
                </button>
              ))}
            </div>

            {/* Results Output */}
            <div ref={resultsRef} className="space-y-4 min-h-[200px]">
               {scanResults.length === 0 && status === "IDLE" && (
                 <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[40px]">
                    <Rocket className="mx-auto text-slate-100 mb-4" size={48} />
                    <p className="text-slate-300 font-black uppercase text-[10px] tracking-widest">Ready to launch audit protocol</p>
                 </div>
               )}

               {scanResults.map((res, i) => (
                  <div key={i} className="bg-white p-6 rounded-[35px] border border-slate-100 shadow-lg animate-in fade-in slide-in-from-bottom-2">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-50 text-red-500 rounded-xl"><Bug size={18} /></div>
                        <h4 className="font-black uppercase text-xs tracking-tighter">{res.type}</h4>
                        <span className="ml-auto text-[8px] font-black bg-red-500 text-white px-2 py-1 rounded-md uppercase tracking-widest">Found</span>
                     </div>
                     <div className="bg-slate-900 p-4 rounded-2xl font-mono text-[10px] text-emerald-400 overflow-x-auto">
                        <span className="text-slate-500">[{res.severity}] Trace: </span>
                        {res.evidence || res.subdomain || res.payload}
                     </div>
                  </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
