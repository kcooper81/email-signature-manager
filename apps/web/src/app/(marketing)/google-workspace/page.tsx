import Link from 'next/link';
import { Mail, Check, ArrowRight, Shield, Zap, Users, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Google Workspace Email Signatures | Siggly',
  description: 'Manage Gmail signatures for your entire Google Workspace organization. Deploy consistent email signatures to all users with one click.',
};

export default function GoogleWorkspacePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google Workspace Integration
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Gmail Signature Management for
                <span className="text-blue-600"> Google Workspace</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Deploy professional, consistent email signatures to your entire Google Workspace organization. 
                Sync users automatically and update signatures with one click.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/signup">
                  <Button size="lg">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline">Watch Demo</Button>
                </Link>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Gmail Signature</div>
                    <div className="text-sm text-gray-500">Deployed via Siggly</div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">JD</div>
                    <div>
                      <div className="font-semibold">John Doe</div>
                      <div className="text-sm text-gray-600">Marketing Director</div>
                      <div className="text-sm text-blue-600">john@company.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why teams choose Siggly for Google Workspace
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Auto-Sync Users</h3>
              <p className="text-sm text-gray-600">
                Automatically sync users from your Google Workspace directory. No manual imports needed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">One-Click Deploy</h3>
              <p className="text-sm text-gray-600">
                Deploy signatures to all Gmail users instantly using the Gmail API.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-violet-600" />
              </div>
              <h3 className="font-semibold mb-2">Department Templates</h3>
              <p className="text-sm text-gray-600">
                Create different signatures for different departments or teams.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure OAuth</h3>
              <p className="text-sm text-gray-600">
                We use OAuth 2.0 and never store your Google password.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Connect Google Workspace</h3>
                <p className="text-gray-600">Sign in with your Google Workspace admin account and authorize Siggly to manage signatures.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Sync your team</h3>
                <p className="text-gray-600">We automatically import users from your Google Workspace directory with their names, titles, and departments.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Design your signature</h3>
                <p className="text-gray-600">Use our visual editor to create beautiful, on-brand signatures with dynamic fields.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Deploy to Gmail</h3>
                <p className="text-gray-600">Click deploy and watch as signatures are pushed to all selected users' Gmail accounts instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to manage Gmail signatures?</h2>
          <p className="text-gray-600 mb-8">
            Start your free trial and deploy your first signature in minutes.
          </p>
          <Link href="/signup">
            <Button size="lg">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

    </>
  );
}
