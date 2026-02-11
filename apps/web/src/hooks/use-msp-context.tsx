'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ClientOrgData {
  id: string;
  name: string;
  domain: string | null;
}

interface MspContextState {
  isMspOrg: boolean;
  isViewingClient: boolean;
  currentClientOrg: ClientOrgData | null;
  availableClients: ClientOrgData[];
  switchToClient: (client: ClientOrgData) => void;
  switchToMspView: () => void;
  refreshClients: () => Promise<void>;
  loading: boolean;
}

const MspContext = createContext<MspContextState>({
  isMspOrg: false,
  isViewingClient: false,
  currentClientOrg: null,
  availableClients: [],
  switchToClient: () => {},
  switchToMspView: () => {},
  refreshClients: async () => {},
  loading: true,
});

const STORAGE_KEY = 'msp_client_context';

export function MspContextProvider({ children }: { children: ReactNode }) {
  const [isMspOrg, setIsMspOrg] = useState(false);
  const [currentClientOrg, setCurrentClientOrg] = useState<ClientOrgData | null>(null);
  const [availableClients, setAvailableClients] = useState<ClientOrgData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMspData = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    // Get user's organization
    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!userData?.organization_id) {
      setLoading(false);
      return;
    }

    // Check if org is MSP
    const { data: orgData } = await supabase
      .from('organizations')
      .select('organization_type')
      .eq('id', userData.organization_id)
      .single();

    const isMsp = orgData?.organization_type === 'msp';
    setIsMspOrg(isMsp);

    if (isMsp) {
      // Load available clients
      const { data: clients } = await supabase
        .from('organizations')
        .select('id, name, domain')
        .eq('parent_organization_id', userData.organization_id)
        .eq('organization_type', 'msp_client')
        .order('name');

      setAvailableClients(clients || []);

      // Check for stored client context
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          // Verify the stored client is still valid
          const validClient = (clients || []).find(c => c.id === data.id);
          if (validClient) {
            setCurrentClientOrg(validClient);
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMspData();

    // Listen for storage changes (from other tabs)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        if (e.newValue) {
          try {
            setCurrentClientOrg(JSON.parse(e.newValue));
          } catch {
            setCurrentClientOrg(null);
          }
        } else {
          setCurrentClientOrg(null);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const switchToClient = (client: ClientOrgData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(client));
    setCurrentClientOrg(client);
  };

  const switchToMspView = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentClientOrg(null);
  };

  const refreshClients = async () => {
    await loadMspData();
  };

  return (
    <MspContext.Provider
      value={{
        isMspOrg,
        isViewingClient: !!currentClientOrg,
        currentClientOrg,
        availableClients,
        switchToClient,
        switchToMspView,
        refreshClients,
        loading,
      }}
    >
      {children}
    </MspContext.Provider>
  );
}

export function useMspContext() {
  return useContext(MspContext);
}

// Get current client org ID for use in data fetching
// Returns null if not viewing a client (use user's own org)
export function getMspClientOrgId(): string | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored).id;
    } catch {
      return null;
    }
  }
  return null;
}
