'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '@/components/ui/modal';
import { Select } from '@/components/ui/select';
import {
  Loader2,
  Check,
  X,
  Eye,
  Building2,
  Mail,
  Phone,
  Globe,
  Users,
  ExternalLink,
  RefreshCw,
  ClipboardCheck,
  Download,
} from 'lucide-react';
import { exportToCSV, type CSVColumn } from '@/lib/admin/export-csv';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Applications' },
  { value: 'pending', label: 'Pending' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const TIER_OPTIONS = [
  { value: 'registered', label: 'Registered (15% margin)' },
  { value: 'authorized', label: 'Authorized (20% margin)' },
  { value: 'premier', label: 'Premier (25% margin)' },
];

interface PartnerApplication {
  id: string;
  company_name: string;
  website: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  number_of_clients: number | null;
  primary_services: string[] | null;
  how_heard_about_us: string | null;
  additional_notes: string | null;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'withdrawn';
  reviewed_by: string | null;
  reviewed_at: string | null;
  review_notes: string | null;
  organization_id: string | null;
  submitted_at: string;
  partner_tier?: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  under_review: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  withdrawn: 'bg-gray-100 text-gray-800',
};

const SERVICE_LABELS: Record<string, string> = {
  it_support: 'IT Support & Managed Services',
  cloud_services: 'Cloud Services & Migration',
  security: 'Cybersecurity',
  consulting: 'IT Consulting',
  software_reseller: 'Software Reseller/VAR',
  marketing: 'Digital Marketing Agency',
  web_development: 'Web Development',
  other: 'Other',
};

export default function PartnerApplicationsPage() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<PartnerApplication | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Approval form
  const [subdomain, setSubdomain] = useState('');
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null);
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);
  const [partnerTier, setPartnerTier] = useState<string>('registered');
  const [approvalNotes, setApprovalNotes] = useState('');

  // Rejection form
  const [rejectionReason, setRejectionReason] = useState('');
  const [sendRejectionEmail, setSendRejectionEmail] = useState(true);

  // Tier change state
  const [showTierModal, setShowTierModal] = useState(false);
  const [newTier, setNewTier] = useState('registered');
  const [tierChanging, setTierChanging] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const fetchApplications = async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase
      .from('partner_applications')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;

    if (error) {
      setError(error.message);
    } else {
      // For approved apps, fetch partner_tier from organizations
      const apps = data || [];
      const approvedOrgIds = apps
        .filter(a => a.status === 'approved' && a.organization_id)
        .map(a => a.organization_id!);

      if (approvedOrgIds.length > 0) {
        const { data: orgs } = await supabase
          .from('organizations')
          .select('id, partner_tier')
          .in('id', approvedOrgIds);

        const tierMap = new Map(orgs?.map(o => [o.id, o.partner_tier]) || []);

        apps.forEach(app => {
          if (app.organization_id && tierMap.has(app.organization_id)) {
            app.partner_tier = tierMap.get(app.organization_id);
          }
        });
      }

      setApplications(apps);
    }

    setLoading(false);
  };

  const checkSubdomainAvailability = async (value: string) => {
    if (!value || value.length < 3) {
      setSubdomainAvailable(null);
      return;
    }

    setCheckingSubdomain(true);
    try {
      const response = await fetch(`/api/settings/branding/check-subdomain?subdomain=${encodeURIComponent(value)}`);
      const data = await response.json();
      setSubdomainAvailable(data.available);
    } catch {
      setSubdomainAvailable(null);
    } finally {
      setCheckingSubdomain(false);
    }
  };

  const handleSubdomainChange = (value: string) => {
    const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSubdomain(sanitized);
    setSubdomainAvailable(null);

    const timeoutId = setTimeout(() => {
      checkSubdomainAvailability(sanitized);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const openApproveModal = (app: PartnerApplication) => {
    setSelectedApp(app);
    const match = app.additional_notes?.match(/\[Preferred Subdomain: ([a-z0-9-]+)\]/);
    if (match) {
      setSubdomain(match[1]);
      checkSubdomainAvailability(match[1]);
    } else {
      const suggested = app.company_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 30);
      setSubdomain(suggested);
      checkSubdomainAvailability(suggested);
    }
    setPartnerTier('registered');
    setApprovalNotes('');
    setShowApproveModal(true);
  };

  const openRejectModal = (app: PartnerApplication) => {
    setSelectedApp(app);
    setRejectionReason('');
    setShowRejectModal(true);
  };

  const handleMarkUnderReview = async (app: PartnerApplication) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('partner_applications')
      .update({ status: 'under_review', updated_at: new Date().toISOString() })
      .eq('id', app.id);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(`${app.company_name} marked as under review`);
      fetchApplications();
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleApprove = async () => {
    if (!selectedApp || !subdomain || subdomainAvailable !== true) return;

    setProcessing(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/partner-applications/${selectedApp.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'approve',
          subdomain,
          partnerTier,
          reviewNotes: approvalNotes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to approve application');
      }

      setSuccess(`Application approved! ${selectedApp.company_name} can now access their partner portal at ${subdomain}.siggly.io`);
      setShowApproveModal(false);
      fetchApplications();
      setTimeout(() => setSuccess(null), 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedApp) return;

    setProcessing(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/partner-applications/${selectedApp.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reject',
          reviewNotes: rejectionReason,
          sendNotification: sendRejectionEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reject application');
      }

      setSuccess('Application rejected');
      setShowRejectModal(false);
      fetchApplications();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleTierChange = async () => {
    if (!selectedApp) return;
    setTierChanging(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/partner-applications/${selectedApp.id}/tier`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: newTier }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update tier');
      }

      setSuccess(`${selectedApp.company_name} tier updated to ${newTier}`);
      setShowTierModal(false);
      setShowDetailModal(false);
      fetchApplications();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setTierChanging(false);
    }
  };

  const handleExport = () => {
    const columns: CSVColumn<PartnerApplication>[] = [
      { label: 'Company', accessor: (r) => r.company_name },
      { label: 'Contact', accessor: (r) => r.contact_name },
      { label: 'Email', accessor: (r) => r.contact_email },
      { label: 'Status', accessor: (r) => r.status },
      { label: 'Clients', accessor: (r) => r.number_of_clients },
      { label: 'Services', accessor: (r) => r.primary_services?.join(', ') },
      { label: 'Submitted', accessor: (r) => formatDate(r.submitted_at) },
      { label: 'Reviewed', accessor: (r) => r.reviewed_at ? formatDate(r.reviewed_at) : '' },
    ];
    exportToCSV(applications, columns, 'partner-applications');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Partner Applications</h1>
          <p className="text-muted-foreground">Review and manage MSP partner program applications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport} disabled={applications.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={fetchApplications} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500 bg-green-50 text-green-700">
          <Check className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Label>Status Filter:</Label>
            <Select
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-48"
            />
            <span className="text-sm text-muted-foreground">
              {applications.length} application{applications.length !== 1 ? 's' : ''}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No applications found
            </div>
          ) : (
            <div className="divide-y">
              {applications.map((app) => (
                <div key={app.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold truncate">{app.company_name}</h3>
                        <Badge className={STATUS_COLORS[app.status]}>
                          {app.status.replace('_', ' ')}
                        </Badge>
                        {app.status === 'approved' && app.partner_tier && (
                          <Badge variant="outline" className="capitalize">
                            {app.partner_tier}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {app.contact_email}
                        </span>
                        {app.number_of_clients && (
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {app.number_of_clients} clients
                          </span>
                        )}
                        {app.website && (
                          <a
                            href={app.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-primary"
                          >
                            <Globe className="h-3 w-3" />
                            Website
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        <span>Submitted {formatDate(app.submitted_at)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {app.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => handleMarkUnderReview(app)}
                          title="Mark as Under Review"
                        >
                          <ClipboardCheck className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedApp(app);
                          setShowDetailModal(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {(app.status === 'pending' || app.status === 'under_review') && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => openApproveModal(app)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => openRejectModal(app)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Modal open={showDetailModal} onClose={() => setShowDetailModal(false)} className="max-w-2xl">
        <ModalHeader onClose={() => setShowDetailModal(false)}>
          <ModalTitle>Application Details</ModalTitle>
          <ModalDescription>
            Submitted {selectedApp && formatDate(selectedApp.submitted_at)}
          </ModalDescription>
        </ModalHeader>
        {selectedApp && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground text-xs">Company</Label>
                <p className="font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {selectedApp.company_name}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Website</Label>
                <p className="font-medium">
                  {selectedApp.website ? (
                    <a
                      href={selectedApp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      <Globe className="h-4 w-4" />
                      {selectedApp.website}
                    </a>
                  ) : (
                    '—'
                  )}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Contact Name</Label>
                <p className="font-medium">{selectedApp.contact_name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Email</Label>
                <p className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {selectedApp.contact_email}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Phone</Label>
                <p className="font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {selectedApp.contact_phone || '—'}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Number of Clients</Label>
                <p className="font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {selectedApp.number_of_clients || '—'}
                </p>
              </div>
            </div>

            {selectedApp.primary_services && selectedApp.primary_services.length > 0 && (
              <div>
                <Label className="text-muted-foreground text-xs">Primary Services</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedApp.primary_services.map((service) => (
                    <Badge key={service} variant="secondary">
                      {SERVICE_LABELS[service] || service}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedApp.how_heard_about_us && (
              <div>
                <Label className="text-muted-foreground text-xs">How They Heard About Us</Label>
                <p>{selectedApp.how_heard_about_us}</p>
              </div>
            )}

            {selectedApp.additional_notes && (
              <div>
                <Label className="text-muted-foreground text-xs">Additional Notes</Label>
                <p className="whitespace-pre-wrap text-sm">{selectedApp.additional_notes}</p>
              </div>
            )}

            {selectedApp.review_notes && (
              <div className="border-t pt-4">
                <Label className="text-muted-foreground text-xs">Review Notes</Label>
                <p className="whitespace-pre-wrap text-sm">{selectedApp.review_notes}</p>
                {selectedApp.reviewed_at && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Reviewed on {formatDate(selectedApp.reviewed_at)}
                  </p>
                )}
              </div>
            )}

            {/* Tier change section for approved apps */}
            {selectedApp.status === 'approved' && (
              <div className="border-t pt-4">
                <Label className="text-muted-foreground text-xs">Partner Tier</Label>
                <div className="flex items-center gap-3 mt-1">
                  <Badge variant="outline" className="capitalize text-sm">
                    {selectedApp.partner_tier || 'registered'}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setNewTier(selectedApp.partner_tier || 'registered');
                      setShowTierModal(true);
                    }}
                  >
                    Update Tier
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        <ModalFooter>
          {selectedApp && (selectedApp.status === 'pending' || selectedApp.status === 'under_review') && (
            <>
              <Button variant="outline" onClick={() => openRejectModal(selectedApp)}>
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button onClick={() => openApproveModal(selectedApp)}>
                <Check className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </>
          )}
        </ModalFooter>
      </Modal>

      {/* Approve Modal */}
      <Modal open={showApproveModal} onClose={() => setShowApproveModal(false)}>
        <ModalHeader onClose={() => setShowApproveModal(false)}>
          <ModalTitle>Approve Partner Application</ModalTitle>
          <ModalDescription>
            Approve {selectedApp?.company_name} as an MSP partner
          </ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
            <div className="flex gap-2">
              <div className="text-amber-600 font-semibold text-sm">Before Approving:</div>
            </div>
            <p className="text-xs text-amber-700 mt-1">
              You must manually add <span className="font-mono font-semibold">{subdomain}.siggly.io</span> to Vercel domains before clicking &quot;Approve Partner&quot;.
              Go to Vercel → Settings → Domains → Add the subdomain.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subdomain">Subdomain *</Label>
            <div className="flex items-center gap-2">
              <Input
                id="subdomain"
                value={subdomain}
                onChange={(e) => handleSubdomainChange(e.target.value)}
                placeholder="partner-name"
                className="max-w-xs"
              />
              <span className="text-muted-foreground">.siggly.io</span>
              {checkingSubdomain && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
              {!checkingSubdomain && subdomainAvailable === true && (
                <Check className="h-4 w-4 text-green-500" />
              )}
              {!checkingSubdomain && subdomainAvailable === false && (
                <X className="h-4 w-4 text-red-500" />
              )}
            </div>
            {subdomainAvailable === false && (
              <p className="text-xs text-red-500">This subdomain is not available</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnerTier">Partner Tier</Label>
            <Select
              options={TIER_OPTIONS}
              value={partnerTier}
              onChange={(e) => setPartnerTier(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="approvalNotes">Notes (optional)</Label>
            <Textarea
              id="approvalNotes"
              value={approvalNotes}
              onChange={(e) => setApprovalNotes(e.target.value)}
              placeholder="Internal notes about this approval..."
              rows={3}
            />
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setShowApproveModal(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            disabled={processing || !subdomain || subdomainAvailable !== true}
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Approving...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Approve Partner
              </>
            )}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Reject Modal */}
      <Modal open={showRejectModal} onClose={() => setShowRejectModal(false)}>
        <ModalHeader onClose={() => setShowRejectModal(false)}>
          <ModalTitle>Reject Application</ModalTitle>
          <ModalDescription>
            Reject the application from {selectedApp?.company_name}
          </ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rejectionReason">Reason (optional)</Label>
            <Textarea
              id="rejectionReason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Reason for rejection (optional, stored internally)"
              rows={4}
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="sendRejectionEmail"
              checked={sendRejectionEmail}
              onChange={(e) => setSendRejectionEmail(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="sendRejectionEmail" className="text-sm font-normal">
              Send rejection notification email to applicant
            </Label>
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setShowRejectModal(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleReject} disabled={processing}>
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Rejecting...
              </>
            ) : (
              <>
                <X className="mr-2 h-4 w-4" />
                Reject Application
              </>
            )}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Tier Change Modal */}
      <Modal open={showTierModal} onClose={() => setShowTierModal(false)}>
        <ModalHeader onClose={() => setShowTierModal(false)}>
          <ModalTitle>Update Partner Tier</ModalTitle>
          <ModalDescription>
            Change the partner tier for {selectedApp?.company_name}
          </ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <Select
            options={TIER_OPTIONS}
            value={newTier}
            onChange={(e) => setNewTier(e.target.value)}
          />
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setShowTierModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleTierChange} disabled={tierChanging}>
            {tierChanging ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Tier'
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
