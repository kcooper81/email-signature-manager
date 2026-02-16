'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getPlan, canAccessFeature, isWithinLimit, Plan, PlanFeatures } from '@/lib/billing/plans';
import { getImpersonatedOrgId } from '@/hooks/use-impersonation';

// Development toggle - set to true to bypass all pay gates during development
// localStorage takes precedence over env var when explicitly set
const getDevBypassEnabled = () => {
  if (typeof window === 'undefined') return process.env.NEXT_PUBLIC_BYPASS_PAY_GATES === 'true';
  
  const localStorageValue = localStorage.getItem('dev_bypass_pay_gates');
  // If localStorage has explicit value, use it; otherwise fall back to env var
  if (localStorageValue !== null) {
    return localStorageValue === 'true';
  }
  return process.env.NEXT_PUBLIC_BYPASS_PAY_GATES === 'true';
};

interface SubscriptionState {
  plan: Plan;
  planId: string;
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'loading';
  isLoading: boolean;
  usage: {
    templateCount: number;
    teamMemberCount: number;
  };
  limits: {
    maxTemplates: number;
    maxTeamMembers: number;
  };
  // Helper functions
  canAccess: (feature: keyof PlanFeatures) => boolean;
  isWithinTemplateLimit: () => boolean;
  isWithinTeamMemberLimit: () => boolean;
  canCreateTemplate: () => boolean;
  canAddTeamMember: () => boolean;
  refresh: () => Promise<void>;
}

const defaultState: SubscriptionState = {
  plan: getPlan('free'),
  planId: 'free',
  status: 'loading',
  isLoading: true,
  usage: {
    templateCount: 0,
    teamMemberCount: 0,
  },
  limits: {
    maxTemplates: 1,
    maxTeamMembers: 5,
  },
  canAccess: () => getDevBypassEnabled(),
  isWithinTemplateLimit: () => getDevBypassEnabled(),
  isWithinTeamMemberLimit: () => getDevBypassEnabled(),
  canCreateTemplate: () => getDevBypassEnabled(),
  canAddTeamMember: () => getDevBypassEnabled(),
  refresh: async () => {},
};

const SubscriptionContext = createContext<SubscriptionState>(defaultState);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SubscriptionState>(defaultState);
  const [bypassState, setBypassState] = useState(getDevBypassEnabled());

  const loadSubscription = async () => {
    const supabase = createClient();
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setState(prev => ({ ...prev, isLoading: false, status: 'active' }));
      return;
    }

    // Check for impersonation (admin viewing as customer)
    const impersonatedOrgId = getImpersonatedOrgId();

    // Get user's organization and super admin status
    let organizationId: string | null = impersonatedOrgId;
    let isSuperAdmin = false;

    if (!organizationId) {
      const { data: userData } = await supabase
        .from('users')
        .select('organization_id, is_super_admin')
        .eq('auth_id', user.id)
        .single();

      organizationId = userData?.organization_id || null;
      isSuperAdmin = userData?.is_super_admin === true;
    } else {
      // Even with impersonation, check super admin status
      const { data: userData } = await supabase
        .from('users')
        .select('is_super_admin')
        .eq('auth_id', user.id)
        .single();
      isSuperAdmin = userData?.is_super_admin === true;
    }

    if (!organizationId) {
      setState(prev => ({ ...prev, isLoading: false, status: 'active' }));
      return;
    }

    // Get subscription
    const { data: subData } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('organization_id', organizationId)
      .maybeSingle();

    const planId = subData?.plan || 'free';
    const plan = getPlan(planId);
    const status = subData?.status || 'active';

    // Get usage counts
    const { count: templateCount } = await supabase
      .from('signature_templates')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', organizationId);

    const { count: teamMemberCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', organizationId);

    const usage = {
      templateCount: templateCount || 0,
      teamMemberCount: teamMemberCount || 0,
    };

    const limits = {
      maxTemplates: plan.features.maxTemplates,
      maxTeamMembers: plan.features.maxUsers,
    };

    // Create helper functions with dev bypass and super admin bypass
    const shouldBypass = getDevBypassEnabled() || isSuperAdmin;

    const canAccess = (feature: keyof PlanFeatures): boolean => {
      if (shouldBypass) return true;
      return canAccessFeature(planId, feature);
    };

    const isWithinTemplateLimit = (): boolean => {
      if (shouldBypass) return true;
      return isWithinLimit(planId, 'maxTemplates', usage.templateCount);
    };

    const isWithinTeamMemberLimit = (): boolean => {
      if (shouldBypass) return true;
      return isWithinLimit(planId, 'maxUsers', usage.teamMemberCount);
    };

    const canCreateTemplate = (): boolean => {
      if (shouldBypass) return true;
      // Can create if within limit (current count < max)
      if (limits.maxTemplates === -1) return true;
      return usage.templateCount < limits.maxTemplates;
    };

    const canAddTeamMember = (): boolean => {
      if (shouldBypass) return true;
      // Can add if within limit
      if (limits.maxTeamMembers === -1) return true;
      return usage.teamMemberCount < limits.maxTeamMembers;
    };

    setState({
      plan,
      planId,
      status: status as SubscriptionState['status'],
      isLoading: false,
      usage,
      limits,
      canAccess,
      isWithinTemplateLimit,
      isWithinTeamMemberLimit,
      canCreateTemplate,
      canAddTeamMember,
      refresh: loadSubscription,
    });
  };

  useEffect(() => {
    loadSubscription();
  }, []);

  // Reload subscription when dev bypass changes
  useEffect(() => {
    const checkBypass = () => {
      const currentBypass = getDevBypassEnabled();
      if (currentBypass !== bypassState) {
        setBypassState(currentBypass);
        loadSubscription();
      }
    };

    // Check on interval (since we can't listen to localStorage changes from same tab)
    const interval = setInterval(checkBypass, 500);
    return () => clearInterval(interval);
  }, [bypassState]);

  return (
    <SubscriptionContext.Provider value={state}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

// Utility hook for checking if pay gates are bypassed (for dev UI indicators)
export function usePayGatesBypass() {
  return getDevBypassEnabled();
}
