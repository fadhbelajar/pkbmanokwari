-- Supabase Schema for DPC PKB Manokwari

create table if not exists site_backup (
  id text primary key,
  data jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists site_settings (
  id text primary key default 'main',
  data jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists leaders (
  id text primary key,
  name text not null,
  position text not null,
  photo text,
  bio text,
  order_num integer default 0,
  party_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists news (
  id text primary key,
  title text not null,
  excerpt text,
  content text not null,
  image text,
  date date not null,
  category text,
  slug text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists gallery_items (
  id text primary key,
  title text not null,
  image text not null,
  date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists video_links (
  id text primary key,
  title text not null,
  url text not null,
  thumbnail text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists accounts (
  id text primary key,
  username text unique not null,
  password text not null,
  role text default 'admin',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table site_backup enable row level security;
alter table site_settings enable row level security;
alter table leaders enable row level security;
alter table news enable row level security;
alter table gallery_items enable row level security;
alter table video_links enable row level security;
alter table accounts enable row level security;

-- Allow anonymous read access for public content
create policy "Allow anonymous read access" on site_backup for select using (true);
create policy "Allow anonymous read access" on site_settings for select using (true);
create policy "Allow anonymous read access" on leaders for select using (true);
create policy "Allow anonymous read access" on news for select using (true);
create policy "Allow anonymous read access" on gallery_items for select using (true);
create policy "Allow anonymous read access" on video_links for select using (true);
