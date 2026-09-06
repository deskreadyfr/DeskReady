-- ============================================================================
-- DeskReady Academy — liste d'attente (validation de la demande)
-- Utilisée par : academy.html  (fonction saveWaitlistEntry -> insert client anon)
-- ============================================================================

create table if not exists public.academy_waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  sujets     text[] not null default '{}',   -- FX, Rates, Credit, Equity, Derivatives, Structured Products, Autre
  autre      text,                           -- précision libre si "Autre" est coché
  created_at timestamptz not null default now()
);

-- Un même email peut revenir (changement d'avis sur les sujets) : pas de contrainte unique.
create index if not exists academy_waitlist_email_idx on public.academy_waitlist (email);
create index if not exists academy_waitlist_created_at_idx on public.academy_waitlist (created_at desc);

-- RLS : le formulaire public insère avec la clé anon, rien d'autre n'est exposé.
alter table public.academy_waitlist enable row level security;

drop policy if exists "anon can insert academy_waitlist" on public.academy_waitlist;
create policy "anon can insert academy_waitlist"
  on public.academy_waitlist
  for insert
  to anon, authenticated
  with check (true);

-- (Lecture réservée au service_role / dashboard Supabase — aucune policy select pour anon.)
