import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// In-memory cache for demo/local storage of OTP.
// In production, you'd use Redis or database session.
let currentOtp: string = "";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (email !== "vivekshaganti@gmail.com") {
      return NextResponse.json({ error: "Unauthorized email destination" }, { status: 403 });
    }

    // Generate a secure 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    currentOtp = otp;

    // Write OTP to a local file in the workspace
    const otpPath = path.join(process.cwd(), ".otp.txt");
    fs.writeFileSync(otpPath, `YOUR PORTFOLIO OTP: ${otp}\nGenerated at: ${new Date().toISOString()}`);

    // Print to server console
    console.log("\n========================================");
    console.log(`🔐 SECURITY ALERT: OTP sent to ${email}`);
    console.log(`🔑 YOUR OTP IS: ${otp}`);
    console.log("Check the project root directory file: .otp.txt");
    console.log("========================================\n");

    // Write the current active OTP to a global variable or cache (using global state in Node.js)
    (global as any).activeOtp = otp;

    return NextResponse.json({ success: true, message: "OTP triggered successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
