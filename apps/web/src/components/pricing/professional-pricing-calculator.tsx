'use client';

import { useState } from 'react';

export function ProfessionalPricingCalculator() {
  const [teamSize, setTeamSize] = useState(10);
  // $29 base includes first 10 users, then $1/user for users beyond 10
  const totalPrice = teamSize <= 10 ? 29 : 29 + (teamSize - 10);

  return (
    <div>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl font-bold">$29</span>
        <span className="text-gray-500">/mo</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">for up to 10 users, then $1/user</p>
      
      {/* Quick Calculator */}
      <div className="mt-4 p-3 bg-violet-50 rounded-lg border border-violet-200">
        <p className="text-xs font-medium text-violet-900 mb-2">Quick calculator:</p>
        <div className="space-y-2">
          <input
            type="range"
            min="1"
            max="100"
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
