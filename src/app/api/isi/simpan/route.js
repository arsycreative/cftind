import { NextResponse } from "next/server";
import { saveAnswers } from "@/lib/db";

const VALID_KODES = new Set(
  Array.from({ length: 45 }, (_, i) => `B${String(i + 1).padStart(2, "0")}`)
);

export async function POST(request) {
  try {
    const { session_id, page, answers } = await request.json();

    if (!session_id || answers === undefined || answers === null) {
      return NextResponse.json({ error: "Parameter tidak lengkap." }, { status: 400 });
    }

    // Validate answer values (1..5)
    const sanitized = {};
    for (const [kode, nilai] of Object.entries(answers)) {
      if (!VALID_KODES.has(kode)) continue;
      const n = parseInt(nilai, 10);
      if (n >= 1 && n <= 5) {
        sanitized[kode] = n;
      }
    }

    const result = await saveAnswers({
      session_id,
      page: typeof page === "number" ? page : 0,
      answers: sanitized,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error || "Gagal menyimpan." }, { status: 400 });
    }

    return NextResponse.json({ ok: true, saved: result.saved });
  } catch (err) {
    console.error("[api/isi/simpan]", err);
    return NextResponse.json({ error: "Gagal menyimpan jawaban. Silakan coba lagi." }, { status: 500 });
  }
}
