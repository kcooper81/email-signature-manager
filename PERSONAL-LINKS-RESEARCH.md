# Personal Links Integration Research

## How Competitors Handle Per-User Links

### Common Personal Links in Email Signatures

Based on competitor analysis (Exclaimer, CodeTwo, WiseStamp), these are the most common per-user links:

1. **Calendly / Meeting Schedulers**
   - Each user has their own scheduling URL
   - Example: `calendly.com/sarah-johnson`
   - **Implementation:** Simple URL field, no OAuth needed

2. **LinkedIn Profile**
   - Each user has their own LinkedIn profile
   - Example: `linkedin.com/in/sarah-johnson`
   - **Implementation:** URL field or auto-generate from name

3. **Twitter/X Profile**
   - Personal Twitter handles
   - Example: `twitter.com/sarahjohnson` or `x.com/sarahjohnson`
   - **Implementation:** URL field or handle field

4. **Personal Website/Portfolio**
   - Freelancers, consultants, executives
   - Example: `sarahjohnson.com`
   - **Implementation:** Simple URL field

5. **GitHub Profile**
   - Developers, technical teams
   - Example: `github.com/sarahjohnson`
   - **Implementation:** URL field or username field

6. **Instagram**
   - Creative professionals, marketing teams
   - Example: `instagram.com/sarahjohnson`
   - **Implementation:** URL field or handle field

7. **Facebook Profile/Page**
   - Less common in professional signatures
   - Example: `facebook.com/sarahjohnson`
   - **Implementation:** URL field

8. **YouTube Channel**
   - Content creators, educators
   - Example: `youtube.com/@sarahjohnson`
   - **Implementation:** URL field

9. **TikTok**
   - Marketing teams, younger demographics
   - Example: `tiktok.com/@sarahjohnson`
   - **Implementation:** URL field or handle field

10. **WhatsApp Business**
    - International teams, customer support
    - Example: `wa.me/1234567890`
    - **Implementation:** Phone number field

## Competitor Approaches

### Exclaimer
- **Approach:** Custom fields for each social/personal link
- **Fields:** LinkedIn, Twitter, Facebook, Calendly, etc.
- **Method:** Users paste URLs or handles
- **No OAuth:** All manual entry

### CodeTwo
- **Approach:** Social media block with URL fields
- **Fields:** LinkedIn, Twitter, Facebook, Instagram
- **Method:** Paste full URLs
- **No OAuth:** Manual entry only

### WiseStamp
- **Approach:** Social icons with URL fields
- **Fields:** 20+ social networks supported
- **Method:** Paste URLs or handles
- **Auto-icons:** Automatically shows correct icon based on URL

## Recommended Implementation

### Database Schema

Add to `users` table:
```sql
-- Personal/Professional Links
calendly_url TEXT,
linkedin_url TEXT,
twitter_url TEXT,
github_url TEXT,
personal_website TEXT,
instagram_url TEXT,
facebook_url TEXT,
youtube_url TEXT,
tiktok_url TEXT,
whatsapp_number TEXT
```

### Dynamic Field Placeholders

Support these in signature templates:
- `{{calendly_link}}` - User's Calendly URL
- `{{linkedin_url}}` - User's LinkedIn profile
- `{{twitter_url}}` - User's Twitter/X profile
- `{{github_url}}` - User's GitHub profile
- `{{personal_website}}` - User's personal website
- `{{instagram_url}}` - User's Instagram
- `{{facebook_url}}` - User's Facebook
- `{{youtube_url}}` - User's YouTube channel
- `{{tiktok_url}}` - User's TikTok
- `{{whatsapp_link}}` - WhatsApp click-to-chat link

### User Experience

**For Admins:**
1. Go to Team → Click user → Edit
2. See "Personal Links" section
3. Paste URLs for each platform
4. Save

**For Users (Self-Service):**
1. Go to Settings → Profile
2. See "Personal Links" section
3. Paste their own URLs
4. Save

**In Templates:**
1. Add text or button block
2. Use placeholder: `{{calendly_link}}`
3. Placeholder replaced with user's actual URL when deployed

### Validation

- **URL Format:** Validate URLs are properly formatted
- **Optional:** All fields are optional
- **Sanitization:** Clean URLs (remove tracking params, etc.)
- **Preview:** Show preview of how it will appear

### UI Components

**Social Icons Block (Future):**
- Drag "Social Links" block into signature
- Automatically shows icons for any URLs user has filled in
- Icons link to user's profiles
- Responsive and email-client safe

## Why This Approach is Better

### vs OAuth Integration

| OAuth Approach | Simple URL Approach |
|----------------|---------------------|
| Complex setup | Paste URL, done |
| Requires API credentials | No setup needed |
| Token management | No tokens |
| Rate limits | No API calls |
| Can break if API changes | Always works |
| Organization-wide only | Per-user by default |
| Requires admin setup | Users can self-manage |

### Benefits

1. **Simplicity:** Users just paste their URL
2. **Flexibility:** Works with any platform
3. **No Dependencies:** No API integrations to maintain
4. **User Control:** Each user manages their own links
5. **No Limits:** No rate limits or quotas
6. **Future-Proof:** Works even if platforms change APIs
7. **Privacy:** No OAuth permissions needed

### When OAuth Makes Sense

Keep OAuth integration as **optional advanced feature** for:
- **Organization-wide Calendly** (single company account)
- **Event type management** (fetch available event types)
- **Auto-refresh** (keep event types in sync)
- **Enterprise customers** who want centralized control

But make the **simple URL approach the default** for most users.

## Implementation Priority

### Phase 1: Core Personal Links (Week 1)
- Add database fields for top 5 links
- Update user profile UI
- Add to team management
- Update signature renderer
- Test with real URLs

### Phase 2: Extended Links (Week 2)
- Add remaining social platforms
- Add validation and sanitization
- Add URL preview
- Update help docs

### Phase 3: Social Icons Block (Future)
- Visual social media icon block
- Auto-detect which icons to show
- Email-client safe rendering
- Customizable icon styles

## Migration Strategy

For existing OAuth-based Calendly integration:
1. **Keep it** as an advanced option
2. **Add** simple URL field as primary method
3. **Document** both approaches
4. **Default** to simple URL for new users
5. **Migrate** existing users to prefer URL field

## Marketing Angle

**Simple is Better:**
- "Add your Calendly link in 10 seconds"
- "No complex OAuth setup required"
- "Just paste your URL and you're done"
- "Works with any scheduling tool, not just Calendly"

**Flexibility:**
- "Support for 10+ social platforms"
- "Add any personal or professional link"
- "Each team member controls their own links"
