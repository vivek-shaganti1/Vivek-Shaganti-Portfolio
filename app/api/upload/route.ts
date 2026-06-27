import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dprwskuzx";
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "portfolio_preset";

    // Read file bytes
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Build form data to send to Cloudinary
    const cloudinaryForm = new FormData();
    const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;
    cloudinaryForm.append("file", base64Data);
    cloudinaryForm.append("upload_preset", uploadPreset);

    // Call Cloudinary API securely from backend
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: cloudinaryForm,
    });

    const data = await response.json();
    if (data.secure_url) {
      return NextResponse.json({ secure_url: data.secure_url });
    } else {
      return NextResponse.json({ error: data.error?.message || "Upload to Cloudinary failed" }, { status: 500 });
    }
  } catch (e: any) {
    console.error("[CLOUDINARY UPLOAD ERROR]", e);
    return NextResponse.json({ error: e.message || "Internal server error" }, { status: 500 });
  }
}
