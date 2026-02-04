# HubSpot Employee Filtering Guide

## Problem
By default, HubSpot CRM contains ALL contacts - customers, leads, prospects, partners, AND employees. When syncing to your email signature manager, you only want to sync **employees** who need email signatures.

## Solution Implemented

The sync now filters contacts based on the `contact_type` property in HubSpot. Only contacts marked as employees will be synced.

### How It Works

The sync checks the `contact_type` property and only includes contacts where:
- `contact_type` is not set (backward compatible - syncs all if not using this property)
- `contact_type` = "employee" or "Employee"
- `contact_type` = "team_member" or "Team Member"

All other contacts (customers, leads, etc.) are skipped.

## Setup in HubSpot

### Option 1: Use Custom Contact Type Property (Recommended)

1. **Create a custom property in HubSpot:**
   - Go to Settings → Properties → Contact properties
   - Click "Create property"
   - Property details:
     - **Label**: `Contact Type`
     - **Internal name**: `contact_type`
     - **Field type**: Dropdown select
     - **Options**:
       - Employee
       - Customer
       - Lead
       - Prospect
       - Partner
       - Other

2. **Tag your employees:**
   - Go to Contacts in HubSpot
   - Filter or select employee contacts
   - Bulk edit → Set "Contact Type" to "Employee"

3. **Sync to your app:**
   - Go to Integrations page
   - Click "Sync Contacts"
   - Only contacts with `contact_type = "Employee"` will sync

### Option 2: Use Email Domain Filtering (Alternative)

If you don't want to tag contacts manually, you could filter by email domain:

**In HubSpot:**
- Create a list of contacts where email contains `@yourcompany.com`
- Only employees should have your company email domain

**Note:** This requires code modification to filter by domain instead of contact_type.

### Option 3: Use HubSpot Lists

Create a static or active list in HubSpot called "Employees" and only sync contacts from that list.

**Requires code modification** to use the Lists API instead of Contacts API.

## Verification

After setting up contact filtering:

1. **Check your HubSpot contacts:**
   - Verify employees have `contact_type = "Employee"`
   - Verify customers/leads have different values or no value

2. **Run a sync:**
   - Go to Integrations → HubSpot
   - Click "Sync Contacts"
   - Check the sync count matches your employee count

3. **Verify in your app:**
   - Go to Team page
   - Confirm only employees appear
   - No customers or leads should be listed

## Backward Compatibility

If you don't set the `contact_type` property:
- **All contacts with email addresses will sync** (original behavior)
- This maintains backward compatibility for existing users

To enable filtering:
- Set `contact_type` on at least some contacts
- Only contacts with employee-related values will sync

## Best Practices

### 1. Consistent Tagging
- Tag all employees as "Employee" in HubSpot
- Tag all customers as "Customer"
- This keeps your CRM organized

### 2. Automated Workflows
Create HubSpot workflows to auto-tag contacts:
- When contact email contains `@yourcompany.com` → Set contact_type = "Employee"
- When deal is created → Set contact_type = "Customer"

### 3. Regular Audits
- Periodically review contacts to ensure proper tagging
- Run sync after updating contact types

### 4. Onboarding Process
When adding new employees:
1. Create contact in HubSpot
2. Set contact_type = "Employee"
3. Fill in job title, department, phone
4. Run sync in signature manager
5. Assign signature template

## Alternative Filtering Methods

If `contact_type` doesn't work for your use case, here are alternatives:

### By Lifecycle Stage
Filter contacts where `lifecyclestage = "employee"` (requires custom lifecycle stage)

### By Company Association
Only sync contacts associated with your own company record in HubSpot

### By Custom Property
Create a boolean property `is_employee` and filter by that

### By List Membership
Use HubSpot's Lists API to only sync contacts in an "Employees" list

## Troubleshooting

### All contacts are syncing (including customers)
- **Cause**: `contact_type` property not set on any contacts
- **Solution**: Set `contact_type = "Employee"` on employee contacts in HubSpot

### No contacts are syncing
- **Cause**: No contacts have `contact_type` matching employee values
- **Solution**: Check spelling - must be exactly "employee", "Employee", "team_member", or "Team Member"

### Some employees missing after sync
- **Cause**: Those employees don't have `contact_type` set
- **Solution**: Bulk edit in HubSpot to set contact_type for all employees

### Need different filter criteria
- **Solution**: Modify `apps/web/src/lib/hubspot/crm.ts` line 45-49 to use different property or logic

## Code Reference

The filtering logic is in:
```
apps/web/src/lib/hubspot/crm.ts
```

Lines 42-49 contain the employee filter logic:
```typescript
const isEmployee = !props.contact_type || 
                 props.contact_type === 'employee' || 
                 props.contact_type === 'team_member' ||
                 props.contact_type === 'Employee' ||
                 props.contact_type === 'Team Member';
```

To customize, modify these conditions to match your HubSpot setup.

## Summary

**Quick Setup:**
1. In HubSpot: Create `contact_type` property
2. In HubSpot: Set `contact_type = "Employee"` for all employees
3. In your app: Run "Sync Contacts"
4. Verify: Only employees appear in Team page

This ensures clean data separation between employees (who need signatures) and customers/leads (who don't).
