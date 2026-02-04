# Organization Domain Logic

## Problem Identified
The organization domain field was hardcoded to only work with Google Workspace, with the message "Domain is set from your Google Workspace". This created several issues:

1. **Limited Integration Support**: Didn't account for Microsoft 365, HubSpot, or other integrations
2. **No Manual Entry**: Users without integrations couldn't set their domain
3. **Poor UX**: Misleading message when using different integrations
4. **Inflexible Logic**: Assumed all users would use Google Workspace

## Solution Implemented

### 1. Dynamic Domain Source Tracking
Added `domainSource` state to track where the domain comes from:
- `'google_workspace'` - Synced from Google Workspace
- `'microsoft_365'` - Synced from Microsoft 365
- `'hubspot'` - Synced from HubSpot
- `'manual'` - User entered manually
- `null` - Not set yet

### 2. Integration Connection Tracking
Added columns to `organizations` table:
- `google_workspace_connected` (BOOLEAN)
- `microsoft_365_connected` (BOOLEAN)
- `hubspot_connected` (BOOLEAN)
- `integration_synced_at` (TIMESTAMP)

### 3. Smart Domain Field Behavior

**When Integration is Connected:**
- Domain field is **disabled** (read-only)
- Shows integration-specific message
- Domain is synced from the integration
- Cannot be manually edited

**When No Integration:**
- Domain field is **enabled** (editable)
- User can enter domain manually
- Shows helpful placeholder text
- Saves to database when organization is saved

### 4. Dynamic UI Messages

The UI now shows context-aware messages:

```typescript
// Google Workspace
"Domain is synced from Google Workspace integration"

// Microsoft 365
"Domain is synced from Microsoft 365 integration"

// HubSpot
"Domain is synced from HubSpot integration"

// Manual Entry
"Enter your organization's email domain (e.g., company.com)"

// Not Set
"Connect an integration or enter manually"
```

## Database Schema

### Organizations Table Updates

```sql
ALTER TABLE organizations
ADD COLUMN google_workspace_connected BOOLEAN DEFAULT false,
ADD COLUMN microsoft_365_connected BOOLEAN DEFAULT false,
ADD COLUMN hubspot_connected BOOLEAN DEFAULT false,
ADD COLUMN integration_synced_at TIMESTAMP WITH TIME ZONE;
```

## Logic Flow

### On Page Load:
1. Load organization data including integration flags
2. Check which integration is connected
3. Set `domainSource` based on active integration
4. Enable/disable domain field accordingly
5. Show appropriate help text

### On Save:
1. Always save organization name
2. **Only save domain if `domainSource === 'manual'`**
3. If integration is connected, domain is read-only and not saved
4. This prevents manual edits from overwriting synced data

### When Integration Connects:
1. Integration service sets `{integration}_connected = true`
2. Integration service syncs domain from provider
3. Domain field becomes read-only
4. `domainSource` updates to reflect integration

### When Integration Disconnects:
1. Integration service sets `{integration}_connected = false`
2. Domain field becomes editable
3. `domainSource` changes to `'manual'`
4. User can now edit domain

## Use Cases

### Case 1: Google Workspace User
- Connects Google Workspace
- Domain auto-synced from Google
- Domain field disabled
- Shows: "Domain is synced from Google Workspace integration"

### Case 2: Microsoft 365 User
- Connects Microsoft 365
- Domain auto-synced from Microsoft
- Domain field disabled
- Shows: "Domain is synced from Microsoft 365 integration"

### Case 3: HubSpot User
- Connects HubSpot
- Domain auto-synced from HubSpot
- Domain field disabled
- Shows: "Domain is synced from HubSpot integration"

### Case 4: No Integration User
- No integration connected
- Domain field enabled
- User types "company.com"
- Saves to database
- Shows: "Enter your organization's email domain (e.g., company.com)"

### Case 5: Multiple Integrations (Future)
- Priority order: Google Workspace > Microsoft 365 > HubSpot
- First connected integration wins
- Domain synced from highest priority integration

## Code Implementation

### State Management
```typescript
const [orgDomain, setOrgDomain] = useState('');
const [domainSource, setDomainSource] = useState<
  'manual' | 'google_workspace' | 'microsoft_365' | 'hubspot' | null
>(null);
```

### Domain Source Detection
```typescript
// Determine domain source based on integration
if (orgData.google_workspace_connected) {
  setDomainSource('google_workspace');
} else if (orgData.microsoft_365_connected) {
  setDomainSource('microsoft_365');
} else if (orgData.hubspot_connected) {
  setDomainSource('hubspot');
} else {
  setDomainSource('manual');
}
```

### Conditional Save
```typescript
const updateData: any = {
  name: orgName,
};

// Only update domain if it's manually set (not from integration)
if (domainSource === 'manual') {
  updateData.domain = orgDomain;
}
```

### Dynamic UI
```typescript
<Input
  value={orgDomain}
  onChange={(e) => setOrgDomain(e.target.value)}
  disabled={domainSource !== 'manual' && domainSource !== null}
  className={domainSource !== 'manual' && domainSource !== null ? 'bg-gray-50' : ''}
  placeholder="company.com"
/>
```

## Benefits

1. **Flexible**: Works with any integration or no integration
2. **Clear**: Users understand where domain comes from
3. **Safe**: Prevents accidental overwrites of synced data
4. **Scalable**: Easy to add new integrations
5. **User-Friendly**: Appropriate messaging for each scenario

## Future Enhancements

1. **Domain Validation**: Validate domain format before saving
2. **Domain Verification**: Verify domain ownership via DNS
3. **Multiple Domains**: Support organizations with multiple domains
4. **Integration Priority**: Allow users to choose which integration is primary
5. **Sync Status**: Show when domain was last synced
6. **Conflict Resolution**: Handle domain conflicts between integrations

## Migration Required

```bash
# Apply the integration tracking migration
supabase db push

# Or manually run:
# apps/web/supabase/migrations/add_integration_tracking.sql
```

## Testing Checklist

- [ ] User with Google Workspace sees correct message
- [ ] User with Microsoft 365 sees correct message
- [ ] User with HubSpot sees correct message
- [ ] User with no integration can edit domain
- [ ] Domain saves correctly when manual
- [ ] Domain doesn't save when from integration
- [ ] Domain field is disabled when from integration
- [ ] Domain field is enabled when manual
- [ ] Correct help text shows for each scenario
- [ ] Domain persists after page refresh
