'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Check, Users, Palette, Rocket, Shield, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent, trackDemoRequest } from '@/components/analytics';

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('design');

  // Track demo page view
  useEffect(() => {
    trackEvent('demo_page_view', 'engagement', 'demo');
  }, []);

  const handlePlayDemo = () => {
    trackEvent('demo_video_play', 'engagement', 'demo');
    trackDemoRequest();
  };

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              See Siggly in Action
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Watch how easy it is to create, manage, and deploy professional email signatures across your entire organization.
            </p>
          </div>
        </div>
      </section>

      {/* Video Demo */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="aspect-video bg-gradient-to-br from-violet-900 to-blue-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-10">
              <Play className="h-8 w-8 text-violet-600 ml-1" />
            </button>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/80 text-sm">
              <span>Product Demo</span>
              <span>3:45</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Tabs */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="flex justify-center gap-2 mb-12">
            {[
              { id: 'design', label: 'Design', icon: Palette },
              { id: 'manage', label: 'Manage Users', icon: Users },
              { id: 'deploy', label: 'Deploy', icon: Rocket },
              { id: 'secure', label: 'Stay Secure', icon: Shield },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {activeTab === 'design' && (
                <>
                  <h3 className="text-2xl font-bold mb-4">Design Beautiful Signatures</h3>
                  <p className="text-gray-600 mb-6">
                    Use our intuitive drag-and-drop editor to create stunning email signatures. Add your logo, social links, banners, and more.
                  </p>
                  <ul className="space-y-3">
                    {['Drag-and-drop editor', 'Pre-built templates', 'Custom branding', 'Dynamic fields'].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {activeTab === 'manage' && (
                <>
                  <h3 className="text-2xl font-bold mb-4">Manage Your Team</h3>
                  <p className="text-gray-600 mb-6">
                    Sync users from Google Workspace automatically. Organize by department and assign different signatures to different teams.
                  </p>
                  <ul className="space-y-3">
                    {['Auto-sync from Google', 'Department grouping', 'Bulk user management', 'Role-based access'].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {activeTab === 'deploy' && (
                <>
                  <h3 className="text-2xl font-bold mb-4">Deploy in Seconds</h3>
                  <p className="text-gray-600 mb-6">
                    Push signatures to your entire team with one click. No more manual copying and pasting. No more inconsistent signatures.
                  </p>
                  <ul className="space-y-3">
                    {['One-click deployment', 'Deploy to individuals or teams', 'Instant updates', 'Deployment history'].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {activeTab === 'secure' && (
                <>
                  <h3 className="text-2xl font-bold mb-4">Enterprise Security</h3>
                  <p className="text-gray-600 mb-6">
                    Your data is protected with industry-leading security. We use OAuth 2.0 and never store your Google password.
                  </p>
                  <ul className="space-y-3">
                    {['OAuth 2.0 authentication', 'Encrypted data', 'SOC 2 compliant', 'GDPR ready'].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Mail className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Interactive demo preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Start your free trial today. No credit card required.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
