'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ComplianceBlockContent, 
  IndustryType,
  LegalComplianceFields,
  HealthcareComplianceFields,
  FinanceComplianceFields,
  RealEstateComplianceFields,
  INDUSTRY_DISCLAIMERS,
} from './types';
import { Shield, AlertCircle } from 'lucide-react';

interface ComplianceBlockEditorProps {
  content: ComplianceBlockContent;
  onChange: (content: ComplianceBlockContent) => void;
}

export function ComplianceBlockEditor({ content, onChange }: ComplianceBlockEditorProps) {
  const updateField = (field: string, value: string | boolean) => {
    onChange({
      ...content,
      fields: {
        ...content.fields,
        [field]: value,
      },
    });
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
        <p className="text-xs text-gray-500 mt-1">Required for legal compliance</p>
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
        <p className="text-xs text-gray-500 mt-1">Required for HIPAA compliance</p>
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
        <p className="text-xs text-gray-500 mt-1">Required for SEC/FINRA compliance</p>
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <Shield className="h-4 w-4 text-blue-600" />
        <span>Compliance fields ensure your signatures meet industry regulations</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {content.industryType === 'legal' && renderLegalFields(content.fields as LegalComplianceFields)}
        {content.industryType === 'healthcare' && renderHealthcareFields(content.fields as HealthcareComplianceFields)}
        {content.industryType === 'finance' && renderFinanceFields(content.fields as FinanceComplianceFields)}
        {content.industryType === 'real_estate' && renderRealEstateFields(content.fields as RealEstateComplianceFields)}
      </div>

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
  
  const renderLegalPreview = (fields: LegalComplianceFields) => (
    <div style={{ fontSize: content.fontSize, color: content.color }}>
      {fields.credentials && <div style={{ fontWeight: 'bold' }}>{fields.credentials}</div>}
      {fields.barNumber && <div>Bar Number: {fields.barNumber}</div>}
      {fields.barState && <div>Licensed in {fields.barState}</div>}
      {fields.firmName && <div>{fields.firmName}</div>}
      {fields.disclaimer && (
        <div style={{ 
          marginTop: '8px', 
          padding: '8px', 
          backgroundColor: '#f9fafb', 
          borderLeft: '3px solid #6b7280',
          fontSize: content.fontSize - 2 
        }}>
          {fields.disclaimer}
        </div>
      )}
    </div>
  );

  const renderHealthcarePreview = (fields: HealthcareComplianceFields) => (
    <div style={{ fontSize: content.fontSize, color: content.color }}>
      {fields.credentials && <div style={{ fontWeight: 'bold' }}>{fields.credentials}</div>}
      {fields.practiceName && <div>{fields.practiceName}</div>}
      {fields.npiNumber && <div>NPI: {fields.npiNumber}</div>}
      {fields.licenseNumber && <div>License: {fields.licenseNumber} ({fields.licenseState})</div>}
      {fields.hipaaDisclaimer && (
        <div style={{ 
          marginTop: '8px', 
          padding: '8px', 
          backgroundColor: '#eff6ff', 
          borderLeft: '3px solid #3b82f6',
          fontSize: content.fontSize - 2 
        }}>
          {fields.hipaaDisclaimer}
        </div>
      )}
    </div>
  );

  const renderFinancePreview = (fields: FinanceComplianceFields) => (
    <div style={{ fontSize: content.fontSize, color: content.color }}>
      {fields.credentials && <div style={{ fontWeight: 'bold' }}>{fields.credentials}</div>}
      {fields.firmName && <div>{fields.firmName}</div>}
      {fields.brokerDealerName && <div>Securities offered through {fields.brokerDealerName}</div>}
      {fields.riaName && <div>Investment advisory services through {fields.riaName}</div>}
      {fields.memberFINRASIPC && <div style={{ fontStyle: 'italic' }}>Member FINRA/SIPC</div>}
      {fields.crdNumber && <div>CRD: {fields.crdNumber}</div>}
      {fields.secNumber && <div>SEC: {fields.secNumber}</div>}
      {fields.licenseNumber && <div>License: {fields.licenseNumber}</div>}
      {fields.disclaimer && (
        <div style={{ 
          marginTop: '8px', 
          padding: '8px', 
          backgroundColor: '#f0fdf4', 
          borderLeft: '3px solid #10b981',
          fontSize: content.fontSize - 2 
        }}>
          {fields.disclaimer}
        </div>
      )}
    </div>
  );

  const renderRealEstatePreview = (fields: RealEstateComplianceFields) => (
    <div style={{ fontSize: content.fontSize, color: content.color }}>
      {fields.designations && <div style={{ fontWeight: 'bold' }}>{fields.designations}</div>}
      {fields.brokerageName && <div>{fields.brokerageName}</div>}
      {fields.licenseNumber && <div>License: {fields.licenseNumber} ({fields.licenseState})</div>}
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

  return (
    <div style={{ padding: '12px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
      {content.industryType === 'legal' && renderLegalPreview(fields as LegalComplianceFields)}
      {content.industryType === 'healthcare' && renderHealthcarePreview(fields as HealthcareComplianceFields)}
      {content.industryType === 'finance' && renderFinancePreview(fields as FinanceComplianceFields)}
      {content.industryType === 'real_estate' && renderRealEstatePreview(fields as RealEstateComplianceFields)}
    </div>
  );
}
