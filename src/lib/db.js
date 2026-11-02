import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

// Check if Supabase credentials are configured
export const isSupabaseConfigured = () => {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
};

// Supabase client lazy loader
let _supabase = null;
export async function getSupabase() {
  if (_supabase) return _supabase;
  if (!isSupabaseConfigured()) return null;
  const { createClient } = await import("@supabase/supabase-js");

  const options = {
    auth: { persistSession: false },
  };

  try {
    const ws = (await import("ws")).default;
    options.realtime = { transport: ws };
  } catch {}

  _supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options
  );
  return _supabase;
}

// ── File-based Store for Dev/Demo Mode ──────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "db.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    // Generate initial sample seed data for admin preview
    const sampleSubmissions = generateSampleData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(sampleSubmissions, null, 2), "utf8");
  }
}

function readData() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return { submissions: [], export_logs: [] };
  }
}

function writeData(data) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

function generateSampleData() {
  const now = new Date();
  const daysAgo = (d) => new Date(now.getTime() - d * 86400000).toISOString();

  // Helper to generate full 45 answers with varied Likert distribution
  const makeAnswers = (baseBias = 4) => {
    const res = {};
    for (let i = 1; i <= 45; i++) {
      const code = `B${String(i).padStart(2, "0")}`;
      // Bias around baseBias with slight variance (3..5)
      const val = Math.max(1, Math.min(5, Math.round(baseBias + (Math.random() - 0.4) * 1.5)));
      res[code] = val;
    }
    return res;
  };

  const submissions = [
    {
      id: "CFT-2026-A101",
      status: "completed",
      consent_version: "1.0",
      mulai_at: daysAgo(5),
      selesai_at: new Date(new Date(daysAgo(5)).getTime() + 9 * 60000).toISOString(),
      durasi_menit: 9,
      flag_cepat: "TIDAK",
      flag_seragam: "TIDAK",
      deleted_at: null,
      profil: {
        jenjang: "SD / MI",
        lama: "11–20 tahun",
        jenis_kelamin: "Perempuan",
        usia: "35–44 tahun",
        pendidikan: "S1 / D4",
        status: "Negeri",
        provinsi: "Jawa Barat",
        mapel: "Guru Kelas",
        email: "guru.jabar@example.org",
      },
      answers: makeAnswers(4),
    },
    {
      id: "CFT-2026-B202",
      status: "completed",
      consent_version: "1.0",
      mulai_at: daysAgo(3),
      selesai_at: new Date(new Date(daysAgo(3)).getTime() + 11 * 60000).toISOString(),
      durasi_menit: 11,
      flag_cepat: "TIDAK",
      flag_seragam: "TIDAK",
      deleted_at: null,
      profil: {
        jenjang: "SMP / MTs",
        lama: "5–10 tahun",
        jenis_kelamin: "Laki-laki",
        usia: "25–34 tahun",
        pendidikan: "S1 / D4",
        status: "Swasta",
        provinsi: "DKI Jakarta",
        mapel: "Matematika",
        email: "math.jakarta@example.org",
      },
      answers: makeAnswers(4),
    },
    {
      id: "CFT-2026-C303",
      status: "completed",
      consent_version: "1.0",
      mulai_at: daysAgo(2),
      selesai_at: new Date(new Date(daysAgo(2)).getTime() + 14 * 60000).toISOString(),
      durasi_menit: 14,
      flag_cepat: "TIDAK",
      flag_seragam: "TIDAK",
      deleted_at: null,
      profil: {
        jenjang: "SMA / MA",
        lama: "> 20 tahun",
        jenis_kelamin: "Perempuan",
        usia: "45–54 tahun",
        pendidikan: "S2",
        status: "Negeri",
        provinsi: "Jawa Timur",
        mapel: "Bahasa Indonesia",
        email: "",
      },
      answers: makeAnswers(5),
    },
    {
      id: "CFT-2026-D404",
      status: "completed",
      consent_version: "1.0",
      mulai_at: daysAgo(1),
      selesai_at: new Date(new Date(daysAgo(1)).getTime() + 8 * 60000).toISOString(),
      durasi_menit: 8,
      flag_cepat: "TIDAK",
      flag_seragam: "TIDAK",
      deleted_at: null,
      profil: {
        jenjang: "SMK / MAK",
        lama: "< 5 tahun",
        jenis_kelamin: "Laki-laki",
        usia: "< 25 tahun",
        pendidikan: "S1 / D4",
        status: "Swasta",
        provinsi: "DI Yogyakarta",
        mapel: "Desain Komunikasi Visual",
        email: "dkv.jogja@example.org",
      },
      answers: makeAnswers(4),
    },
    {
      id: "CFT-2026-E505",
      status: "in_progress",
      consent_version: "1.0",
      mulai_at: daysAgo(0),
      selesai_at: null,
      durasi_menit: null,
      flag_cepat: "TIDAK",
      flag_seragam: "TIDAK",
      deleted_at: null,
      profil: {
        jenjang: "PAUD / TK / RA",
        lama: "5–10 tahun",
        jenis_kelamin: "Perempuan",
        usia: "25–34 tahun",
        pendidikan: "S1 / D4",
        status: "Swasta",
        provinsi: "Bali",
        mapel: "Guru PAUD",
        email: "",
      },
      answers: {
        B01: 5, B02: 4, B03: 5, B04: 4, B05: 4,
        B06: 3, B07: 4, B08: 5, B09: 4, B10: 4,
      },
    },
  ];

  return { submissions, export_logs: [] };
}

