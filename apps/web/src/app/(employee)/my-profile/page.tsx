'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { 
  Loader2, 
  Save, 
  User, 
  Mail, 
  Briefcase, 
  Building2,
  Calendar,
  CalendarClock,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  CheckCircle2,
  AlertCircle,
  FileSignature,
  Copy,
  Check,
  Palmtree,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  department: string | null;
  phone: string | null;
  mobile: string | null;
  calendly_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  github_url: string | null;
  personal_website: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  youtube_url: string | null;
  organization_id: string;
  google_calendar_enabled: boolean | null;
  google_booking_url: string | null;
  ooo_banner_enabled: boolean | null;
  ooo_custom_message: string | null;
  calendar_sync_enabled: boolean | null;
  self_manage_enabled: boolean | null;
}

interface OrgSettings {
  allow_employee_self_manage: boolean;
  allow_employee_personal_links: boolean;
  allow_employee_calendar_integration: boolean;
  allow_employee_ooo_banners: boolean;
  google_calendar_enabled: boolean;
}

interface CalendarData {
  calendarEnabled: boolean;
  oooStatus: {
    isOutOfOffice: boolean;
    dateRange: string | null;
    eventTitle?: string;
    message?: string;
  };
  bookingLinks: Array<{
    name: string;
    url: string;
    duration?: number;
  }>;
  upcomingOOO: Array<{
    summary: string;
    dateRange: string;
  }>;
}

interface SignatureData {
  id: string;
  html: string;
  template_name: string;
}

