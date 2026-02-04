# Theming System

## Overview
The dashboard application features a comprehensive 3-theme system that provides users with Light, Dark Blue, and Charcoal theme options. All themes are fully implemented across the entire dashboard with proper visual hierarchy and professional styling.

## Available Themes

### 1. Light Theme (Default)
- **Background**: Cyan-tinted light gray (`210 20% 97%`) - similar to slate-100
- **Cards**: Pure white with subtle shadows
- **Header**: Dark slate-900 with white text
- **Use Case**: Clean, professional daytime interface

### 2. Dark Blue Theme
- **Background**: Deep blue-violet (`235 45% 8%`)
- **Cards**: Lighter blue-charcoal (`230 35% 17%`)
- **Header**: Dark slate-900 (consistent across themes)
- **Primary**: Violet accent (`263 70% 60%`)
- **Use Case**: Professional dark mode with blue tones

### 3. Charcoal Theme
- **Background**: Warm charcoal with subtle undertone (`280 8% 6%`)
- **Cards**: Lighter charcoal (`280 6% 14%`)
- **Header**: Dark slate-900 (consistent across themes)
- **Primary**: Violet accent (`263 70% 60%`)
- **Use Case**: Pure dark mode with neutral tones

## Implementation

### CSS Variables System
All themes use CSS variables defined in `apps/web/src/app/globals.css`:

```css
:root {
  /* Light Theme */
  --background: 210 20% 97%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --primary: 221.2 83.2% 53.3%;
  --muted: 210 40% 96.1%;
  --border: 214.3 31.8% 91.4%;
  /* ... */
}

.theme-dark-blue {
  /* Dark Blue Theme */
  --background: 235 45% 8%;
  --card: 230 35% 17%;
  --primary: 263 70% 60%;
  /* ... */
}

.theme-charcoal {
  /* Dark Charcoal Theme */
  --background: 280 8% 6%;
  --card: 280 6% 14%;
  --primary: 263 70% 60%;
  /* ... */
}
```

### Theme Application
Themes are applied by adding a class to the `<html>` element:
- **Light**: No class (default)
- **Dark Blue**: `theme-dark-blue` class
- **Charcoal**: `theme-charcoal` class

### Theme Switching
Located in: `apps/web/src/app/(dashboard)/settings/page.tsx`

```typescript
const applyTheme = (theme: 'light' | 'dark-blue' | 'charcoal') => {
  document.documentElement.classList.remove('dark', 'theme-dark-blue', 'theme-charcoal');
  
  if (theme === 'dark-blue') {
    document.documentElement.classList.add('theme-dark-blue');
  } else if (theme === 'charcoal') {
    document.documentElement.classList.add('theme-charcoal');
  }
};
```

## Component Usage

### Using Theme Variables
Components use Tailwind utility classes that reference CSS variables:

```tsx
// ✅ Correct - Uses CSS variables
<div className="bg-background text-foreground">
<div className="bg-card border shadow-md">
<p className="text-muted-foreground">

// ❌ Incorrect - Hardcoded colors
<div className="bg-white text-gray-900">
<div className="bg-gray-50 border-gray-200">
```

### Common Theme Classes
- `bg-background` - Main page background
- `bg-card` - Card/panel backgrounds
- `bg-muted` - Muted/secondary backgrounds
- `bg-accent` - Hover states
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `border` - Border colors

## Visual Structure

### Depth & Hierarchy
The theming system uses shadows instead of heavy borders for visual depth:

- **Cards**: `shadow-md` for elevation
- **Navigation**: `shadow-sm` with `bg-card`
- **Header**: `shadow-md` with dark slate-900 background
- **Selected states**: Enhanced shadows + ring effects

### Header Design
The header uses a consistent dark slate-900 background across all themes:
- Background: `bg-slate-900`
- Border: `border-slate-800`
- Text: White
- Logo icon: `text-violet-400`
- Provides strong visual anchor for all themes

