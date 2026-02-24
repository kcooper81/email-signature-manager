'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Copy, Check, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const disclaimerTemplates = [
  {
    id: 'general',
    name: 'General Business',
    icon: '🏢',
    description: 'Standard confidentiality notice for business emails',
    template: (company: string) =>
      `This email and any attachments are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the sender immediately and delete this message from your system. Any unauthorized use, disclosure, or distribution is prohibited. ${company ? `© ${new Date().getFullYear()} ${company}. All rights reserved.` : ''}`,
  },
  {
    id: 'hipaa',
    name: 'HIPAA Healthcare',
    icon: '🏥',
    description: 'Required for healthcare organizations handling PHI',
    template: (company: string) =>
      `CONFIDENTIALITY NOTICE: This email message, including any attachments, is for the sole use of the intended recipient(s) and may contain confidential and privileged information protected under the Health Insurance Portability and Accountability Act (HIPAA). Any unauthorized review, use, disclosure, or distribution is strictly prohibited. If you are not the intended recipient, please contact the sender by reply email and destroy all copies of the original message. ${company ? `${company} — ` : ''}HIPAA Compliance Notice.`,
  },
  {
    id: 'gdpr',
    name: 'GDPR (EU Privacy)',
    icon: '🇪🇺',
    description: 'European data protection compliance notice',
    template: (company: string) =>
      `This email may contain confidential information. If you are not the intended recipient, please inform the sender immediately and delete this email. In accordance with the General Data Protection Regulation (EU) 2016/679, any personal data contained in this email is processed for legitimate business purposes. ${company ? `For information about how ${company} processes your data, please visit our privacy policy.` : 'For information about how we process your data, please visit our privacy policy.'} You have the right to access, correct, or delete your personal data by contacting us.`,
  },
  {
    id: 'legal',
    name: 'Legal / Law Firm',
    icon: '⚖️',
    description: 'Attorney-client privilege and confidentiality',
    template: (company: string) =>
      `PRIVILEGED AND CONFIDENTIAL: This email and any files transmitted with it are confidential, may be protected by attorney-client privilege, and are intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please immediately notify the sender by telephone or reply email and permanently delete the original message. Any review, dissemination, copying, printing, or use of this email by anyone other than the intended recipient is strictly prohibited. ${company ? `${company} — Attorney-Client Communication.` : ''}`,
  },
  {
    id: 'financial',
    name: 'Financial Services',
    icon: '🏦',
    description: 'For banks, investment firms, and financial advisors',
    template: (company: string) =>
      `IMPORTANT NOTICE: This email is intended only for the use of the addressee. It may contain information that is confidential, proprietary, or subject to legal privilege. ${company || 'This firm'} does not accept any responsibility for changes made to this message after it was sent. This email does not constitute investment advice or an offer or solicitation to buy or sell any financial instruments. Any views expressed are those of the author and do not necessarily represent the views of ${company || 'the firm'}. If you have received this message in error, please notify the sender and delete the email from your system.`,
  },
  {
    id: 'tax',
    name: 'Tax Advisory (IRS)',
    icon: '📊',
    description: 'IRS Circular 230 compliance for tax professionals',
    template: (company: string) =>
      `IRS CIRCULAR 230 DISCLOSURE: To ensure compliance with requirements imposed by the IRS, we inform you that any U.S. federal tax advice contained in this communication (including any attachments) is not intended or written to be used, and cannot be used, for the purpose of (i) avoiding penalties under the Internal Revenue Code or (ii) promoting, marketing, or recommending to another party any transaction or matter addressed herein. This message is confidential and intended only for the named recipient. ${company ? `© ${new Date().getFullYear()} ${company}.` : ''}`,
  },
  {
    id: 'government',
    name: 'Government / Public Sector',
    icon: '🏛️',
    description: 'For government agencies and public officials',
    template: (company: string) =>
      `This email message and any attachments may contain information that is sensitive, confidential, or exempt from disclosure under applicable law. This message is intended for the sole use of the addressee(s). If you are not an intended recipient, you are notified that any review, copying, or distribution of this message is strictly prohibited. Please notify the sender by reply email and delete all copies. ${company ? `This email was sent by ${company}.` : ''} Public records laws may apply to this communication.`,
  },
  {
    id: 'environmental',
    name: 'Environmental / Green',
    icon: '🌱',
    description: 'Eco-friendly notice encouraging less printing',
    template: (company: string) =>
      `Please consider the environment before printing this email. This message and any attachments are confidential and intended solely for the addressee. If you have received this message in error, please notify the sender and delete it. ${company ? `${company} is committed to sustainable practices and reducing our environmental footprint.` : ''} Think before you print.`,
  },
];

