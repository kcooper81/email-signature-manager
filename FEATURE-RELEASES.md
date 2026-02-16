# Feature Release Tracking

This document tracks all feature releases and ensures documentation/marketing pages are updated accordingly.

---

## How to Use This Document

When a new feature is released:
1. Add it to the **Feature Release Log** below
2. Check off each item in the **Documentation Checklist**
3. Update the **Last Updated** date

---

## Feature Release Log

### February 2026 Release

| Feature | Description | Status | Docs Updated | Marketing Updated |
|---------|-------------|--------|--------------|-------------------|
| **Personal Links** | Employees add personal URLs (Calendly, LinkedIn) via Team page or Profile Settings | ✅ Live | ⬜ | ⬜ |
| **Bulk Invite** | Admins invite multiple employees to self-manage their profiles | ✅ Live | ⬜ | ⬜ |
| **Signature Rules** | Conditional logic for signatures (internal/external, departments, date ranges) | ✅ Live | ⬜ | ⬜ |
| **Campaign Banners** | Promotional banners with click tracking and scheduling | ✅ Live | ⬜ | ⬜ |
| **Analytics** | Click tracking for links and banners | ✅ Live | ⬜ | ⬜ |
| **RBAC** | Role-based access control (Owner, Admin, Editor, Viewer) | ✅ Live | ⬜ | ⬜ |
| **Audit Logs** | Complete action logging for compliance | ✅ Live | ⬜ | ⬜ |
| **Disclaimers Library** | 15 pre-written legal disclaimers (GDPR, HIPAA, etc.) | ✅ Live | ⬜ | ⬜ |
| **Dynamic Help Articles** | Database-driven help center with step-by-step guides and FAQs | ✅ Live | ✅ | N/A |
| **Unified Help/Support** | /help and /support share same content with clean article URLs | ✅ Live | ✅ | N/A |
| **Calendly Help Docs** | 5 comprehensive articles for Calendly integration setup and usage | ✅ Live | ✅ | N/A |
| **Disclaimer Engine** | Advanced disclaimer management with templates, rules, regulatory presets, and audit trail | ✅ Live | ✅ | ⬜ |
| **HR Sync** | Sync employee data from HR providers with approval workflows and profile validation | ✅ Live | ✅ | ⬜ |
| **Lifecycle Automation** | Automate onboarding/offboarding with workflow triggers and actions | ✅ Live | ✅ | ⬜ |
| **Brand Governance** | Brand guidelines, compliance audits, and asset management (Enterprise) | ✅ Live | ✅ | ⬜ |
| **Billing Enforcement** | 35+ API routes now check subscriptions, field injection prevention, SSRF protection | ✅ Live | ✅ | N/A |

---

## Documentation Checklist

### For Each New Feature, Update:

#### Help Center (`/help`)
- [ ] Add FAQ entries for the feature
- [ ] Add to Quick Start Guides if applicable
- [ ] Create dedicated help article if complex

#### Features Page (`/features`)
- [ ] Add feature card with icon, title, description, benefits
- [ ] Update metadata/description if needed

#### Homepage (`/`)
- [ ] Add to Features Grid section if major feature
- [ ] Update "What Sets Us Apart" if differentiator

#### Pricing Page (`/pricing`)
- [ ] Update plan comparison if feature is plan-gated
- [ ] Add to FAQ if pricing-related

#### Industry/Audience Pages
- [ ] `/for/enterprise` - Enterprise features (RBAC, Audit Logs, SSO)
- [ ] `/for/marketing` - Marketing features (Campaign Banners, Analytics)
- [ ] `/for/it-admins` - IT features (Bulk Invite, Directory Sync)
- [ ] `/industries/healthcare` - Compliance features (HIPAA disclaimers)
- [ ] `/industries/legal` - Legal features (Disclaimers, Compliance)
- [ ] `/industries/finance` - Finance features (Audit Logs, Compliance)

#### Blog Posts (if applicable)
- [ ] Create how-to guide for complex features
- [ ] Update existing relevant posts

---

## Pages to Update for February 2026 Release

### Priority 1: Core Pages

| Page | Features to Add | Status |
|------|-----------------|--------|
| `/features` | Personal Links, Bulk Invite, Signature Rules, Campaign Banners, Analytics, RBAC, Audit Logs, Disclaimers | ⬜ |
| `/` (Homepage) | Signature Rules, Campaign Banners, Analytics | ⬜ |
| `/help` | All 8 features in FAQs | ⬜ |
| `/settings` | Disclaimers, HR Sync, Automation, Validation nav links | ✅ |

### Priority 2: Audience Pages

