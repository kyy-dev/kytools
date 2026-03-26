"use client";
import React, { useState } from 'react';
import { FileJson, Copy, Trash2, Check } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      setError('');
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (err: any) {
      setError('Format JSON tidak valid: ' + err.message);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      setError('');
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (err: any) {
      setError('Format JSON tidak valid: ' + err.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
            <FileJson size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">JSON Formatter</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input Area */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Input JSON:</label>
            <textarea
              className="w-full h-80 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
              placeholder='Paste JSON berantakan di sini...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* Output Area */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-600">Hasil:</label>
              {output && (
                <button 
                  onClick={copyToClipboard}
                  className="text-blue-600 flex items-center gap-1 text-xs hover:bg-blue-50 px-2 py-1 rounded"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Tersalin!' : 'Salin'}
                </button>
              )}
            </div>
            <textarea
              readOnly
              className="w-full h-80 p-4 bg-slate-900 border border-slate-800 rounded-xl text-green-400 font-mono text-sm"
              placeholder="Hasil rapi muncul di sini..."
              value={output}
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={formatJson}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Format Rapi
          </button>
          <button
            onClick={minifyJson}
            className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Minify (Satu Baris)
          </button>
          <button
            onClick={() => { setInput(''); setOutput(''); setError(''); }}
            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
