'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';

type Theme = 'light' | 'dark-blue' | 'charcoal';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: async () => {},
});

function applyThemeToDOM(theme: Theme) {
  document.documentElement.classList.remove('theme-dark-blue', 'theme-charcoal');
  if (theme === 'dark-blue') {
    document.documentElement.classList.add('theme-dark-blue');
  } else if (theme === 'charcoal') {
    document.documentElement.classList.add('theme-charcoal');
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  // On mount: apply localStorage theme immediately to prevent flash
  useEffect(() => {
    const stored = localStorage.getItem('siggly-theme') as Theme | null;
    if (stored && (stored === 'light' || stored === 'dark-blue' || stored === 'charcoal')) {
      setThemeState(stored);
      applyThemeToDOM(stored);
    }

    // Then fetch from DB as source of truth
    const syncFromDB = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('users')
        .select('theme')
        .eq('auth_id', user.id)
        .single();

      if (data?.theme) {
        const dbTheme = data.theme as Theme;
        if (dbTheme !== stored) {
          localStorage.setItem('siggly-theme', dbTheme);
          setThemeState(dbTheme);
          applyThemeToDOM(dbTheme);
        }
      }
    };

    syncFromDB();
  }, []);

  const setTheme = useCallback(async (newTheme: Theme) => {
    setThemeState(newTheme);
    applyThemeToDOM(newTheme);
    localStorage.setItem('siggly-theme', newTheme);

    // Persist to DB
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('users')
        .update({ theme: newTheme })
        .eq('auth_id', user.id);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
