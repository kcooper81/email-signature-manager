'use client';

import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface EnsureUserState {
  isReady: boolean;
  organizationId: string | null;
  userId: string | null;
  error: string | null;
}

const EnsureUserContext = createContext<EnsureUserState>({
  isReady: false,
  organizationId: null,
  userId: null,
  error: null,
});

export function EnsureUserProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EnsureUserState>({
    isReady: false,
    organizationId: null,
    userId: null,
    error: null,
  });

  useEffect(() => {
    const ensureUser = async () => {
      try {
        const response = await fetch('/api/users/ensure', {
          method: 'POST',
        });

        if (!response.ok) {
          const data = await response.json();
          setState({
            isReady: true,
            organizationId: null,
            userId: null,
            error: data.error || 'Failed to initialize user',
          });
          return;
        }

        const data = await response.json();
        setState({
          isReady: true,
          organizationId: data.organizationId,
          userId: data.userId,
          error: null,
        });
      } catch (error) {
        console.error('Failed to ensure user:', error);
        setState({
          isReady: true,
          organizationId: null,
          userId: null,
          error: 'Failed to initialize user',
        });
      }
    };

    ensureUser();
  }, []);

  if (!state.isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    );
  }

  return (
    <EnsureUserContext.Provider value={state}>
      {children}
    </EnsureUserContext.Provider>
  );
}

export function useEnsureUser() {
  return useContext(EnsureUserContext);
}
