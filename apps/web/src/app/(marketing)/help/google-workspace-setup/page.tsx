'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function GoogleWorkspaceSetupPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_CLIENT_ID || '';
  const scopes = 'https://www.googleapis.com/auth/gmail.settings.basic,https://www.googleapis.com/auth/gmail.settings.sharing,https://www.googleapis.com/auth/admin.directory.user.readonly';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/help" 
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Google Workspace Setup Guide
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Connect your Google Workspace to deploy email signatures. Choose the method that fits your needs.
        </p>

        {/* Connection Methods Overview */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Option A: Connect with OAuth</h3>
            <p className="text-sm text-gray-600 mb-3">Best for individual users or testing</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Quick setup (2 clicks)</li>
              <li>✓ No admin console access needed</li>
              <li>✗ Only manages your own signature</li>
            </ul>
            <a href="#oauth-setup" className="text-sm text-violet-600 hover:underline mt-3 inline-block">View instructions →</a>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 ring-2 ring-violet-500">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900">Option B: Connect Organization</h3>
              <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">Recommended</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Best for managing your entire team</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Deploy signatures to all users</li>
              <li>✓ Sync team members automatically</li>
              <li>✓ Centralized management</li>
            </ul>
            <a href="#org-setup" className="text-sm text-violet-600 hover:underline mt-3 inline-block">View instructions →</a>
          </div>
        </div>

        {/* OAuth Setup Section */}
        <div id="oauth-setup" className="bg-white rounded-xl shadow-sm border p-8 space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Option A: Connect with OAuth</h2>
          <p className="text-gray-600">
            This method connects your individual Google account. Perfect for freelancers, solo users, or testing before rolling out to your organization.
          </p>
          
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Steps</h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Go to <Link href="/integrations" className="text-violet-600 hover:underline">Integrations</Link> in Siggly</li>
              <li>Click <strong>&quot;Connect with OAuth&quot;</strong> on the Google Workspace card</li>
              <li>Sign in with your Google account in the popup</li>
              <li>Review and approve the permissions</li>
              <li>You&apos;re connected! You can now manage your email signature.</li>
            </ol>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This only gives Siggly access to manage <em>your</em> signature. 
              To manage signatures for your entire organization, use &quot;Connect Organization&quot; below.
            </p>
          </div>
        </div>

        {/* Organization Setup Section */}
        <div id="org-setup" className="bg-white rounded-xl shadow-sm border p-8 space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Option B: Connect Organization</h2>
          <p className="text-gray-600">
            This method allows Siggly to manage email signatures for all users in your Google Workspace organization.
          </p>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Prerequisites</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>You must be a <strong>Google Workspace administrator</strong></li>
              <li>Access to the <a href="https://admin.google.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Google Admin Console</a></li>
              <li>A Siggly account (Professional plan or higher for full org management)</li>
            </ul>
          </section>

          <hr />

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Open Domain-Wide Delegation Settings</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>
                Go to <a href="https://admin.google.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline inline-flex items-center gap-1">
                  admin.google.com <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>In the left sidebar, navigate to <strong>Security</strong></li>
              <li>Click on <strong>Access and data control</strong></li>
              <li>Click on <strong>API controls</strong></li>
              <li>Scroll down to find <strong>Domain-wide delegation</strong></li>
              <li>Click <strong>Manage Domain-Wide Delegation</strong></li>
            </ol>
          </section>

          <hr />

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Add Siggly as an Authorized App</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Click the <strong>Add new</strong> button</li>
              <li>Enter the following <strong>Client ID</strong>:</li>
            </ol>
            
            <div className="mt-4 bg-gray-50 rounded-lg border p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Client ID</p>
                  <code className="text-lg font-mono font-medium text-gray-900">{clientId || 'Loading...'}</code>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(clientId, 'clientId')}
                  disabled={!clientId}
                >
                  {copiedField === 'clientId' ? (
                    <>
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <ol start={3} className="list-decimal list-inside space-y-3 text-gray-700 mt-4">
              <li>Enter the following <strong>OAuth Scopes</strong> (copy exactly as shown):</li>
            </ol>

            <div className="mt-4 bg-gray-50 rounded-lg border p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 mb-1">OAuth Scopes</p>
                  <code className="text-sm font-mono text-gray-900 break-all">{scopes}</code>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() => copyToClipboard(scopes, 'scopes')}
                >
                  {copiedField === 'scopes' ? (
                    <>
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <ol start={4} className="list-decimal list-inside space-y-3 text-gray-700 mt-4">
              <li>Click <strong>Authorize</strong></li>
            </ol>
          </section>

          <hr />

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 3: Connect in Siggly</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Return to Siggly and go to <Link href="/integrations" className="text-violet-600 hover:underline">Integrations</Link></li>
              <li>Click <strong>Connect Organization</strong> on the Google Workspace card</li>
              <li>Enter your admin email address</li>
              <li>Enter your domain (e.g., yourcompany.com)</li>
              <li>Click <strong>Verify & Connect</strong></li>
            </ol>
          </section>

          <hr />

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What These Permissions Allow</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-blue-900">
                <li><strong>gmail.settings.basic</strong> — Read and update Gmail signature settings</li>
                <li><strong>gmail.settings.sharing</strong> — Manage signature sharing across the organization</li>
                <li><strong>admin.directory.user.readonly</strong> — Read user list to sync team members</li>
              </ul>
              <p className="mt-3 text-sm text-blue-800">
                <strong>Note:</strong> Siggly cannot read email content. We only access signature settings.
              </p>
            </div>
          </section>

          <hr />

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Troubleshooting</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">&quot;Domain-wide delegation not configured&quot;</h3>
                <p className="text-gray-700 text-sm mt-1">
                  Double-check that you entered the Client ID and OAuth scopes exactly as shown above. 
                  Scopes must be comma-separated with no spaces.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">&quot;403 Forbidden&quot; errors</h3>
                <p className="text-gray-700 text-sm mt-1">
                  The OAuth scopes may not match. Delete the delegation entry and re-add it with the exact scopes.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Can&apos;t find API controls</h3>
                <p className="text-gray-700 text-sm mt-1">
                  Make sure you&apos;re signed in as a Super Admin. Regular admins may not have access to this setting.
                </p>
              </div>
            </div>
          </section>

          <div className="pt-4">
            <p className="text-sm text-gray-500">
              Still having trouble? <a href="mailto:support@siggly.io" className="text-violet-600 hover:underline">Contact support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
