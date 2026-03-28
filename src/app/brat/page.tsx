"use client";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Download, Send, Loader2, Wand2, 
  Sparkles, Copy, CheckCircle2, AlertCircle, 
  Zap, ImageIcon, Share2, Layers, Type
} from "lucide-react";

export default function BratPage() {
  const [text, setText] = useState("");
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  // Contoh kata-kata inspiratif
  const examples = [
    "BRAT", "AESTHETIC", "VIBES", "MOOD", "GLOW", 
    "DREAM", "FOCUS", "GRIND", "CHILL", "WAVE"
  ];

  useEffect(() => {
    setCharacterCount(text.length);
  }, [text]);

  const handleGenerate = useCallback(() => {
    if (!text.trim()) {
      setError("Please enter some text first");
      return;
    }
    
    if (text.length > 50) {
      setError("Text is too long. Maximum 50 characters.");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Menggunakan API yang diberikan
    const url = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text.trim())}`;
    setImgUrl(url);
    
    // Simulasi loading untuk pengalaman yang lebih baik
    setTimeout(() => setLoading(false), 800);
  }, [text]);

  const handleCopyLink = useCallback(() => {
    if (imgUrl) {
      navigator.clipboard.writeText(imgUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [imgUrl]);

  const handleExampleClick = (example: string) => {
    setText(example);
    setError(null);
  };

  const clearText = () => {
    setText("");
    setImgUrl(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        
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
                  AI Text Art Generator
                </div>
                <h1 className="text-3xl font-bold text-white">Brat Generator</h1>
                <p className="text-indigo-100 text-sm mt-1">Create aesthetic text art in one click</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Type size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="p-8">
            
            {/* Input Section */}
            <div className="space-y-5 mb-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Enter your text
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    placeholder="Type your text here... (e.g., BRAT, AESTHETIC, VIBES)"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 outline-none transition-all resize-none text-slate-900 placeholder:text-slate-400 font-medium"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleGenerate()}
                  />
                  {text && (
                    <button
                      onClick={clearText}
                      className="absolute top-3 right-3 p-1 hover:bg-slate-200 rounded-lg transition-colors text-slate-400"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-slate-400">
                    {characterCount}/50 characters
                  </p>
                  {characterCount > 40 && characterCount <= 50 && (
                    <p className="text-xs text-amber-600">Approaching limit</p>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}

              {/* Example Tags */}
              <div>
                <p className="text-xs font-medium text-slate-500 mb-2">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {examples.map((example) => (
                    <button
                      key={example}
                      onClick={() => handleExampleClick(example)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 rounded-lg text-xs font-medium transition-all"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading || !text.trim()}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-lg shadow-indigo-200"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 size={20} />
                    Generate Art
                  </>
                )}
              </button>
            </div>

            {/* Result Section */}
            {imgUrl && !loading && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Layers size={16} className="text-indigo-500" />
                    <h3 className="text-sm font-semibold text-slate-900">Your Generated Art</h3>
                  </div>
                  
                  {/* Image Preview */}
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-4 flex justify-center">
                    <div className="relative group">
                      <img 
                        src={imgUrl} 
                        alt="Brat Generated Art" 
                        className="rounded-lg shadow-lg max-w-full max-h-96 object-contain"
                      />
                      {/* Overlay effect on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-all" />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={imgUrl}
                      download="brat-art.png"
                      className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all"
                    >
                      <Download size={18} />
                      Download Image
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 size={18} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={18} />
                          Copy Link
                        </>
                      )}
                    </button>
                    <a
                      href={imgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                    >
                      <Share2 size={18} />
                      Open in New Tab
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Instant Generation</p>
              <p className="text-[10px] text-slate-400">Create art in seconds</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <ImageIcon size={18} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">High Quality</p>
              <p className="text-[10px] text-slate-400">Crisp and clear output</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Type size={18} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Multiple Styles</p>
              <p className="text-[10px] text-slate-400">Brat aesthetic design</p>
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