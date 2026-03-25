import { NextResponse } from "next/server";

// Database sementara (In-Memory)
let reviews = [
  { 
    id: 1, 
    name: "System Admin", 
    rating: 5, 
    comment: "Server KyTools Online. Waiting for user logs...", 
    date: "ACTIVE" 
  },
];

export async function GET() {
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newReview = {
      id: Date.now(),
      name: body.name || "Anonymous",
      rating: Number(body.rating) || 5,
      comment: body.comment || "",
      date: new Date().toLocaleDateString('id-ID', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
    };
    
    reviews = [newReview, ...reviews];
    return NextResponse.json(newReview);
  } catch (err) {
    return NextResponse.json({ error: "Failed to process log" }, { status: 400 });
  }
}
