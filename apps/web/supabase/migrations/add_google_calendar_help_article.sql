-- Add Google Calendar Integration help article

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
  'Google Calendar Integration',
  'google-calendar-integration',
  '**Connect your Google Calendar to add booking links and automatic out-of-office banners to your email signatures.**

## Overview

Siggly integrates with Google Calendar to provide two powerful features:

1. **Booking Links** - Add your Google Calendar appointment scheduling link to your signature
2. **Out-of-Office Banners** - Automatically display an OOO banner when you''re on vacation

## Prerequisites

- Your organization must have Google Workspace connected
- The calendar.readonly scope must be enabled (included by default)
- You need access to the employee self-manage portal

## Setting Up Booking Links

### Step 1: Create a Google Calendar Appointment Schedule

1. Go to [Google Calendar](https://calendar.google.com)
2. Click the **+** next to "Other calendars" or go to Settings
3. Select **Appointment schedules**
4. Create a new appointment schedule with your availability
5. Copy the booking link

### Step 2: Add to Your Signature

1. Go to **My Profile** in Siggly
2. Scroll to the **Google Calendar Integration** section
3. Toggle **Enable Calendar Integration** on
4. Paste your booking URL in the **Google Calendar Booking URL** field
5. Click **Save Calendar Settings**

Your booking link will now appear in your email signature, allowing recipients to schedule meetings with you directly.

## Setting Up Out-of-Office Banners

### How It Works

Siggly automatically detects when you''re out of office by checking your Google Calendar for:

- Events marked as "Out of Office" in Google Calendar
- All-day events with keywords like "vacation", "PTO", "holiday", "away"

When detected, a banner is automatically added to your signature showing your return date.

### Step 1: Enable OOO Banners

1. Go to **My Profile** in Siggly
2. Scroll to the **Google Calendar Integration** section
3. Toggle **Enable Calendar Integration** on
4. Toggle **Out-of-Office Banner** on
5. Optionally add a custom OOO message
6. Click **Save Calendar Settings**

### Step 2: Set Up Your Calendar Event

When you''re going on vacation:

1. Create an event in Google Calendar
2. Either:
   - Use Google Calendar''s built-in "Out of Office" event type, OR
   - Create an all-day event with a title like "Vacation" or "PTO"
3. Siggly will automatically detect this and show the banner

### Customizing the OOO Message

You can set a custom message that appears in your OOO banner:

- Default: "I am currently out of office and will return on [date]"
- Custom: Add your own message like "On vacation - limited email access"

## Admin Controls

Organization admins can control calendar features:

1. Go to **Settings > Organization**
2. Find the **Employee Self-Management** section
3. Toggle these options:
   - **Google Calendar Integration** - Allow employees to connect calendars
   - **Out-of-Office Banners** - Allow employees to enable OOO banners
4. Toggle **Google Calendar (Organization-Wide)** to enable/disable for everyone

## Troubleshooting

### Calendar integration not showing?

- Check that your admin has enabled calendar features
- Ensure Google Workspace is connected with the calendar scope

### OOO banner not appearing?

- Verify your calendar event is set up correctly
- Check that the event covers the current date
- Try using Google''s native "Out of Office" event type

### Booking link not working?

- Ensure the URL is a valid Google Calendar appointment link
- Test the link in a browser first

## Privacy & Security

- Siggly only reads your calendar to detect OOO status
- We use read-only access (calendar.readonly scope)
- We don''t store your calendar events
- You can revoke access anytime from Google Account settings',
  'Integrations',
  'guide',
  true,
  true,
  15,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  category = EXCLUDED.category,
  updated_at = now();
