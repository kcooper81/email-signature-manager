# How Competitors Handle Per-User Personal Links

## Research Summary

Based on analysis of Exclaimer, CodeTwo, and WiseStamp, here's how the leading email signature management platforms handle per-user personal links like Calendly, LinkedIn, etc.

---

## 1. Exclaimer's Approach

### Method: Custom Attributes + Dynamic Fields

**How it works:**
1. **Store per-user data** in custom attributes (Active Directory, CSV upload, or manual entry)
2. **Create dynamic hyperlinks** using placeholders that reference custom attributes
3. **Template uses** static URL part + dynamic field placeholder
4. **Each user gets** their unique URL when signature is deployed

**Example for Calendly:**
- Static part: `https://calendly.com/`
- Dynamic part: `{CustomAttribute.CalendlyUsername}` (e.g., "sarah-johnson")
- Result: `https://calendly.com/sarah-johnson`

**Data Storage Options:**
1. **Active Directory custom attributes** - Synced from AD
2. **User Details Editor (UDE)** - Self-service portal where employees can edit their own details
3. **CSV upload** - Bulk import via CSV file
4. **Manual entry** - Admin enters data per user

**Key Features:**
- ✅ **Self-service portal** (User Details Editor) where employees can update their own links
- ✅ **Admin control** over which fields employees can edit
- ✅ **Conditional visibility** - Only show element if field is populated
- ✅ **Supports any URL-based service** (Calendly, Microsoft Bookings, Chili Piper, etc.)

