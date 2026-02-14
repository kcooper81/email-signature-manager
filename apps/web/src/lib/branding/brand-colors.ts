/**
 * Brand color utilities for consistent theming throughout the app
 * These use CSS variables that are set by the BrandingProvider
 */

/**
 * Get a gradient background style using brand colors
 * Replaces hardcoded purple/blue gradients with dynamic brand colors
 */
export function getBrandGradient(direction: string = '135deg'): string {
  return `linear-gradient(${direction}, var(--brand-primary, #7c3aed), var(--brand-accent, #2563eb))`;
}

/**
 * Get inline styles for brand gradient backgrounds
 */
export function getBrandGradientStyle(direction: string = '135deg'): React.CSSProperties {
  return {
    background: getBrandGradient(direction),
  };
}

/**
 * Get the primary brand color as a CSS variable
 */
export function getPrimaryColor(): string {
  return 'var(--brand-primary, #4d52de)';
}

/**
 * Get the accent brand color as a CSS variable
 */
export function getAccentColor(): string {
  return 'var(--brand-accent, #10b981)';
}

/**
 * Get the secondary brand color as a CSS variable
 */
export function getSecondaryColor(): string {
  return 'var(--brand-secondary, #f8fafc)';
}

/**
 * Tailwind classes that use brand colors via CSS variables
 * Use these instead of hardcoded purple-* classes
 */
export const brandClasses = {
  // Text colors
  textPrimary: 'text-primary',
  textPrimaryForeground: 'text-primary-foreground',
  
  // Background colors
  bgPrimary: 'bg-primary',
  bgPrimaryForeground: 'bg-primary-foreground',
  bgSecondary: 'bg-secondary',
  bgAccent: 'bg-accent',
  
  // Border colors
  borderPrimary: 'border-primary',
  
  // Hover states
  hoverBgPrimary: 'hover:bg-primary',
  hoverTextPrimary: 'hover:text-primary',
  
  // Focus states
  focusRingPrimary: 'focus:ring-primary',
  
  // Gradient backgrounds (use with arbitrary values)
  gradientFrom: 'from-primary',
  gradientTo: 'to-accent',
};
