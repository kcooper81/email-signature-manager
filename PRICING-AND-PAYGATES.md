# Pricing Tiers & Pay Gates Documentation

## Overview
This document outlines all pricing tiers, feature limits, and pay gate implementations across the Siggly application.

## Admin Management

**Admins are FREE** - You can have unlimited admins on any plan. Admins are not counted toward your user limit.

### User Roles
| Role | Description | Permissions |
|------|-------------|-------------|
| **Owner** | Account creator | Full access, can manage all admins |
| **Admin** | Organization administrator | Create templates, deploy signatures, manage integrations, invite users, promote members to admin |
| **Member** | Regular user (signature recipient) | Can self-manage their own profile/links if invited |

### How to Add Admins
1. **Invite New Admin**: Team page → "Invite Admin" button → Enter email → They receive an invite to create an account with admin privileges
2. **Promote Existing User**: Team page → Find user → Click role dropdown → Change from "member" to "admin"

### Permissions Matrix
| Action | Owner | Admin | Member |
|--------|-------|-------|--------|
| Create/edit templates | ✅ | ✅ | ❌ |
| Deploy signatures | ✅ | ✅ | ❌ |
| Manage integrations | ✅ | ✅ | ❌ |
| Add/remove users | ✅ | ✅ | ❌ |
| Promote to admin | ✅ | ✅ | ❌ |
| Demote admin | ✅ | ❌ | ❌ |
| Manage billing | ✅ | ❌ | ❌ |
| Edit own profile | ✅ | ✅ | ✅ |

---

## Pricing Tiers

### Free Plan
**Price:** $0 forever  
**Target:** Individuals and small teams trying out Siggly

**Limits:**
- **Max Templates:** 1
- **Max Users:** 5
- **Analytics:** ❌ No
- **Custom Branding:** ❌ No
- **Priority Support:** ❌ No
- **API Access:** ❌ No
- **SSO:** ❌ No
- **Remove Watermark:** ❌ No

**Integrations:**
- **Google Workspace:** ✅ Yes
- **Microsoft 365:** ❌ No
- **HubSpot CRM:** ❌ No

**Features Included:**
- ✅ Up to 5 users
- ✅ 1 signature template
- ✅ Visual drag-and-drop editor
- ✅ Google Workspace integration
- ✅ Auto-sync user directory
- ✅ One-click deployment
- ✅ Mobile-responsive signatures
- ✅ Industry compliance blocks (Legal, Healthcare, Finance, Real Estate)
- ✅ Disclaimer templates
- ✅ Email support
- ✅ Manual signature copy (for non-integrated users)

---

### Starter Plan
**Price:** $0.50/user/month  
**Target:** Growing teams needing more templates and integrations

**Limits:**
- **Max Templates:** 5
- **Max Users:** Unlimited (-1)
- **Analytics:** ✅ Yes
- **Custom Branding:** ✅ Yes
- **Priority Support:** ❌ No
- **API Access:** ❌ No
- **SSO:** ❌ No
- **Remove Watermark:** ✅ Yes

**Integrations:**
- **Google Workspace:** ✅ Yes
- **Microsoft 365:** ✅ Yes
- **HubSpot CRM:** ❌ No

**Additional Features:**
- ✅ Unlimited users ($0.50/user/month)
- ✅ 5 signature templates
- ✅ Analytics dashboard
- ✅ Microsoft 365 integration
- ✅ Custom branding
- ✅ Remove watermark

---

### Professional Plan
**Price:** $29/month (includes 10 users) + $1/user/month for additional users  
**Target:** Professional teams with advanced needs

**Limits:**
- **Max Templates:** Unlimited (-1)
- **Max Users:** Unlimited (-1)
- **Analytics:** ✅ Yes
- **Custom Branding:** ✅ Yes
- **Priority Support:** ✅ Yes
- **API Access:** ✅ Yes
- **SSO:** ❌ No
- **Remove Watermark:** ✅ Yes

**Integrations:**
- **Google Workspace:** ✅ Yes
- **Microsoft 365:** ✅ Yes
- **HubSpot CRM:** ✅ Yes
- **Scheduled Deployments:** ✅ Yes

