-- =============================================================
-- RLS Security Migration: Enable RLS on all 15 unprotected tables
-- =============================================================
-- IMPORTANT: Deploy code changes (Part A) BEFORE running this migration.
-- The following routes now use createServiceClient() to bypass RLS:
--   - /api/track/click
--   - /api/newsletter/subscribe
--   - /api/users/ensure (subscription INSERT only)
--   - /api/msp/clients (subscription INSERT only)
-- =============================================================

-- -----------------------------------------------
-- Helper functions
-- -----------------------------------------------

CREATE OR REPLACE FUNCTION public.get_user_org_id()
RETURNS uuid LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT organization_id FROM public.users WHERE auth_id = auth.uid()::text LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT COALESCE(
    (SELECT is_super_admin FROM public.users WHERE auth_id = auth.uid()::text LIMIT 1),
    false
  );
$$;

REVOKE EXECUTE ON FUNCTION public.get_user_org_id() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_user_org_id() TO authenticated;
REVOKE EXECUTE ON FUNCTION public.is_super_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;


-- -----------------------------------------------
-- organizations
-- -----------------------------------------------

DROP POLICY IF EXISTS "Users can update their organization" ON public.organizations;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "org_select_own" ON public.organizations FOR SELECT TO authenticated
  USING (id = public.get_user_org_id());
CREATE POLICY "org_select_msp_children" ON public.organizations FOR SELECT TO authenticated
  USING (parent_organization_id = public.get_user_org_id());
CREATE POLICY "org_select_super_admin" ON public.organizations FOR SELECT TO authenticated
  USING (public.is_super_admin());
CREATE POLICY "org_select_anon_subdomain" ON public.organizations FOR SELECT TO anon
  USING (custom_subdomain IS NOT NULL);
CREATE POLICY "org_insert_authenticated" ON public.organizations FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE POLICY "org_update_own_admin" ON public.organizations FOR UPDATE TO authenticated
  USING (id = public.get_user_org_id() AND EXISTS (
    SELECT 1 FROM public.users WHERE auth_id = auth.uid()::text AND role IN ('owner','admin')
  ));
CREATE POLICY "org_update_super_admin" ON public.organizations FOR UPDATE TO authenticated
  USING (public.is_super_admin());


-- -----------------------------------------------
-- provider_connections (CRITICAL — has OAuth tokens)
-- -----------------------------------------------

ALTER TABLE public.provider_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pc_select_own" ON public.provider_connections FOR SELECT TO authenticated
  USING (organization_id = public.get_user_org_id());
CREATE POLICY "pc_insert_own" ON public.provider_connections FOR INSERT TO authenticated
  WITH CHECK (organization_id = public.get_user_org_id());
CREATE POLICY "pc_update_own" ON public.provider_connections FOR UPDATE TO authenticated
  USING (organization_id = public.get_user_org_id());
CREATE POLICY "pc_delete_own" ON public.provider_connections FOR DELETE TO authenticated
  USING (organization_id = public.get_user_org_id());


-- -----------------------------------------------
-- subscriptions
-- -----------------------------------------------

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sub_select_own" ON public.subscriptions FOR SELECT TO authenticated
  USING (organization_id = public.get_user_org_id());
CREATE POLICY "sub_select_msp_children" ON public.subscriptions FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.organizations
    WHERE organizations.id = subscriptions.organization_id
    AND organizations.parent_organization_id = public.get_user_org_id()
  ));
CREATE POLICY "sub_select_super_admin" ON public.subscriptions FOR SELECT TO authenticated
  USING (public.is_super_admin());
CREATE POLICY "sub_insert_own" ON public.subscriptions FOR INSERT TO authenticated
  WITH CHECK (organization_id = public.get_user_org_id());
CREATE POLICY "sub_update_own" ON public.subscriptions FOR UPDATE TO authenticated
  USING (organization_id = public.get_user_org_id());
CREATE POLICY "sub_update_super_admin" ON public.subscriptions FOR UPDATE TO authenticated
  USING (public.is_super_admin());


-- -----------------------------------------------
-- job_logs
-- -----------------------------------------------

ALTER TABLE public.job_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "jl_select_super_admin" ON public.job_logs FOR SELECT TO authenticated
  USING (public.is_super_admin());
CREATE POLICY "jl_update_super_admin" ON public.job_logs FOR UPDATE TO authenticated
  USING (public.is_super_admin());


