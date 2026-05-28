import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { otp } = await request.json();
    const expectedOtp = (global as any).activeOtp;

    if (!expectedOtp || otp !== expectedOtp) {
      return NextResponse.json({ success: false, error: "Invalid OTP code." }, { status: 400 });
    }

    // Clear OTP after successful verify
    (global as any).activeOtp = null;

    return NextResponse.json({ success: true, message: "Authorized successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
