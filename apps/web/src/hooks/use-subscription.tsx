'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getPlan, canAccessFeature, isWithinLimit, Plan, PlanFeatures } from '@/lib/billing/plans';

// Development toggle - set to true to bypass all pay gates during development
const DEV_BYPASS_PAY_GATES = process.env.NEXT_PUBLIC_BYPASS_PAY_GATES === 'true';

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
  canAccess: () => DEV_BYPASS_PAY_GATES,
  isWithinTemplateLimit: () => DEV_BYPASS_PAY_GATES,
  isWithinTeamMemberLimit: () => DEV_BYPASS_PAY_GATES,
  canCreateTemplate: () => DEV_BYPASS_PAY_GATES,
  canAddTeamMember: () => DEV_BYPASS_PAY_GATES,
  refresh: async () => {},
};

const SubscriptionContext = createContext<SubscriptionState>(defaultState);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SubscriptionState>(defaultState);

  const loadSubscription = async () => {
    const supabase = createClient();
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setState(prev => ({ ...prev, isLoading: false, status: 'active' }));
      return;
    }

    // Get user's organization
    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.organization_id) {
      setState(prev => ({ ...prev, isLoading: false, status: 'active' }));
      return;
    }

    // Get subscription
    const { data: subData } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('organization_id', userData.organization_id)
      .single();

    const planId = subData?.plan || 'free';
    const plan = getPlan(planId);
    const status = subData?.status || 'active';

    // Get usage counts
    const { count: templateCount } = await supabase
      .from('signature_templates')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', userData.organization_id);

    const { count: teamMemberCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', userData.organization_id);

    const usage = {
      templateCount: templateCount || 0,
      teamMemberCount: teamMemberCount || 0,
    };

    const limits = {
      maxTemplates: plan.features.maxTemplates,
      maxTeamMembers: plan.features.maxUsers,
    };

    // Create helper functions with dev bypass
    const canAccess = (feature: keyof PlanFeatures): boolean => {
      if (DEV_BYPASS_PAY_GATES) return true;
      return canAccessFeature(planId, feature);
    };

    const isWithinTemplateLimit = (): boolean => {
      if (DEV_BYPASS_PAY_GATES) return true;
      return isWithinLimit(planId, 'maxTemplates', usage.templateCount);
    };

    const isWithinTeamMemberLimit = (): boolean => {
      if (DEV_BYPASS_PAY_GATES) return true;
      return isWithinLimit(planId, 'maxUsers', usage.teamMemberCount);
    };

    const canCreateTemplate = (): boolean => {
      if (DEV_BYPASS_PAY_GATES) return true;
      // Can create if within limit (current count < max)
      if (limits.maxTemplates === -1) return true;
      return usage.templateCount < limits.maxTemplates;
    };

    const canAddTeamMember = (): boolean => {
      if (DEV_BYPASS_PAY_GATES) return true;
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
  return DEV_BYPASS_PAY_GATES;
}
