import { NextResponse } from "next/server";
import { softDeleteSubmission } from "@/lib/db";

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const result = await softDeleteSubmission(id, "admin");

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("[api/admin/respons/[id]/delete]", err);
    return NextResponse.json({ error: "Gagal menghapus respons." }, { status: 500 });
  }
}
