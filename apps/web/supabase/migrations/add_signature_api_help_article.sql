-- Help article: Signature API & API Keys
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
  'Signature API & API Keys',
  'signature-api',
  '**Use the Signature API to pull rendered email signature HTML into any mail system — Exchange, custom SMTP, or your own tools.**

## Overview

The Signature API gives you a simple REST endpoint that returns fully rendered email signature HTML for every user in your organization. It is designed for deployments where Siggly''s built-in Google and Microsoft integrations aren''t applicable, such as Exchange on-premise, custom SMTP relays, or internal tooling.

The API is **read-only** — it can only fetch signatures. It cannot modify templates, users, or any other data.

**Available on:** Professional and Enterprise plans.

---

## Creating an API Key

1. Go to **Settings > API Keys** in your dashboard
2. Click **Create Key**
3. Give it a descriptive name (e.g. "Exchange Server" or "Deploy Script")
4. Click **Create**
5. **Copy the key immediately** — it is only shown once and cannot be retrieved later

### Key security

- The full key is shown **once** at creation time, then permanently hidden
- We store a **SHA-256 hash** — not the key itself
- Keys are scoped to your organization and can only read your team''s signatures
- Revoked keys stop working **immediately**
- Store your key in a secrets manager, password vault, or environment variable — never in source code

---

## API Endpoints

### Get all signatures

Returns rendered HTML for every active user in your organization.

```
GET https://siggly.com/api/v1/signatures
Authorization: Bearer sk_live_YOUR_KEY
```

**Response:**

```json
{
  "data": [
    {
      "userId": "abc-123",
      "email": "jane@example.com",
      "name": "Jane Smith",
      "templateName": "Company Default",
      "html": "<table>...full signature HTML...</table>"
    }
  ],
  "meta": { "count": 1 }
}
```

### Get a single user''s signature

```
GET https://siggly.com/api/v1/signatures/{userId}
Authorization: Bearer sk_live_YOUR_KEY
```

The `userId` comes from the list response above. Useful when you only need to update one mailbox.

---

## Deployment Examples

### Exchange / Microsoft 365 (PowerShell)

Pull all signatures and apply them to Exchange mailboxes. Schedule this as a daily task to keep signatures in sync.

```powershell
# Pull signatures from Siggly
$headers = @{ Authorization = "Bearer sk_live_YOUR_KEY" }
$response = Invoke-RestMethod `
  -Uri "https://siggly.com/api/v1/signatures" `
  -Headers $headers

# Apply to each mailbox
foreach ($sig in $response.data) {
    Set-MailboxMessageConfiguration `
      -Identity $sig.email `
      -SignatureHtml $sig.html `
      -AutoAddSignature $true
    Write-Host "Updated: $($sig.email)"
}
```

### Node.js / JavaScript

```javascript
const res = await fetch("https://siggly.com/api/v1/signatures", {
  headers: { Authorization: "Bearer sk_live_YOUR_KEY" },
});
const { data } = await res.json();

for (const sig of data) {
  console.log(sig.email, sig.html);
  // Deploy to your mail system here
}
```

### Python

```python
import requests

headers = {"Authorization": "Bearer sk_live_YOUR_KEY"}
response = requests.get("https://siggly.com/api/v1/signatures", headers=headers)
data = response.json()["data"]

for sig in data:
    print(sig["email"])
    # sig["html"] contains the ready-to-use signature HTML
```

### cURL (testing)

```bash
curl -H "Authorization: Bearer sk_live_YOUR_KEY" \
  https://siggly.com/api/v1/signatures
```

---

## Keeping Signatures Updated

When you update a template in Siggly, the API automatically returns the new version on the next request. Set up a scheduled job (e.g. a daily cron or Windows Task Scheduler task) that:

1. Pulls the latest signatures from the API
2. Applies the HTML to each mailbox in your mail system

This way, any template or user changes in Siggly are automatically reflected without manual intervention.

---

## Rate Limits and Caching

- **Rate limit:** 60 requests per minute per API key
- **Cache:** Responses include a 5-minute cache header (`Cache-Control: max-age=300`)
- If you exceed the rate limit, the API returns a `429` status with a `Retry-After` header

For most use cases (daily or hourly sync), you will never hit the rate limit.

---

## Managing Keys

- **View keys:** Go to Settings > API Keys to see all active and revoked keys
- **Revoke a key:** Click the trash icon next to any active key. It stops working instantly
- **Limit:** Up to 5 active keys per organization
- **Permissions:** Only admins and owners can create or revoke keys. All members can view them.

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `401 Unauthorized` | Missing, invalid, or revoked key | Check the key is correct and hasn''t been revoked |
| `403 Forbidden` | Organization suspended or wrong plan | Ensure your org is on Professional or Enterprise |
| `404 Not Found` | No template exists for the org | Create and save a signature template first |
| `429 Too Many Requests` | Rate limit exceeded | Wait and retry after the `Retry-After` seconds |

If you need help, contact support from the dashboard or email support@siggly.com.',
  'Integrations',
  'guide',
  true,
  true,
  20,
  true
);
