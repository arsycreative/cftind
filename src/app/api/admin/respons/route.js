import { NextResponse } from "next/server";
import { getSubmissions } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const jenjang = searchParams.get("jenjang") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "25", 10);

    const result = await getSubmissions({
      search,
      status,
      jenjang,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("[api/admin/respons]", err);
    return NextResponse.json({ error: "Gagal mengambil data respons." }, { status: 500 });
  }
}
