"use client";
import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Copy, Trash2, Check, ArrowLeftRight,
  ArrowLeft, Sparkles, AlertCircle, Info, 
  FileText, Lock, Unlock, Clipboard, CheckCircle2,
  Zap, RefreshCw
} from 'lucide-react';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    setCharacterCount(input.length);
  }, [input]);

  const handleEncode = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter text to encode");
      return;
    }
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setError(null);
    } catch (err) {
      setError("Failed to encode: Text contains unsupported characters");
      setOutput('');
    }
  }, [input]);

  const handleDecode = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter Base64 string to decode");
      return;
    }
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      setError(null);
    } catch (err) {
      setError("Failed to decode: Invalid Base64 format");
      setOutput('');
    }
  }, [input]);

  const copyToClipboard = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const swapData = useCallback(() => {
    if (!output) return;
    setInput(output);
    setOutput('');
    setError(null);
  }, [output]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
    setCopied(false);
  }, []);

  const handleModeSwitch = useCallback((newMode: 'encode' | 'decode') => {
    setMode(newMode);
    clearAll();
  }, [clearAll]);

  const stats = {
    inputLength: characterCount,
    outputLength: output.length,
    isBase64: /^[A-Za-z0-9+/=]+$/.test(input) && input.length > 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm mb-8"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-xs font-semibold mb-3">
                  <Sparkles size={12} />
                  Encryption Tool
                </div>
                <h1 className="text-3xl font-bold text-white">Base64 Toolkit</h1>
                <p className="text-indigo-100 text-sm mt-1">Encode and decode text securely</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <ShieldCheck size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="p-8">
            
            {/* Mode Toggle */}
            <div className="mb-8">
              <label className="block text-xs font-semibold text-slate-700 mb-3">Operation Mode</label>
              <div className="flex gap-3">
                <button
                  onClick={() => handleModeSwitch('encode')}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    mode === 'encode'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Lock size={18} />
                  Encode to Base64
                </button>
                <button
                  onClick={() => handleModeSwitch('decode')}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    mode === 'decode'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Unlock size={18} />
                  Decode from Base64
                </button>
              </div>
            </div>

            {/* Input Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700">
                  {mode === 'encode' ? 'Text to Encode' : 'Base64 String to Decode'}
                </label>
                <span className="text-[10px] text-slate-400">
                  {characterCount} characters
                </span>
              </div>
              <div className="relative">
                <textarea
                  className="w-full h-48 p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 outline-none font-mono text-sm transition-all resize-none"
                  placeholder={mode === 'encode' 
                    ? "Enter your text here... (e.g., Hello World!)" 
                    : "Enter Base64 string here... (e.g., SGVsbG8gV29ybGQh)"
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                {mode === 'decode' && stats.isBase64 && input.length > 0 && (
                  <div className="absolute bottom-3 right-3 text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-md flex items-center gap-1">
                    <CheckCircle2 size={10} />
                    Valid Base64
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-xs text-red-600">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button 
                onClick={mode === 'encode' ? handleEncode : handleDecode} 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Zap size={18} />
                {mode === 'encode' ? 'Encode Now' : 'Decode Now'}
              </button>
              <button 
                onClick={swapData} 
                disabled={!output}
                className="p-4 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title="Swap input with output"
              >
                <ArrowLeftRight size={20} />
              </button>
              <button 
                onClick={clearAll} 
                className="p-4 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                title="Clear all"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* Output Section */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700">Result</label>
                {output && (
                  <span className="text-[10px] text-slate-400">
                    {stats.outputLength} characters
                  </span>
                )}
              </div>
              <textarea
                readOnly
                className="w-full h-48 p-5 bg-slate-900 border border-slate-800 rounded-xl text-indigo-300 font-mono text-sm resize-none"
                placeholder="Result will appear here..."
                value={output}
              />
              {output && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button 
                    onClick={copyToClipboard}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-xs font-medium shadow-lg"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={14} className="text-indigo-500" />
                  <h4 className="text-xs font-semibold text-slate-700">What is Base64?</h4>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Base64 is an encoding scheme that converts binary data into text format, 
                  making it safe for transmission over text-based protocols.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <Clipboard size={14} className="text-indigo-500" />
                  <h4 className="text-xs font-semibold text-slate-700">Common Uses</h4>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Email attachments, API authentication, data URIs, and storing binary data in JSON/XML.
                </p>
              </div>
            </div>

            {/* Quick Examples */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-700 mb-3">Quick Examples</p>
              <div className="flex flex-wrap gap-2">
                {mode === 'encode' ? (
                  <>
                    {['Hello World', 'Base64 Encoding', 'JavaScript', 'API Key'].map((example) => (
                      <button
                        key={example}
                        onClick={() => setInput(example)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 rounded-lg text-xs transition-all"
                      >
                        {example}
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    {['SGVsbG8gV29ybGQ=', 'QmFzZTY0IERlY29kZQ==', 'SmF2YVNjcmlwdA=='].map((example) => (
                      <button
                        key={example}
                        onClick={() => setInput(example)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 rounded-lg text-xs font-mono transition-all"
                      >
                        {example}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Lock size={16} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Secure Processing</p>
              <p className="text-[10px] text-slate-400">Client-side only, no data stored</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Instant Results</p>
              <p className="text-[10px] text-slate-400">Real-time encoding/decoding</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <FileText size={16} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">UTF-8 Support</p>
              <p className="text-[10px] text-slate-400">Full Unicode character support</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-[10px] text-slate-400">
            © {new Date().getFullYear()} KyTools. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}