"use client";
import { useState, useEffect } from "react";
import { Star, Send, ArrowLeft, ShieldCheck, UserCircle, Calendar, MessageSquare, TrendingUp, Award, Clock } from "lucide-react";
import Link from "next/link";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formData, setFormData] = useState({ name: "", rating: 5, comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data dari API
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ name: "", rating: 5, comment: "" });
        setSubmitStatus("success");
        fetchReviews();
        
        // Reset success message after 3 seconds
        setTimeout(() => setSubmitStatus("idle"), 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length 
    : 0;

  // Get rating distribution
  const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
    rating,
    count: reviews.filter(rev => rev.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(rev => rev.rating === rating).length / reviews.length) * 100 : 0
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Navigation */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm hover:shadow"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>

        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-indigo-600 text-xs font-semibold mb-6">
              <MessageSquare size={12} />
              Community Feedback
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-4">
              User Reviews
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Share your experience and help us improve our services. 
              Your feedback matters to us.
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Star size={20} className="text-emerald-600" />
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Rating</span>
              </div>
              <div className="text-3xl font-bold text-slate-900">
                {averageRating.toFixed(1)}
                <span className="text-sm text-slate-400 font-normal"> / 5.0</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={14} 
                    className={star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <TrendingUp size={20} className="text-blue-600" />
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Reviews</span>
              </div>
              <div className="text-3xl font-bold text-slate-900">
                {reviews.length}
                <span className="text-sm text-slate-400 font-normal"> reviews</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Rating Distribution Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Rating Distribution</h3>
              <div className="space-y-3">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm font-medium text-slate-600">{rating}</span>
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 w-12">{count}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock size={12} />
                  <span>Latest reviews appear first</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Form and Reviews */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Submit Review Form */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 px-6 py-4 bg-slate-50/50">
                <h3 className="font-semibold text-slate-900">Submit Your Review</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <UserCircle size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg font-medium outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 transition-all"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Rating Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: num })}
                        className={`flex-1 py-2 rounded-lg border transition-all ${
                          formData.rating === num 
                            ? "bg-yellow-50 border-yellow-400 text-yellow-600" 
                            : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <Star size={14} className={formData.rating === num ? "fill-yellow-400" : ""} />
                          <span className="text-sm font-medium">{num}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Your Review
                  </label>
                  <textarea 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-medium h-28 resize-none outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="Share your experience with our services..."
                    value={formData.comment}
                    onChange={e => setFormData({...formData, comment: e.target.value})}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className={`w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? "bg-slate-400 cursor-not-allowed" 
                      : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Review
                    </>
                  )}
                </button>
                
                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm text-center">
                    ✓ Review submitted successfully! Thank you for your feedback.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
                    Failed to submit review. Please try again.
                  </div>
                )}
              </form>
            </div>

            {/* Reviews List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Community Reviews</h3>
                <span className="text-xs text-slate-400">{reviews.length} reviews</span>
              </div>
              
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-8 h-8 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
                  <p className="text-sm text-slate-400 mt-3">Loading reviews...</p>
                </div>
              ) : reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {rev.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-slate-900">{rev.name}</h4>
                              {rev.verified && (
                                <ShieldCheck size={12} className="text-indigo-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  size={12} 
                                  className={star <= rev.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar size={10} />
                          <span>{rev.date}</span>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-indigo-200 pl-4">
                        <p className="text-slate-600 leading-relaxed">
                          "{rev.comment}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                  <MessageSquare size={32} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-400">No reviews yet. Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}