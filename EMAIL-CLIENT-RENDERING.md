# Email Client Rendering Reference

> **Last Updated:** February 2026  
> **Purpose:** Track email client rendering engines, quirks, and best practices for signature compatibility

## Overview

Email clients use different rendering engines, each with unique capabilities and limitations. This document tracks their behavior to ensure signatures render correctly across all platforms.

## Major Email Clients

### 1. Gmail (Web & Mobile)

**Rendering Engine:** Custom HTML sanitizer + WebKit (mobile)

**Market Share:** ~30% of email opens

**CSS Support:**
- ✅ Inline styles (required)
- ✅ Basic table layouts
- ✅ Border-radius
- ✅ Background colors
- ✅ Web fonts (with fallbacks)
- ❌ External CSS (stripped)
- ❌ `<style>` tags (stripped in some contexts)
- ⚠️ Media queries (limited support)

**Known Quirks:**
- Clips messages over 102KB (including images)
- Strips `margin` on body elements
- Increases line-height slightly (1.6 default)
- Converts some colors to links (phone numbers, addresses)
- Proxies all images through Google servers

**Dark Mode:** Partial support via `prefers-color-scheme`

**Best Practices:**
- Keep total signature size under 25KB
- Use inline styles exclusively
- Test with Gmail's image proxy
- Use `line-height: 1.4-1.6` for readability

---

### 2. Outlook (Desktop - Windows)

**Rendering Engine:** Microsoft Word 2016+ rendering engine

**Market Share:** ~25% of email opens (desktop)

**CSS Support:**
- ✅ Basic inline styles
- ✅ Table layouts
- ✅ Background colors (limited)
- ❌ Border-radius (completely ignored)
- ❌ Box-shadow
- ❌ Flexbox
- ❌ CSS Grid
- ❌ Background images (unreliable)
- ❌ Media queries

**Known Quirks:**
- Uses Calibri as default font
- Adds extra spacing around elements
- Shows underlines on all links by default
- Ignores `max-width` on images
- Poor support for padding/margin
- Converts `<div>` to `<p>` tags
- DPI scaling issues (120-144 DPI common)

**Dark Mode:** Very limited support

**Best Practices:**
- Use VML for buttons (Vector Markup Language)
- Avoid border-radius entirely
- Use nested tables for layout
- Set explicit widths on table cells
- Use `mso-` prefixed styles for Outlook-specific fixes
- Test at 120% and 150% DPI scaling

**Outlook-Specific Styles:**
```html
<!--[if mso]>
<style>
  /* Outlook-specific CSS */
</style>
<![endif]-->
```

---

### 3. Outlook (Web - Outlook.com)

**Rendering Engine:** Custom sanitizer + modern browser engine

**Market Share:** ~10% of email opens

**CSS Support:**
- ✅ Most inline styles
- ✅ Border-radius
- ✅ Modern CSS properties
- ⚠️ Media queries (limited)
- ❌ External CSS

**Known Quirks:**
- Different from Outlook Desktop
- Better CSS support than desktop version
- Still strips some advanced CSS

**Dark Mode:** Good support

---

### 4. Apple Mail (macOS & iOS)

**Rendering Engine:** WebKit

**Market Share:** ~40% of email opens (especially mobile)

**CSS Support:**
- ✅ Excellent CSS3 support
- ✅ Border-radius
- ✅ Box-shadow
- ✅ Gradients
- ✅ Media queries
- ✅ Web fonts
- ✅ Animations (use sparingly)
- ⚠️ Some CSS Grid support

**Known Quirks:**
- May auto-scale text on iOS
- Aggressive dark mode color inversion
- Converts phone numbers to links automatically
- Excellent rendering but can over-style

**Dark Mode:** Excellent support, but may invert colors aggressively

**Best Practices:**
- Use `color-scheme: light dark` meta tag
- Provide explicit dark mode colors
- Test on both macOS and iOS
- Use `-webkit-text-size-adjust: none` to prevent auto-scaling

---

### 5. Yahoo Mail

**Rendering Engine:** Custom sanitizer

**Market Share:** ~5% of email opens

**CSS Support:**
- ✅ Basic inline styles
- ✅ Table layouts
- ⚠️ Limited modern CSS
- ❌ Media queries
- ❌ External CSS

**Known Quirks:**
- Aggressive CSS stripping
- Adds own styles to links
- May wrap content in additional divs

---

### 6. Outlook Mobile (iOS/Android)

**Rendering Engine:** Native mobile rendering

**Market Share:** ~8% of email opens

**CSS Support:**
- ✅ Better than desktop Outlook
- ✅ Border-radius
- ✅ Modern CSS properties
- ⚠️ Media queries (limited)

