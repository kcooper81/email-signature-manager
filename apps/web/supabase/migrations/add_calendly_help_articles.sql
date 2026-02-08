-- Insert Calendly help articles into help_articles table
-- Run this after connecting to your Supabase database

-- Article 1: How to Connect Calendly
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'How to Connect Calendly to Your Email Signatures',
  'connect-calendly-integration',
  'Calendly integration allows you to add meeting scheduling links directly to your email signatures, making it easy for recipients to book time with you.

**Prerequisites:**
- A Calendly account (free or paid)
- At least one event type created in Calendly
- Admin access to Siggly

**Step 1: Create Calendly OAuth App**

1. Log in to your Calendly account
2. Go to https://calendly.com/integrations/api_webhooks
3. Click "Register New Application"
4. Fill in the details:
   - **Name:** Siggly Email Signatures (or your preferred name)
   - **Website:** https://siggly.io
   - **Redirect URI:** https://siggly.io/api/integrations/calendly/callback
5. Save your Client ID and Client Secret (you''ll need these for production)

**Step 2: Connect Calendly in Siggly**

1. Navigate to **Integrations** in your Siggly dashboard
2. Find the **Calendly** card
3. Click **Connect Calendly**
4. You''ll be redirected to Calendly to authorize the connection
5. Click **Authorize** to grant Siggly access to your event types
6. You''ll be redirected back to Siggly with a success message

**Step 3: Verify Connection**

Once connected, you should see:
- "Connected" status on the Calendly card
- The date you connected
- A button to view your event types

Click **View Event Types** to see all your Calendly event types that have been synced.

**What Gets Synced:**
- Your Calendly scheduling URL
- All active event types (name, duration, slug, scheduling URL)
- Event type metadata for dynamic linking

**Next Steps:**
- Add Calendly links to your signature templates
- Deploy signatures with scheduling links
- Track meeting bookings from your signatures',
  'Integrations',
  'guide',
  true,
  true,
  10,
  true
);

-- Article 2: Adding Calendly Links to Signatures
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Adding Calendly Links to Email Signatures',
  'add-calendly-links-signatures',
  'Once you''ve connected Calendly, you can add scheduling links to your email signatures using dynamic placeholders.

**Available Placeholders:**

1. **{{calendly_link}}** - Your main Calendly scheduling URL
   - Example: https://calendly.com/yourname
   - Use this for a general "schedule with me" link

2. **{{calendly_default}}** - Your default event type link
   - Links to your primary event type
   - Great for consistent booking experiences

3. **{{calendly_event:slug}}** - Link to a specific event type
   - Replace "slug" with your event type''s slug
   - Example: {{calendly_event:30min}} or {{calendly_event:discovery-call}}
   - Perfect for targeted scheduling (sales calls, support sessions, etc.)

**How to Add to Signatures:**

**Method 1: Text Link**

1. Go to **Templates** → Create or edit a template
2. Add a **Text Block**
3. Type: "Schedule a meeting: {{calendly_link}}"
4. The placeholder will be replaced with your actual Calendly URL when deployed

**Method 2: Button Link**

1. Add a **Button Block** to your template
2. Set button text: "Book a Call" or "Schedule Time"
3. Set button URL: {{calendly_link}}
4. Customize button colors to match your brand
5. The button will link to your Calendly page when clicked

**Method 3: Specific Event Type**

1. Add a **Text Block** or **Button Block**
2. Use: {{calendly_event:30min}} (replace with your event slug)
3. This links directly to that specific event type
4. Great for sales teams with different meeting types

**Example Signature Template:**

```
Best regards,
{{full_name}}
{{job_title}}
{{company}}

📅 Schedule a 30-minute call: {{calendly_event:30min}}
```

**Tips:**
- Use emoji (📅 or 🗓️) to make the link stand out
- Keep the call-to-action clear: "Schedule a call", "Book time", "Let''s chat"
- Test the link after deployment to ensure it works
- Different team members can have different event types in their signatures',
  'Integrations',
  'tutorial',
  true,
  true,
  11,
  true
);

-- Article 3: Managing Calendly Event Types
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Managing Calendly Event Types',
  'manage-calendly-event-types',
  'Your Calendly event types are automatically synced when you connect Calendly. Here''s how to manage them.

**Viewing Event Types:**

1. Go to **Integrations**
2. Find the Calendly card (should show "Connected")
3. Click **View Event Types**
4. You''ll see a list of all your active event types with:
   - Event name
   - Duration
   - Event slug (used in placeholders)

**Refreshing Event Types:**

If you add, remove, or modify event types in Calendly:

1. Go to **Integrations** → Calendly
2. Click **Refresh Event Types**
3. Your event types will be re-synced from Calendly
4. Any signatures using Calendly placeholders will automatically use the updated data

**Finding Event Slugs:**

To use a specific event type in signatures, you need its slug:

1. View your event types in Siggly
2. Look for the event you want to use
3. The slug is shown next to the event name
4. Use it like: {{calendly_event:your-slug-here}}

Alternatively, check your Calendly URL:
- If your event URL is: calendly.com/yourname/30min
- The slug is: 30min

**Common Event Types:**
- 30min, 15min, 60min (duration-based)
- discovery-call, demo, consultation (purpose-based)
- quick-chat, coffee-chat (informal meetings)

**Best Practices:**
- Keep event names clear and professional
- Use consistent slug naming (lowercase, hyphens)
- Refresh event types after making changes in Calendly
- Test links after refreshing to ensure they work',
  'Integrations',
  'guide',
  false,
  true,
  12,
  true
);

