create extension if not exists pgcrypto;

create table if not exists public.access_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  path text not null,
  referrer text,
  user_agent text,
  ip_hash text not null,

  company_name text,
  org text,
  asn text,
  country text,
  region text,
  city text,

  constraint access_logs_path_not_empty check (char_length(path) > 0),
  constraint access_logs_ip_hash_not_empty check (char_length(ip_hash) > 0)
);

alter table public.access_logs enable row level security;

create index if not exists access_logs_created_at_idx
  on public.access_logs (created_at desc);

create index if not exists access_logs_company_name_idx
  on public.access_logs (company_name);

create index if not exists access_logs_path_idx
  on public.access_logs (path);

create index if not exists access_logs_asn_idx
  on public.access_logs (asn);