**Source:** [Exclaimer Support - Per-user calendar booking links](https://support.exclaimer.com/hc/en-gb/articles/9092472831389)

---

## 2. WiseStamp's Approach

### Method: Employee Hub + Permission-Based Editing

**How it works:**
1. **Employee Hub** - Self-service portal for employees (hub.wisestamp.com)
2. **Admin controls permissions** - Decide which fields employees can edit
3. **Three permission levels:**
   - Allow employees to edit all details
   - Allow employees to edit some details (admin selects which)
   - Do not allow employees to edit (admin-only)
4. **Employees access via** signature link email or Chrome extension

**Employee Hub Features:**
- View all assigned signatures
- Edit personal details (if permitted)
- Set default signatures for new/reply/forward emails
- Access installation instructions
- Preview signatures in actual size

**Data Entry Methods:**
1. **Employee self-service** - Employees edit their own info via Employee Hub
2. **Admin manual entry** - Admin edits on Employees page
3. **Directory sync** - Import from Google Workspace or Microsoft Entra ID
4. **Invite system** - Send signature link to employees to complete their profile

**Key Features:**
- ✅ **Dedicated employee portal** with branded experience
- ✅ **Granular permissions** - Control which fields are editable per employee
- ✅ **Locked fields** - Visual indicator for admin-only fields
- ✅ **Bulk invite** - Send signature links to multiple employees at once
- ✅ **Custom domain** - Can use custom domain for Employee Hub (e.g., signatures.company.com)

**Source:** [WiseStamp Employee Hub Documentation](https://support.wisestamp.com/hc/en-us/articles/24790025109789)

---

## 3. CodeTwo's Approach

### Method: Meeting Link Elements + User Fields

**How it works:**
1. **Built-in meeting link elements** for Calendly, Microsoft Bookings, etc.
2. **User-specific fields** store individual booking URLs
3. **Template references** user fields for dynamic replacement
4. **No OAuth required** - All manual URL entry

**Key Features:**
- ✅ **Pre-built elements** for popular scheduling tools
- ✅ **Simple URL fields** per user
- ✅ **Admin manages** all user data
- ❌ **No self-service portal** for employees

**Note:** CodeTwo's documentation was not fully accessible, but based on available info, they use a simpler admin-only approach.

---

## Common Patterns Across All Competitors

### ✅ What They All Do:

1. **Store URLs per user** - Not organization-wide
2. **Use placeholders** in templates (e.g., `{calendly_url}`)
3. **Support multiple link types** - Calendly, LinkedIn, Twitter, personal websites, etc.
4. **No OAuth required** - Simple URL paste approach
5. **Optional fields** - Links only show if populated
6. **Admin can manage** all employee data

### 🎯 Best Practices:

1. **Exclaimer & WiseStamp** offer self-service portals (better UX)
2. **Permission-based editing** - Admin controls what employees can change
3. **Bulk operations** - Import via CSV, sync from directory, bulk invites
4. **Conditional visibility** - Only show links if user has them
5. **Multiple data sources** - Directory sync, manual entry, self-service

---

## Recommended Implementation for Siggly

### Phase 1: Core Infrastructure (Week 1)

**Database Schema:**
```sql
ALTER TABLE users ADD COLUMN calendly_url TEXT;
ALTER TABLE users ADD COLUMN linkedin_url TEXT;
ALTER TABLE users ADD COLUMN twitter_url TEXT;
ALTER TABLE users ADD COLUMN github_url TEXT;
ALTER TABLE users ADD COLUMN personal_website TEXT;
ALTER TABLE users ADD COLUMN instagram_url TEXT;
ALTER TABLE users ADD COLUMN facebook_url TEXT;
ALTER TABLE users ADD COLUMN youtube_url TEXT;
```

**Signature Renderer:**
- Support `{{calendly_url}}`, `{{linkedin_url}}`, etc.
- Pull from user's profile during rendering
- Only render if field is populated

### Phase 2: Admin Management (Week 1)

**Team Page Enhancement:**
- Add "Personal Links" section to Edit User modal
- Admin can paste URLs for any team member
- Works for both authenticated users and synced employees

### Phase 3: Self-Service Portal (Week 2)

**Employee Hub / Profile Settings:**
- Authenticated users can edit their own links
- Settings → Profile → Personal Links section
- Simple paste-URL interface
- Real-time preview

**Permission System:**
- Admin can control which fields are editable
- Lock certain fields (admin-only)
- Per-field or all-or-nothing permissions

### Phase 4: Advanced Features (Future)

**Bulk Operations:**
- CSV import for personal links
- Bulk invite employees to complete profiles

**Conditional Visibility:**
- Only show social icons if URLs are populated
- Template-level visibility rules

**OAuth Integration (Optional):**
- Keep existing Calendly OAuth as advanced feature
- For organizations wanting centralized event type management
- Make it opt-in, not required

---

## Key Differences from Current OAuth Approach

| Current (OAuth) | Recommended (URL Fields) |
|----------------|-------------------------|
| Organization-wide | Per-user |
| Requires OAuth setup | Paste URL, done |
| Admin-only setup | Self-service option |
| API dependencies | No API needed |
| Token management | No tokens |
| Single Calendly account | Each user has their own |
| Complex | Simple |

---

## Migration Strategy

1. **Add URL fields** to users table
2. **Keep OAuth integration** as optional advanced feature
3. **Default to URL fields** for new users
4. **Document both approaches** in help docs
5. **Migrate existing users** to prefer URL fields over OAuth

---

## Marketing Angle

**Simplicity:**
- "Add your Calendly link in 10 seconds"
- "No complex setup required"
- "Each team member controls their own links"

**Flexibility:**
- "Works with any scheduling tool"
- "Support for 10+ social platforms"
- "Self-service or admin-managed"

**Control:**
- "Admins control what employees can edit"
- "Lock sensitive fields"
- "Bulk import or individual entry"

---

## Conclusion

**All major competitors use per-user URL fields**, not organization-wide OAuth. They provide:
1. Simple URL paste interface
2. Self-service portals for employees
3. Admin override capabilities
4. Permission-based editing
5. Support for multiple link types

**Recommendation:** Implement per-user URL fields with dual-access (self-service + admin-managed) to match industry standards and user expectations.
