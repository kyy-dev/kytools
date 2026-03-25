import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { plan, price } = await req.json();
    const payload = {
      transaction_details: { order_id: `ID-${Date.now()}`, gross_amount: price },
      item_details: [{ id: plan, price: price, quantity: 1, name: plan }],
    };

    const authString = Buffer.from(`${process.env.MIDTRANS_SERVER_KEY}:`).toString('base64');
    const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}
