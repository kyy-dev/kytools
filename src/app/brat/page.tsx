"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Send, Loader2, Wand2 } from "lucide-react";

export default function BratPage() {
  const [text, setText] = useState("");
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!text) return;
    setLoading(true);
    // Menggunakan API yang kamu berikan
    const url = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}`;
    setImgUrl(url);
    // Kita kasih delay sedikit buat simulasi loading biar estetik
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-10 transition-colors font-bold text-sm">
          <ArrowLeft size={18} /> KEMBALI
        </Link>

        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Brat Generator</h1>
            <p className="text-slate-400 text-sm font-medium">Buat stiker teks estetik dalam satu klik.</p>
          </div>

          <div className="space-y-4 mb-10">
            <input 
              type="text" 
              placeholder="Ketik kata-kata..."
              className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-[24px] focus:ring-4 focus:ring-blue-100 outline-none transition-all text-center text-xl font-bold placeholder:text-slate-300"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button 
              onClick={handleGenerate}
              disabled={loading || !text}
              className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black flex items-center justify-center gap-2 hover:bg-blue-600 disabled:bg-slate-200 transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Wand2 size={20} />}
              GENERATE
            </button>
          </div>

          {imgUrl && !loading && (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500 bg-slate-50 p-6 rounded-[32px] border border-dashed border-slate-200">
              <img src={imgUrl} alt="Brat Result" className="rounded-xl shadow-2xl mb-6 max-w-full" />
              <a 
                href={imgUrl} 
                target="_blank" 
                className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold shadow-md hover:bg-slate-50 transition-all flex items-center gap-2 border border-slate-200"
              >
                <Download size={18} /> Simpan Gambar
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
