"use client";
import { useState, useEffect } from "react";
import { Star, Send, ArrowLeft, ShieldCheck, UserCircle } from "lucide-react";
import Link from "next/link";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: "", rating: 5, comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch data dari API
  const fetchReviews = async () => {
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ name: "", rating: 5, comment: "" });
      fetchReviews();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] p-6 font-sans text-black">
      <div className="max-w-xl mx-auto">
        
        {/* Navigasi */}
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase mb-12 bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-400 transition-all">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        
        {/* Header Title */}
        <div className="mb-12">
          <h1 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.7] mb-4">User<br/>Feedback</h1>
          <div className="h-2 w-24 bg-black"></div>
        </div>

        {/* Form Input Section */}
        <section className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-16">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Input Nama */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 px-1 text-slate-400">Identity</label>
              <input 
                className="w-full p-5 bg-[#F9F9F9] border-2 border-black font-bold outline-none focus:bg-white focus:ring-2 ring-yellow-400 transition-all"
                placeholder="YOUR NAME..."
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            {/* Tombol Rating Angka (Pengganti Emoji) */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 px-1 text-slate-400">Score Rating</label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: num })}
                    className={`py-4 border-2 border-black font-black text-xl transition-all ${
                      formData.rating === num 
                      ? "bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1" 
                      : "bg-white text-slate-300 border-slate-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Komentar */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 px-1 text-slate-400">Message / Log</label>
              <textarea 
                className="w-full p-5 bg-[#F9F9F9] border-2 border-black font-bold h-32 resize-none outline-none focus:bg-white focus:ring-2 ring-yellow-400 transition-all"
                placeholder="WRITE YOUR REVIEW..."
                value={formData.comment}
                onChange={e => setFormData({...formData, comment: e.target.value})}
                required
              />
            </div>

            {/* Tombol Push */}
            <button 
              disabled={isSubmitting}
              type="submit" 
              className="w-full bg-black text-white py-6 font-black text-xs tracking-[0.5em] uppercase hover:bg-blue-600 active:translate-y-1 active:shadow-none shadow-[0px_8px_0px_0px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center gap-3"
            >
              {isSubmitting ? "TRANSMITTING..." : <><Send size={18}/> Push Feedback</>}
            </button>
          </form>
        </section>

        {/* Feed List Section */}
        <div className="space-y-10 pb-20">
          <h3 className="font-black text-xs uppercase tracking-[0.3em] border-b-4 border-black inline-block pb-1 mb-4 text-black">Live Database Feed</h3>
          
          {reviews.length > 0 ? reviews.map((rev) => (
            <div key={rev.id} className="relative bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(200,200,200,1)]">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-xs font-black">
                    {rev.name.substring(0,2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase flex items-center gap-2">
                      {rev.name} <ShieldCheck size={14} className="text-blue-500" />
                    </h4>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{rev.date}</span>
                  </div>
                </div>
                
                {/* Rating Display */}
                <div className="flex items-center gap-1 bg-black px-3 py-1 text-white">
                  <span className="text-[10px] font-black uppercase tracking-tighter mr-2">Score:</span>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={10} 
                      className={i < rev.rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="mt-4 border-l-4 border-yellow-400 pl-4">
                <p className="text-sm font-bold leading-relaxed text-slate-800 italic">
                  "{rev.comment}"
                </p>
              </div>
            </div>
          )) : (
            <p className="text-center font-black text-[10px] text-slate-400 uppercase py-10 border-2 border-dashed border-slate-300">No Logs Available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