**Known Quirks:**
- Different from Outlook Desktop
- Better support than desktop version
- Responsive by default

---

## Dark Mode Support Matrix

| Client | Support Level | Implementation |
|--------|--------------|----------------|
| Apple Mail | ⭐⭐⭐⭐⭐ Excellent | `prefers-color-scheme`, aggressive color inversion |
| Gmail | ⭐⭐⭐ Good | `prefers-color-scheme`, respects inline styles |
| Outlook Desktop | ⭐ Poor | Limited, uses Windows theme |
| Outlook Web | ⭐⭐⭐⭐ Good | `prefers-color-scheme` |
| Outlook Mobile | ⭐⭐⭐⭐ Good | Native dark mode |
| Yahoo Mail | ⭐⭐ Fair | Basic dark mode |

---

## Universal Best Practices

### HTML Structure
```html
<!-- Use tables for layout (not divs) -->
<table cellpadding="0" cellspacing="0" border="0" style="...">
  <tr>
    <td style="...">Content</td>
  </tr>
</table>
```

### CSS Guidelines
1. **Always use inline styles** - Never rely on `<style>` tags or external CSS
2. **Use hex colors** - Avoid `rgb()` or `hsl()`
3. **Set explicit dimensions** - Don't rely on auto-sizing
4. **Use table layouts** - Flexbox and Grid won't work everywhere
5. **Test on real devices** - Emulators don't catch all issues

### Dark Mode Implementation
```html
<!-- Wrapper with color-scheme -->
<div style="color-scheme: light dark;">
  <!-- Light mode color -->
  <span class="text" style="color: #333333;">Text</span>
</div>

<!-- CSS for dark mode -->
<style>
  @media (prefers-color-scheme: dark) {
    .text { color: #e5e5e5 !important; }
  }
</style>
```

### Image Best Practices
- Use absolute URLs (not relative)
- Set explicit `width` and `height` attributes
- Provide `alt` text for accessibility
- Keep images under 1MB each
- Use PNG or JPG (avoid WebP for compatibility)
- Host on reliable CDN

---

## Testing Resources

### Online Testing Tools
- **Litmus** - https://litmus.com (paid, comprehensive)
- **Email on Acid** - https://www.emailonacid.com (paid)
- **Can I Email** - https://www.caniemail.com (free, CSS support reference)
- **Testi@** - https://testi.at (free, basic testing)

### Real Device Testing
Always test on:
- [ ] Gmail (web, iOS, Android)
- [ ] Outlook Desktop (Windows)
- [ ] Outlook Web
- [ ] Apple Mail (macOS, iOS)
- [ ] Outlook Mobile (iOS, Android)

### Dark Mode Testing
Test in both light and dark modes on:
- [ ] iOS Mail (Settings > Display & Brightness > Dark)
- [ ] Gmail (Settings > Theme > Dark)
- [ ] macOS Mail (System Preferences > General > Appearance)

---

## Common Issues & Solutions

### Issue: Border-radius not working
**Cause:** Outlook Desktop doesn't support it  
**Solution:** Design works without rounded corners, or use VML for Outlook

### Issue: Extra spacing in Outlook
**Cause:** Word rendering engine adds padding  
**Solution:** Use `mso-line-height-rule: exactly` and explicit heights

### Issue: Text too small on mobile
**Cause:** Mobile clients auto-scale text  
**Solution:** Use minimum 14px font size, test on real devices

### Issue: Colors inverted in dark mode
**Cause:** Apple Mail aggressive color inversion  
**Solution:** Use `color-scheme` meta tag and explicit dark mode colors

### Issue: Images not loading
**Cause:** Blocked by default in many clients  
**Solution:** Provide alt text, design works without images

---

## Maintenance Schedule

- **Monthly:** Check Can I Email for CSS support updates
- **Quarterly:** Review Litmus/Email on Acid for new client versions
- **Annually:** Full audit of all email clients and rendering engines

---

## Version History

### February 2026
- Initial documentation created
- Added dark mode support matrix
- Documented Outlook Desktop Word engine quirks
- Added Gmail 102KB limit note

---

## Additional Resources

- [Can I Email](https://www.caniemail.com) - CSS support reference
- [Litmus Email Client Market Share](https://www.litmus.com/email-client-market-share/)
- [Campaign Monitor CSS Support Guide](https://www.campaignmonitor.com/css/)
- [Email on Acid Blog](https://www.emailonacid.com/blog/)
- [Really Good Emails](https://reallygoodemails.com) - Design inspiration

---

## Notes

This document should be updated whenever:
1. A major email client releases a new version
2. CSS support changes are discovered
3. New rendering quirks are identified
4. Market share data is updated
5. New testing tools become available
