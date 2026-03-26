import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Tentukan lokasi file jembatan JSON
const filePath = path.join(process.cwd(), "reviews.json");

// Fungsi pembantu buat baca data
const getReviews = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Fungsi pembantu buat simpan data
const saveReviews = (reviews: any) => {
  fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));
};

export async function GET() {
  const reviews = getReviews();
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const reviews = getReviews();

    const newReview = {
      id: Date.now(),
      name: body.name || "Anonim",
      rating: Number(body.rating) || 5,
      comment: body.comment || "",
      date: new Date().toLocaleDateString('id-ID'),
    };

    const updatedReviews = [newReview, ...reviews];
    saveReviews(updatedReviews);

    return NextResponse.json(newReview);
  } catch (err) {
    return NextResponse.json({ error: "Gagal simpan data" }, { status: 400 });
  }
}