-- -----------------------------------------------
-- audit_logs
-- -----------------------------------------------

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "al_select_own" ON public.audit_logs FOR SELECT TO authenticated
  USING (organization_id = public.get_user_org_id());
CREATE POLICY "al_select_msp_children" ON public.audit_logs FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.organizations
    WHERE organizations.id = audit_logs.organization_id
    AND organizations.parent_organization_id = public.get_user_org_id()
  ));
CREATE POLICY "al_select_super_admin" ON public.audit_logs FOR SELECT TO authenticated
  USING (public.is_super_admin());
CREATE POLICY "al_insert_own" ON public.audit_logs FOR INSERT TO authenticated
  WITH CHECK (organization_id = public.get_user_org_id());


-- -----------------------------------------------
-- signature_clicks
-- -----------------------------------------------

ALTER TABLE public.signature_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sc_select_own" ON public.signature_clicks FOR SELECT TO authenticated
  USING (organization_id = public.get_user_org_id());
CREATE POLICY "sc_select_msp_children" ON public.signature_clicks FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.organizations
    WHERE organizations.id = signature_clicks.organization_id
    AND organizations.parent_organization_id = public.get_user_org_id()
  ));
CREATE POLICY "sc_select_super_admin" ON public.signature_clicks FOR SELECT TO authenticated
  USING (public.is_super_admin());


-- -----------------------------------------------
-- signature_impressions
-- -----------------------------------------------

ALTER TABLE public.signature_impressions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "si_select_own" ON public.signature_impressions FOR SELECT TO authenticated
  USING (organization_id = public.get_user_org_id());
CREATE POLICY "si_select_super_admin" ON public.signature_impressions FOR SELECT TO authenticated
  USING (public.is_super_admin());


-- -----------------------------------------------
-- email_subscribers (service role only — no policies needed)
-- -----------------------------------------------

ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;


-- -----------------------------------------------
-- roles, permissions, role_permissions (read-only lookup)
-- -----------------------------------------------

ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "roles_select" ON public.roles FOR SELECT TO authenticated USING (true);

ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "permissions_select" ON public.permissions FOR SELECT TO authenticated USING (true);

ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rp_select" ON public.role_permissions FOR SELECT TO authenticated USING (true);


-- -----------------------------------------------
-- user_roles
-- -----------------------------------------------

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ur_select_own" ON public.user_roles FOR SELECT TO authenticated
  USING (organization_id = public.get_user_org_id());
CREATE POLICY "ur_insert_own_admin" ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (organization_id = public.get_user_org_id() AND EXISTS (
    SELECT 1 FROM public.users WHERE auth_id = auth.uid()::text AND role IN ('owner','admin')
  ));
CREATE POLICY "ur_delete_own_admin" ON public.user_roles FOR DELETE TO authenticated
  USING (organization_id = public.get_user_org_id() AND EXISTS (
    SELECT 1 FROM public.users WHERE auth_id = auth.uid()::text AND role IN ('owner','admin')
  ));


-- -----------------------------------------------
-- disclaimer_templates
-- -----------------------------------------------

ALTER TABLE public.disclaimer_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "dt_select" ON public.disclaimer_templates FOR SELECT TO authenticated
  USING (organization_id = public.get_user_org_id() OR is_system = true);
CREATE POLICY "dt_insert_own" ON public.disclaimer_templates FOR INSERT TO authenticated
  WITH CHECK (organization_id = public.get_user_org_id() AND is_system = false);
CREATE POLICY "dt_update_own" ON public.disclaimer_templates FOR UPDATE TO authenticated
  USING (organization_id = public.get_user_org_id() AND is_system = false);
CREATE POLICY "dt_delete_own" ON public.disclaimer_templates FOR DELETE TO authenticated
  USING (organization_id = public.get_user_org_id() AND is_system = false);


-- -----------------------------------------------
-- signature_rules
-- -----------------------------------------------

ALTER TABLE public.signature_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sr_select_own" ON public.signature_rules FOR SELECT TO authenticated
  USING (organization_id = public.get_user_org_id());
CREATE POLICY "sr_insert_own" ON public.signature_rules FOR INSERT TO authenticated
  WITH CHECK (organization_id = public.get_user_org_id());
CREATE POLICY "sr_update_own" ON public.signature_rules FOR UPDATE TO authenticated
  USING (organization_id = public.get_user_org_id());
CREATE POLICY "sr_delete_own" ON public.signature_rules FOR DELETE TO authenticated
  USING (organization_id = public.get_user_org_id());
