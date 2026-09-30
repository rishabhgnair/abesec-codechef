-- ============================================================
-- CodeChef 7.0 - ABESEC Chapter Arcade Edition
-- Supabase Database Schema
-- ============================================================

-- 1. Create table `events`
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  date date not null,
  time time not null,
  venue text,
  category text not null check (category in ('Coding', 'Workshop', 'Quiz', 'Gaming', 'Design', 'Talk')),
  max_seats int,
  poster_url text,
  featured boolean default false,
  created_at timestamptz default now()
);

-- 2. Create table `registrations`
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  email text not null,
  college_year text not null,
  phone text not null,
  created_at timestamptz default now()
);

-- 3. Unique index on registrations (event_id, lower(email)) to block duplicates
create unique index if not exists idx_registrations_event_email
  on public.registrations (event_id, lower(email));

-- 4. Partial unique index on events(featured) where featured = true,
-- ensuring only one event can be featured at a time
create unique index if not exists idx_events_featured_single
  on public.events (featured)
  where featured = true;

-- 5. View `events_with_counts`
-- Aggregates registered count per event while preserving event fields.
-- Public site uses this to show remaining seats without exposing registrant details.
create or replace view public.events_with_counts as
select
  e.id,
  e.name,
  e.description,
  e.date,
  e.time,
  e.venue,
  e.category,
  e.max_seats,
  e.poster_url,
  e.featured,
  e.created_at,
  coalesce(count(r.id), 0)::int as registered_count
from public.events e
left join public.registrations r on r.event_id = e.id
group by e.id;

-- Grant SELECT permissions on the view to public roles
grant select on public.events_with_counts to anon, authenticated;

-- 6. Row Level Security (RLS) Configuration
alter table public.events enable row level security;
alter table public.registrations enable row level security;

-- Events Policies:
-- Public can view events; Authenticated admins can create, update, delete
drop policy if exists "Public can view events" on public.events;
create policy "Public can view events"
  on public.events
  for select
  using (true);

drop policy if exists "Authenticated users can insert events" on public.events;
create policy "Authenticated users can insert events"
  on public.events
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update events" on public.events;
create policy "Authenticated users can update events"
  on public.events
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete events" on public.events;
create policy "Authenticated users can delete events"
  on public.events
  for delete
  to authenticated
  using (true);

-- Registrations Policies:
-- Anyone (anon + authenticated) can insert registrations;
-- Only authenticated admins can view and delete registrations
drop policy if exists "Anyone can insert registrations" on public.registrations;
create policy "Anyone can insert registrations"
  on public.registrations
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Authenticated users can view registrations" on public.registrations;
create policy "Authenticated users can view registrations"
  on public.registrations
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can delete registrations" on public.registrations;
create policy "Authenticated users can delete registrations"
  on public.registrations
  for delete
  to authenticated
  using (true);
