import { NextResponse } from "next/server";
import { getExportData } from "@/lib/db";
import { BUTIR } from "@/lib/items";
import ExcelJS from "exceljs";

// Sanitize formula injection
function sanitize(val) {
  if (val === null || val === undefined) return "";
  const str = String(val);
  return str.replace(/^[=+\-@]/, "'$&");
}

function checkStraightLining(answers) {
  const values = Object.values(answers).filter((v) => v !== undefined && v !== null && v !== "");
  if (values.length < 45) return false;
  return new Set(values).size === 1;
}

export async function POST(request) {
  try {
    const opts = await request.json().catch(() => ({}));

    // Fetch data via universal DB layer
    const rows = await getExportData(opts);

    // Build Excel Workbook
    const wb = new ExcelJS.Workbook();
    wb.creator = "CFTInd Platform (cftind.my.id)";
    wb.created = new Date();

    const profileCols = [
      { key: "jenjang", header: "jenjang" },
      { key: "lama", header: "lama_mengajar" },
      { key: "jenis_kelamin", header: "jenis_kelamin" },
      { key: "usia", header: "rentang_usia" },
      { key: "pendidikan", header: "pendidikan" },
      { key: "status", header: "status_sekolah" },
      { key: "provinsi", header: "provinsi" },
      { key: "mapel", header: "mata_pelajaran" },
    ];

    const itemCols = BUTIR.map((k) => k.kode);

    // ── Sheet 1: Data_Lebar ──────────────────────────────────────────────────
    const wsData = wb.addWorksheet("Data_Lebar");

    wsData.columns = [
      { header: "submission_id", key: "submission_id", width: 22 },
      { header: "status", key: "status", width: 14 },
      { header: "mulai", key: "mulai", width: 22 },
      { header: "selesai", key: "selesai", width: 22 },
      { header: "durasi_menit", key: "durasi_menit", width: 14 },
      { header: "flag_cepat", key: "flag_cepat", width: 12 },
      { header: "flag_seragam", key: "flag_seragam", width: 14 },
      ...profileCols.map((c) => ({ header: c.header, key: c.key, width: 20 })),
      ...(opts.include_email ? [{ header: "email", key: "email", width: 30 }] : []),
      ...itemCols.map((c) => ({ header: c, key: c, width: 8 })),
    ];

    // Style header row
    const headerRow1 = wsData.getRow(1);
    headerRow1.height = 26;
    headerRow1.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF153A5B" },
      };
      cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    for (const row of rows) {
      const profile = row.profiles || {};
      const answers = {};
      if (Array.isArray(row.answers)) {
        for (const ans of row.answers) {
          answers[ans.kode] = ans.nilai;
        }
      } else if (typeof row.answers === "object" && row.answers !== null) {
        Object.assign(answers, row.answers);
      }

      const durasi = row.durasi_menit ?? (
        row.selesai_at && row.mulai_at
          ? Math.round((new Date(row.selesai_at) - new Date(row.mulai_at)) / 60000)
          : null
      );

      const flagCepat = durasi !== null && durasi < 3 ? "YA" : "TIDAK";
      const flagSeragam = checkStraightLining(answers) ? "YA" : "TIDAK";

      const rowValues = {
        submission_id: row.id,
        status: row.status,
        mulai: row.mulai_at ? new Date(row.mulai_at).toLocaleString("id-ID") : "",
        selesai: row.selesai_at ? new Date(row.selesai_at).toLocaleString("id-ID") : "",
        durasi_menit: durasi,
        flag_cepat: flagCepat,
        flag_seragam: flagSeragam,
        ...Object.fromEntries(profileCols.map((c) => [c.key, sanitize(profile[c.key] || "")])),
        ...(opts.include_email ? { email: sanitize(profile.email || "") } : {}),
        ...Object.fromEntries(itemCols.map((c) => [c, typeof answers[c] === "number" ? answers[c] : ""])),
      };

      const added = wsData.addRow(rowValues);
      added.alignment = { vertical: "middle" };
    }

    // ── Sheet 2: Kamus_Variabel ──────────────────────────────────────────────
    const wsKamus = wb.addWorksheet("Kamus_Variabel");
    wsKamus.columns = [
      { header: "No", key: "no", width: 6 },
      { header: "Kode", key: "kode", width: 10 },
      { header: "Dimensi", key: "dimensi", width: 18 },
      { header: "Teks Butir (Bahasa Indonesia)", key: "teks", width: 85 },
      { header: "Skala & Nilai", key: "skala", width: 45 },
    ];

    const headerRow2 = wsKamus.getRow(1);
    headerRow2.height = 26;
    headerRow2.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF278C57" },
      };
      cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    for (const item of BUTIR) {
      wsKamus.addRow({
        no: item.no,
        kode: item.kode,
        dimensi: item.dimensi,
        teks: item.teks,
        skala: "1=Sangat tidak setuju, 2=Tidak setuju, 3=Ragu-ragu, 4=Setuju, 5=Sangat setuju",
      });
    }

    // ── Sheet 3: Info_Ekspor ────────────────────────────────────────────────
    const wsInfo = wb.addWorksheet("Info_Ekspor");
    wsInfo.columns = [
      { header: "Parameter", key: "param", width: 26 },
      { header: "Keterangan", key: "value", width: 65 },
    ];

    const headerRow3 = wsInfo.getRow(1);
    headerRow3.height = 26;
    headerRow3.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF153A5B" },
      };
      cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
    });

    wsInfo.addRows([
      { param: "Platform", value: "CFTInd (cftind.my.id)" },
      { param: "Instrumen", value: "CFTIndex — Creativity Fostering Teacher Behaviour Index" },
      { param: "Versi Adaptasi", value: "Bahasa Indonesia (v1.0)" },
      { param: "Versi Persetujuan", value: "Informed Consent v1.0" },
      { param: "Waktu Ekspor", value: new Date().toLocaleString("id-ID") },
      { param: "Jumlah Baris Data", value: rows.length },
      { param: "Filter Jenjang", value: opts.filter_jenjang || "Semua Jenjang" },
      { param: "Filter Rentang Waktu", value: `${opts.filter_dari || "Awal"} s/d ${opts.filter_sampai || "Sekarang"}` },
      { param: "Sertakan Belum Selesai", value: opts.include_incomplete ? "Ya" : "Tidak (Hanya completed)" },
      { param: "Sertakan Email", value: opts.include_email ? "Ya" : "Tidak" },
      { param: "Pemberitahuan Etis", value: "Data mentah untuk riset akademik. Skor bukan hasil tes psikologis klinis." },
    ]);

    // Write to array buffer
    const buffer = await wb.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="CFTInd_Data_${new Date().toISOString().slice(0, 10)}.xlsx"`,
      },
    });
  } catch (err) {
    console.error("[api/admin/ekspor]", err);
    return NextResponse.json({ error: "Gagal membuat file ekspor Excel." }, { status: 500 });
  }
}
