// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  // Kirim email atau simpan ke database
  // Anda bisa menggunakan nodemailer atau service email lainnya
  
  return NextResponse.json({ success: true });
}
}