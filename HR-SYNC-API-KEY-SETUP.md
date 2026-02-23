# HR Sync - API Key Setup Guide

This guide covers setting up HR sync integrations using API keys (non-OAuth method) for providers where OAuth isn't available yet.

---

## **Available Integration Methods**

### **OAuth (Recommended - When Available)**
- ✅ **Gusto** - OAuth ready now
- ⏸️ **BambooHR** - OAuth available when you reach 100 customers
- ⏸️ **Rippling** - OAuth available when API access granted

### **API Keys (Available Now)**
- ✅ **BambooHR** - Works with API keys
- ✅ **Rippling** - Works with API tokens
- ✅ **ADP Workforce Now** - Works with client credentials
- ✅ **Google Directory** - Uses existing OAuth
- ✅ **Microsoft Directory** - Uses existing OAuth

---

## **BambooHR Setup (API Key Method)**

### **For Your Customers:**

1. **Get API Key from BambooHR:**
   - Log into BambooHR account
   - Go to **Settings → API Keys**
   - Click **"Add New Key"**
   - Give it a name (e.g., "Siggly Integration")
   - Copy the API key (shown once)

2. **Add to Siggly:**
   - Go to **Settings → HR & Directory Sync**
   - Click **"Add Integration"**
   - Select **"BambooHR"**
   - **API Key:** Paste the API key
   - **Subdomain:** Enter just the subdomain (e.g., "acme" from acme.bamboohr.com)
   - Configure sync settings
   - Click **"Save"**

3. **Test Sync:**
   - Click **"Sync Now"**
   - Employees should appear in Siggly

### **What They Need:**
- BambooHR account (any plan)
- Admin access to generate API keys
- Their subdomain name

---

## **Rippling Setup (API Token Method)**

### **For Your Customers:**

1. **Get API Token from Rippling:**
   - Log into Rippling account
   - Go to **Settings → API & Integrations**
   - Click **"Create API Token"** or contact Rippling support
   - Copy the token

2. **Add to Siggly:**
   - Go to **Settings → HR & Directory Sync**
   - Click **"Add Integration"**
   - Select **"Rippling"**
   - **API Key:** Paste the API token
   - **API URL:** Leave blank (uses default)
   - Configure sync settings
   - Click **"Save"**

3. **Test Sync:**
   - Click **"Sync Now"**
   - Employees should appear in Siggly

### **What They Need:**
- Rippling account
- Admin access or API access granted by Rippling
- API token

---

## **ADP Workforce Now Setup (Client Credentials Method)**

### **For Your Customers:**

1. **Get Client Credentials from ADP:**
   - Contact ADP support or account manager
   - Request API access for your organization
   - They'll provide:
     - Client ID
     - Client Secret
   - **OR** if registered in ADP Marketplace:
     - Log into ADP Marketplace portal
     - Go to your registered application
     - Copy Client ID and Client Secret

2. **Add to Siggly:**
   - Go to **Settings → HR & Directory Sync**
   - Click **"Add Integration"**
   - Select **"ADP Workforce Now"**
   - **API Key:** Enter in format `clientId:clientSecret` (separated by colon)
     - Example: `abc123:xyz789secret`
   - **API URL:** Leave blank (uses default)
   - Configure sync settings
   - Click **"Save"**

3. **Test Sync:**
   - Click **"Sync Now"**
   - Employees should appear in Siggly

### **What They Need:**
- ADP Workforce Now account
- API access enabled by ADP
- Client ID and Client Secret

### **Note:**
ADP API access is more restrictive than other providers. Customers may need to:
- Contact their ADP account manager
- Request API access specifically
- May require business justification
- Setup can take several weeks

---

## **Google Directory (Already Works)**

Uses your existing Google Workspace OAuth integration. No additional setup needed.

---

## **Microsoft Directory (Already Works)**

Uses your existing Microsoft 365 OAuth integration. No additional setup needed.

---

## **Comparison: OAuth vs API Keys**

### **OAuth Method (Gusto - Available Now)**
✅ One-click setup  
✅ Automatic token refresh  
✅ No manual credential copying  
✅ Automatic webhook setup (Gusto)  
✅ More secure (tokens expire and refresh)  

### **API Key Method (BambooHR, Rippling, ADP)**
✅ Works immediately  
✅ No marketplace approval needed  
✅ Simple for customers to set up  
❌ Manual credential entry  
❌ Tokens don't auto-refresh  
❌ No automatic webhook setup  

---

## **When OAuth Becomes Available**

### **BambooHR (After 100 Customers)**
1. Apply to BambooHR Marketplace Program
2. Get approved
3. Add OAuth credentials to Vercel
4. Redeploy
5. Customers can choose OAuth or keep using API keys

### **Rippling (When API Access Granted)**
1. Request API access from Rippling
2. Get OAuth credentials
3. Add to Vercel
4. Redeploy
5. Customers can choose OAuth or keep using API tokens

### **ADP (Future)**
1. Apply to ADP Marketplace
2. Complete security review
3. Get approved
4. Add OAuth credentials
5. Redeploy

**Existing API key integrations will continue working** - no migration required.

---

## **Support Documentation for Customers**

### **BambooHR**
**Where to find API key:**
- BambooHR Dashboard → Settings → API Keys
- Generate new key, copy immediately (shown once)

**Common issues:**
- "Invalid API key" → Regenerate key in BambooHR
- "Subdomain not found" → Check subdomain spelling
- "No employees found" → Verify API key has correct permissions

### **Rippling**
**Where to find API token:**
- Rippling Dashboard → Settings → API & Integrations
- Or contact Rippling support to enable API access

**Common issues:**
- "API access denied" → Contact Rippling to enable API
- "Invalid token" → Regenerate token in Rippling
- "No employees found" → Verify token has employee read permissions

### **ADP**
**Where to find credentials:**
- Contact ADP account manager
- Or ADP Marketplace portal (if registered)

**Common issues:**
- "Authentication failed" → Verify clientId:clientSecret format
- "API access denied" → Contact ADP to enable API access
- "Invalid credentials" → Regenerate credentials in ADP portal

---

## **Current Status Summary**

| Provider | Method | Status | Setup Time |
|----------|--------|--------|------------|
| **Gusto** | OAuth | ✅ Ready | 2 minutes |
| **BambooHR** | API Key | ✅ Ready | 5 minutes |
| **Rippling** | API Token | ✅ Ready | 5 minutes |
| **ADP** | Client Creds | ✅ Ready | 10-30 minutes* |
| **Google** | OAuth | ✅ Ready | Already set up |
| **Microsoft** | OAuth | ✅ Ready | Already set up |

*ADP may require contacting support, which can take longer

---

## **Recommendation for Customers**

1. **Use Gusto?** → Use OAuth (easiest)
2. **Use BambooHR?** → Use API key (works now, upgrade to OAuth later)
3. **Use Rippling?** → Use API token (works now, upgrade to OAuth later)
4. **Use ADP?** → Use client credentials (may require ADP support)
5. **Use Google/Microsoft?** → Already works with your existing OAuth

---

**All integrations are production-ready and can be used by customers today!**