export default function DisclaimerGeneratorPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('general');
  const [companyName, setCompanyName] = useState('');
  const [copied, setCopied] = useState<'text' | 'html' | null>(null);

  const currentTemplate = disclaimerTemplates.find(t => t.id === selectedTemplate)!;
  const disclaimerText = currentTemplate.template(companyName);

  const disclaimerHtml = `<div style="margin-top: 20px; padding-top: 12px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #6b7280; line-height: 1.5; font-family: Arial, Helvetica, sans-serif;">${disclaimerText}</div>`;

  const handleCopy = (type: 'text' | 'html') => {
    navigator.clipboard.writeText(type === 'text' ? disclaimerText : disclaimerHtml);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      {/* Hero */}
      <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-6">
            <Shield className="h-4 w-4" />
            Free Tool
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Email Disclaimer Generator
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate professional email disclaimers for HIPAA, GDPR, legal, financial,
            and general business use. Copy-ready text or HTML.
          </p>
        </div>
      </section>

      {/* Generator */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Template Selection */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-base font-medium">Company Name (optional)</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Inc."
                  className="text-lg"
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Choose a Disclaimer Type</h2>
                <div className="grid gap-3">
                  {disclaimerTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl">{template.icon}</span>
                      <div>
                        <div className="font-semibold">{template.name}</div>
                        <div className="text-sm text-gray-500">{template.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview & Output */}
            <div>
              <div className="sticky top-8 space-y-6">
                <h2 className="text-xl font-semibold">Generated Disclaimer</h2>

                {/* Preview */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Preview
                  </div>
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #e5e7eb', fontSize: 11, color: '#6b7280', lineHeight: 1.5, fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    {disclaimerText}
                  </div>
                </div>

                {/* Copy buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={() => handleCopy('text')} variant="outline" size="lg" className="w-full">
                    {copied === 'text' ? (
                      <><Check className="mr-2 h-4 w-4" /> Copied!</>
                    ) : (
                      <><Copy className="mr-2 h-4 w-4" /> Copy Text</>
                    )}
                  </Button>
                  <Button onClick={() => handleCopy('html')} size="lg" className="w-full">
                    {copied === 'html' ? (
                      <><Check className="mr-2 h-4 w-4" /> Copied!</>
                    ) : (
                      <><Copy className="mr-2 h-4 w-4" /> Copy HTML</>
                    )}
                  </Button>
                </div>

                {/* HTML Output */}
                <div>
                  <Label className="text-sm font-semibold text-gray-500 mb-2 block">HTML Code</Label>
                  <textarea
                    value={disclaimerHtml}
                    readOnly
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-xs resize-none bg-gray-50"
                  />
                </div>

                {/* Usage tip */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">How to use</h3>
                  <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Select your industry/compliance type</li>
                    <li>Enter your company name (optional)</li>
                    <li>Copy the text or HTML version</li>
                    <li>Paste it at the bottom of your email signature</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Disclaimers Matter */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Email Disclaimers Matter</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Legal Protection', desc: 'Disclaimers can limit your liability if an email is sent to the wrong person or contains errors.' },
              { title: 'Regulatory Compliance', desc: 'Industries like healthcare (HIPAA), finance, and law require specific email notices.' },
              { title: 'Confidentiality', desc: 'Clearly state that email contents are confidential and not for unauthorized distribution.' },
              { title: 'Professionalism', desc: 'A well-crafted disclaimer signals that your organization takes communication seriously.' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Manage disclaimers for your entire team
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            With Siggly, add disclaimers to every team member&apos;s signature automatically.
            Update them centrally without touching individual email accounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" className="bg-blue-700 text-white hover:bg-blue-800">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