| Page | Features to Add | Status |
|------|-----------------|--------|
| `/for/enterprise` | RBAC, Audit Logs, SSO mention | ⬜ |
| `/for/enterprise` | Brand Governance, Lifecycle Automation, HR Sync | ⬜ |
| `/for/marketing` | Campaign Banners, Analytics | ⬜ |
| `/for/it-admins` | Bulk Invite, RBAC | ⬜ |
| `/for/it-admins` | HR Sync, Lifecycle Automation, Disclaimers | ⬜ |

### Priority 3: Industry Pages

| Page | Features to Add | Status |
|------|-----------------|--------|
| `/industries/healthcare` | HIPAA Disclaimers | ⬜ |
| `/industries/legal` | Legal Disclaimers, Compliance | ⬜ |
| `/industries/finance` | Audit Logs, Compliance | ⬜ |

---

## Feature Descriptions for Copy/Paste

### Personal Links
**Short:** Let employees add their personal scheduling and social links
**Medium:** Employees can add personal URLs like Calendly booking links and LinkedIn profiles directly from their Profile Settings or via admin on the Team page.
**Benefits:** Personalized signatures, self-service updates, scheduling link integration

### Bulk Invite
**Short:** Invite multiple employees to self-manage their profiles
**Medium:** Admins can select multiple team members and send bulk invitations, allowing employees to create accounts and manage their own profile information.
**Benefits:** Faster onboarding, reduced admin workload, employee self-service

### Signature Rules
**Short:** Conditional logic for different signature scenarios
**Medium:** Create rules that automatically apply different signatures based on recipient type (internal/external), sender department, or date ranges for campaigns.
**Benefits:** Context-aware signatures, automated campaign management, compliance by audience

### Campaign Banners
**Short:** Promotional banners with built-in tracking
**Medium:** Add eye-catching promotional banners to signatures with click tracking. Schedule campaigns with start/end dates for product launches, events, and promotions.
**Benefits:** Marketing ROI tracking, scheduled campaigns, visual engagement

### Analytics
**Short:** Track clicks and measure signature performance
**Medium:** Monitor click-through rates on links and banners. See which signatures drive the most engagement and measure your email marketing ROI.
**Benefits:** Data-driven decisions, ROI measurement, engagement insights

### RBAC (Role-Based Access Control)
**Short:** Control who can do what in your organization
**Medium:** Assign roles (Owner, Admin, Editor, Viewer) to team members with granular permissions. Editors can create templates while Viewers can only view.
**Benefits:** Security, delegation, compliance

### Audit Logs
**Short:** Complete record of all actions for compliance
**Medium:** Every action in Siggly is logged with timestamps, user IDs, and before/after values. Essential for SOC 2, HIPAA, and enterprise compliance requirements.
**Benefits:** Compliance, security, accountability

### Disclaimers Library
**Short:** 15 pre-written legal disclaimers ready to use
**Medium:** Browse and insert professionally-written disclaimers including GDPR, HIPAA, confidentiality notices, and industry-specific compliance text.
**Benefits:** Legal compliance, time savings, professional language

### Disclaimer Engine
**Short:** Advanced disclaimer management with regulatory compliance
**Medium:** Create and manage disclaimer templates, set up rule-based assignment, use regulatory presets (HIPAA, GDPR, FINRA), and track deployment history through a full audit trail.
**Benefits:** Regulatory compliance, automated disclaimer assignment, legal risk reduction

### HR Sync
**Short:** Sync employee data from HR systems automatically
**Medium:** Connect to HR providers like BambooHR, Workday, and Gusto to keep employee data in sync. Changes are reviewed and approved before applying, with profile completeness analytics.
**Benefits:** Automated data accuracy, reduced admin workload, self-service employee profiles

### Lifecycle Automation
**Short:** Automate signature workflows for employee events
**Medium:** Create workflows triggered by employee events (join, leave, move departments). Automatically assign templates, deploy signatures, and notify admins when lifecycle events occur.
**Benefits:** Zero-touch onboarding, consistent offboarding, automated department transitions

### Brand Governance
**Short:** Enterprise brand compliance management
**Medium:** Define brand guidelines (colors, fonts, logos), run compliance audits across all user signatures, and manage brand assets with approval workflows. Enterprise only.
**Benefits:** Brand consistency, compliance scoring, centralized brand control

### Billing Enforcement
**Short:** Subscription-based feature gating across all platform features
**Medium:** All 35+ new API routes now verify the organization's subscription plan before allowing access. Includes field injection prevention on PUT routes and SSRF protection on webhooks.
**Benefits:** Revenue protection, security hardening, consistent plan enforcement

---

## Workflow for Future Releases

1. **Before Release:**
   - Add feature to this document with "🔄 In Progress" status
   - Draft documentation updates

2. **On Release:**
   - Change status to "✅ Live"
   - Deploy documentation updates
   - Update marketing pages

3. **After Release:**
   - Check off documentation checklist items
   - Monitor for user questions/feedback
   - Update FAQs based on support tickets

---

## Last Updated
**Date:** February 16, 2026
**By:** Development Team
