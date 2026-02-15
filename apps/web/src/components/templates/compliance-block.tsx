'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Modal, ModalHeader, ModalTitle, ModalDescription } from '@/components/ui';
import { 
  ComplianceBlockContent, 
  IndustryType,
  LegalComplianceFields,
  HealthcareComplianceFields,
  FinanceComplianceFields,
  RealEstateComplianceFields,
  InsuranceComplianceFields,
  AccountingComplianceFields,
  ConsultingComplianceFields,
  TechnologyComplianceFields,
  EducationComplianceFields,
  NonProfitComplianceFields,
  INDUSTRY_DISCLAIMERS,
  COMPLIANCE_PRESETS,
} from './types';
import { Shield, AlertCircle, Building2, Library } from 'lucide-react';

const INDUSTRY_OPTIONS: { value: IndustryType; label: string; description: string }[] = [
  { value: 'general', label: 'General Business', description: 'Standard business signature' },
  { value: 'legal', label: 'Legal', description: 'Law firms & attorneys' },
  { value: 'healthcare', label: 'Healthcare', description: 'Medical & HIPAA compliance' },
  { value: 'finance', label: 'Finance', description: 'Financial services & SEC/FINRA' },
  { value: 'real_estate', label: 'Real Estate', description: 'Agents & brokers' },
  { value: 'insurance', label: 'Insurance', description: 'Insurance agents & brokers' },
  { value: 'accounting', label: 'Accounting', description: 'CPAs & tax professionals' },
  { value: 'consulting', label: 'Consulting', description: 'Management & strategy' },
  { value: 'technology', label: 'Technology', description: 'IT & software companies' },
  { value: 'education', label: 'Education', description: 'Schools & universities' },
  { value: 'non_profit', label: 'Non-Profit', description: '501(c)(3) organizations' },
];

interface ComplianceBlockEditorProps {
  content: ComplianceBlockContent;
  onChange: (content: ComplianceBlockContent) => void;
}