// Check for straight lining
function isStraightLining(answers) {
  const vals = Object.values(answers).filter((v) => typeof v === "number");
  if (vals.length < 45) return false;
  return new Set(vals).size === 1;
}

// ── Public Store API ─────────────────────────────────────────────────────────

export async function createSubmission({ id, profil, consent_version = "1.0", ip_hash = null, user_agent = null }) {
  const supabase = await getSupabase();
  const subId = id || `CFT-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`;
  const now = new Date().toISOString();

  if (supabase) {
    const { error: subErr } = await supabase.from("submissions").insert({
      id: subId,
      status: "in_progress",
      consent_version,
      mulai_at: now,
      ip_hash,
      user_agent,
      created_at: now,
    });
    if (subErr) throw subErr;

    const { error: profErr } = await supabase.from("profiles").insert({
      submission_id: subId,
      ...profil,
    });
    if (profErr) throw profErr;

    return { session_id: subId };
  }

  // Fallback dev store
  const data = readData();
  const newSub = {
    id: subId,
    status: "in_progress",
    consent_version,
    mulai_at: now,
    selesai_at: null,
    durasi_menit: null,
    flag_cepat: "TIDAK",
    flag_seragam: "TIDAK",
    deleted_at: null,
    profil: profil || {},
    answers: {},
  };
  data.submissions.unshift(newSub);
  writeData(data);
  return { session_id: subId };
}

