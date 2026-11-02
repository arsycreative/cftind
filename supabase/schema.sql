-- ==============================================================================
-- CFTInd — Supabase Database Schema
-- Platform Pengisian Instrumen CFTIndex (Bahasa Indonesia)
-- Sesuai PRD & System Design Versi 0.1
-- ==============================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. TABEL: INSTRUMENTS
create table if not exists public.instruments (
  id text primary key,
  title text not null,
  description text,
  version text not null default '1.0',
  status text not null check (status in ('draft', 'open', 'closed')) default 'open',
  total_butir integer not null default 45,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Seed instrumen default
insert into public.instruments (id, title, description, version, status, total_butir)
values (
  'cftindex-id-v1',
  'CFTIndex — Creativity Fostering Teacher Behaviour Index',
  'Adaptasi instrumen CFTIndex untuk konteks guru di Indonesia (45 butir, 9 dimensi).',
  '1.0',
  'open',
  45
) on conflict (id) do nothing;

-- 3. TABEL: SUBMISSIONS
create table if not exists public.submissions (
  id text primary key,
  instrument_id text not null references public.instruments(id) default 'cftindex-id-v1',
  status text not null check (status in ('in_progress', 'completed')) default 'in_progress',
  consent_version text not null default '1.0',
  mulai_at timestamp with time zone default now(),
  selesai_at timestamp with time zone,
  durasi_menit integer,
  flag_cepat text check (flag_cepat in ('YA', 'TIDAK')) default 'TIDAK',
  flag_seragam text check (flag_seragam in ('YA', 'TIDAK')) default 'TIDAK',
  ip_hash text,
  user_agent text,
  deleted_at timestamp with time zone,
  deleted_by text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Indexing untuk query admin & filter
create index if not exists idx_submissions_status on public.submissions(status) where deleted_at is null;
create index if not exists idx_submissions_mulai on public.submissions(mulai_at) where deleted_at is null;
create index if not exists idx_submissions_deleted on public.submissions(deleted_at);

-- 4. TABEL: PROFILES
create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  submission_id text not null references public.submissions(id) on delete cascade unique,
  jenjang text not null,
  lama text not null,
  jenis_kelamin text,
  usia text,
  pendidikan text,
  status text not null,
  provinsi text not null,
  mapel text,
  email text,
  created_at timestamp with time zone default now()
);

create index if not exists idx_profiles_jenjang on public.profiles(jenjang);
create index if not exists idx_profiles_provinsi on public.profiles(provinsi);

-- 5. TABEL: ANSWERS
create table if not exists public.answers (
  id uuid primary key default uuid_generate_v4(),
  submission_id text not null references public.submissions(id) on delete cascade,
  kode varchar(5) not null,
  nilai smallint not null check (nilai between 1 and 5),
  page smallint default 0,
  updated_at timestamp with time zone default now(),
  constraint uq_submission_kode unique (submission_id, kode)
);

create index if not exists idx_answers_submission on public.answers(submission_id);

-- 6. TABEL: ADMIN_USERS
create table if not exists public.admin_users (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade unique,
  email text not null unique,
  role text not null check (role in ('admin', 'super_admin')) default 'admin',
  nama text,
  created_at timestamp with time zone default now()
);

-- 7. TABEL: EXPORT_LOGS
create table if not exists public.export_logs (
  id uuid primary key default uuid_generate_v4(),
  admin_email text not null,
  filter_params jsonb default '{}'::jsonb,
  row_count integer default 0,
  exported_at timestamp with time zone default now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.instruments enable row level security;
alter table public.submissions enable row level security;
alter table public.profiles enable row level security;
alter table public.answers enable row level security;
alter table public.admin_users enable row level security;
alter table public.export_logs enable row level security;

-- Helper function: cek apakah user login adalah admin
create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$$;

-- Policies untuk INSTRUMENTS: Publik bisa membaca status instrumen
create policy "Instrumen dapat dibaca publik"
  on public.instruments for select
  using (true);

create policy "Hanya admin dapat mengubah instrumen"
  on public.instruments for all
  using (public.is_admin());

-- Policies untuk SUBMISSIONS:
create policy "Responden dapat membuat submission baru"
  on public.submissions for insert
  with check (true);

create policy "Responden dapat memperbarui submission miliknya yang belum selesai"
  on public.submissions for update
  using (status = 'in_progress' and deleted_at is null);

create policy "Admin dapat melihat semua submission aktif"
  on public.submissions for select
  using (public.is_admin());

create policy "Admin dapat mengubah/soft delete submission"
  on public.submissions for update
  using (public.is_admin());

-- Policies untuk PROFILES:
create policy "Responden dapat mengisi profilnya"
  on public.profiles for insert
  with check (true);

create policy "Admin dapat melihat semua data profil"
  on public.profiles for select
  using (public.is_admin());

-- Policies untuk ANSWERS:
create policy "Responden dapat menyimpan jawaban"
  on public.answers for insert
  with check (true);

create policy "Responden dapat memperbarui jawaban sebelum final submit"
  on public.answers for update
  using (true);

create policy "Admin dapat membaca semua jawaban"
  on public.answers for select
  using (public.is_admin());

-- Policies untuk EXPORT_LOGS:
create policy "Admin dapat melihat dan mencatat log ekspor"
  on public.export_logs for all
  using (public.is_admin());

-- Policies untuk ADMIN_USERS:
create policy "Admin dapat melihat profil admin"
  on public.admin_users for select
  using (public.is_admin());