-- Article 4: Troubleshooting Calendly
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Troubleshooting Calendly Integration',
  'troubleshoot-calendly-integration',
  '**Q: My Calendly link isn''t showing in deployed signatures**

A: Check these common issues:
1. Ensure Calendly is connected (Integrations page should show "Connected")
2. Verify the placeholder syntax is correct: {{calendly_link}}
3. Make sure there are no extra spaces in the placeholder
4. Try refreshing your event types
5. Redeploy the signature after connecting Calendly

**Q: I see {{calendly_link}} instead of the actual URL**

A: This means the placeholder wasn''t replaced. Possible causes:
- Calendly isn''t connected for your organization
- The signature was deployed before Calendly was connected
- There''s a typo in the placeholder (check spelling and brackets)

Solution: Connect Calendly, then redeploy the signature.

**Q: My specific event type link isn''t working**

A: When using {{calendly_event:slug}}:
1. Verify the slug matches exactly (case-sensitive)
2. Check that the event type exists in Calendly
3. Refresh event types in Siggly
4. Make sure the event is active in Calendly

**Q: How do I disconnect Calendly?**

A: 
1. Go to Integrations → Calendly
2. Click **Disconnect**
3. Confirm the disconnection
4. Note: Existing signatures with Calendly links will have the placeholder removed

**Q: Can different team members have different Calendly links?**

A: Currently, Calendly integration is organization-wide. All team members share the same Calendly account connection. However, you can:
- Use different event types for different roles
- Create role-specific templates with different event type slugs
- Assign templates based on department or role

**Q: Do I need a paid Calendly account?**

A: No, the free Calendly plan works perfectly with Siggly. However, paid plans offer:
- More event types
- Custom branding
- Advanced scheduling features
- Team scheduling (for Calendly Teams plan)

**Q: What happens if my Calendly token expires?**

A: Siggly automatically refreshes your Calendly token in the background. You shouldn''t experience any interruptions. If you do encounter issues:
1. Try refreshing event types
2. If that fails, disconnect and reconnect Calendly

**Q: Can I track how many meetings are booked from my signatures?**

A: Currently, meeting bookings are tracked in Calendly, not Siggly. Check your Calendly dashboard for:
- Scheduled events
- Booking sources
- Event type analytics

Future versions may include click tracking for Calendly links.

**Q: The OAuth connection fails with "redirect_uri_mismatch"**

A: This means your Calendly OAuth app redirect URI doesn''t match. Ensure:
- Redirect URI in Calendly app: https://siggly.io/api/integrations/calendly/callback
- No trailing slashes
- Exact match (case-sensitive)
- Using HTTPS, not HTTP',
  'Integrations',
  'faq',
  false,
  true,
  13,
  true
);

-- Article 5: Calendly Best Practices
INSERT INTO help_articles (
  title,
  slug,
  content,
  category,
  article_type,
  show_in_marketing,
  show_in_dashboard,
  sort_order,
  is_published
) VALUES (
  'Calendly Integration Best Practices',
  'calendly-integration-best-practices',
  'Get the most out of your Calendly integration with these proven strategies.

**1. Choose the Right Event Type**

Match event types to your team''s needs:
- **Sales:** Use "discovery-call" or "demo" for prospects
- **Support:** Use "support-call" or "troubleshooting" for customers
- **Executives:** Use "executive-briefing" or "strategy-call"
- **General:** Use "30min" or "coffee-chat" for networking

**2. Craft Compelling CTAs**

Instead of just "Calendly link", use:
- ✅ "Schedule a 30-minute discovery call"
- ✅ "Book your free consultation"
- ✅ "Let''s find a time to chat"
- ✅ "Grab a spot on my calendar"
- ❌ "Click here"
- ❌ "Calendly"

**3. Use Buttons for Higher Visibility**

Buttons get more clicks than text links:
- Use contrasting colors (blue, green, orange)
- Keep text short: "Book a Call" or "Schedule Time"
- Place near the end of your signature
- Make it stand out visually

**4. Segment by Role**

Create different templates for different roles:
- **Sales reps:** Include "Schedule a Demo" with demo event type
- **Customer success:** Include "Book a Check-in" with support event type
- **Executives:** Include "Schedule an Executive Briefing"
- **Recruiters:** Include "Schedule an Interview"

**5. Test Before Deploying**

Always test your Calendly links:
1. Deploy to a test user first
2. Send yourself an email
3. Click the Calendly link
4. Verify it opens the correct event type
5. Try booking a test meeting

**6. Keep Event Types Updated**

Maintain your Calendly account:
- Remove outdated event types
- Update event descriptions
- Adjust availability as needed
- Refresh event types in Siggly after changes

**7. Monitor and Optimize**

Track your results:
- Check Calendly analytics for booking rates
- Ask team members which event types work best
- A/B test different CTAs
- Adjust based on feedback

**8. Combine with Other Features**

Maximize impact by combining Calendly with:
- Professional headshots in signatures
- Social media links
- Company branding
- Campaign banners for events

**9. Mobile Optimization**

Ensure great mobile experience:
- Test links on mobile devices
- Keep button text short for small screens
- Verify Calendly pages are mobile-friendly
- Use clear, tappable buttons

**10. Educate Your Team**

Help your team succeed:
- Share this guide with all users
- Explain how Calendly links work
- Show them how to check bookings
- Provide template examples

**Results You Can Expect:**
- 30-50% reduction in scheduling back-and-forth
- Higher meeting booking rates
- More professional appearance
- Faster sales cycles
- Better customer experience',
  'Integrations',
  'guide',
  true,
  true,
  14,
  true
);
