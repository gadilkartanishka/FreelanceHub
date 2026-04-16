-- ============================================================
-- FreelanceHub — Initial Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 0. Extensions
-- ────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────────────────────────
-- 1. Profiles (extends auth.users)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id         uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      text,
  role       text NOT NULL DEFAULT 'freelancer' CHECK (role IN ('freelancer', 'client')),
  full_name  text,
  avatar_url text,
  phone      text,
  bio        text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read and update their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'freelancer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ────────────────────────────────────────────────────────────
-- 2. Clients
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.clients (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  freelancer_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name          text NOT NULL,
  email         text NOT NULL,
  phone         text,
  company       text,
  status        text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  notes         text,
  tags          text[] DEFAULT '{}',
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Freelancer can do everything with their own clients
CREATE POLICY "Freelancers can view own clients"
  ON public.clients FOR SELECT
  USING (freelancer_id = auth.uid());

CREATE POLICY "Freelancers can insert own clients"
  ON public.clients FOR INSERT
  WITH CHECK (freelancer_id = auth.uid());

CREATE POLICY "Freelancers can update own clients"
  ON public.clients FOR UPDATE
  USING (freelancer_id = auth.uid());

CREATE POLICY "Freelancers can delete own clients"
  ON public.clients FOR DELETE
  USING (freelancer_id = auth.uid());

-- ────────────────────────────────────────────────────────────
-- 3. Projects
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.projects (
  id             uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id      uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  title          text NOT NULL,
  description    text,
  agreed_value   numeric NOT NULL DEFAULT 0,
  start_date     date,
  deadline       date NOT NULL,
  status         text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'in_review', 'completed')),
  internal_notes text,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Freelancers access projects through client ownership
CREATE POLICY "Freelancers can view own projects"
  ON public.projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.clients
      WHERE clients.id = projects.client_id
        AND clients.freelancer_id = auth.uid()
    )
  );

CREATE POLICY "Freelancers can insert own projects"
  ON public.projects FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.clients
      WHERE clients.id = client_id
        AND clients.freelancer_id = auth.uid()
    )
  );

CREATE POLICY "Freelancers can update own projects"
  ON public.projects FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.clients
      WHERE clients.id = projects.client_id
        AND clients.freelancer_id = auth.uid()
    )
  );

CREATE POLICY "Freelancers can delete own projects"
  ON public.projects FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.clients
      WHERE clients.id = projects.client_id
        AND clients.freelancer_id = auth.uid()
    )
  );

-- ────────────────────────────────────────────────────────────
-- 4. Payments
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.payments (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id    uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  amount        numeric NOT NULL,
  date_received date NOT NULL,
  method        text,
  status        text NOT NULL DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'overdue')),
  proof_url     text,
  notes         text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Freelancers can view own payments"
  ON public.payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      JOIN public.clients ON clients.id = projects.client_id
      WHERE projects.id = payments.project_id
        AND clients.freelancer_id = auth.uid()
    )
  );

CREATE POLICY "Freelancers can insert own payments"
  ON public.payments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      JOIN public.clients ON clients.id = projects.client_id
      WHERE projects.id = project_id
        AND clients.freelancer_id = auth.uid()
    )
  );

CREATE POLICY "Freelancers can update own payments"
  ON public.payments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      JOIN public.clients ON clients.id = projects.client_id
      WHERE projects.id = payments.project_id
        AND clients.freelancer_id = auth.uid()
    )
  );

CREATE POLICY "Freelancers can delete own payments"
  ON public.payments FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      JOIN public.clients ON clients.id = projects.client_id
      WHERE projects.id = payments.project_id
        AND clients.freelancer_id = auth.uid()
    )
  );

-- ────────────────────────────────────────────────────────────
-- 5. Messages (per-project chat)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.messages (
  id             uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id     uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  sender_id      uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  body           text NOT NULL,
  attachment_url text,
  created_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Freelancers can view own project messages"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      JOIN public.clients ON clients.id = projects.client_id
      WHERE projects.id = messages.project_id
        AND clients.freelancer_id = auth.uid()
    )
    OR sender_id = auth.uid()
  );

CREATE POLICY "Users can insert messages in accessible projects"
  ON public.messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.projects
      JOIN public.clients ON clients.id = projects.client_id
      WHERE projects.id = project_id
        AND clients.freelancer_id = auth.uid()
    )
  );

-- ────────────────────────────────────────────────────────────
-- 6. Client Access (invite system)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.client_access (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_record_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  user_id          uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  invited_at       timestamptz NOT NULL DEFAULT now(),
  accepted_at      timestamptz,
  UNIQUE(client_record_id, user_id)
);

ALTER TABLE public.client_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Freelancers can manage client access"
  ON public.client_access FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.clients
      WHERE clients.id = client_access.client_record_id
        AND clients.freelancer_id = auth.uid()
    )
  );

CREATE POLICY "Clients can view own access"
  ON public.client_access FOR SELECT
  USING (user_id = auth.uid());

-- ────────────────────────────────────────────────────────────
-- 7. Updated_at trigger function
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at ON public.clients;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at ON public.projects;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at ON public.payments;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ────────────────────────────────────────────────────────────
-- 8. Enable Realtime for messages
-- ────────────────────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- ────────────────────────────────────────────────────────────
-- 9. Indexes for performance
-- ────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_clients_freelancer_id ON public.clients(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON public.projects(client_id);
CREATE INDEX IF NOT EXISTS idx_payments_project_id ON public.payments(project_id);
CREATE INDEX IF NOT EXISTS idx_messages_project_id ON public.messages(project_id);
CREATE INDEX IF NOT EXISTS idx_client_access_user_id ON public.client_access(user_id);
