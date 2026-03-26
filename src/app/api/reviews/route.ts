import { NextResponse } from 'next/server';
import axios from 'axios';

// Link RAW yang kamu kasih tadi
const RAW_GITHUB_URL = "https://raw.githubusercontent.com/kyy-dev/kytools/refs/heads/main/reviews.json";
const GITHUB_API_URL = "https://api.github.com/repos/kyy-dev/kytools/contents/reviews.json";

export async function GET() {
  try {
    // Ambil data langsung dari link RAW biar PASTI ada isinya
    const response = await axios.get(`${RAW_GITHUB_URL}?t=${Date.now()}`); // Pake ?t= biar gak kena cache
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json([], { status: 200 }); // Balikin array kosong kalau gagal
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rating, comment } = body;

    // 1. Ambil data lama & SHA file (wajib buat update di GitHub)
    const { data: fileData } = await axios.get(GITHUB_API_URL, {
      headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` }
    });

    const currentContent = JSON.parse(Buffer.from(fileData.content, 'base64').toString());
    
    // 2. Tambah ulasan baru
    const newReview = {
      id: Date.now(),
      name,
      rating,
      comment,
      date: new Date().toISOString()
    };
    
    const updatedContent = [newReview, ...currentContent];

    // 3. Push balik ke GitHub
    await axios.put(GITHUB_API_URL, {
      message: `New review from ${name}`,
      content: Buffer.from(JSON.stringify(updatedContent, null, 2)).toString('base64'),
      sha: fileData.sha
    }, {
      headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` }
    });

    return NextResponse.json({ success: true, review: newReview });
  } catch (error: any) {
    console.error("Error update GitHub:", error.response?.data || error.message);
    return NextResponse.json({ error: "Gagal kirim ulasan" }, { status: 500 });
  }
}