export async function saveAnswers({ session_id, page, answers }) {
  const supabase = await getSupabase();

  if (supabase) {
    const rows = Object.entries(answers).map(([kode, nilai]) => ({
      submission_id: session_id,
      kode,
      nilai: Number(nilai),
      page: Number(page),
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("answers").upsert(rows, {
      onConflict: "submission_id,kode",
    });
    if (error) throw error;
    return { ok: true, saved: rows.length };
  }

  // Fallback dev store
  const data = readData();
  const sub = data.submissions.find((s) => s.id === session_id && !s.deleted_at);
  if (!sub) {
    // If not found, create it seamlessly
    const now = new Date().toISOString();
    const newSub = {
      id: session_id,
      status: "in_progress",
      consent_version: "1.0",
      mulai_at: now,
      selesai_at: null,
      durasi_menit: null,
      flag_cepat: "TIDAK",
      flag_seragam: "TIDAK",
      deleted_at: null,
      profil: {},
      answers: {},
    };
    data.submissions.unshift(newSub);
    Object.assign(newSub.answers, answers);
    writeData(data);
    return { ok: true, saved: Object.keys(answers).length };
  }

  if (sub.status === "completed") {
    return { ok: false, error: "already_submitted" };
  }

  sub.answers = { ...(sub.answers || {}), ...answers };
  writeData(data);
  return { ok: true, saved: Object.keys(answers).length };
}

export async function submitAnswers({ session_id }) {
  const supabase = await getSupabase();
  const now = new Date();

  if (supabase) {
    // Check answer count
    const { count } = await supabase
      .from("answers")
      .select("*", { count: "exact", head: true })
      .eq("submission_id", session_id);

    if (count < 45) {
      return { ok: false, error: `Belum semua butir terjawab (${count}/45).` };
    }

    const { data: sub } = await supabase
      .from("submissions")
      .select("mulai_at")
      .eq("id", session_id)
      .single();

    const mulai = sub?.mulai_at ? new Date(sub.mulai_at) : now;
    const durasi = Math.max(1, Math.round((now.getTime() - mulai.getTime()) / 60000));
    const flag_cepat = durasi < 3 ? "YA" : "TIDAK";

    // Check answers for flag_seragam
    const { data: allAnswers } = await supabase
      .from("answers")
      .select("kode, nilai")
      .eq("submission_id", session_id);
    const ansMap = {};
    allAnswers?.forEach((a) => {
      ansMap[a.kode] = a.nilai;
    });
    const flag_seragam = isStraightLining(ansMap) ? "YA" : "TIDAK";

    const { error } = await supabase
      .from("submissions")
      .update({
        status: "completed",
        selesai_at: now.toISOString(),
        durasi_menit: durasi,
        flag_cepat,
        flag_seragam,
      })
      .eq("id", session_id);

    if (error) throw error;
    return { ok: true };
  }

  // Fallback dev store
  const data = readData();
  const sub = data.submissions.find((s) => s.id === session_id);
  if (!sub) return { ok: false, error: "Sesi tidak ditemukan" };
  if (sub.status === "completed") return { ok: true, already: true };

  const mulai = sub.mulai_at ? new Date(sub.mulai_at) : new Date(now.getTime() - 10 * 60000);
  const durasi = Math.max(1, Math.round((now.getTime() - mulai.getTime()) / 60000));

  sub.status = "completed";
  sub.selesai_at = now.toISOString();
  sub.durasi_menit = durasi;
  sub.flag_cepat = durasi < 3 ? "YA" : "TIDAK";
  sub.flag_seragam = isStraightLining(sub.answers || {}) ? "YA" : "TIDAK";

  writeData(data);
  return { ok: true };
}

export async function getSubmissions({
  search = "",
  status = "",
  jenjang = "",
  page = 1,
  limit = 25,
} = {}) {
  const supabase = await getSupabase();

  if (supabase) {
    let query = supabase
      .from("submissions")
      .select("*, profiles(*)", { count: "exact" })
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (status) query = query.eq("status", status);
    if (jenjang) query = query.eq("profiles.jenjang", jenjang);
    if (search) query = query.ilike("id", `%${search}%`);

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: rows, count, error } = await query;
    if (error) throw error;

    return {
      rows: (rows || []).map((r) => ({
        id: r.id,
        status: r.status,
        mulai: r.mulai_at ? new Date(r.mulai_at).toLocaleString("id-ID") : "—",
        selesai: r.selesai_at ? new Date(r.selesai_at).toLocaleString("id-ID") : "—",
        durasi: r.durasi_menit,
        jenjang: r.profiles?.jenjang || "—",
        provinsi: r.profiles?.provinsi || "—",
        profil: r.profiles || {},
      })),
      total: count || 0,
      page,
      limit,
    };
  }

  // Fallback dev store
  const data = readData();
  const active = data.submissions.filter((s) => !s.deleted_at);

  const filtered = active.filter((r) => {
    if (status && r.status !== status) return false;
    if (jenjang && r.profil?.jenjang !== jenjang) return false;
    if (search && !r.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const from = (page - 1) * limit;
  const rows = filtered.slice(from, from + limit).map((r) => ({
    id: r.id,
    status: r.status,
    mulai: r.mulai_at ? new Date(r.mulai_at).toLocaleString("id-ID") : "—",
    selesai: r.selesai_at ? new Date(r.selesai_at).toLocaleString("id-ID") : "—",
    durasi: r.durasi_menit,
    jenjang: r.profil?.jenjang || "—",
    provinsi: r.profil?.provinsi || "—",
    profil: r.profil || {},
    flag_cepat: r.flag_cepat,
    flag_seragam: r.flag_seragam,
  }));

  return {
    rows,
    total: filtered.length,
    page,
    limit,
  };
}

export async function getSubmissionById(id) {
  const supabase = await getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("submissions")
      .select("*, profiles(*), answers(*)")
      .eq("id", id)
      .single();

    if (error || !data) return null;

    const ansMap = {};
    (data.answers || []).forEach((a) => {
      ansMap[a.kode] = a.nilai;
    });

    return {
      ...data,
      profil: data.profiles || {},
      answers: ansMap,
    };
  }

  const data = readData();
  return data.submissions.find((s) => s.id === id) || null;
}

export async function softDeleteSubmission(id, adminEmail = "admin") {
  const supabase = await getSupabase();
  const now = new Date().toISOString();

  if (supabase) {
    const { error } = await supabase
      .from("submissions")
      .update({ deleted_at: now, deleted_by: adminEmail })
      .eq("id", id);
    if (error) throw error;
    return { ok: true };
  }

  const data = readData();
  const sub = data.submissions.find((s) => s.id === id);
  if (sub) {
    sub.deleted_at = now;
    sub.deleted_by = adminEmail;
    writeData(data);
  }
  return { ok: true };
}

export async function getStats() {
  const supabase = await getSupabase();

  if (supabase) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);
    fourteenDaysAgo.setHours(0, 0, 0, 0);

    const [
      { count: total },
      { count: selesai },
      { count: in_progress },
      { count: hari_ini },
      { data: recentRows },
    ] = await Promise.all([
      supabase.from("submissions").select("*", { count: "exact", head: true }).is("deleted_at", null),
      supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "completed").is("deleted_at", null),
      supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "in_progress").is("deleted_at", null),
      supabase.from("submissions").select("*", { count: "exact", head: true }).gte("mulai_at", todayStart.toISOString()).is("deleted_at", null),
      supabase.from("submissions").select("mulai_at").gte("mulai_at", fourteenDaysAgo.toISOString()).is("deleted_at", null),
    ]);

    // Bucket counts by date in memory
    const countByDate = {};
    (recentRows || []).forEach((r) => {
      if (r.mulai_at) {
        const d = r.mulai_at.slice(0, 10);
        countByDate[d] = (countByDate[d] || 0) + 1;
      }
    });

    const harian = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      harian.push({
        label: i === 0 ? "Hari ini" : `H-${i}`,
        date: dateStr,
        count: countByDate[dateStr] || 0,
      });
    }

    return {
      total: total || 0,
      selesai: selesai || 0,
      in_progress: in_progress || 0,
      hari_ini: hari_ini || 0,
      harian,
      is_live_supabase: true,
    };
  }

  // Fallback dev store
  const data = readData();
  const active = data.submissions.filter((s) => !s.deleted_at);

  const total = active.length;
  const selesai = active.filter((s) => s.status === "completed").length;
  const in_progress = active.filter((s) => s.status === "in_progress").length;

  const todayStr = new Date().toISOString().slice(0, 10);
  const hari_ini = active.filter((s) => (s.mulai_at || "").slice(0, 10) === todayStr).length;

  // 14 days chart
  const harian = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const count = active.filter((s) => (s.mulai_at || "").slice(0, 10) === dateStr).length;
    harian.push({
      label: i === 0 ? "Hari ini" : `H-${i}`,
      date: dateStr,
      count,
    });
  }

  return {
    total,
    selesai,
    in_progress,
    hari_ini,
    harian,
    is_live_supabase: false,
  };
}

