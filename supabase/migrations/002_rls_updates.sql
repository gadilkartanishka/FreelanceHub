-- ============================================================
-- FreelanceHub — RLS Policy Updates for Client Portal
-- ============================================================

-- Allow clients to view projects they have access to
CREATE POLICY "Clients can view shared projects"
  ON public.projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.client_access
      WHERE client_access.client_record_id = projects.client_id
        AND client_access.user_id = auth.uid()
    )
  );

-- Allow clients to view messages in projects they have access to
CREATE POLICY "Clients can view shared project messages"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.client_access
      JOIN public.projects ON projects.client_id = client_access.client_record_id
      WHERE projects.id = messages.project_id
        AND client_access.user_id = auth.uid()
    )
  );

-- Allow clients to insert messages in projects they have access to
CREATE POLICY "Clients can insert messages in shared projects"
  ON public.messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.client_access
      JOIN public.projects ON projects.client_id = client_access.client_record_id
      WHERE projects.id = project_id
        AND client_access.user_id = auth.uid()
    )
  );

-- Allow clients to view payments in projects they have access to
CREATE POLICY "Clients can view shared project payments"
  ON public.payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.client_access
      JOIN public.projects ON projects.client_id = client_access.client_record_id
      WHERE projects.id = payments.project_id
        AND client_access.user_id = auth.uid()
    )
  );

-- Allow clients to update payments (for proof upload)
CREATE POLICY "Clients can update shared project payments"
  ON public.payments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.client_access
      JOIN public.projects ON projects.client_id = client_access.client_record_id
      WHERE projects.id = payments.project_id
        AND client_access.user_id = auth.uid()
    )
  );
