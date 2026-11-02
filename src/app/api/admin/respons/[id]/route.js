import { NextResponse } from "next/server";
import { getSubmissionById } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const sub = await getSubmissionById(id);

    if (!sub) {
      return NextResponse.json({ error: "Respons tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: sub });
  } catch (err) {
    console.error("[api/admin/respons/[id]]", err);
    return NextResponse.json({ error: "Gagal mengambil rincian respons." }, { status: 500 });
  }
}
