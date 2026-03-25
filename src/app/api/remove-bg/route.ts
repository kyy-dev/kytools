import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;

    const externalFormData = new FormData();
    externalFormData.append('image_file', image);
    externalFormData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: { 'X-Api-Key': process.env.REMOVE_BG_API_KEY! },
      body: externalFormData,
    });

    if (!response.ok) throw new Error("API Error");
    const blob = await response.blob();
    return new NextResponse(blob, { headers: { 'Content-Type': 'image/png' } });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
  }
}