**Additional Features:**
- ✅ First 10 users included, then $1/user/month
- ✅ Unlimited templates
- ✅ HubSpot CRM integration
- ✅ Advanced analytics
- ✅ API access
- ✅ Scheduled deployments
- ✅ Priority support

---

### Enterprise Plan
**Price:** Custom pricing  
**Target:** Large organizations with custom requirements

**Limits:**
- **Max Templates:** Unlimited (-1)
- **Max Users:** Unlimited (-1)
- **Analytics:** ✅ Yes
- **Custom Branding:** ✅ Yes
- **Priority Support:** ✅ Yes
- **API Access:** ✅ Yes
- **SSO:** ✅ Yes
- **Remove Watermark:** ✅ Yes
- **White Label:** ✅ Yes

**Integrations:**
- **Google Workspace:** ✅ Yes
- **Microsoft 365:** ✅ Yes
- **HubSpot CRM:** ✅ Yes
- **Scheduled Deployments:** ✅ Yes

**Additional Features:**
- ✅ Unlimited users (custom pricing)
- ✅ Unlimited templates
- ✅ SSO (Single Sign-On)
- ✅ White label
- ✅ Dedicated account manager
- ✅ Custom integrations
- ✅ SLA guarantee
- ✅ Advanced security features

---

## Pay Gate Architecture

### Centralized System
All pay gates use a **shared architecture** to ensure consistency:

```
plans.ts (Source of Truth)
    ↓
useSubscription() Hook (Frontend)
getPlan() Function (Backend)
    ↓
├─ UI Components
│  ├─ <UpgradePrompt>
│  ├─ <FeatureGate>
│  └─ <LimitGate>
│
└─ API Endpoints
   ├─ Sync Routes
   └─ Feature Routes
```

### Shared Components

**Frontend:**
- `useSubscription()` - Hook providing plan data and limit checks
- `<UpgradePrompt>` - Reusable upgrade UI component
- `<FeatureGate>` - Wraps features requiring specific plans
- `<LimitGate>` - Wraps actions that hit usage limits

**Backend:**
- `getPlan(planId)` - Returns plan configuration
- `canAccessFeature()` - Checks feature access
- `isWithinLimit()` - Checks usage limits

---

## Complete Pay Gate List

### 1. Template Creation Limit
**Location:** `/templates` page  
**Type:** Usage Limit  
**Check:** `canCreateTemplate()`  
**Enforcement:**
- Disables "New Template" button when limit reached
- Shows "Upgrade to Create More" button
- Displays usage indicator (e.g., "1 of 1 templates")

**Limits:**
- Free: 1 template
- Starter: 5 templates
- Professional: Unlimited
- Enterprise: Unlimited

---

### 2. Team Member Addition Limit
**Location:** `/team` page  
**Type:** Usage Limit  
**Check:** `canAddTeamMember()`  
**Enforcement:**
- Prevents manual "Add Member" action
- Shows upgrade prompt
- Displays usage indicator (e.g., "5 of 5 members")

**Limits:**
- Free: 5 users
- Starter: Unlimited
- Professional: Unlimited
- Enterprise: Unlimited

---

### 3. Microsoft 365 Sync Limit
**Location:** `/api/integrations/microsoft/sync`  
**Type:** Usage Limit (Backend)  
**Check:** `maxUsers` from plan  
**Enforcement:**
- Returns 403 Forbidden if limit reached
- Partial sync if slots available
- Error message: "Your [Plan] allows up to [X] users. Please upgrade."

**Behavior:**
- Counts existing users in organization
- Calculates available slots: `maxUsers - currentCount`
- Syncs only up to available slots
- Skips remaining users

---

### 4. Google Workspace Sync Limit
**Location:** `/api/integrations/google/sync`  
**Type:** Usage Limit (Backend)  
**Check:** `maxUsers` from plan  
**Enforcement:**
- Returns 403 Forbidden if limit reached
- Partial sync if slots available
- Error message: "Your [Plan] allows up to [X] users. Please upgrade."

**Behavior:**
- Counts existing users in organization
- Calculates available slots: `maxUsers - currentCount`
- Syncs only up to available slots
- Skips remaining users

---

### 5. HubSpot CRM Sync Limit
**Location:** `/api/integrations/hubspot/sync`  
**Type:** Usage Limit (Backend)  
**Check:** `maxUsers` from plan  
**Enforcement:**
- Returns 403 Forbidden if limit reached
- Partial sync if slots available
- Error message: "Your [Plan] allows up to [X] users. Please upgrade."