export async function getExportData(options = {}) {
  const supabase = await getSupabase();

  if (supabase) {
    let query = supabase
      .from("submissions")
      .select("*, profiles(*), answers(*)")
      .is("deleted_at", null)
      .order("mulai_at", { ascending: true });

    if (!options.include_incomplete) {
      query = query.eq("status", "completed");
    }
    if (options.filter_jenjang) {
      query = query.eq("profiles.jenjang", options.filter_jenjang);
    }
    if (options.filter_dari) {
      query = query.gte("mulai_at", options.filter_dari);
    }
    if (options.filter_sampai) {
      query = query.lte("mulai_at", options.filter_sampai + "T23:59:59");
    }

    const { data: rows, error } = await query;
    if (error) throw error;
    return rows || [];
  }

  // Fallback dev store
  const data = readData();
  let rows = data.submissions.filter((s) => !s.deleted_at);

  if (!options.include_incomplete) {
    rows = rows.filter((s) => s.status === "completed");
  }
  if (options.filter_jenjang) {
    rows = rows.filter((s) => s.profil?.jenjang === options.filter_jenjang);
  }
  if (options.filter_provinsi) {
    rows = rows.filter((s) => s.profil?.provinsi === options.filter_provinsi);
  }
  if (options.filter_dari) {
    rows = rows.filter((s) => (s.mulai_at || "") >= options.filter_dari);
  }
  if (options.filter_sampai) {
    rows = rows.filter((s) => (s.mulai_at || "") <= options.filter_sampai + "T23:59:59");
  }

  return rows.map((r) => ({
    id: r.id,
    status: r.status,
    mulai_at: r.mulai_at,
    selesai_at: r.selesai_at,
    durasi_menit: r.durasi_menit,
    profiles: r.profil,
    answers: Object.entries(r.answers || {}).map(([kode, nilai]) => ({ kode, nilai })),
  }));
}
