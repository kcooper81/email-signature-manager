# Branding Color System

## Overview

The app uses a dynamic branding system that allows MSP partners to customize colors. All colors should use CSS variables or Tailwind's semantic color classes to respect branding settings.

## How It Works

1. **BrandingProvider** (`src/lib/branding/branding-context.tsx`) sets CSS variables on the document root
2. **CSS Variables** are set for all users (not just MSP partners):
   - `--brand-primary` - Primary brand color (hex)
   - `--brand-primary-hsl` - Primary color in HSL format
   - `--primary` - Tailwind's primary color (overridden with brand color)
   - `--brand-accent` - Accent color
   - `--brand-secondary` - Secondary color
   - `--ring` - Focus ring color (matches primary)

3. **Tailwind Classes** automatically use these variables:
   - `bg-primary` → Uses `--primary` CSS variable
   - `text-primary` → Uses `--primary` CSS variable
   - `border-primary` → Uses `--primary` CSS variable

## Usage Guidelines

### ✅ DO Use These

**Tailwind Semantic Classes:**
```tsx
<button className="bg-primary text-primary-foreground">Click me</button>
<div className="border-primary text-primary">Content</div>
<a className="text-primary hover:text-primary/80">Link</a>
```

**CSS Variables in Inline Styles:**
```tsx
<div style={{ background: 'var(--brand-primary, #0066cc)' }}>
<div style={{ background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))' }}>
```

**Brand Color Utilities:**
```tsx
import { getBrandGradient, getPrimaryColor } from '@/lib/branding/brand-colors';

<div style={{ background: getBrandGradient('135deg') }}>
<span style={{ color: getPrimaryColor() }}>
```

### ❌ DON'T Use These

**Hardcoded Hex Colors:**
```tsx
// Bad
<div style={{ background: '#7c3aed' }}>
<div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)' }}>
```

**Hardcoded Tailwind Purple Classes:**
```tsx
// Bad
<button className="bg-purple-600 text-white">
<div className="border-violet-500">
```

## Migration Checklist

### High Priority (User-Facing)

- [ ] Email templates (`src/lib/email/resend.ts`) - Replace gradient backgrounds
- [ ] Marketing pages (`src/app/(marketing)/*`) - Replace purple classes
- [ ] Dashboard header (`src/components/dashboard/header.tsx`) - Replace brand colors
- [ ] Marketing header (`src/components/marketing/header.tsx`) - Replace brand colors
- [ ] Hero sections - Replace gradient backgrounds
- [ ] CTA buttons - Use `bg-primary` instead of `bg-purple-600`

### Medium Priority

- [ ] Dashboard pages - Replace purple badges and accents
- [ ] Settings pages - Replace purple highlights
- [ ] Analytics charts - Use brand colors
- [ ] Modal headers - Replace gradient backgrounds

### Low Priority

- [ ] Blog posts - Replace purple accents
- [ ] Help pages - Replace purple highlights
- [ ] Admin pages - Replace purple indicators

## Common Replacements

| Old (Hardcoded) | New (Dynamic) |
|----------------|---------------|
| `bg-purple-600` | `bg-primary` |
| `text-purple-600` | `text-primary` |
| `border-purple-600` | `border-primary` |
| `hover:bg-purple-700` | `hover:bg-primary/90` |
| `bg-violet-500` | `bg-primary` |
| `linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)` | `linear-gradient(135deg, var(--brand-primary), var(--brand-accent))` |
| `#7c3aed` | `var(--brand-primary, #0066cc)` |
| `#2563eb` | `var(--brand-accent, #10b981)` |

## Testing

1. **Default Branding**: Visit app normally - should see default Siggly colors
2. **Custom Branding**: 
   - Go to Settings → Branding (as MSP partner)
   - Change primary color to red (#ff0000)
   - Verify buttons, links, and gradients update to red
3. **Partner Subdomain**: Visit `partner.siggly.io` - should see partner's custom colors

## Files Modified

- ✅ `src/lib/branding/branding-context.tsx` - Apply CSS variables globally
- ✅ `src/lib/branding/brand-colors.ts` - Utility functions for brand colors
- ⏳ Email templates need gradient replacement
- ⏳ Marketing pages need class replacement
- ⏳ Dashboard components need class replacement
