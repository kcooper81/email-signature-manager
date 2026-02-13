'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { OrganizationBranding } from '@/lib/db/schema';

// Default Siggly branding
const DEFAULT_BRANDING: OrganizationBranding = {
  primaryColor: '#0066cc',
  secondaryColor: '#f8fafc',
  accentColor: '#10b981',
  companyName: 'Siggly',
  hideSigglyBranding: false,
  hideHelpLinks: false,
};

interface BrandingContextType {
  branding: OrganizationBranding;
  mspOrgId: string | null;
  mspOrgName: string | null;
  mspOrgType: string | null;
  isWhiteLabeled: boolean;
  cssVariables: Record<string, string>;
}

const BrandingContext = createContext<BrandingContextType>({
  branding: DEFAULT_BRANDING,
  mspOrgId: null,
  mspOrgName: null,
  mspOrgType: null,
  isWhiteLabeled: false,
  cssVariables: {},
});

export function useBranding() {
  return useContext(BrandingContext);
}

// Convert hex color to HSL for Tailwind CSS variable compatibility
function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0% 0%';

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// Generate CSS variables from branding
// These override the default Tailwind CSS variables used throughout the app
function generateCssVariables(branding: OrganizationBranding): Record<string, string> {
  const vars: Record<string, string> = {};

  if (branding.primaryColor) {
    // Set both custom brand variables and override Tailwind's --primary
    vars['--brand-primary'] = branding.primaryColor;
    vars['--brand-primary-hsl'] = hexToHsl(branding.primaryColor);
    // Override Tailwind's primary color (used by buttons, links, etc.)
    vars['--primary'] = hexToHsl(branding.primaryColor);
    vars['--ring'] = hexToHsl(branding.primaryColor);
  }

  if (branding.secondaryColor) {
    vars['--brand-secondary'] = branding.secondaryColor;
    vars['--brand-secondary-hsl'] = hexToHsl(branding.secondaryColor);
    // Override Tailwind's secondary color
    vars['--secondary'] = hexToHsl(branding.secondaryColor);
  }

  if (branding.accentColor) {
    vars['--brand-accent'] = branding.accentColor;
    vars['--brand-accent-hsl'] = hexToHsl(branding.accentColor);
    // Override Tailwind's accent color
    vars['--accent'] = hexToHsl(branding.accentColor);
  }

  return vars;
}

interface BrandingProviderProps {
  children: React.ReactNode;
  initialBranding?: OrganizationBranding;
  mspOrgId?: string | null;
  mspOrgName?: string | null;
  mspOrgType?: string | null;
}

export function BrandingProvider({
  children,
  initialBranding,
  mspOrgId = null,
  mspOrgName = null,
  mspOrgType = null,
}: BrandingProviderProps) {
  const [branding, setBranding] = useState<OrganizationBranding>(
    initialBranding ? { ...DEFAULT_BRANDING, ...initialBranding } : DEFAULT_BRANDING
  );

  const isWhiteLabeled = Boolean(mspOrgId && branding.hideSigglyBranding);
  
  // Generate CSS variables for all users to ensure consistent branding
  // MSP partners can customize these, regular users get default Siggly branding
  const cssVariables = generateCssVariables(branding);

  // Apply CSS variables to document root (only for MSP-branded experiences)
  useEffect(() => {
    const root = document.documentElement;
    const appliedVars: string[] = [];
    
    Object.entries(cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
      appliedVars.push(key);
    });

    // Cleanup: remove applied CSS variables when unmounting or when mspOrgId changes
    return () => {
      appliedVars.forEach((key) => {
        root.style.removeProperty(key);
      });
    };
  }, [cssVariables]);

  // Apply custom CSS if provided (premium feature)
  useEffect(() => {
    if (branding.customCss) {
      const styleId = 'msp-custom-css';
      let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = branding.customCss;
    }

    // Update favicon if provided
    if (branding.faviconUrl) {
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = branding.faviconUrl;
      document.head.appendChild(link);
    }

    // Update document title if company name is provided
    if (mspOrgId && branding.companyName && branding.companyName !== 'Siggly') {
      const originalTitle = document.title;
      if (originalTitle.includes('Siggly')) {
        document.title = originalTitle.replace('Siggly', branding.companyName);
      }
    }
  }, [mspOrgId, branding]);

  return (
    <BrandingContext.Provider
      value={{
        branding,
        mspOrgId,
        mspOrgName,
        mspOrgType,
        isWhiteLabeled,
        cssVariables,
      }}
    >
      {children}
    </BrandingContext.Provider>
  );
}

// Component to show "Powered by Siggly" footer (hidden when white-labeled)
export function PoweredBySiggly() {
  const { isWhiteLabeled } = useBranding();

  if (isWhiteLabeled) {
    return null;
  }

  return (
    <div className="text-center text-xs text-muted-foreground py-4">
      Powered by{' '}
      <a
        href="https://siggly.io"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        Siggly
      </a>
    </div>
  );
}

// Component to render the brand logo
export function BrandLogo({ className = '', size = 'default' }: { className?: string; size?: 'small' | 'default' | 'large' }) {
  const { branding, mspOrgName } = useBranding();

  const sizeClasses = {
    small: 'h-6',
    default: 'h-8',
    large: 'h-12',
  };

  const logoUrl = branding.logoUrl;
  const companyName = branding.companyName || mspOrgName || 'Siggly';

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={companyName}
        className={`${sizeClasses[size]} w-auto object-contain ${className}`}
      />
    );
  }

  // Fallback to text logo
  return (
    <span className={`font-bold text-xl ${className}`} style={{ color: branding.primaryColor }}>
      {companyName}
    </span>
  );
}

// Hook to get support contact info (uses MSP's custom support if set)
export function useSupportInfo() {
  const { branding } = useBranding();

  return {
    email: branding.supportEmail || 'support@siggly.io',
    url: branding.supportUrl || 'https://siggly.io/help',
    showSigglyHelp: !branding.hideHelpLinks,
  };
}
