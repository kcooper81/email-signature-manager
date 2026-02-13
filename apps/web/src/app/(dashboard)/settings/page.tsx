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
  Smartphone,
  Monitor,
  Trash2,
  X,
  Copy,
  Users,
  CalendarClock,
  Link2,
  Palmtree,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Instagram,
  Facebook,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';

interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  calendly_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  github_url: string | null;
  personal_website: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  youtube_url: string | null;
}

interface Organization {
  id: string;
  name: string;
  domain: string | null;
  organization_type?: string | null;
}

interface OrgSettings {
  allow_employee_self_manage: boolean;
  allow_employee_personal_links: boolean;
  allow_employee_calendar_integration: boolean;
  allow_employee_ooo_banners: boolean;
  google_calendar_enabled: boolean;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [orgSettings, setOrgSettings] = useState<OrgSettings>({
    allow_employee_self_manage: true,
    allow_employee_personal_links: true,
    allow_employee_calendar_integration: true,
    allow_employee_ooo_banners: true,
    google_calendar_enabled: true,
  });
  
  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  // Personal links
  const [calendlyUrl, setCalendlyUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [personalWebsite, setPersonalWebsite] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgDomain, setOrgDomain] = useState('');
  const [domainSource, setDomainSource] = useState<'manual' | 'google_workspace' | 'microsoft_365' | 'hubspot' | null>(null);
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [deploymentAlerts, setDeploymentAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  
  // Security
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [sessions, setSessions] = useState<any[]>([]);
  const [showSessions, setShowSessions] = useState(false);
  
  // Appearance
  const [theme, setTheme] = useState<'light' | 'dark-blue' | 'charcoal'>('light');

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
      .select('id, email, first_name, last_name, organization_id, email_notifications, deployment_alerts, weekly_digest, theme, calendly_url, linkedin_url, twitter_url, github_url, personal_website, instagram_url, facebook_url, youtube_url')
      .eq('auth_id', user.id)
      .single();

    if (userData) {
      setProfile(userData as any);
      setFirstName(userData.first_name || '');
      setLastName(userData.last_name || '');
      setCalendlyUrl(userData.calendly_url || '');
      setLinkedinUrl(userData.linkedin_url || '');
      setTwitterUrl(userData.twitter_url || '');
      setGithubUrl(userData.github_url || '');
      setPersonalWebsite(userData.personal_website || '');
      setInstagramUrl(userData.instagram_url || '');
      setFacebookUrl(userData.facebook_url || '');
      setYoutubeUrl(userData.youtube_url || '');
      setEmailNotifications(userData.email_notifications ?? true);
      setDeploymentAlerts(userData.deployment_alerts ?? true);
      setWeeklyDigest(userData.weekly_digest ?? false);
      
      // Load and apply theme
      const userTheme = (userData.theme || 'light') as 'light' | 'dark-blue' | 'charcoal';
      setTheme(userTheme);
      applyTheme(userTheme);

      // Check 2FA status
      try {
        const { data: factors } = await supabase.auth.mfa.listFactors();
        if (factors && factors.totp && factors.totp.length > 0) {
          setTwoFactorEnabled(true);
        }
      } catch (error) {
        console.log('2FA not available or not configured');
      }

      // Load organization
      if (userData.organization_id) {
        const { data: orgData } = await supabase
          .from('organizations')
          .select('id, name, domain, organization_type, google_workspace_connected, microsoft_365_connected, hubspot_connected')
          .eq('id', userData.organization_id)
          .single();

        if (orgData) {
          setOrganization(orgData);
          setOrgName(orgData.name || '');
          setOrgDomain(orgData.domain || '');
          
          // Determine domain source based on integration
          if (orgData.google_workspace_connected) {
            setDomainSource('google_workspace');
          } else if (orgData.microsoft_365_connected) {
            setDomainSource('microsoft_365');
          } else if (orgData.hubspot_connected) {
            setDomainSource('hubspot');
          } else {
            setDomainSource('manual');
          }

          // Load organization settings
          const { data: orgSettingsData } = await supabase
            .from('organization_settings')
            .select('*')
            .eq('organization_id', userData.organization_id)
            .single();

          if (orgSettingsData) {
            setOrgSettings({
              allow_employee_self_manage: orgSettingsData.allow_employee_self_manage ?? true,
              allow_employee_personal_links: orgSettingsData.allow_employee_personal_links ?? true,
              allow_employee_calendar_integration: orgSettingsData.allow_employee_calendar_integration ?? true,
              allow_employee_ooo_banners: orgSettingsData.allow_employee_ooo_banners ?? true,
              google_calendar_enabled: orgSettingsData.google_calendar_enabled ?? true,
            });
          }
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
        calendly_url: calendlyUrl || null,
        linkedin_url: linkedinUrl || null,
        twitter_url: twitterUrl || null,
        github_url: githubUrl || null,
        personal_website: personalWebsite || null,
        instagram_url: instagramUrl || null,
        facebook_url: facebookUrl || null,
        youtube_url: youtubeUrl || null,
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

    const updateData: any = {
      name: orgName,
    };

    // Only update domain if it's manually set (not from integration)
    if (domainSource === 'manual') {
      updateData.domain = orgDomain;
    }

    await supabase
      .from('organizations')
      .update(updateData)
      .eq('id', organization.id);

    // Upsert organization settings
    await supabase
      .from('organization_settings')
      .upsert({
        organization_id: organization.id,
        allow_employee_self_manage: orgSettings.allow_employee_self_manage,
        allow_employee_personal_links: orgSettings.allow_employee_personal_links,
        allow_employee_calendar_integration: orgSettings.allow_employee_calendar_integration,
        allow_employee_ooo_banners: orgSettings.allow_employee_ooo_banners,
        google_calendar_enabled: orgSettings.google_calendar_enabled,
      }, {
        onConflict: 'organization_id',
      });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const saveNotifications = async () => {
    if (!profile) return;
    
    setSaving(true);
    const supabase = createClient();

    await supabase
      .from('users')
      .update({
        email_notifications: emailNotifications,
        deployment_alerts: deploymentAlerts,
        weekly_digest: weeklyDigest,
      })
      .eq('id', profile.id);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const changePassword = async () => {
    setPasswordError('');
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    
    setSaving(true);
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setPasswordError(error.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    setPasswordSuccess(true);
    setShowPasswordChange(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const enable2FA = async () => {
    setSaving(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
      });

      if (error) {
        console.error('2FA enrollment error:', error);
        setPasswordError('2FA enrollment failed. Please try again.');
        setSaving(false);
        return;
      }

      if (data) {
        setQrCode(data.totp.qr_code);
        setShow2FASetup(true);
      }
    } catch (error) {
      console.error('2FA enrollment error:', error);
      setPasswordError('2FA is not available. Please contact support.');
    }

    setSaving(false);
  };

  const verify2FA = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      return;
    }

    setSaving(true);
    const supabase = createClient();

    try {
      // Get enrolled factors
      const { data: factors } = await supabase.auth.mfa.listFactors();
      
      if (!factors || factors.totp.length === 0) {
        setPasswordError('No 2FA factor found. Please try enrolling again.');
        setSaving(false);
        return;
      }

      const factorId = factors.totp[0].id;

      // Create challenge
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId,
      });

      if (challengeError || !challengeData) {
        setPasswordError('Failed to create verification challenge.');
        setSaving(false);
        return;
      }

      // Verify the code
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code: verificationCode,
      });

      if (!verifyError) {
        setTwoFactorEnabled(true);
        setShow2FASetup(false);
        setVerificationCode('');
        setPasswordError('');
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        setPasswordError('Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('2FA verification error:', error);
      setPasswordError('Verification failed. Please try again.');
    }

    setSaving(false);
  };

  const disable2FA = async () => {
    setSaving(true);
    const supabase = createClient();

    try {
      // Get enrolled factors
      const { data: factors } = await supabase.auth.mfa.listFactors();
      
      if (!factors || factors.totp.length === 0) {
        setSaving(false);
        return;
      }

      const factorId = factors.totp[0].id;

      // Unenroll from MFA
      const { error } = await supabase.auth.mfa.unenroll({
        factorId,
      });

      if (!error) {
        setTwoFactorEnabled(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (error) {
      console.error('2FA disable error:', error);
    }

    setSaving(false);
  };

  const loadSessions = async () => {
    const supabase = createClient();
    
    // Get current session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      // In a real implementation, you'd fetch all sessions from your database
      // For now, we'll show the current session
      setSessions([
        {
          id: session.user.id,
          device: 'Current Device',
          location: 'Unknown',
          lastActive: new Date().toISOString(),
          current: true,
        }
      ]);
    }
    
    setShowSessions(true);
  };

  const revokeSession = async (sessionId: string) => {
    setSaving(true);
    const supabase = createClient();

    // Sign out from specific session
    await supabase.auth.signOut();

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const deleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      return;
    }

    setSaving(true);
    const supabase = createClient();

    if (!profile) return;

    try {
      // Delete the user record from the database
      // Note: This is a hard delete since soft-delete columns don't exist
      await supabase
        .from('users')
        .delete()
        .eq('id', profile.id);

      // Sign out
      await supabase.auth.signOut();

      // Redirect to home
      window.location.href = '/?deleted=true';
    } catch (error) {
      console.error('Delete account error:', error);
      setPasswordError('Failed to delete account. Please contact support.');
      setSaving(false);
    }
  };

  const applyTheme = (themeToApply: 'light' | 'dark-blue' | 'charcoal') => {
    // Remove all theme classes
    document.documentElement.classList.remove('dark', 'theme-dark-blue', 'theme-charcoal');
    
    // Apply selected theme
    if (themeToApply === 'dark-blue') {
      document.documentElement.classList.add('theme-dark-blue');
    } else if (themeToApply === 'charcoal') {
      document.documentElement.classList.add('theme-charcoal');
    }
    // Light theme is default (no class needed)
  };

  const saveTheme = async (newTheme: 'light' | 'dark-blue' | 'charcoal') => {
    setTheme(newTheme);
    applyTheme(newTheme);

    // Save to database
    if (profile) {
      const supabase = createClient();
      await supabase
        .from('users')
        .update({ theme: newTheme })
        .eq('id', profile.id);
    }

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

  const isMspOrg = organization?.organization_type === 'msp';
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'organization', label: 'Organization', icon: Building2 },
    // Branding is only available for MSP organizations with white-label subdomains
    ...(isMspOrg ? [{ id: 'branding', label: 'Branding', icon: Palette, href: '/settings/branding' }] : []),
    { id: 'billing', label: 'Billing', icon: CreditCard, href: '/settings/billing' },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Monitor },
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
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors text-muted-foreground hover:bg-accent"
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
                      ? 'bg-violet-100 text-violet-900 font-medium dark:bg-violet-900/30 dark:text-violet-300'
                      : 'text-muted-foreground hover:bg-accent'
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
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
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
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed
                  </p>
                </div>

                {/* Personal Links Section */}
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Personal Links (Optional)</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Add your personal URLs to use in signature templates with placeholders like {'{'}{'{'} calendly_url {'}'}{'}'}
                    </p>
                  </div>
                  
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2">
                        <CalendarClock className="h-4 w-4" />
                        Calendly URL
                      </label>
                      <Input
                        type="url"
                        value={calendlyUrl}
                        onChange={(e) => setCalendlyUrl(e.target.value)}
                        placeholder="https://calendly.com/yourname"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn Profile
                      </label>
                      <Input
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/yourname"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2">
                        <Twitter className="h-4 w-4" />
                        Twitter/X Profile
                      </label>
                      <Input
                        type="url"
                        value={twitterUrl}
                        onChange={(e) => setTwitterUrl(e.target.value)}
                        placeholder="https://twitter.com/yourname"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2">
                        <Github className="h-4 w-4" />
                        GitHub Profile
                      </label>
                      <Input
                        type="url"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        placeholder="https://github.com/yourname"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2">
                        <Globe className="h-4 w-4" />
                        Personal Website
                      </label>
                      <Input
                        type="url"
                        value={personalWebsite}
                        onChange={(e) => setPersonalWebsite(e.target.value)}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </label>
                      <Input
                        type="url"
                        value={instagramUrl}
                        onChange={(e) => setInstagramUrl(e.target.value)}
                        placeholder="https://instagram.com/yourname"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2">
                        <Facebook className="h-4 w-4" />
                        Facebook
                      </label>
                      <Input
                        type="url"
                        value={facebookUrl}
                        onChange={(e) => setFacebookUrl(e.target.value)}
                        placeholder="https://facebook.com/yourname"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2">
                        <Youtube className="h-4 w-4" />
                        YouTube Channel
                      </label>
                      <Input
                        type="url"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="https://youtube.com/@yourname"
                      />
                    </div>
                  </div>
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
                    value={orgDomain}
                    onChange={(e) => setOrgDomain(e.target.value)}
                    disabled={domainSource !== 'manual' && domainSource !== null}
                    className={domainSource !== 'manual' && domainSource !== null ? 'bg-muted' : ''}
                    placeholder="company.com"
                  />
                  {domainSource === 'google_workspace' && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Domain is synced from Google Workspace integration
                    </p>
                  )}
                  {domainSource === 'microsoft_365' && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Domain is synced from Microsoft 365 integration
                    </p>
                  )}
                  {domainSource === 'hubspot' && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Domain is synced from HubSpot integration
                    </p>
                  )}
                  {domainSource === 'manual' && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter your organization's email domain (e.g., company.com)
                    </p>
                  )}
                  {domainSource === null && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Connect an integration or enter manually
                    </p>
                  )}
                </div>

                {/* Employee Self-Management Settings */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Employee Self-Management
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Control what employees can manage in their self-service portal
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">Employee Self-Manage Portal</p>
                        <p className="text-sm text-muted-foreground">
                          Allow employees to access the self-manage portal to update their profile
                        </p>
                      </div>
                      <Switch
                        checked={orgSettings.allow_employee_self_manage}
                        onCheckedChange={(checked) => setOrgSettings({ ...orgSettings, allow_employee_self_manage: checked })}
                      />
                    </div>

                    {orgSettings.allow_employee_self_manage && (
                      <>
                        <div className="flex items-center justify-between p-4 rounded-lg border ml-4">
                          <div className="flex items-center gap-3">
                            <Link2 className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Personal Links</p>
                              <p className="text-sm text-muted-foreground">
                                Allow employees to add their own social/booking links
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={orgSettings.allow_employee_personal_links}
                            onCheckedChange={(checked) => setOrgSettings({ ...orgSettings, allow_employee_personal_links: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg border ml-4">
                          <div className="flex items-center gap-3">
                            <CalendarClock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Google Calendar Integration</p>
                              <p className="text-sm text-muted-foreground">
                                Allow employees to connect their Google Calendar
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={orgSettings.allow_employee_calendar_integration}
                            onCheckedChange={(checked) => setOrgSettings({ ...orgSettings, allow_employee_calendar_integration: checked })}
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg border ml-4">
                          <div className="flex items-center gap-3">
                            <Palmtree className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Out-of-Office Banners</p>
                              <p className="text-sm text-muted-foreground">
                                Allow employees to enable automatic OOO banners
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={orgSettings.allow_employee_ooo_banners}
                            onCheckedChange={(checked) => setOrgSettings({ ...orgSettings, allow_employee_ooo_banners: checked })}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Google Calendar Org-Wide Setting */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CalendarClock className="h-5 w-5" />
                    Google Calendar (Organization-Wide)
                  </h3>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Enable Google Calendar Integration</p>
                      <p className="text-sm text-muted-foreground">
                        Enable Google Calendar features for booking links and OOO detection
                      </p>
                    </div>
                    <Switch
                      checked={orgSettings.google_calendar_enabled}
                      onCheckedChange={(checked) => setOrgSettings({ ...orgSettings, google_calendar_enabled: checked })}
                    />
                  </div>
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

                <Button onClick={saveNotifications} disabled={saving}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : saved ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {saved ? 'Saved!' : 'Save Preferences'}
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <button 
                      onClick={() => saveTheme('light')}
                      className={`p-4 border-2 rounded-lg text-center transition-colors ${
                        theme === 'light' ? 'border-violet-600' : 'border hover:border-primary/50'
                      }`}
                    >
                      <div className="w-full h-8 bg-background border rounded mb-2" />
                      <span className={`text-sm ${theme === 'light' ? 'font-medium' : ''}`}>Light</span>
                    </button>
                    <button 
                      onClick={() => saveTheme('dark-blue')}
                      className={`p-4 border-2 rounded-lg text-center transition-colors ${
                        theme === 'dark-blue' ? 'border-violet-600' : 'border hover:border-primary/50'
                      }`}
                    >
                      <div className="w-full h-8 bg-blue-900 rounded mb-2" />
                      <span className={`text-sm ${theme === 'dark-blue' ? 'font-medium' : ''}`}>Dark Blue</span>
                    </button>
                    <button 
                      onClick={() => saveTheme('charcoal')}
                      className={`p-4 border-2 rounded-lg text-center transition-colors ${
                        theme === 'charcoal' ? 'border-violet-600' : 'border hover:border-primary/50'
                      }`}
                    >
                      <div className="w-full h-8 bg-gray-900 rounded mb-2" />
                      <span className={`text-sm ${theme === 'charcoal' ? 'font-medium' : ''}`}>Charcoal</span>
                    </button>
                  </div>
                </div>

                {saved && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-800">
                      Theme preference saved successfully!
                    </p>
                  </div>
                )}
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
                {passwordSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-800">
                      Password updated successfully!
                    </p>
                  </div>
                )}

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">
                        Update your password to keep your account secure
                      </p>
                    </div>
                    {!showPasswordChange && (
                      <Button variant="outline" onClick={() => setShowPasswordChange(true)}>
                        Change Password
                      </Button>
                    )}
                  </div>
                  
                  {showPasswordChange && (
                    <div className="mt-4 space-y-4 pt-4 border-t">
                      <div>
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Confirm Password</label>
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                        />
                      </div>
                      
                      {passwordError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-800">{passwordError}</p>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button onClick={changePassword} disabled={saving}>
                          {saving ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Update Password
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setShowPasswordChange(false);
                            setNewPassword('');
                            setConfirmPassword('');
                            setPasswordError('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        {twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security'}
                      </p>
                    </div>
                    {!twoFactorEnabled && !show2FASetup && (
                      <Button variant="outline" onClick={enable2FA} disabled={saving}>
                        {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Smartphone className="h-4 w-4 mr-2" />}
                        Enable 2FA
                      </Button>
                    )}
                    {twoFactorEnabled && (
                      <Button variant="outline" onClick={disable2FA} disabled={saving}>
                        {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                        Disable 2FA
                      </Button>
                    )}
                  </div>

                  {show2FASetup && (
                    <div className="mt-4 space-y-4 pt-4 border-t">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800 mb-3">
                          Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                        </p>
                        {qrCode && (
                          <div className="bg-card p-4 rounded-lg inline-block">
                            <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Verification Code</label>
                        <Input
                          type="text"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={verify2FA} disabled={saving || verificationCode.length !== 6}>
                          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                          Verify & Enable
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setShow2FASetup(false);
                            setVerificationCode('');
                            setQrCode('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">
                        Manage your active login sessions
                      </p>
                    </div>
                    <Button variant="outline" onClick={loadSessions}>
                      <Monitor className="h-4 w-4 mr-2" />
                      {showSessions ? 'Refresh' : 'View Sessions'}
                    </Button>
                  </div>

                  {showSessions && (
                    <div className="mt-4 space-y-3 pt-4 border-t">
                      {sessions.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No active sessions found.</p>
                      ) : (
                        sessions.map((session) => (
                          <div key={session.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-3">
                              <Monitor className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">
                                  {session.device}
                                  {session.current && (
                                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Current</span>
                                  )}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Last active: {new Date(session.lastActive).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            {!session.current && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => revokeSession(session.id)}
                              >
                                Revoke
                              </Button>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  
                  {!showDeleteConfirm ? (
                    <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  ) : (
                    <div className="space-y-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-900 mb-2">
                            Are you absolutely sure?
                          </p>
                          <p className="text-sm text-red-800 mb-4">
                            This will permanently delete your account, all templates, deployments, and organization data. 
                            This action cannot be undone.
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-red-900 mb-2">
                          Type <span className="font-mono bg-red-100 px-1 rounded">DELETE</span> to confirm
                        </label>
                        <Input
                          value={deleteConfirmText}
                          onChange={(e) => setDeleteConfirmText(e.target.value)}
                          placeholder="DELETE"
                          className="border-red-300"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="destructive" 
                          onClick={deleteAccount}
                          disabled={deleteConfirmText !== 'DELETE' || saving}
                        >
                          {saving ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4 mr-2" />
                          )}
                          Permanently Delete Account
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setShowDeleteConfirm(false);
                            setDeleteConfirmText('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