export default function MyProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [signature, setSignature] = useState<SignatureData | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    mobile: '',
    calendly_url: '',
    linkedin_url: '',
    twitter_url: '',
    github_url: '',
    personal_website: '',
    instagram_url: '',
    facebook_url: '',
    youtube_url: '',
  });

  // Calendar integration state
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [calendarSettings, setCalendarSettings] = useState({
    calendarEnabled: false,
    oooEnabled: true,
    bookingUrl: '',
    oooCustomMessage: '',
  });

  // Organization settings (what features are allowed)
  const [orgSettings, setOrgSettings] = useState<OrgSettings>({
    allow_employee_self_manage: true,
    allow_employee_personal_links: true,
    allow_employee_calendar_integration: true,
    allow_employee_ooo_banners: true,
    google_calendar_enabled: true,
  });
  const [accessDenied, setAccessDenied] = useState(false);
  const [isWorkspaceUser, setIsWorkspaceUser] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setLoading(false);
      return;
    }

    // Get user profile
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', user.id)
      .maybeSingle();

    if (error || !userData) {
      setErrorMessage('Failed to load profile');
      setLoading(false);
      return;
    }

    // Check if user has self-manage access disabled
    if (userData.self_manage_enabled === false) {
      setAccessDenied(true);
      setLoading(false);
      return;
    }

    // Load organization settings
    const { data: orgSettingsData } = await supabase
      .from('organization_settings')
      .select('*')
      .eq('organization_id', userData.organization_id)
      .maybeSingle();

    if (orgSettingsData) {
      const settings = {
        allow_employee_self_manage: orgSettingsData.allow_employee_self_manage ?? true,
        allow_employee_personal_links: orgSettingsData.allow_employee_personal_links ?? true,
        allow_employee_calendar_integration: orgSettingsData.allow_employee_calendar_integration ?? true,
        allow_employee_ooo_banners: orgSettingsData.allow_employee_ooo_banners ?? true,
        google_calendar_enabled: orgSettingsData.google_calendar_enabled ?? true,
      };
      setOrgSettings(settings);

      // Check if org-wide self-manage is disabled
      if (!settings.allow_employee_self_manage) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }
    }

    // Check if user is from Google Workspace domain
    const { data: googleConnection } = await supabase
      .from('provider_connections')
      .select('metadata')
      .eq('organization_id', userData.organization_id)
      .eq('provider', 'google')
      .eq('is_active', true)
      .maybeSingle();

    if (googleConnection?.metadata) {
      const workspaceDomain = (googleConnection.metadata as any)?.domain;
      if (workspaceDomain) {
        const userDomain = userData.email.split('@')[1];
        setIsWorkspaceUser(userDomain === workspaceDomain);
      }
    }

    setProfile(userData);
    setForm({
      first_name: userData.first_name || '',
      last_name: userData.last_name || '',
      phone: userData.phone || '',
      mobile: userData.mobile || '',
      calendly_url: userData.calendly_url || '',
      linkedin_url: userData.linkedin_url || '',
      twitter_url: userData.twitter_url || '',
      github_url: userData.github_url || '',
      personal_website: userData.personal_website || '',
      instagram_url: userData.instagram_url || '',
      facebook_url: userData.facebook_url || '',
      youtube_url: userData.youtube_url || '',
    });

    // Set calendar settings from user data
    setCalendarSettings({
      calendarEnabled: userData.google_calendar_enabled || false,
      oooEnabled: userData.ooo_banner_enabled !== false, // Default to true
      bookingUrl: userData.google_booking_url || '',
      oooCustomMessage: userData.ooo_custom_message || '',
    });

    // Load calendar data if enabled
    if (userData.google_calendar_enabled) {
      loadCalendarData();
    }

    // Get user's deployed signature if any
    const { data: deployment } = await supabase
      .from('signature_deployments')
      .select('id, rendered_html, signature_templates!signature_deployments_template_id_fkey(name)')
      .eq('user_id', userData.id)
      .eq('status', 'success')
      .order('deployed_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (deployment) {
      setSignature({
        id: deployment.id,
        html: deployment.rendered_html,
        template_name: (deployment.signature_templates as any)?.name || 'Email Signature',
      });
    }

    setLoading(false);
  };

  const loadCalendarData = async () => {
    setCalendarLoading(true);
    try {
      const response = await fetch('/api/integrations/google/calendar');
      if (response.ok) {
        const data = await response.json();
        setCalendarData(data);
      }
    } catch (err) {
      console.error('Failed to load calendar data:', err);
    } finally {
      setCalendarLoading(false);
    }
  };

  const saveCalendarSettings = async () => {
    try {
      const response = await fetch('/api/integrations/google/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calendarEnabled: calendarSettings.calendarEnabled,
          oooEnabled: calendarSettings.oooEnabled,
          bookingUrl: calendarSettings.bookingUrl,
          oooCustomMessage: calendarSettings.oooCustomMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save calendar settings');
      }

      setSuccessMessage('Calendar settings updated!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save calendar settings');
    }
  };

  const saveProfile = async () => {
    if (!profile) return;

    setSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const supabase = createClient();
      
      const { error } = await supabase
        .from('users')
        .update({
          first_name: form.first_name || null,
          last_name: form.last_name || null,
          phone: form.phone || null,
          mobile: form.mobile || null,
          calendly_url: form.calendly_url || null,
          linkedin_url: form.linkedin_url || null,
          twitter_url: form.twitter_url || null,
          github_url: form.github_url || null,
          personal_website: form.personal_website || null,
          instagram_url: form.instagram_url || null,
          facebook_url: form.facebook_url || null,
          youtube_url: form.youtube_url || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) throw error;

      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const copySignature = async () => {
    if (!signature?.html) return;

    try {
      // Copy as HTML for rich text paste
      const blob = new Blob([signature.html], { type: 'text/html' });
      await navigator.clipboard.write([
        new ClipboardItem({ 'text/html': blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback to plain text
      await navigator.clipboard.writeText(signature.html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-5 w-5" />
              Access Restricted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your organization administrator has disabled access to the self-manage portal.
              Please contact your administrator if you need to update your profile information.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and email signature
        </p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-lg flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <p>{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Email Signature Card */}
      {signature && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSignature className="h-5 w-5" />
              Your Email Signature
            </CardTitle>
            <CardDescription>
              Copy this signature to your email client
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="border rounded-lg p-4 bg-white"
              dangerouslySetInnerHTML={{ __html: signature.html }}
            />
            <Button onClick={copySignature} className="w-full sm:w-auto">
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Signature
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Basic Info (Read-only) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Basic Information
          </CardTitle>
          <CardDescription>
            This information is managed by your organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email
              </label>
              <Input value={profile?.email || ''} disabled className="bg-muted" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                Job Title
              </label>
              <Input value={profile?.title || 'Not set'} disabled className="bg-muted" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Department
              </label>
              <Input value={profile?.department || 'Not set'} disabled className="bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editable Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle>Your Details</CardTitle>
          <CardDescription>
            Update your name and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <Input 
                value={form.first_name} 
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                placeholder="Your first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <Input 
                value={form.last_name} 
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                placeholder="Your last name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input 
                value={form.phone} 
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mobile</label>
              <Input 
                value={form.mobile} 
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                placeholder="+1 (555) 987-6543"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Links - only show if org allows */}
      {orgSettings.allow_employee_personal_links && (
      <Card>
        <CardHeader>
          <CardTitle>Personal Links</CardTitle>
          <CardDescription>
            Add your social profiles and personal links to your signature
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Calendly URL
              </label>
              <Input 
                value={form.calendly_url} 
                onChange={(e) => setForm({ ...form, calendly_url: e.target.value })}
                placeholder="https://calendly.com/yourname"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-muted-foreground" />
                LinkedIn URL
              </label>
              <Input 
                value={form.linkedin_url} 
                onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                placeholder="https://linkedin.com/in/yourname"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Twitter className="h-4 w-4 text-muted-foreground" />
                Twitter/X URL
              </label>
              <Input 
                value={form.twitter_url} 
                onChange={(e) => setForm({ ...form, twitter_url: e.target.value })}
                placeholder="https://twitter.com/yourname"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Github className="h-4 w-4 text-muted-foreground" />
                GitHub URL
              </label>
              <Input 
                value={form.github_url} 
                onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                placeholder="https://github.com/yourname"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                Personal Website
              </label>
              <Input 
                value={form.personal_website} 
                onChange={(e) => setForm({ ...form, personal_website: e.target.value })}
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Instagram className="h-4 w-4 text-muted-foreground" />
                Instagram URL
              </label>
              <Input 
                value={form.instagram_url} 
                onChange={(e) => setForm({ ...form, instagram_url: e.target.value })}
                placeholder="https://instagram.com/yourname"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Facebook className="h-4 w-4 text-muted-foreground" />
                Facebook URL
              </label>
              <Input 
                value={form.facebook_url} 
                onChange={(e) => setForm({ ...form, facebook_url: e.target.value })}
                placeholder="https://facebook.com/yourname"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Youtube className="h-4 w-4 text-muted-foreground" />
                YouTube URL
              </label>
              <Input 
                value={form.youtube_url} 
                onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
                placeholder="https://youtube.com/@yourname"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Google Calendar Integration - only show if org allows */}
      {orgSettings.allow_employee_calendar_integration && orgSettings.google_calendar_enabled && (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            Google Calendar Integration
          </CardTitle>
          <CardDescription>
            Connect your Google Calendar for booking links and out-of-office banners
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Calendar Status */}
          {calendarData?.oooStatus?.isOutOfOffice && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg flex items-center gap-3">
              <Palmtree className="h-5 w-5 text-amber-600" />
              <div>
                <p className="font-medium">You are currently out of office</p>
                {calendarData.oooStatus.dateRange && (
                  <p className="text-sm">{calendarData.oooStatus.dateRange}</p>
                )}
              </div>
            </div>
          )}

          {/* Enable Calendar Integration */}
          {!isWorkspaceUser && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg flex items-start gap-3 mb-4">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium">Google Workspace Required</p>
                <p className="text-sm mt-1">
                  Calendar integration is only available for users with email addresses from your organization's Google Workspace domain. Contact your administrator if you need access.
                </p>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="calendar-enabled" className="text-base">Enable Calendar Integration</Label>
              <p className="text-sm text-muted-foreground">
                {isWorkspaceUser 
                  ? 'Allow Siggly to read your Google Calendar for scheduling features'
                  : 'Only available for Google Workspace users'}
              </p>
            </div>
            <Switch
              id="calendar-enabled"
              checked={calendarSettings.calendarEnabled}
              disabled={!isWorkspaceUser}
              onCheckedChange={(checked) => {
                setCalendarSettings({ ...calendarSettings, calendarEnabled: checked });
                if (checked && !calendarData) {
                  loadCalendarData();
                }
              }}
            />
          </div>

          {calendarSettings.calendarEnabled && (
            <>
              {/* Google Booking URL */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Google Calendar Booking URL
                </label>
                <div className="flex gap-2">
                  <Input 
                    value={calendarSettings.bookingUrl} 
                    onChange={(e) => setCalendarSettings({ ...calendarSettings, bookingUrl: e.target.value })}
                    placeholder="https://calendar.google.com/calendar/appointments/..."
                    className="flex-1"
                  />
                  {calendarData?.bookingLinks && calendarData.bookingLinks.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const firstLink = calendarData.bookingLinks[0];
                        if (firstLink) {
                          setCalendarSettings({ ...calendarSettings, bookingUrl: firstLink.url });
                        }
                      }}
                    >
                      Auto-fill
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Your Google Calendar appointment scheduling link
                </p>
              </div>

              {/* OOO Banner Settings */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="ooo-enabled" className="text-base">Out-of-Office Banner</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically show a banner in your signature when you&apos;re away
                    </p>
                  </div>
                  <Switch
                    id="ooo-enabled"
                    checked={calendarSettings.oooEnabled}
                    onCheckedChange={(checked) => setCalendarSettings({ ...calendarSettings, oooEnabled: checked })}
                  />
                </div>

                {calendarSettings.oooEnabled && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Custom OOO Message (optional)
                    </label>
                    <Input 
                      value={calendarSettings.oooCustomMessage} 
                      onChange={(e) => setCalendarSettings({ ...calendarSettings, oooCustomMessage: e.target.value })}
                      placeholder="I am currently out of office and will respond when I return."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Leave blank to use the default message
                    </p>
                  </div>
                )}
              </div>

              {/* Upcoming OOO Events */}
              {calendarData?.upcomingOOO && calendarData.upcomingOOO.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Upcoming Time Off</h4>
                  <div className="space-y-2">
                    {calendarData.upcomingOOO.slice(0, 3).map((event, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Palmtree className="h-4 w-4" />
                        <span>{event.summary}</span>
                        <span className="text-xs">({event.dateRange})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Refresh and Save */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadCalendarData}
                  disabled={calendarLoading}
                >
                  {calendarLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  <span className="ml-2">Refresh Calendar</span>
                </Button>
                <Button
                  size="sm"
                  onClick={saveCalendarSettings}
                >
                  Save Calendar Settings
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveProfile} disabled={saving} size="lg">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
