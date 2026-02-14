'use client';

import { useMspContext } from '@/hooks/use-msp-context';
import { Button } from '@/components/ui/button';
import { Building2, ArrowLeft, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function MspContextBanner() {
  const { isMspOrg, isViewingClient, currentClientOrg, availableClients, switchToClient, switchToMspView } = useMspContext();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!isMspOrg) return null;

  return (
    <div className={`relative z-50 px-4 py-2 flex items-center justify-between text-sm ${
      isViewingClient
        ? 'bg-amber-500 text-amber-950'
        : 'bg-violet-600 text-white'
    }`}>
      <div className="flex items-center gap-3">
        <Building2 className="h-4 w-4" />
        {isViewingClient ? (
          <span>
            <strong>Viewing:</strong> {currentClientOrg?.name}
            {currentClientOrg?.domain && (
              <span className="opacity-75 ml-1">({currentClientOrg.domain})</span>
            )}
          </span>
        ) : (
          <span>
            <strong>Partner Dashboard</strong>
            <span className="opacity-75 ml-2">• {availableClients.length} clients</span>
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isViewingClient ? (
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-amber-950 hover:bg-amber-400 hover:text-amber-950"
            onClick={switchToMspView}
          >
            <ArrowLeft className="h-3 w-3 mr-1" />
            Back to Partner View
          </Button>
        ) : (
          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-white hover:bg-violet-500"
              onClick={() => setShowDropdown(!showDropdown)}
              disabled={availableClients.length === 0}
            >
              Switch to Client
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>

            {showDropdown && availableClients.length > 0 && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowDropdown(false)} 
                />
                <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg border z-50 py-1 max-h-64 overflow-y-auto">
                  {availableClients.map((client) => (
                    <button
                      key={client.id}
                      className="w-full px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => {
                        switchToClient(client);
                        setShowDropdown(false);
                      }}
                    >
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{client.name}</div>
                        {client.domain && (
                          <div className="text-xs text-gray-500">{client.domain}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
