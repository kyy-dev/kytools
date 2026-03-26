import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 1. Tentukan lokasi file jembatan JSON di root folder
const filePath = path.join(process.cwd(), "reviews.json");

// --- FUNGSI PEMBANTU (HELPERS) ---

// Fungsi buat baca data dari file JSON
const getReviews = () => {
  try {
    // Cek dulu filenya ada atau nggak
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf-8");
      return [];
    }

    const data = fs.readFileSync(filePath, "utf-8");
    
    // Kalau filenya kosong melompong (0 bytes), balikin array kosong
    if (!data.trim()) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Error pas baca JSON:", error);
    return [];
  }
};

// Fungsi buat simpan data ke file JSON (Menimpa file lama)
const saveReviews = (reviews: any) => {
  try {
    const dataString = JSON.stringify(reviews, null, 2);
    fs.writeFileSync(filePath, dataString, "utf-8");
    console.log("✅ Berhasil nulis ke reviews.json!");
  } catch (error) {
    console.error("❌ Gagal nulis ke file:", error);
    throw new Error("Gagal menyimpan database lokal");
  }
};

// --- HANDLER API ---

// Ambil semua ulasan (GET)
export async function GET() {
  const reviews = getReviews();
  return NextResponse.json(reviews);
}

// Tambah ulasan baru (POST)
export async function POST(req: Request) {
  try {
    // 1. Ambil data dari body request
    const body = await req.json();

    // 2. Ambil data lama
    const currentReviews = getReviews();

    // 3. Buat objek ulasan baru
    const newReview = {
      id: Date.now(),
      name: body.name || "Anonim",
      rating: Number(body.rating) || 5,
      comment: body.comment || "",
      date: new Date().toLocaleDateString('id-ID'),
    };

    // 4. Gabungkan (Data baru di urutan paling atas)
    const updatedReviews = [newReview, ...currentReviews];

    // 5. Simpan ke file
    saveReviews(updatedReviews);

    // 6. Balikin respon sukses
    return NextResponse.json(newReview);

  } catch (err: any) {
    console.error("❌ Error di API POST:", err.message);
    return NextResponse.json(
      { error: "Gagal memproses ulasan", details: err.message }, 
      { status: 500 }
    );
  }
}
