import { NextRequest, NextResponse } from "next/server";
import { getRecruiters, updateRecruiterStatus, deleteRecruiter } from "@/lib/db";

export async function GET() {
  try {
    const list = await getRecruiters();
    return NextResponse.json({ data: list });
  } catch (err: any) {
    console.error("[API RECRUITERS GET ERROR] Exception handled:", err);
    return NextResponse.json({ error: "Failed to fetch recruiters" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const payload = await req.json();
    if (!payload.id || !payload.status) {
      return NextResponse.json({ error: "Missing required fields: id, status" }, { status: 400 });
    }

    const success = await updateRecruiterStatus(payload.id, payload.status, payload.notes || "");
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Failed to update recruiter" }, { status: 500 });
    }
  } catch (err: any) {
    console.error("[API RECRUITERS PUT ERROR] Exception handled:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing recruiter id parameter" }, { status: 400 });
    }

    const success = await deleteRecruiter(id);
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Failed to delete recruiter" }, { status: 500 });
    }
  } catch (err: any) {
    console.error("[API RECRUITERS DELETE ERROR] Exception handled:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
