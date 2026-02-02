'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Card, CardContent, CardDescription, CardHeader, CardTitle, Switch } from '@/components/ui';
import { PageHeader } from '@/components/dashboard';
import { 
  Building2, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Save,
  Loader2,
  Check,
  AlertCircle,
  CreditCard,
} from 'lucide-react';
import Link from 'next/link';

interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
}

interface Organization {
  id: string;
  name: string;
  domain: string | null;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  
  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [orgName, setOrgName] = useState('');
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [deploymentAlerts, setDeploymentAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const supabase = createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load user profile
    const { data: userData } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, organization_id')
      .eq('auth_id', user.id)
      .single();

    if (userData) {
      setProfile(userData as any);
      setFirstName(userData.first_name || '');
      setLastName(userData.last_name || '');

      // Load organization
      if (userData.organization_id) {
        const { data: orgData } = await supabase
          .from('organizations')
          .select('id, name, domain')
          .eq('id', userData.organization_id)
          .single();

        if (orgData) {
          setOrganization(orgData);
          setOrgName(orgData.name || '');
        }
      }
    }

    setLoading(false);
  };

  const saveProfile = async () => {
    if (!profile) return;
    
    setSaving(true);
    const supabase = createClient();

    await supabase
      .from('users')
      .update({
        first_name: firstName,
        last_name: lastName,
      })
      .eq('id', profile.id);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const saveOrganization = async () => {
    if (!organization) return;
    
    setSaving(true);
    const supabase = createClient();

    await supabase
      .from('organizations')
      .update({
        name: orgName,
      })
      .eq('id', organization.id);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'organization', label: 'Organization', icon: Building2 },
    { id: 'billing', label: 'Billing', icon: CreditCard, href: '/settings/billing' },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings" 
        description="Manage your account and preferences" 
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-56 shrink-0">
          <nav className="space-y-1 lg:sticky lg:top-6">
          {tabs.map((tab) => (
              tab.href ? (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-100"
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </Link>
              ) : (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-violet-100 text-violet-900 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              )
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    value={profile?.email || ''}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <Button onClick={saveProfile} disabled={saving}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : saved ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {saved ? 'Saved!' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'organization' && (
            <Card>
              <CardHeader>
                <CardTitle>Organization Settings</CardTitle>
                <CardDescription>
                  Manage your organization details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Organization Name</label>
                  <Input
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Acme Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Domain</label>
                  <Input
                    value={organization?.domain || ''}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Domain is set from your Google Workspace
                  </p>
                </div>

                <Button onClick={saveOrganization} disabled={saving}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : saved ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {saved ? 'Saved!' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about your account
                      </p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Deployment Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when deployments complete or fail
                      </p>
                    </div>
                    <Switch
                      checked={deploymentAlerts}
                      onCheckedChange={setDeploymentAlerts}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Weekly Digest</p>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of activity
                      </p>
                    </div>
                    <Switch
                      checked={weeklyDigest}
                      onCheckedChange={setWeeklyDigest}
                    />
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how Siggly looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-4">Theme</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 border-2 border-violet-600 rounded-lg text-center">
                      <div className="w-full h-8 bg-white border rounded mb-2" />
                      <span className="text-sm font-medium">Light</span>
                    </button>
                    <button className="p-4 border rounded-lg text-center hover:border-gray-400">
                      <div className="w-full h-8 bg-gray-900 rounded mb-2" />
                      <span className="text-sm">Dark</span>
                    </button>
                    <button className="p-4 border rounded-lg text-center hover:border-gray-400">
                      <div className="w-full h-8 bg-gradient-to-r from-white to-gray-900 rounded mb-2" />
                      <span className="text-sm">System</span>
                    </button>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    Dark mode and system theme are coming soon!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">
                        Last changed: Never
                      </p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">
                        Manage your active login sessions
                      </p>
                    </div>
                    <Button variant="outline">View Sessions</Button>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all associated data.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
