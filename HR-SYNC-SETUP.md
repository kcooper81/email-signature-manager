# HR Sync Integration Setup Guide

Complete guide for setting up and testing HR system integrations with Siggly.

---

## Supported Providers

1. **BambooHR** - API Key authentication
2. **Gusto** - OAuth 2.0 authentication
3. **Rippling** - OAuth 2.0 authentication
4. **Google Directory** - OAuth 2.0 (via Google Workspace integration)
5. **Microsoft Directory** - OAuth 2.0 (via Microsoft 365 integration)

---

## BambooHR Integration

### Authentication Method
- **Type**: API Key (Basic Auth)
- **Format**: `{API_KEY}:x` (password is literally "x")

### Setup Instructions

#### 1. Create BambooHR Test Account
- Sign up: https://www.bamboohr.com/signup/
- Choose subdomain (e.g., `yourcompany-test`)
- Free trial: 7 days

#### 2. Generate API Key
- Go to: `https://[subdomain].bamboohr.com/settings/api_keys.php`
- Click "+ Add New Key"
- Name: `Siggly HR Sync`
- **Copy the key immediately** (won't be shown again)

#### 3. Add Test Employees
- Navigate to "Employees" → "+ Add Employee"
- Add at least 3-5 employees with:
  - First Name, Last Name
  - Email
  - Job Title
  - Department
  - Work Phone (optional)
  - Mobile Phone (optional)

#### 4. Configure in Siggly
- Go to: Settings → HR & Directory Sync
- Click "Add Integration"
- **Provider**: BambooHR
- **API Key**: [paste your API key]
- **API URL**: Enter one of:
  - Just subdomain: `yourcompany-test`
  - Full URL: `https://yourcompany-test.bamboohr.com`
  - API URL: `https://api.bamboohr.com/api/gateway.php/yourcompany-test`
- **Schedule**: Manual (for testing)
- Click "Add"

#### 5. Test Sync
- Click "Sync Now"
- Verify employees appear in Siggly team list
- Check field mappings are correct

### API Details
- **Base URL**: `https://api.bamboohr.com/api/gateway.php/{subdomain}/v1/`
- **Endpoint**: `/employees/directory`
- **Rate Limit**: 300 requests/minute
- **Auth Header**: `Authorization: Basic {base64(apiKey:x)}`

### Field Mapping
```
BambooHR → Siggly
firstName → first_name
lastName → last_name
workEmail → email
jobTitle → title
department → department
workPhone → phone
mobilePhone → mobile_phone
photoUrl → avatar_url
hireDate → hire_date
status → is_active
```

### Common Issues
- **401 Unauthorized**: Invalid API key
- **404 Not Found**: Incorrect subdomain
- **Empty response**: No employees in directory

---

## Gusto Integration

### Authentication Method
- **Type**: OAuth 2.0
- **Requires**: Client ID, Client Secret, Company ID

### Setup Instructions

#### 1. Create Gusto Developer Account
- Sign up: https://dev.gusto.com
- Create application
- Get Client ID and Client Secret

#### 2. Create Test Company
- In developer portal, create sandbox company
- Add 3-5 test employees with:
  - First Name, Last Name
  - Email
  - Job Title
  - Department
  - Phone Number
  - Start Date

#### 3. Get OAuth Access Token (Manual for Testing)

**Build authorization URL:**
```
https://api.gusto-demo.com/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&response_type=code
```

**Exchange code for token:**
```bash
curl -X POST https://api.gusto-demo.com/oauth/token \
  -d "client_id={CLIENT_ID}" \
  -d "client_secret={CLIENT_SECRET}" \
  -d "code={AUTH_CODE}" \
  -d "grant_type=authorization_code" \
  -d "redirect_uri={REDIRECT_URI}"
```

**Response includes:**
- `access_token` - Use this for API calls
- `refresh_token` - Use to get new access token
- `expires_in` - Token expiration (typically 7200 seconds)
- `company_id` - Your test company ID

#### 4. Configure in Siggly (Temporary Workaround)
- Go to: Settings → HR & Directory Sync
- Click "Add Integration"
- **Provider**: Gusto
- **API Key**: [paste access_token]
- **API URL**: Enter company ID or include "demo" for sandbox:
  - Sandbox: `demo/{COMPANY_ID}`
  - Production: `{COMPANY_ID}`
- **Schedule**: Manual
- Click "Add"

#### 5. Test Sync
- Click "Sync Now"
- Verify employees sync correctly

### API Details
- **Sandbox URL**: `https://api.gusto-demo.com`
- **Production URL**: `https://api.gusto.com`
- **Endpoint**: `/v1/companies/{company_id}/employees`
- **Auth Header**: `Authorization: Bearer {access_token}`

### Field Mapping
```
Gusto → Siggly
first_name → first_name
last_name → last_name
email → email
jobs[0].title → title
department.title → department
home_phone → phone
date_of_hire → hire_date
terminated → !is_active
```

### Webhook Support (Recommended)
Gusto supports webhooks for real-time sync:
- **Events**: `employee.created`, `employee.updated`, `employee.terminated`
- **Webhook URL**: `https://siggly.io/api/webhooks/gusto`
- **Setup**: In Gusto developer portal → Webhooks

### Common Issues
- **401 Unauthorized**: Expired access token (refresh needed)
- **403 Forbidden**: Invalid company_id or insufficient permissions
- **Token expires**: Access tokens expire in ~2 hours

### Known Limitations
- Current implementation requires manual OAuth token management
- No automatic token refresh (coming soon)
- Webhook endpoint not yet implemented

---

## Rippling Integration

### Authentication Method
- **Type**: OAuth 2.0
- **Requires**: API Token (Bearer token)

### Setup Instructions

#### 1. Create Rippling Account
- Contact Rippling for developer/sandbox access
- Rippling doesn't have a public self-service developer portal

#### 2. Get API Token
- Work with Rippling support to get OAuth credentials
- Generate access token via OAuth flow

#### 3. Configure in Siggly
- Go to: Settings → HR & Directory Sync
- Click "Add Integration"
- **Provider**: Rippling
- **API Key**: [paste access token]
- **API URL**: Leave blank (uses default)
- **Schedule**: Manual
- Click "Add"

### API Details
- **Base URL**: `https://api.rippling.com/platform/api/`
- **Endpoint**: `/employees`
- **Auth Header**: `Authorization: Bearer {token}`

### Field Mapping
```
Rippling → Siggly
first_name → first_name
last_name → last_name
work_email → email
title → title
department.name → department
phone_number → phone
start_date → hire_date
employment_status → is_active
```

### Common Issues
- **401 Unauthorized**: Invalid or expired token
- **Limited documentation**: Rippling API docs are not publicly available

---

## Google Directory Integration

### Authentication Method
- **Type**: OAuth 2.0 (via Google Workspace)
- **Uses**: Existing Google Workspace connection

### Setup Instructions

#### 1. Connect Google Workspace
- Go to: Settings → Integrations → Google Workspace
- Click "Connect Google Workspace"
- Complete OAuth flow
- Grant directory read permissions

#### 2. Enable HR Sync
- Go to: Settings → HR & Directory Sync
- Click "Add Integration"
- **Provider**: Google Directory
- No API key needed (uses existing OAuth connection)
- **Schedule**: Daily or Hourly
- Click "Add"

### API Details
- **Uses**: Google Admin SDK Directory API
- **Endpoint**: `https://admin.googleapis.com/admin/directory/v1/users`
- **Scopes Required**:
  - `https://www.googleapis.com/auth/admin.directory.user.readonly`
  - `https://www.googleapis.com/auth/admin.directory.orgunit.readonly`

### Field Mapping
```
Google Directory → Siggly
name.givenName → first_name
name.familyName → last_name
primaryEmail → email
organizations[0].title → title
organizations[0].department → department
phones[0].value → phone
```

### Common Issues
- **403 Forbidden**: Missing directory read permissions
- **Domain-wide delegation**: May be required for service accounts

---

## Microsoft Directory Integration

### Authentication Method
- **Type**: OAuth 2.0 (via Microsoft 365)
- **Uses**: Existing Microsoft 365 connection

### Setup Instructions

#### 1. Connect Microsoft 365
- Go to: Settings → Integrations → Microsoft 365
- Click "Connect Microsoft 365"
- Complete OAuth flow
- Grant directory read permissions

#### 2. Enable HR Sync
- Go to: Settings → HR & Directory Sync
- Click "Add Integration"
- **Provider**: Microsoft Directory
- No API key needed (uses existing OAuth connection)
- **Schedule**: Daily or Hourly
- Click "Add"

### API Details
- **Uses**: Microsoft Graph API
- **Endpoint**: `https://graph.microsoft.com/v1.0/users`
- **Scopes Required**:
  - `User.Read.All`
  - `Directory.Read.All`

### Field Mapping
```
Microsoft Graph → Siggly
givenName → first_name
surname → last_name
mail → email
jobTitle → title
department → department
mobilePhone → phone
```

### Common Issues
- **403 Forbidden**: Missing directory read permissions
- **Admin consent**: May require tenant admin approval

---

## General Testing Checklist

### Initial Sync
- [ ] All employees sync successfully
- [ ] Employee count matches HR system
- [ ] Names are correct (first + last)
- [ ] Emails are correct
- [ ] Job titles are correct
- [ ] Departments are correct
- [ ] Phone numbers sync (if provided)

### Update Test
- [ ] Edit employee in HR system (change title)
- [ ] Trigger sync in Siggly
- [ ] Verify changes appear in Siggly

### New Employee Test
- [ ] Add new employee in HR system
- [ ] Trigger sync
- [ ] Verify new employee appears in Siggly
- [ ] Check all fields populated correctly

### Removed Employee Test
- [ ] Deactivate/remove employee in HR system
- [ ] Trigger sync
- [ ] Verify employee is marked inactive in Siggly

### Error Handling Test
- [ ] Test with invalid API key/token
- [ ] Test with expired token (OAuth providers)
- [ ] Verify error messages are clear
- [ ] Check sync status shows error state

---

## Sync Configuration Options

### Schedule Types
- **Manual**: Sync only when "Sync Now" is clicked
- **Hourly**: Automatic sync every hour
- **Daily**: Automatic sync once per day (midnight UTC)
- **Weekly**: Automatic sync once per week (Sunday midnight UTC)
- **Realtime**: Webhook-based instant sync (Enterprise only)

### Conflict Resolution
- **HR Wins**: HR system data always overwrites Siggly data
- **Siggly Wins**: Siggly data is preserved, HR changes ignored
- **Manual**: Changes queued for admin review

### Auto-Apply Settings
- **Auto-apply Changes**: Automatically apply all detected changes
- **Sync New Users**: Automatically create new employees
- **Sync Deactivated**: Mark terminated employees as inactive

---

## Troubleshooting

### Common Errors

**"Failed to fetch HR data"**
- Check API key/token is valid
- Verify API URL is correct
- Check network connectivity
- Review provider-specific rate limits

**"No employees found"**
- Verify employees exist in HR system
- Check API permissions include employee read access
- Ensure employees are in "active" status

**"Authentication failed"**
- Regenerate API key/token
- For OAuth: Check token hasn't expired
- Verify credentials are correct

**"Rate limit exceeded"**
- Reduce sync frequency
- Contact provider for rate limit increase
- Implement exponential backoff

### Debug Mode
To enable detailed logging:
1. Set environment variable: `HR_SYNC_DEBUG=true`
2. Check server logs for detailed API responses
3. Review sync result JSON in database

---

## Future Enhancements

### Planned Features
- [ ] OAuth flow UI for Gusto and Rippling
- [ ] Automatic token refresh for OAuth providers
- [ ] Webhook endpoints for real-time sync
- [ ] Field mapping customization UI
- [ ] Sync conflict resolution UI
- [ ] Detailed sync history and audit logs
- [ ] Support for custom fields
- [ ] Bi-directional sync (Siggly → HR system)

### Additional Providers (Roadmap)
- ADP Workforce Now
- Workday
- Namely
- Zenefits
- Paychex
- TriNet

---

## API Reference

### Sync Configuration Object
```typescript
{
  id: string;
  organization_id: string;
  provider: 'bamboohr' | 'gusto' | 'rippling' | 'google' | 'microsoft';
  schedule_type: 'manual' | 'hourly' | 'daily' | 'weekly' | 'realtime';
  field_mapping: Record<string, string>;
  conflict_resolution: 'hr_wins' | 'siggly_wins' | 'ask_admin';
  auto_apply_changes: boolean;
  sync_new_users: boolean;
  sync_deactivated: boolean;
  api_key: string | null;
  api_url: string | null;
  last_sync_at: string | null;
  last_sync_status: 'success' | 'failed' | null;
  is_active: boolean;
}
```

### Sync Result Object
```typescript
{
  totalRecords: number;
  created: number;
  updated: number;
  deactivated: number;
  pendingReview: number;
  errors: string[];
}
```

---

## Support

For issues or questions:
- Check this documentation first
- Review provider-specific API documentation
- Contact support@siggly.io
- Include sync configuration ID and error messages