**Behavior:**
- Counts existing users in organization
- Calculates available slots: `maxUsers - currentCount`
- Syncs only up to available slots
- Skips remaining contacts

---

### 6. Analytics Access
**Location:** `/analytics` page  
**Type:** Feature Gate  
**Check:** `canAccess('analytics')`  
**Enforcement:**
- Shows locked state with upgrade prompt
- Hides analytics data
- Displays "Upgrade to unlock" message

**Requirement:** Starter plan or higher

---

### 7. Microsoft 365 Integration Access
**Location:** `/integrations` page  
**Type:** Feature Gate  
**Check:** `microsoft365` feature flag  
**Enforcement:**
- Shows "Upgrade Required" on Free plan
- Connect button disabled
- Upgrade prompt displayed

**Requirement:** Starter plan or higher

---

### 8. HubSpot CRM Integration Access
**Location:** `/integrations` page  
**Type:** Feature Gate  
**Check:** `hubspotCRM` feature flag  
**Enforcement:**
- Shows "Upgrade Required" on Free and Starter plans
- Connect button disabled
- Upgrade prompt displayed

**Requirement:** Professional plan or higher

---

### 9. Scheduled Deployments
**Location:** Deployment settings  
**Type:** Feature Gate  
**Check:** `canAccess('scheduledDeployments')`  
**Enforcement:**
- `<FeatureGate feature="scheduledDeployments">`
- Shows upgrade prompt
- Feature hidden/disabled

**Requirement:** Professional plan or higher

---

### 10. API Access
**Location:** API endpoints & settings  
**Type:** Feature Gate  
**Check:** `canAccess('apiAccess')`  
**Enforcement:**
- API endpoints check plan
- API keys disabled
- Shows upgrade prompt

**Requirement:** Professional plan or higher

---

### 11. SSO (Single Sign-On)
**Location:** Authentication settings  
**Type:** Feature Gate  
**Check:** `canAccess('sso')`  
**Enforcement:**
- SSO settings hidden
- Shows upgrade prompt
- Feature unavailable

**Requirement:** Enterprise plan only

---

### 12. White Label
**Location:** Branding settings  
**Type:** Feature Gate  
**Check:** `canAccess('whiteLabel')`  
**Enforcement:**
- Branding removal disabled
- Shows upgrade prompt
- Feature unavailable

**Requirement:** Enterprise plan only

---

## Development Bypass

### Environment Variable
```bash
NEXT_PUBLIC_BYPASS_PAY_GATES=true
```

### UI Toggle
A development-only toggle appears in the bottom-right corner of the dashboard:
- Only visible when `NODE_ENV === 'development'`
- Stores state in `localStorage.dev_bypass_pay_gates`
- Requires page refresh after toggling
- Bypasses ALL pay gates when enabled

### How It Works
```typescript
const getDevBypassEnabled = () => {
  if (typeof window === 'undefined') 
    return process.env.NEXT_PUBLIC_BYPASS_PAY_GATES === 'true';
  return localStorage.getItem('dev_bypass_pay_gates') === 'true' 
    || process.env.NEXT_PUBLIC_BYPASS_PAY_GATES === 'true';
};
```

---

## Pay Gate Enforcement Flow

### Frontend (UI)
1. Component imports `useSubscription()` hook
2. Hook provides plan data and limit check functions
3. Component calls check function (e.g., `canCreateTemplate()`)
4. If check fails, show `<UpgradePrompt>` or disable action
5. User sees upgrade message with plan requirements

### Backend (API)
1. API endpoint receives request
2. Fetches user's subscription from database
3. Calls `getPlan(planId)` to get plan limits
4. Counts current usage (e.g., existing users)
5. Calculates available capacity
6. If limit reached: Return 403 with error message
7. If capacity available: Process request (partial sync if needed)

---

## Testing Pay Gates

### Manual Testing
1. **Enable dev bypass:** Toggle in bottom-right corner
2. **Test unlimited access:** All features should work
3. **Disable dev bypass:** Toggle off and refresh
4. **Test free plan limits:**
   - Try creating 2nd template (should block)
   - Try adding 6th user (should block)
   - Try accessing analytics (should block)
