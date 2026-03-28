"use client";
import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileJson, Copy, Trash2, Check, ArrowLeft, 
  Sparkles, Zap, AlertCircle, CheckCircle2,
  Maximize2, Minimize2, Code, Eye, Layers,
  Info, Settings, Download, Upload
} from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setCharCount(input.length);
    setLineCount(input.split('\n').length);
    
    // Validate JSON on input change
    try {
      if (input.trim()) {
        JSON.parse(input);
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } catch {
      setIsValid(false);
    }
  }, [input]);

  const formatJson = useCallback(() => {
    try {
      setError('');
      if (!input.trim()) {
        setError('Please enter JSON data to format');
        return;
      }
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (err: any) {
      setError(`Invalid JSON format: ${err.message}`);
      setOutput('');
    }
  }, [input]);

  const minifyJson = useCallback(() => {
    try {
      setError('');
      if (!input.trim()) {
        setError('Please enter JSON data to minify');
        return;
      }
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (err: any) {
      setError(`Invalid JSON format: ${err.message}`);
      setOutput('');
    }
  }, [input]);

  const validateOnly = useCallback(() => {
    try {
      if (!input.trim()) {
        setError('Please enter JSON data to validate');
        return;
      }
      JSON.parse(input);
      setError('');
      setOutput('');
      alert('✓ JSON is valid!');
    } catch (err: any) {
      setError(`Invalid JSON: ${err.message}`);
    }
  }, [input]);

  const copyToClipboard = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  }, []);

  const loadExample = useCallback(() => {
    const example = {
      name: "KyTools",
      version: "1.0.0",
      description: "Professional JSON Formatter Tool",
      features: [
        "Format JSON with proper indentation",
        "Minify JSON to single line",
        "Validate JSON structure",
        "Copy to clipboard",
        "Syntax highlighting preview"
      ],
      author: "Fadhillah Dzaki Nasrullah",
      year: new Date().getFullYear(),
      isActive: true,
      stats: {
        users: 10000,
        rating: 4.8
      }
    };
    setInput(JSON.stringify(example, null, 2));
  }, []);

  const getOutputStats = () => {
    if (!output) return null;
    const lines = output.split('\n').length;
    const chars = output.length;
    return { lines, chars };
  };

  const outputStats = getOutputStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
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
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-xs font-semibold mb-3">
                  <Sparkles size={12} />
                  JSON Toolkit
                </div>
                <h1 className="text-3xl font-bold text-white">JSON Formatter</h1>
                <p className="text-blue-100 text-sm mt-1">Format, validate, and beautify JSON data</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FileJson size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="p-8">
            
            {/* Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs">
                  <Code size={12} className="text-slate-400" />
                  <span className="text-slate-500">Characters:</span>
                  <span className="font-mono font-semibold text-slate-700">{charCount}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Layers size={12} className="text-slate-400" />
                  <span className="text-slate-500">Lines:</span>
                  <span className="font-mono font-semibold text-slate-700">{lineCount}</span>
                </div>
                {isValid && input.trim() && (
                  <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                    <CheckCircle2 size={12} />
                    <span>Valid JSON</span>
                  </div>
                )}
              </div>
              <button
                onClick={loadExample}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <Download size={12} />
                Load Example
              </button>
            </div>

            {/* Input/Output Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              
              {/* Input Area */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Eye size={14} className="text-slate-400" />
                    Input JSON
                  </label>
                  <button
                    onClick={clearAll}
                    className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
                  >
                    <Trash2 size={12} />
                    Clear
                  </button>
                </div>
                <textarea
                  className="w-full h-96 p-5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-300 outline-none font-mono text-sm transition-all resize-none"
                  placeholder='Paste or type JSON here...'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>

              {/* Output Area */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <FileJson size={14} className="text-slate-400" />
                    Formatted Output
                  </label>
                  {output && (
                    <div className="flex gap-2">
                      <button 
                        onClick={copyToClipboard}
                        className="text-xs text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg"
                      >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                      {outputStats && (
                        <span className="text-xs text-slate-400">
                          {outputStats.lines} lines · {outputStats.chars} chars
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <textarea
                  readOnly
                  className="w-full h-96 p-5 bg-slate-900 border border-slate-800 rounded-xl text-green-400 font-mono text-sm resize-none"
                  placeholder="Formatted output will appear here..."
                  value={output}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">Invalid JSON</p>
                  <p className="text-xs text-red-600">{error}</p>
                </div>
                <button
                  onClick={() => setError('')}
                  className="text-red-400 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={formatJson}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
              >
                <Maximize2 size={18} />
                Format (Pretty Print)
              </button>
              <button
                onClick={minifyJson}
                className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Minimize2 size={18} />
                Minify (Compress)
              </button>
              <button
                onClick={validateOnly}
                className="px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={18} />
                Validate
              </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={14} className="text-blue-600" />
                  <h4 className="text-xs font-semibold text-blue-900">What is JSON?</h4>
                </div>
                <p className="text-[10px] text-blue-700 leading-relaxed">
                  JavaScript Object Notation (JSON) is a lightweight data interchange format 
                  that's easy for humans to read and write, and easy for machines to parse and generate.
                </p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                <div className="flex items-center gap-2 mb-2">
                  <Settings size={14} className="text-indigo-600" />
                  <h4 className="text-xs font-semibold text-indigo-900">Tips</h4>
                </div>
                <p className="text-[10px] text-indigo-700 leading-relaxed">
                  • Use double quotes for keys and strings<br/>
                  • No trailing commas allowed<br/>
                  • Numbers, booleans, null are valid values<br/>
                  • Arrays and objects can be nested
                </p>
              </div>
            </div>

            {/* Quick Examples */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-700 mb-3">Quick Examples</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Simple Object", json: '{"name":"KyTools","version":"1.0"}' },
                  { name: "Nested Object", json: '{"user":{"name":"John","age":30,"city":"Jakarta"}}' },
                  { name: "Array", json: '["apple","banana","orange"]' },
                  { name: "Complex", json: '{"data":{"items":[1,2,3],"active":true,"count":5}}' }
                ].map((example) => (
                  <button
                    key={example.name}
                    onClick={() => setInput(example.json)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 rounded-lg text-xs transition-all"
                  >
                    {example.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Maximize2 size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Pretty Print</p>
              <p className="text-[10px] text-slate-400">2-space indentation</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Minimize2 size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Minify</p>
              <p className="text-[10px] text-slate-400">Compress to single line</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Validate</p>
              <p className="text-[10px] text-slate-400">Check JSON syntax</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Instant</p>
              <p className="text-[10px] text-slate-400">Real-time processing</p>
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