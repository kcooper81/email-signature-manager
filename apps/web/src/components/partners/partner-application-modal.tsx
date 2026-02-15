'use client';

import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalDescription } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2, 
  Check, 
  CheckCircle2,
  Building2,
  Users,
  Palette,
  Zap,
  DollarSign,
  RefreshCw,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const SERVICE_OPTIONS = [
  { id: 'it_support', label: 'IT Support & Managed Services' },
  { id: 'cloud_services', label: 'Cloud Services & Migration' },
  { id: 'security', label: 'Cybersecurity' },
  { id: 'consulting', label: 'IT Consulting' },
  { id: 'software_reseller', label: 'Software Reseller/VAR' },
  { id: 'marketing', label: 'Digital Marketing Agency' },
  { id: 'web_development', label: 'Web Development' },
  { id: 'other', label: 'Other' },
];

interface PartnerApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PartnerApplicationModal({ isOpen, onClose }: PartnerApplicationModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [existingOrg, setExistingOrg] = useState<{ id: string; name: string } | null>(null);
  const [convertExisting, setConvertExisting] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    numberOfClients: '',
    primaryServices: [] as string[],
    howHeardAboutUs: '',
    additionalNotes: '',
    preferredSubdomain: '',
  });

  useEffect(() => {
    if (isOpen) {
      checkExistingOrg();
    }
  }, [isOpen]);

  const checkExistingOrg = async () => {
    setCheckingAuth(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: userData } = await supabase
        .from('users')
        .select('organization_id, organizations(id, name, organization_type)')
        .eq('auth_id', user.id)
        .single();
      
      if (userData?.organization_id) {
        const org = userData.organizations as any;
        if (org?.organization_type === 'standard') {
          setExistingOrg({ id: org.id, name: org.name });
          setFormData(prev => ({ ...prev, companyName: org.name }));
        }
      }
    }
    setCheckingAuth(false);
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      primaryServices: prev.primaryServices.includes(serviceId)
        ? prev.primaryServices.filter((s) => s !== serviceId)
        : [...prev.primaryServices, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/partners/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          numberOfClients: formData.numberOfClients ? parseInt(formData.numberOfClients) : null,
          convertExistingOrg: convertExisting,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setSubmitted(false);
      setError(null);
      setFormData({
        companyName: '',
        website: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        numberOfClients: '',
        primaryServices: [],
        howHeardAboutUs: '',
        additionalNotes: '',
        preferredSubdomain: '',
      });
      setConvertExisting(false);
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose} className="max-w-3xl">
      {submitted ? (
        <div className="py-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <ModalTitle className="text-2xl font-bold mb-2">Application Submitted!</ModalTitle>
          <ModalDescription className="text-base mb-6">
            Thank you for your interest in the Siggly Partner Program. We'll review your application and get back to you within 2-3 business days.
          </ModalDescription>
          <p className="text-sm text-muted-foreground mb-6">
            A confirmation email has been sent to <strong>{formData.contactEmail}</strong>
          </p>
          <Button onClick={handleClose}>Close</Button>
        </div>
      ) : (
        <>
          <ModalHeader onClose={handleClose}>
            <div>
              <ModalTitle className="text-2xl">Become a Partner</ModalTitle>
              <ModalDescription>
                Join the Siggly Partner Program and offer white-label email signature management to your clients
              </ModalDescription>
            </div>
          </ModalHeader>

            {/* Benefits Preview */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="flex items-start gap-2 text-sm">
                <Palette className="h-4 w-4 text-violet-600 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">White-label portal</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Zap className="h-4 w-4 text-violet-600 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">5-min deployment</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-violet-600 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">From $1.50/user</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Users className="h-4 w-4 text-violet-600 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Multi-client dashboard</span>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {existingOrg && !checkingAuth && (
              <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="convertExisting"
                    checked={convertExisting}
                    onCheckedChange={(checked) => setConvertExisting(checked === true)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="convertExisting" className="font-medium cursor-pointer">
                      Convert my existing organization to an MSP partner account
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your organization "<strong>{existingOrg.name}</strong>" will be upgraded to an MSP partner account. 
                      All your existing templates, team members, and settings will be preserved.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Company Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      required
                      disabled={convertExisting && !!existingOrg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredSubdomain">Preferred Subdomain</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="preferredSubdomain"
                      placeholder="yourcompany"
                      value={formData.preferredSubdomain}
                      onChange={(e) => setFormData({ ...formData, preferredSubdomain: e.target.value.toLowerCase() })}
                    />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">.siggly.io</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Your white-label portal URL</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Business Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="numberOfClients">Number of Clients</Label>
                  <Input
                    id="numberOfClients"
                    type="number"
                    min="0"
                    placeholder="e.g., 25"
                    value={formData.numberOfClients}
                    onChange={(e) => setFormData({ ...formData, numberOfClients: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Primary Services (select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {SERVICE_OPTIONS.map((service) => (
                      <div key={service.id} className="flex items-center gap-2">
                        <Checkbox
                          id={service.id}
                          checked={formData.primaryServices.includes(service.id)}
                          onCheckedChange={() => handleServiceToggle(service.id)}
                        />
                        <Label htmlFor={service.id} className="cursor-pointer text-sm font-normal">
                          {service.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="howHeardAboutUs">How did you hear about us?</Label>
                  <Input
                    id="howHeardAboutUs"
                    placeholder="e.g., Google search, referral, etc."
                    value={formData.howHeardAboutUs}
                    onChange={(e) => setFormData({ ...formData, howHeardAboutUs: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Tell us more about your business and why you're interested in partnering with Siggly..."
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Application
                </Button>
              </div>
            </form>
          </>
        )}
    </Modal>
  );
}
