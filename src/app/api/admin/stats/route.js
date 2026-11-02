import { NextResponse } from "next/server";
import { getStats } from "@/lib/db";

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (err) {
    console.error("[api/admin/stats]", err);
    return NextResponse.json({ error: "Gagal mengambil statistik." }, { status: 500 });
  }
}
