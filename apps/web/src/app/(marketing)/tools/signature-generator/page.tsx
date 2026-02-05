'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowRight, Download, Copy, Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


const templates = [
  { id: 'modern', name: 'Modern', color: 'violet' },
  { id: 'classic', name: 'Classic', color: 'gray' },
  { id: 'bold', name: 'Bold', color: 'blue' },
  { id: 'minimal', name: 'Minimal', color: 'slate' },
];

export default function SignatureGeneratorPage() {
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [formData, setFormData] = useState({
    fullName: 'John Smith',
    jobTitle: 'Marketing Director',
    company: 'Acme Inc.',
    email: 'john@acme.com',
    website: 'www.acme.com',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCopy = () => {
    const signatureHtml = generateSignatureHtml();
    navigator.clipboard.writeText(signatureHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateSignatureHtml = () => {
    const colors = {
      modern: { primary: '#7c3aed', text: '#1f2937' },
      classic: { primary: '#374151', text: '#1f2937' },
      bold: { primary: '#2563eb', text: '#1f2937' },
      minimal: { primary: '#64748b', text: '#334155' },
    };
    const c = colors[selectedTemplate as keyof typeof colors];

    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: ${c.text};">
  <tr>
    <td style="padding-right: 15px; border-right: 3px solid ${c.primary};">
      <div style="width: 80px; height: 80px; background: ${c.primary}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">
        ${formData.fullName.split(' ').map(n => n[0]).join('')}
      </div>
    </td>
    <td style="padding-left: 15px;">
      <div style="font-size: 18px; font-weight: bold; color: ${c.text};">${formData.fullName}</div>
      <div style="color: ${c.primary}; font-weight: 500;">${formData.jobTitle}</div>
      <div style="font-weight: 500;">${formData.company}</div>
      <div style="margin-top: 8px; font-size: 13px;">
        ${formData.email ? `<div>✉️ ${formData.email}</div>` : ''}
        ${formData.website ? `<div>🌐 ${formData.website}</div>` : ''}
      </div>
    </td>
  </tr>
</table>
    `.trim();
  };

  return (
    <>
      {/* Hero */}
      <section className="py-12 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Free Email Signature Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a professional email signature in seconds. No signup required. 
            Copy the HTML and paste it into Gmail, Outlook, or any email client.
          </p>
        </div>
      </section>

      {/* Generator */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Information</h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" value={formData.jobTitle} onChange={(e) => handleChange('jobTitle', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" value={formData.company} onChange={(e) => handleChange('company', e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" value={formData.website} onChange={(e) => handleChange('website', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Template Selection */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Choose a Style</h2>
                <div className="grid grid-cols-4 gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedTemplate === template.id
                          ? 'border-violet-500 bg-violet-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`h-8 w-full rounded bg-${template.color}-500 mb-2`} 
                           style={{ backgroundColor: template.color === 'violet' ? '#7c3aed' : template.color === 'blue' ? '#2563eb' : template.color === 'slate' ? '#64748b' : '#374151' }} />
                      <span className="text-sm font-medium">{template.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview */}
            <div>
              <div className="sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Preview</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex gap-4">
                      <div 
                        className="h-20 w-20 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                        style={{ backgroundColor: selectedTemplate === 'modern' ? '#7c3aed' : selectedTemplate === 'bold' ? '#2563eb' : selectedTemplate === 'minimal' ? '#64748b' : '#374151' }}
                      >
                        {formData.fullName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="border-l-4 pl-4" style={{ borderColor: selectedTemplate === 'modern' ? '#7c3aed' : selectedTemplate === 'bold' ? '#2563eb' : selectedTemplate === 'minimal' ? '#64748b' : '#374151' }}>
                        <div className="text-lg font-bold">{formData.fullName}</div>
                        <div className="font-medium" style={{ color: selectedTemplate === 'modern' ? '#7c3aed' : selectedTemplate === 'bold' ? '#2563eb' : selectedTemplate === 'minimal' ? '#64748b' : '#374151' }}>
                          {formData.jobTitle}
                        </div>
                        <div className="font-medium text-gray-700">{formData.company}</div>
                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                          {formData.email && <div className="flex items-center gap-2"><Mail className="h-3 w-3" /> {formData.email}</div>}
                          {formData.website && <div className="flex items-center gap-2"><Globe className="h-3 w-3" /> {formData.website}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-4">
                  <Button onClick={handleCopy} className="flex-1">
                    {copied ? <><Check className="h-4 w-4 mr-2" /> Copied!</> : <><Copy className="h-4 w-4 mr-2" /> Copy HTML</>}
                  </Button>
                </div>

                {/* Instructions */}
                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">How to use</h3>
                  <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Click "Copy HTML" above</li>
                    <li>Open your email settings (Gmail, Outlook, etc.)</li>
                    <li>Find the signature settings</li>
                    <li>Paste the HTML code</li>
                    <li>Save and you're done!</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Need more? Try Siggly for teams</h2>
          <p className="text-violet-100 mb-6">
            Deploy signatures to your entire team with one click. Track clicks, add campaign banners, and more.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-violet-700 hover:bg-gray-100">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