## Database Storage

### Theme Preference
Theme preference is stored in the `users` table:
- **Column**: `theme`
- **Type**: VARCHAR
- **Values**: `'light'`, `'dark-blue'`, `'charcoal'`
- **Default**: `'light'`

### Migration
```sql
-- apps/web/supabase/migrations/update_theme_column.sql
ALTER TABLE users
DROP CONSTRAINT IF EXISTS users_theme_check;

ALTER TABLE users
ADD CONSTRAINT users_theme_check 
CHECK (theme IN ('light', 'dark', 'dark-blue', 'charcoal'));
```

## Updated Components

### UI Components (All Theme-Ready)
- Card, Button, Input, Textarea
- Switch, Modal, Badge, Alert
- Empty State, Label, Loading
- Select, Tabs, Avatar

### Dashboard Components
- Navigation sidebar
- Header
- Page header
- Stat card

### Dashboard Pages
- Dashboard (getting-started)
- Templates & Template assignments
- Team
- Deployments (with enhanced step indicators)
- Analytics
- Integrations
- Settings (all tabs)
- Billing
- Support

### Template Components
- Email client preview
- Template editor
- Block editor

### Other Components
- Feedback widget

## Design Principles

### 1. No Hardcoded Colors
All components use CSS variables instead of hardcoded Tailwind colors.

### 2. Consistent Accent Colors
- Primary actions: Violet (`bg-violet-600`)
- Success states: Emerald (`bg-emerald-500`)
- Destructive actions: Red (`bg-red-600`)

### 3. Visual Feedback
- Selected states: Violet border + background + ring effect
- Hover states: Border color change + shadow enhancement
- Active navigation: Violet background with white text

### 4. Accessibility
All themes maintain proper contrast ratios for text readability.

## Testing Checklist

### Per Theme Testing
For each theme (Light, Dark Blue, Charcoal):

- [ ] Main background color is correct
- [ ] Cards are visible with proper contrast
- [ ] Text is readable (foreground and muted)
- [ ] Borders are visible but not overwhelming
- [ ] Shadows provide depth
- [ ] Navigation is clear
- [ ] Header is consistent
- [ ] Interactive elements are visible
- [ ] Selected states are obvious
- [ ] Hover states work properly

### Cross-Page Testing
- [ ] Dashboard page
- [ ] Templates page
- [ ] Team page
- [ ] Deployments page
- [ ] Analytics page
- [ ] Integrations page
- [ ] Settings page (all tabs)
- [ ] Support page

### Persistence Testing
- [ ] Theme selection saves to database
- [ ] Theme persists on page refresh
- [ ] Theme applies immediately on selection
- [ ] Theme works across all pages

## Scope

### Included (Dashboard App)
- All pages under `apps/web/src/app/(dashboard)`
- All components under `apps/web/src/components/dashboard`
- All UI components under `apps/web/src/components/ui`
- Template components under `apps/web/src/components/templates`
- Feedback widget

### Excluded (Marketing Site)
- All pages under `apps/web/src/app/(marketing)`
- All components under `apps/web/src/components/marketing`
- Marketing site retains original hardcoded colors

## Future Enhancements

Potential additions:
- System theme detection (auto-switch based on OS preference)
- Custom theme builder
- Per-page theme override
- Theme scheduling (auto-switch at certain times)
- High contrast mode
- Additional theme variants

## Troubleshooting

### Theme Not Applying
1. Check if theme class is on `<html>` element
2. Verify CSS variables are defined in `globals.css`
3. Ensure component uses CSS variable classes, not hardcoded colors

### Colors Look Wrong
1. Verify the correct theme class is applied
2. Check for hardcoded color classes overriding variables
3. Ensure no `dark:` prefixes (use CSS variables only)

### Theme Not Persisting
1. Check database connection
2. Verify `theme` column exists in `users` table
3. Check theme save function in settings page
