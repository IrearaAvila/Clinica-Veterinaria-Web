create table public."Pacientes" (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  nombre text not null default 'not null'::text,
  edad smallint null,
  propietario_id uuid null,
  observaciones text null
) TABLESPACE pg_default;