export function ComplianceBlockEditor({ content, onChange }: ComplianceBlockEditorProps) {
  const [showLibrary, setShowLibrary] = useState(false);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | 'all'>('all');

  const updateField = (field: string, value: string | boolean) => {
    onChange({
      ...content,
      fields: {
        ...content.fields,
        [field]: value,
      },
    });
  };

  const handleOpenLibrary = () => {
    setShowLibrary(true);
    setLoadingLibrary(false);
  };

  const handleSelectFromLibrary = (industryType: IndustryType, presetKey: string) => {
    const preset = COMPLIANCE_PRESETS[industryType]?.[presetKey];
    if (preset) {
      onChange({
        ...content,
        industryType,
        preset: presetKey,
        fields: { ...preset.fields },
      });
      setShowLibrary(false);
    }
  };

  const renderLegalFields = (fields: LegalComplianceFields) => (
    <>
      <div>
        <Label htmlFor="barNumber">Bar Number</Label>
        <Input
          id="barNumber"
          value={fields.barNumber || ''}
          onChange={(e) => updateField('barNumber', e.target.value)}
          placeholder="e.g., CA Bar #123456"
        />
      </div>
      <div>
        <Label htmlFor="barState">Bar State</Label>
        <Input
          id="barState"
          value={fields.barState || ''}
          onChange={(e) => updateField('barState', e.target.value)}
          placeholder="e.g., California"
        />
      </div>
      <div>
        <Label htmlFor="credentials">Credentials</Label>
        <Input
          id="credentials"
          value={fields.credentials || ''}
          onChange={(e) => updateField('credentials', e.target.value)}
          placeholder="e.g., Esq., J.D."
        />
      </div>
      <div>
        <Label htmlFor="firmName">Firm Name</Label>
        <Input
          id="firmName"
          value={fields.firmName || ''}
          onChange={(e) => updateField('firmName', e.target.value)}
          placeholder="Law firm name"
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="disclaimer">Legal Disclaimer *</Label>
        <Textarea
          id="disclaimer"
          value={fields.disclaimer || INDUSTRY_DISCLAIMERS.legal}
          onChange={(e) => updateField('disclaimer', e.target.value)}
          rows={4}
          className="text-xs"
        />
        <p className="text-xs text-muted-foreground mt-1">Required for legal compliance</p>
      </div>
    </>
  );

  const renderHealthcareFields = (fields: HealthcareComplianceFields) => (
    <>
      <div>
        <Label htmlFor="npiNumber">NPI Number</Label>
        <Input
          id="npiNumber"
          value={fields.npiNumber || ''}
          onChange={(e) => updateField('npiNumber', e.target.value)}
          placeholder="e.g., 1234567890"
        />
      </div>
      <div>
        <Label htmlFor="licenseNumber">License Number</Label>
        <Input
          id="licenseNumber"
          value={fields.licenseNumber || ''}
          onChange={(e) => updateField('licenseNumber', e.target.value)}
          placeholder="Medical license number"
        />
      </div>
      <div>
        <Label htmlFor="licenseState">License State</Label>
        <Input
          id="licenseState"
          value={fields.licenseState || ''}
          onChange={(e) => updateField('licenseState', e.target.value)}
          placeholder="e.g., California"
        />
      </div>
      <div>
        <Label htmlFor="credentials">Credentials</Label>
        <Input
          id="credentials"
          value={fields.credentials || ''}
          onChange={(e) => updateField('credentials', e.target.value)}
          placeholder="e.g., MD, RN, NP"
        />
      </div>
      <div>
        <Label htmlFor="practiceName">Practice Name</Label>
        <Input
          id="practiceName"
          value={fields.practiceName || ''}
          onChange={(e) => updateField('practiceName', e.target.value)}
          placeholder="Medical practice name"
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="hipaaDisclaimer">HIPAA Disclaimer *</Label>
        <Textarea
          id="hipaaDisclaimer"
          value={fields.hipaaDisclaimer || INDUSTRY_DISCLAIMERS.healthcare}
          onChange={(e) => updateField('hipaaDisclaimer', e.target.value)}
          rows={4}
          className="text-xs"
        />
        <p className="text-xs text-muted-foreground mt-1">Required for HIPAA compliance</p>
      </div>
    </>
  );

  const renderFinanceFields = (fields: FinanceComplianceFields) => (
    <>
      <div>
        <Label htmlFor="crdNumber">CRD Number</Label>
        <Input
          id="crdNumber"
          value={fields.crdNumber || ''}
          onChange={(e) => updateField('crdNumber', e.target.value)}
          placeholder="Central Registration Depository number"
        />
      </div>
      <div>
        <Label htmlFor="secNumber">SEC Number</Label>
        <Input
          id="secNumber"
          value={fields.secNumber || ''}
          onChange={(e) => updateField('secNumber', e.target.value)}
          placeholder="SEC registration number"
        />
      </div>
      <div>
        <Label htmlFor="licenseNumber">License Number</Label>
        <Input
          id="licenseNumber"
          value={fields.licenseNumber || ''}
          onChange={(e) => updateField('licenseNumber', e.target.value)}
          placeholder="State license number"
        />
      </div>
      <div>
        <Label htmlFor="credentials">Credentials</Label>
        <Input
          id="credentials"
          value={fields.credentials || ''}
          onChange={(e) => updateField('credentials', e.target.value)}
          placeholder="e.g., CFA, CFP, ChFC"
        />
      </div>
      <div>
        <Label htmlFor="brokerDealerName">Broker-Dealer Name</Label>
        <Input
          id="brokerDealerName"
          value={fields.brokerDealerName || ''}
          onChange={(e) => updateField('brokerDealerName', e.target.value)}
          placeholder="Broker-dealer firm name"
        />
      </div>
      <div>
        <Label htmlFor="riaName">RIA Name</Label>
        <Input
          id="riaName"
          value={fields.riaName || ''}
          onChange={(e) => updateField('riaName', e.target.value)}
          placeholder="Registered Investment Advisor name"
        />
      </div>
      <div>
        <Label htmlFor="firmName">Firm Name</Label>
        <Input
          id="firmName"
          value={fields.firmName || ''}
          onChange={(e) => updateField('firmName', e.target.value)}
          placeholder="Financial firm name"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="memberFINRASIPC"
          checked={fields.memberFINRASIPC || false}
          onChange={(e) => updateField('memberFINRASIPC', e.target.checked)}
          className="h-4 w-4"
        />
        <Label htmlFor="memberFINRASIPC" className="cursor-pointer">Member FINRA/SIPC</Label>
      </div>
      <div className="col-span-2">
        <Label htmlFor="disclaimer">Financial Disclaimer *</Label>
        <Textarea
          id="disclaimer"
          value={fields.disclaimer || INDUSTRY_DISCLAIMERS.finance}
          onChange={(e) => updateField('disclaimer', e.target.value)}
          rows={4}
          className="text-xs"
        />
        <p className="text-xs text-muted-foreground mt-1">Required for SEC/FINRA compliance</p>
      </div>
    </>
  );

  const renderRealEstateFields = (fields: RealEstateComplianceFields) => (
    <>
      <div>
        <Label htmlFor="licenseNumber">License Number *</Label>
        <Input
          id="licenseNumber"
          value={fields.licenseNumber || ''}
          onChange={(e) => updateField('licenseNumber', e.target.value)}
          placeholder="Real estate license"
          required
        />
      </div>
      <div>
        <Label htmlFor="licenseState">License State *</Label>
        <Input
          id="licenseState"
          value={fields.licenseState || ''}
          onChange={(e) => updateField('licenseState', e.target.value)}
          placeholder="e.g., California"
          required
        />
      </div>
      <div>
        <Label htmlFor="dreNumber">DRE Number (CA)</Label>
        <Input
          id="dreNumber"
          value={fields.dreNumber || ''}
          onChange={(e) => updateField('dreNumber', e.target.value)}
          placeholder="California DRE number"
        />
      </div>
      <div>
        <Label htmlFor="mlsNumber">MLS Number</Label>
        <Input
          id="mlsNumber"
          value={fields.mlsNumber || ''}
          onChange={(e) => updateField('mlsNumber', e.target.value)}
          placeholder="MLS ID"
        />
      </div>
      <div>
        <Label htmlFor="designations">Designations</Label>
        <Input
          id="designations"
          value={fields.designations || ''}
          onChange={(e) => updateField('designations', e.target.value)}
          placeholder="e.g., REALTOR®, ABR, GRI"
        />
      </div>
      <div>
        <Label htmlFor="brokerageName">Brokerage Name</Label>
        <Input
          id="brokerageName"
          value={fields.brokerageName || ''}
          onChange={(e) => updateField('brokerageName', e.target.value)}
          placeholder="Brokerage firm name"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="equalHousingLogo"
          checked={fields.equalHousingLogo || false}
          onChange={(e) => updateField('equalHousingLogo', e.target.checked)}
          className="h-4 w-4"
        />
        <Label htmlFor="equalHousingLogo" className="cursor-pointer">
          Include Equal Housing Logo
        </Label>
      </div>
    </>
  );

  const renderInsuranceFields = (fields: InsuranceComplianceFields) => (
    <>
      <div>
        <Label htmlFor="licenseNumber">License Number *</Label>
        <Input
          id="licenseNumber"
          value={fields.licenseNumber || ''}
          onChange={(e) => updateField('licenseNumber', e.target.value)}
          placeholder="Insurance license number"
        />
      </div>
      <div>
        <Label htmlFor="licenseState">License State *</Label>
        <Input
          id="licenseState"
          value={fields.licenseState || ''}
          onChange={(e) => updateField('licenseState', e.target.value)}
          placeholder="e.g., California"
        />
      </div>
      <div>
        <Label htmlFor="nmlsNumber">NMLS Number</Label>
        <Input
          id="nmlsNumber"
          value={fields.nmlsNumber || ''}
          onChange={(e) => updateField('nmlsNumber', e.target.value)}
          placeholder="Nationwide Multistate Licensing System"
        />
      </div>
      <div>
        <Label htmlFor="credentials">Credentials</Label>
        <Input
          id="credentials"
          value={fields.credentials || ''}
          onChange={(e) => updateField('credentials', e.target.value)}
          placeholder="e.g., CLU, ChFC, CPCU"
        />
      </div>
      <div>
        <Label htmlFor="agencyName">Agency Name</Label>
        <Input
          id="agencyName"
          value={fields.agencyName || ''}
          onChange={(e) => updateField('agencyName', e.target.value)}
          placeholder="Insurance agency name"
        />
      </div>
      <div>
        <Label htmlFor="carrierAffiliations">Carrier Affiliations</Label>
        <Input
          id="carrierAffiliations"
          value={fields.carrierAffiliations || ''}
          onChange={(e) => updateField('carrierAffiliations', e.target.value)}
          placeholder="e.g., State Farm, Allstate"
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="disclaimer">Insurance Disclaimer</Label>
        <Textarea
          id="disclaimer"
          value={fields.disclaimer || INDUSTRY_DISCLAIMERS.insurance}
          onChange={(e) => updateField('disclaimer', e.target.value)}
          rows={3}
          className="text-xs"
        />
      </div>
    </>
  );

  const renderAccountingFields = (fields: AccountingComplianceFields) => (
    <>
      <div>
        <Label htmlFor="cpaNumber">CPA Number *</Label>
        <Input
          id="cpaNumber"
          value={fields.cpaNumber || ''}
          onChange={(e) => updateField('cpaNumber', e.target.value)}
          placeholder="CPA license number"
        />
      </div>
      <div>
        <Label htmlFor="licenseState">License State *</Label>
        <Input
          id="licenseState"
          value={fields.licenseState || ''}
          onChange={(e) => updateField('licenseState', e.target.value)}
          placeholder="e.g., California"
        />
      </div>
      <div>
        <Label htmlFor="credentials">Credentials</Label>
        <Input
          id="credentials"
          value={fields.credentials || ''}
          onChange={(e) => updateField('credentials', e.target.value)}
          placeholder="e.g., CPA, EA, CMA"
        />
      </div>
      <div>
        <Label htmlFor="firmName">Firm Name</Label>
        <Input
          id="firmName"
          value={fields.firmName || ''}
          onChange={(e) => updateField('firmName', e.target.value)}
          placeholder="Accounting firm name"
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="disclaimer">Accounting Disclaimer</Label>
        <Textarea
          id="disclaimer"
          value={fields.disclaimer || INDUSTRY_DISCLAIMERS.accounting}
          onChange={(e) => updateField('disclaimer', e.target.value)}
          rows={3}
          className="text-xs"
        />
      </div>
    </>
  );

  const renderConsultingFields = (fields: ConsultingComplianceFields) => (
    <>
      <div>
        <Label htmlFor="credentials">Credentials</Label>
        <Input
          id="credentials"
          value={fields.credentials || ''}
          onChange={(e) => updateField('credentials', e.target.value)}
          placeholder="e.g., MBA, PMP, Six Sigma"
        />
      </div>
      <div>
        <Label htmlFor="firmName">Firm Name</Label>
        <Input
          id="firmName"
          value={fields.firmName || ''}
          onChange={(e) => updateField('firmName', e.target.value)}
          placeholder="Consulting firm name"
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="specializations">Specializations</Label>
        <Input
          id="specializations"
          value={fields.specializations || ''}
          onChange={(e) => updateField('specializations', e.target.value)}
          placeholder="e.g., Strategy, Operations, Digital Transformation"
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="disclaimer">Consulting Disclaimer</Label>
        <Textarea
          id="disclaimer"
          value={fields.disclaimer || INDUSTRY_DISCLAIMERS.consulting}
          onChange={(e) => updateField('disclaimer', e.target.value)}
          rows={3}
          className="text-xs"
        />
      </div>
    </>
  );

  const renderTechnologyFields = (fields: TechnologyComplianceFields) => (
    <>
      <div>
        <Label htmlFor="certifications">Certifications</Label>
        <Input
          id="certifications"
          value={fields.certifications || ''}
          onChange={(e) => updateField('certifications', e.target.value)}
          placeholder="e.g., AWS Certified, CISSP, PMP"
        />
      </div>
      <div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={fields.companyName || ''}
          onChange={(e) => updateField('companyName', e.target.value)}
          placeholder="Technology company name"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="gdprCompliant"
          checked={fields.gdprCompliant || false}
          onChange={(e) => updateField('gdprCompliant', e.target.checked)}
          className="h-4 w-4"
        />
        <Label htmlFor="gdprCompliant" className="cursor-pointer">GDPR Compliant</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="soc2Compliant"
          checked={fields.soc2Compliant || false}
          onChange={(e) => updateField('soc2Compliant', e.target.checked)}
          className="h-4 w-4"
        />
        <Label htmlFor="soc2Compliant" className="cursor-pointer">SOC 2 Compliant</Label>
      </div>
      <div className="col-span-2">
        <Label htmlFor="disclaimer">Technology Disclaimer</Label>
        <Textarea
          id="disclaimer"
          value={fields.disclaimer || INDUSTRY_DISCLAIMERS.technology}
          onChange={(e) => updateField('disclaimer', e.target.value)}
          rows={3}
          className="text-xs"
        />
      </div>
    </>
  );

  const renderEducationFields = (fields: EducationComplianceFields) => (
    <>
      <div>
        <Label htmlFor="credentials">Credentials</Label>
        <Input
          id="credentials"
          value={fields.credentials || ''}
          onChange={(e) => updateField('credentials', e.target.value)}
          placeholder="e.g., PhD, EdD, M.Ed"
        />
      </div>
      <div>
        <Label htmlFor="institution">Institution</Label>
        <Input
          id="institution"
          value={fields.institution || ''}
          onChange={(e) => updateField('institution', e.target.value)}
          placeholder="School or university name"
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="accreditation">Accreditation</Label>
        <Input
          id="accreditation"
          value={fields.accreditation || ''}
          onChange={(e) => updateField('accreditation', e.target.value)}
          placeholder="e.g., Regional accreditation, AACSB"
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="ferpaNotice">FERPA Notice</Label>
        <Textarea
          id="ferpaNotice"
          value={fields.ferpaNotice || INDUSTRY_DISCLAIMERS.education}
          onChange={(e) => updateField('ferpaNotice', e.target.value)}
          rows={3}
          className="text-xs"
        />
      </div>
    </>
  );

  const renderNonProfitFields = (fields: NonProfitComplianceFields) => (
    <>
      <div>
        <Label htmlFor="ein">EIN (Tax ID) *</Label>
        <Input
          id="ein"
          value={fields.ein || ''}
          onChange={(e) => updateField('ein', e.target.value)}
          placeholder="e.g., 12-3456789"
        />
      </div>
      <div>
        <Label htmlFor="taxExemptStatus">Tax-Exempt Status *</Label>
        <Input
          id="taxExemptStatus"
          value={fields.taxExemptStatus || ''}
          onChange={(e) => updateField('taxExemptStatus', e.target.value)}
          placeholder="e.g., 501(c)(3)"
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="organizationName">Organization Name</Label>
        <Input
          id="organizationName"
          value={fields.organizationName || ''}
          onChange={(e) => updateField('organizationName', e.target.value)}
          placeholder="Non-profit organization name"
        />
      </div>
      <div className="col-span-2">
        <Label htmlFor="disclaimer">Non-Profit Disclaimer</Label>
        <Textarea
          id="disclaimer"
          value={fields.disclaimer || INDUSTRY_DISCLAIMERS.non_profit}
          onChange={(e) => updateField('disclaimer', e.target.value)}
          rows={3}
          className="text-xs"
        />
      </div>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
        <Shield className="h-4 w-4 text-blue-600" />
        <span>Compliance fields ensure your signatures meet industry regulations</span>
      </div>

      {/* Browse Library Button */}
      <Button
        type="button"
        variant="outline"
        onClick={handleOpenLibrary}
        className="w-full"
      >
        <Library className="mr-2 h-4 w-4" />
        Browse Compliance Library (30+ templates)
      </Button>

      {/* Industry selector for non-general industries - allows changing */}
      {content.industryType !== 'general' && (
        <div className="flex items-center justify-between p-2 bg-muted rounded-lg border">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              {INDUSTRY_OPTIONS.find(o => o.value === content.industryType)?.label}
              {content.preset && COMPLIANCE_PRESETS[content.industryType]?.[content.preset] && (
                <span className="text-xs text-muted-foreground ml-2">
                  ({COMPLIANCE_PRESETS[content.industryType][content.preset].name})
                </span>
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onChange({
              ...content,
              industryType: 'general',
              fields: {},
              preset: undefined,
            })}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Change industry
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {content.industryType === 'legal' && renderLegalFields(content.fields as LegalComplianceFields)}
        {content.industryType === 'healthcare' && renderHealthcareFields(content.fields as HealthcareComplianceFields)}
        {content.industryType === 'finance' && renderFinanceFields(content.fields as FinanceComplianceFields)}
        {content.industryType === 'real_estate' && renderRealEstateFields(content.fields as RealEstateComplianceFields)}
        {content.industryType === 'insurance' && renderInsuranceFields(content.fields as InsuranceComplianceFields)}
        {content.industryType === 'accounting' && renderAccountingFields(content.fields as AccountingComplianceFields)}
        {content.industryType === 'consulting' && renderConsultingFields(content.fields as ConsultingComplianceFields)}
        {content.industryType === 'technology' && renderTechnologyFields(content.fields as TechnologyComplianceFields)}
        {content.industryType === 'education' && renderEducationFields(content.fields as EducationComplianceFields)}
        {content.industryType === 'non_profit' && renderNonProfitFields(content.fields as NonProfitComplianceFields)}
        {content.industryType === 'general' && (
          <div className="col-span-2 space-y-4">
            <div className="space-y-2">
              <Label>Select Industry for Compliance</Label>
              <div className="grid grid-cols-2 gap-2">
                {INDUSTRY_OPTIONS.filter(opt => opt.value !== 'general').map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange({
                      ...content,
                      industryType: option.value,
                      fields: {},
                    })}
                    className="flex flex-col items-start p-3 border rounded-lg hover:border-violet-500 hover:bg-violet-50 transition-colors text-left"
                  >
                    <span className="font-medium text-sm">{option.label}</span>
                    <span className="text-xs text-muted-foreground">{option.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Compliance Library Modal */}
      <Modal open={showLibrary} onClose={() => { setShowLibrary(false); setSelectedIndustry('all'); }}>
        <ModalHeader>
          <ModalTitle>Compliance Library</ModalTitle>
          <ModalDescription>
            Choose from 30+ pre-configured compliance templates across 10 industries
          </ModalDescription>
        </ModalHeader>
        <div className="py-4 space-y-3">
          {/* Industry Filter */}
          <div className="flex gap-2">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value as IndustryType | 'all')}
              className="w-full px-3 py-2 border rounded-md text-sm bg-background"
            >
              <option value="all">All Industries</option>
              {INDUSTRY_OPTIONS.filter(opt => opt.value !== 'general').map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Template List */}
          <div className="max-h-[400px] overflow-y-auto space-y-3">
            {INDUSTRY_OPTIONS
              .filter(opt => opt.value !== 'general')
              .filter(opt => selectedIndustry === 'all' || opt.value === selectedIndustry)
              .map((industry) => {
                const presets = COMPLIANCE_PRESETS[industry.value];
                if (!presets || Object.keys(presets).length === 0) return null;
                
                return (
                  <div key={industry.value} className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground px-2">
                      {industry.label}
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(presets).map(([key, preset]) => (
                        <div
                          key={key}
                          className="p-3 border rounded-lg hover:bg-muted cursor-pointer transition-colors"
                          onClick={() => handleSelectFromLibrary(industry.value, key)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{preset.name}</span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                              {industry.label}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {Object.entries(preset.fields)
                              .filter(([_, value]) => value && value !== '')
                              .map(([key, value]) => {
                                if (typeof value === 'boolean') return value ? key : null;
                                if (typeof value === 'string' && value.length > 50) {
                                  return `${key}: ${value.substring(0, 50)}...`;
                                }
                                return `${key}: ${value}`;
                              })
                              .filter(Boolean)
                              .slice(0, 2)
                              .join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div>
          <Label htmlFor="fontSize">Font Size</Label>
          <Input
            id="fontSize"
            type="number"
            value={content.fontSize}
            onChange={(e) => onChange({ ...content, fontSize: parseInt(e.target.value) })}
            min={8}
            max={16}
          />
        </div>
        <div>
          <Label htmlFor="color">Text Color</Label>
          <Input
            id="color"
            type="color"
            value={content.color}
            onChange={(e) => onChange({ ...content, color: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

export function ComplianceBlockPreview({ content }: { content: ComplianceBlockContent }) {
  const fields = content.fields;
  const placeholderStyle = { color: '#9ca3af', fontStyle: 'italic' as const };
  
  // Check if any fields have values
  const hasAnyValue = (obj: Record<string, any>) => {
    return Object.values(obj).some(v => v && v !== '' && v !== false);
  };

  const renderLegalPreview = (fields: LegalComplianceFields) => {
    const hasValues = hasAnyValue(fields);
    
    if (!hasValues) {
      return (
        <div style={{ fontSize: content.fontSize, color: content.color }}>
          <div style={{ ...placeholderStyle, fontSize: content.fontSize }}>
            <div style={{ fontWeight: 'bold' }}>Esq., J.D.</div>
            <div>Bar Number: CA Bar #123456</div>
            <div>Licensed in California</div>
            <div>Smith & Associates LLP</div>
            <div style={{ 
              marginTop: '8px', 
              padding: '8px', 
              backgroundColor: '#f9fafb', 
              borderLeft: '3px solid #6b7280',
              fontSize: content.fontSize - 2 
            }}>
              Attorney-client privilege disclaimer will appear here...
            </div>
          </div>
          <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 8, textAlign: 'center' as const }}>
            Fill in the compliance fields to see your actual content
          </div>
        </div>
      );
    }
    
    return (
      <div style={{ fontSize: content.fontSize, color: content.color }}>
        {fields.credentials && <div style={{ fontWeight: 'bold' }}>{fields.credentials}</div>}
        {fields.barNumber && <div>Bar Number: {fields.barNumber}</div>}
        {fields.barState && <div>Licensed in {fields.barState}</div>}
        {fields.firmName && <div>{fields.firmName}</div>}
        {(fields.disclaimer || INDUSTRY_DISCLAIMERS.legal) && (
          <div style={{ 
            marginTop: '8px', 
            padding: '8px', 
            backgroundColor: '#f9fafb', 
            borderLeft: '3px solid #6b7280',
            fontSize: content.fontSize - 2 
          }}>
            {fields.disclaimer || INDUSTRY_DISCLAIMERS.legal}
          </div>
        )}
      </div>
    );
  };

  const renderHealthcarePreview = (fields: HealthcareComplianceFields) => {
    const hasValues = hasAnyValue(fields);
    
    if (!hasValues) {
      return (
        <div style={{ fontSize: content.fontSize, color: content.color }}>
          <div style={{ ...placeholderStyle, fontSize: content.fontSize }}>
            <div style={{ fontWeight: 'bold' }}>MD, FACP</div>
            <div>City Medical Center</div>
            <div>NPI: 1234567890</div>
            <div>License: MD12345 (California)</div>
            <div style={{ 
              marginTop: '8px', 
              padding: '8px', 
              backgroundColor: '#eff6ff', 
              borderLeft: '3px solid #3b82f6',
              fontSize: content.fontSize - 2 
            }}>
              HIPAA confidentiality notice will appear here...
            </div>
          </div>
          <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 8, textAlign: 'center' as const }}>
            Fill in the compliance fields to see your actual content
          </div>
        </div>
      );
    }
    
    return (
      <div style={{ fontSize: content.fontSize, color: content.color }}>
        {fields.credentials && <div style={{ fontWeight: 'bold' }}>{fields.credentials}</div>}
        {fields.practiceName && <div>{fields.practiceName}</div>}
        {fields.npiNumber && <div>NPI: {fields.npiNumber}</div>}
        {fields.licenseNumber && <div>License: {fields.licenseNumber}{fields.licenseState ? ` (${fields.licenseState})` : ''}</div>}
        {(fields.hipaaDisclaimer || INDUSTRY_DISCLAIMERS.healthcare) && (
          <div style={{ 
            marginTop: '8px', 
            padding: '8px', 
            backgroundColor: '#eff6ff', 
            borderLeft: '3px solid #3b82f6',
            fontSize: content.fontSize - 2 
          }}>
            {fields.hipaaDisclaimer || INDUSTRY_DISCLAIMERS.healthcare}
          </div>
        )}
      </div>
    );
  };

  const renderFinancePreview = (fields: FinanceComplianceFields) => {
    const hasValues = hasAnyValue(fields);
    
    if (!hasValues) {
      return (
        <div style={{ fontSize: content.fontSize, color: content.color }}>
          <div style={{ ...placeholderStyle, fontSize: content.fontSize }}>
            <div style={{ fontWeight: 'bold' }}>CFA, CFP®</div>
            <div>Wealth Management Group</div>
            <div>Securities offered through ABC Securities</div>
            <div>Investment advisory services through XYZ Advisors</div>
            <div style={{ fontStyle: 'italic' }}>Member FINRA/SIPC</div>
            <div>CRD: 1234567</div>
            <div style={{ 
              marginTop: '8px', 
              padding: '8px', 
              backgroundColor: '#f0fdf4', 
              borderLeft: '3px solid #10b981',
              fontSize: content.fontSize - 2 
            }}>
              SEC/FINRA compliance disclaimer will appear here...
            </div>
          </div>
          <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 8, textAlign: 'center' as const }}>
            Fill in the compliance fields to see your actual content
          </div>
        </div>
      );
    }
    
    return (
      <div style={{ fontSize: content.fontSize, color: content.color }}>
        {fields.credentials && <div style={{ fontWeight: 'bold' }}>{fields.credentials}</div>}
        {fields.firmName && <div>{fields.firmName}</div>}
        {fields.brokerDealerName && <div>Securities offered through {fields.brokerDealerName}</div>}
        {fields.riaName && <div>Investment advisory services through {fields.riaName}</div>}
        {fields.memberFINRASIPC && <div style={{ fontStyle: 'italic' }}>Member FINRA/SIPC</div>}
        {fields.crdNumber && <div>CRD: {fields.crdNumber}</div>}
        {fields.secNumber && <div>SEC: {fields.secNumber}</div>}
        {fields.licenseNumber && <div>License: {fields.licenseNumber}</div>}
        {(fields.disclaimer || INDUSTRY_DISCLAIMERS.finance) && (
          <div style={{ 
            marginTop: '8px', 
            padding: '8px', 
            backgroundColor: '#f0fdf4', 
            borderLeft: '3px solid #10b981',
            fontSize: content.fontSize - 2 
          }}>
            {fields.disclaimer || INDUSTRY_DISCLAIMERS.finance}
          </div>
        )}
      </div>
    );
  };

  const renderRealEstatePreview = (fields: RealEstateComplianceFields) => {
    const hasValues = hasAnyValue(fields);
    
    if (!hasValues) {
      return (
        <div style={{ fontSize: content.fontSize, color: content.color }}>
          <div style={{ ...placeholderStyle, fontSize: content.fontSize }}>
            <div style={{ fontWeight: 'bold' }}>REALTOR®, ABR, GRI</div>
            <div>Premier Realty Group</div>
            <div>License: 01234567 (California)</div>
            <div>DRE: 01234567</div>
            <div>MLS: 12345</div>
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                backgroundColor: '#3b82f6',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '12px'
              }}>
                =
              </div>
              <span style={{ fontSize: content.fontSize - 2 }}>Equal Housing Opportunity</span>
            </div>
          </div>
          <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 8, textAlign: 'center' as const }}>
            Fill in the compliance fields to see your actual content
          </div>
        </div>
      );
    }
    
    return (
      <div style={{ fontSize: content.fontSize, color: content.color }}>
        {fields.designations && <div style={{ fontWeight: 'bold' }}>{fields.designations}</div>}
        {fields.brokerageName && <div>{fields.brokerageName}</div>}
        {fields.licenseNumber && <div>License: {fields.licenseNumber}{fields.licenseState ? ` (${fields.licenseState})` : ''}</div>}
        {fields.dreNumber && <div>DRE: {fields.dreNumber}</div>}
        {fields.mlsNumber && <div>MLS: {fields.mlsNumber}</div>}
        {fields.equalHousingLogo && (
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '24px', 
              height: '24px', 
              backgroundColor: '#3b82f6',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '12px'
            }}>
              =
            </div>
            <span style={{ fontSize: content.fontSize - 2 }}>Equal Housing Opportunity</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '12px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
      {content.industryType === 'legal' && renderLegalPreview(fields as LegalComplianceFields)}
      {content.industryType === 'healthcare' && renderHealthcarePreview(fields as HealthcareComplianceFields)}
      {content.industryType === 'finance' && renderFinancePreview(fields as FinanceComplianceFields)}
      {content.industryType === 'real_estate' && renderRealEstatePreview(fields as RealEstateComplianceFields)}
      {content.industryType === 'general' && (
        <div style={{ fontSize: 11, color: '#999', fontStyle: 'italic' }}>
          Select an industry to display compliance information
        </div>
      )}
    </div>
  );
}