5. **Test sync limits:**
   - Sync more than 5 users (should partial sync or block)
   - Check error messages are clear

### Automated Testing
- Unit tests for `useSubscription()` hook
- Integration tests for sync endpoints
- E2E tests for upgrade flows

---

## Common Scenarios

### Scenario 1: User Hits Template Limit
**User Action:** Clicks "New Template" button  
**System Check:** `canCreateTemplate()` returns false  
**Result:** Button shows "Upgrade to Create More"  
**User Experience:** Sees usage indicator "1 of 1 templates" and upgrade prompt

### Scenario 2: Sync Exceeds User Limit
**User Action:** Syncs 10 users from MS365 on Free plan  
**System Check:** `maxUsers = 5`, `currentCount = 3`, `availableSlots = 2`  
**Result:** Only syncs first 2 users, returns success with warning  
**User Experience:** Sees "Synced 2 of 10 users. Upgrade to sync more."

### Scenario 3: Sync at Limit
**User Action:** Syncs users when already at 5/5 limit  
**System Check:** `availableSlots = 0`  
**Result:** Returns 403 Forbidden  
**User Experience:** Error message "Your Free plan allows up to 5 users. Please upgrade."

### Scenario 4: Feature Access Denied
**User Action:** Tries to access Analytics page on Free plan  
**System Check:** `canAccess('analytics')` returns false  
**Result:** Shows locked state with upgrade prompt  
**User Experience:** Sees "Upgrade to Starter to unlock Analytics"

---

## File Locations

### Core Files
- **Plans Definition:** `src/lib/billing/plans.ts`
- **Subscription Hook:** `src/hooks/use-subscription.tsx`
- **UI Components:** `src/components/billing/upgrade-prompt.tsx`
- **Dev Toggle:** `src/components/billing/dev-bypass-toggle.tsx`

### Pay Gate Implementations
- **Templates Page:** `src/app/(dashboard)/templates/page.tsx`
- **Team Page:** `src/app/(dashboard)/team/page.tsx`
- **Analytics Page:** `src/app/(dashboard)/analytics/page.tsx`
- **MS365 Sync:** `src/app/api/integrations/microsoft/sync/route.ts`
- **Google Sync:** `src/app/api/integrations/google/sync/route.ts`
- **HubSpot Sync:** `src/app/api/integrations/hubspot/sync/route.ts`

---

## Maintenance Notes

### Adding a New Pay Gate
1. Define limit/feature in `plans.ts`
2. Add check function to `useSubscription()` hook (if needed)
3. Implement UI check using `<FeatureGate>` or `<LimitGate>`
4. Add backend enforcement in API route (if applicable)
5. Test with dev bypass on/off
6. Update this documentation

### Changing Plan Limits
1. Update `PLANS` object in `plans.ts`
2. All pay gates automatically use new limits
3. No other code changes needed
4. Test affected features
5. Update this documentation

### Debugging Pay Gates
1. Check dev bypass is OFF
2. Verify subscription data in database
3. Check `useSubscription()` hook returns correct plan
4. Console log limit check results
5. Verify API endpoints receive correct plan data
6. Check error messages are clear and helpful

---

## Future Enhancements

### Potential Improvements
- [ ] Warning before hitting limits (e.g., "2 slots remaining")
- [ ] Upgrade CTA in sync UI when limit reached
- [ ] Sync preview showing "X users will sync, Y skipped"
- [ ] Audit log for limit hits (analytics)
- [ ] Grace period for recently downgraded accounts
- [ ] Soft limits vs hard limits
- [ ] Usage notifications/alerts
- [ ] Plan comparison modal in upgrade prompts

---

## Support & Troubleshooting

### Common Issues

**Issue:** Pay gates not enforcing  
**Solution:** Check dev bypass is disabled, verify subscription data

**Issue:** Sync stops at wrong limit  
**Solution:** Check user count query includes correct organization filter

**Issue:** Upgrade prompt not showing  
**Solution:** Verify `useSubscription()` hook is properly wrapped in provider

**Issue:** 403 errors on sync  
**Solution:** Check plan limits, verify user hasn't hit limit

---

*Last Updated: February 5, 2026*  
*Version: 1.1*
