// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Log data yang diterima (opsional)
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      timestamp: new Date().toISOString()
    });

    // Di sini Anda bisa menambahkan logika untuk mengirim email
    // menggunakan nodemailer atau service email lainnya
    
    // Untuk sekarang, kita hanya mengembalikan response sukses
    return NextResponse.json({ 
      success: true, 
      message: 'Message received successfully' 
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process message' 
      },
      { status: 500 }
    );
  }
}