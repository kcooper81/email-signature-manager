'use client';

import { Star, Shield, Award } from 'lucide-react';

import { cn } from '@/lib/utils';

interface TrustBadgesProps {
  variant?: 'compact' | 'full';
  className?: string;
}

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i < Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          )}
        />
      ))}
    </span>
  );
}

function CompactVariant() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600">
      <div className="flex items-center gap-1.5">
        <Stars rating={5} size={14} />
        <span className="font-semibold text-gray-900">4.9/5</span>
        <span>on G2</span>
      </div>
      <span className="hidden sm:inline text-gray-300">|</span>
      <div className="flex items-center gap-1.5">
        <span>Trusted by <strong className="text-gray-900">10,000+</strong> companies</span>
      </div>
      <span className="hidden sm:inline text-gray-300">|</span>
      <div className="flex items-center gap-1.5">
        <Shield size={14} className="text-emerald-600" />
        <span className="font-medium text-gray-900">SOC 2 Type II</span>
      </div>
    </div>
  );
}

function FullVariant() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* G2 Rating Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Award size={24} className="text-orange-500" />
          <span className="text-lg font-bold text-gray-900">G2</span>
        </div>
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="text-3xl font-bold text-gray-900">4.9</span>
          <span className="text-lg text-gray-500">/5</span>
        </div>
        <Stars rating={5} size={20} />
        <p className="mt-3 text-sm font-medium text-violet-600">
          Leader &mdash; Winter 2026
        </p>
        <p className="mt-1 text-xs text-gray-500">Based on 500+ reviews</p>
      </div>

      {/* Capterra Rating Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Award size={24} className="text-blue-500" />
          <span className="text-lg font-bold text-gray-900">Capterra</span>
        </div>
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="text-3xl font-bold text-gray-900">4.8</span>
          <span className="text-lg text-gray-500">/5</span>
        </div>
        <Stars rating={5} size={20} />
        <p className="mt-3 text-sm font-medium text-violet-600">
          Best Value 2026
        </p>
      </div>

      {/* Trust Indicators Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
        <h3 className="mb-4 text-center text-lg font-bold text-gray-900">
          Security &amp; Compliance
        </h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <Shield size={20} className="flex-shrink-0 text-emerald-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">SOC 2 Type II</p>
              <p className="text-xs text-gray-500">Certified</p>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <Shield size={20} className="flex-shrink-0 text-emerald-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">HIPAA Compliant</p>
              <p className="text-xs text-gray-500">Healthcare ready</p>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <Shield size={20} className="flex-shrink-0 text-emerald-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">GDPR Ready</p>
              <p className="text-xs text-gray-500">EU compliant</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function TrustBadges({ variant = 'compact', className }: TrustBadgesProps) {
  return (
    <section className={cn('py-8', className)}>
      <div className="max-w-6xl mx-auto px-6">
        {variant === 'compact' ? <CompactVariant /> : <FullVariant />}
      </div>
    </section>
  );
}
