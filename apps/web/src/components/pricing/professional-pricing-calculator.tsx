'use client';

import { useState } from 'react';

export function ProfessionalPricingCalculator() {
  const [teamSize, setTeamSize] = useState(10);
  // $1.50/user/month, 10-user minimum
  const billableUsers = Math.max(10, teamSize);
  const totalPrice = (billableUsers * 1.5).toFixed(2).replace(/\.00$/, '');

  return (
    <div>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl font-bold">$1.50</span>
        <span className="text-gray-500">/user/mo</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">10-user minimum ($15/mo)</p>

      {/* Quick Calculator */}
      <div className="mt-4 p-3 bg-violet-50 rounded-lg border border-violet-200">
        <p className="text-xs font-medium text-violet-900 mb-2">Quick calculator:</p>
        <div className="space-y-2">
          <input
            type="range"
            min="10"
            max="200"
            value={teamSize}
            onChange={(e) => setTeamSize(parseInt(e.target.value))}
            className="w-full h-2 bg-violet-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
          />
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">{teamSize} users</span>
            <span className="font-bold text-violet-600">${totalPrice}/mo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
