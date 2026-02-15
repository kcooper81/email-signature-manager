'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Users, FileSignature } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSubscription, usePayGatesBypass } from '@/hooks/use-subscription';

export function UpgradeBanner() {
  const { plan } = useSubscription();
  const devBypass = usePayGatesBypass();

  if (devBypass || plan.id !== 'free') return null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 via-blue-50 to-cyan-50 p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-5 w-5 text-violet-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-violet-900">
              Unlock the full power of Siggly
            </h3>
            <p className="text-xs text-violet-700/70 mt-0.5">
              You&apos;re on the Free plan. Upgrade to Professional for unlimited everything.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              <span className="flex items-center gap-1 text-[11px] text-violet-600">
                <Users className="h-3 w-3" /> Unlimited users
              </span>
              <span className="flex items-center gap-1 text-[11px] text-violet-600">
                <FileSignature className="h-3 w-3" /> Unlimited templates
              </span>
              <span className="flex items-center gap-1 text-[11px] text-violet-600">
                <TrendingUp className="h-3 w-3" /> Full analytics
              </span>
            </div>
          </div>
        </div>
        <Link href="/settings/billing" className="flex-shrink-0">
          <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
            Upgrade — $1.50/user/mo
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
