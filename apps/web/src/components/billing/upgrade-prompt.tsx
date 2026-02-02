'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, X, Lock, ArrowRight } from 'lucide-react';
import { useSubscription, usePayGatesBypass } from '@/hooks/use-subscription';
import { PLANS } from '@/lib/billing/plans';

interface UpgradePromptProps {
  feature: string;
  requiredPlan: 'starter' | 'professional' | 'enterprise';
  title?: string;
  description?: string;
  inline?: boolean;
  onClose?: () => void;
}

export function UpgradePrompt({
  feature,
  requiredPlan,
  title,
  description,
  inline = false,
  onClose,
}: UpgradePromptProps) {
  const { planId } = useSubscription();
  const devBypass = usePayGatesBypass();
  const [dismissed, setDismissed] = useState(false);

  // Don't show if dev bypass is enabled
  if (devBypass) {
    return null;
  }

  if (dismissed) {
    return null;
  }

  const plan = PLANS[requiredPlan];
  const defaultTitle = `Upgrade to ${plan.name}`;
  const defaultDescription = `${feature} is available on the ${plan.name} plan and above.`;

  if (inline) {
    return (
      <div className="flex items-center gap-3 p-3 bg-violet-50 border border-violet-200 rounded-lg">
        <Lock className="h-4 w-4 text-violet-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-violet-900">
            {description || defaultDescription}
          </p>
        </div>
        <Link href="/settings/billing">
          <Button size="sm" variant="default" className="flex-shrink-0">
            Upgrade
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-violet-100 rounded-lg">
              <Sparkles className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{title || defaultTitle}</CardTitle>
              <CardDescription>{description || defaultDescription}</CardDescription>
            </div>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => {
                setDismissed(true);
                onClose();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Link href="/settings/billing" className="flex-1">
            <Button className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              Upgrade to {plan.name}
            </Button>
          </Link>
          <Badge variant="secondary" className="text-xs">
            From ${plan.pricePerUser / 100}/member/mo
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

interface FeatureGateProps {
  feature: keyof typeof featureRequirements;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const featureRequirements = {
  analytics: 'starter',
  microsoft365: 'starter',
  scheduledDeployments: 'professional',
  apiAccess: 'professional',
  sso: 'enterprise',
  whiteLabel: 'enterprise',
} as const;

export function FeatureGate({ feature, children, fallback }: FeatureGateProps) {
  const { canAccess } = useSubscription();
  const devBypass = usePayGatesBypass();

  const hasAccess = devBypass || canAccess(feature);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <UpgradePrompt
      feature={feature}
      requiredPlan={featureRequirements[feature]}
      inline
    />
  );
}

interface LimitGateProps {
  type: 'template' | 'teamMember';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LimitGate({ type, children, fallback }: LimitGateProps) {
  const { canCreateTemplate, canAddTeamMember, plan, usage, limits } = useSubscription();
  const devBypass = usePayGatesBypass();

  const isWithinLimit = devBypass || (type === 'template' ? canCreateTemplate() : canAddTeamMember());

  if (isWithinLimit) {
    return <>{children}</>;
  }

  const limitInfo = type === 'template'
    ? { current: usage.templateCount, max: limits.maxTemplates, name: 'templates' }
    : { current: usage.teamMemberCount, max: limits.maxTeamMembers, name: 'team members' };

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <UpgradePrompt
      feature={`More ${limitInfo.name}`}
      requiredPlan="starter"
      title={`${limitInfo.name.charAt(0).toUpperCase() + limitInfo.name.slice(1)} limit reached`}
      description={`You've used ${limitInfo.current} of ${limitInfo.max} ${limitInfo.name} on the ${plan.name} plan. Upgrade to add more.`}
    />
  );
}
