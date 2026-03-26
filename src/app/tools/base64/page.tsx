"use client";
import React, { useState } from 'react';
import { ShieldCheck, Copy, Trash2, Check, ArrowLeftRight } from 'lucide-react';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      setOutput(btoa(input));
    } catch (err) {
      alert("Gagal Encode: Karakter tidak didukung");
    }
  };

  const handleDecode = () => {
    try {
      setOutput(atob(input));
    } catch (err) {
      alert("Gagal Decode: Format Base64 tidak valid!");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapData = () => {
    setInput(output);
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Base64 Encoder & Decoder</h1>
            <p className="text-slate-400 text-sm">Alat enkripsi/dekripsi teks sederhana.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Input Section */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Input Text / Base64:</label>
            <textarea
              className="w-full h-40 p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm transition-all"
              placeholder="Masukkan teks di sini..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button onClick={handleEncode} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-100">
              ENCODE
            </button>
            <button onClick={handleDecode} className="flex-1 bg-slate-800 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-slate-200">
              DECODE
            </button>
            <button onClick={swapData} className="p-4 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50">
              <ArrowLeftRight size={20} />
            </button>
          </div>

          {/* Output Section */}
          <div className="relative">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Result:</label>
            <textarea
              readOnly
              className="w-full h-40 p-5 bg-slate-900 border border-slate-800 rounded-2xl text-indigo-300 font-mono text-sm"
              placeholder="Hasil akan muncul di sini..."
              value={output}
            />
            {output && (
              <button 
                onClick={copyToClipboard}
                className="absolute right-4 bottom-4 bg-indigo-500 text-white p-3 rounded-xl hover:bg-indigo-600 transition-all flex items-center gap-2 text-xs font-bold"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'COPIED!' : 'COPY'}
              </button>
            )}
          </div>

          <button
            onClick={() => { setInput(''); setOutput(''); }}
            className="w-full py-3 text-slate-400 hover:text-red-500 text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 size={14} /> CLEAR ALL DATA
          </button>
        </div>
      </div>
    </div>
  );
}
