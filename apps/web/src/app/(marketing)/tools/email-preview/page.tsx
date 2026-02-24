'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Monitor, Smartphone, Tablet, Eye, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type Client = {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  containerWidth: string;
  darkMode?: boolean;
  bgClass: string;
  textColor: string;
  linkColor: string;
  notes: string;
};

const emailClients: Client[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    icon: '📧',
    bgColor: '#ffffff',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '14px',
    lineHeight: '1.5',
    containerWidth: '600px',
    bgClass: 'bg-white',
    textColor: '#222222',
    linkColor: '#1a73e8',
    notes: 'Gmail strips <style> tags and class attributes. Uses Arial by default.',
  },
  {
    id: 'outlook',
    name: 'Outlook (Desktop)',
    icon: '📮',
    bgColor: '#ffffff',
    fontFamily: 'Calibri, Arial, sans-serif',
    fontSize: '14.5px',
    lineHeight: '1.45',
    containerWidth: '580px',
    bgClass: 'bg-white',
    textColor: '#333333',
    linkColor: '#0563C1',
    notes: 'Outlook uses Word rendering engine. Limited CSS support, no border-radius.',
  },
  {
    id: 'apple-mail',
    name: 'Apple Mail',
    icon: '🍎',
    bgColor: '#ffffff',
    fontFamily: '-apple-system, Helvetica Neue, Helvetica, sans-serif',
    fontSize: '14px',
    lineHeight: '1.6',
    containerWidth: '620px',
    bgClass: 'bg-white',
    textColor: '#1d1d1f',
    linkColor: '#007AFF',
    notes: 'Apple Mail has excellent CSS support. Most modern rendering of all desktop clients.',
  },
  {
    id: 'outlook-web',
    name: 'Outlook.com',
    icon: '🌐',
    bgColor: '#ffffff',
    fontFamily: 'Segoe UI, Tahoma, Geneva, sans-serif',
    fontSize: '14px',
    lineHeight: '1.5',
    containerWidth: '600px',
    bgClass: 'bg-white',
    textColor: '#333333',
    linkColor: '#006CBE',
    notes: 'Better CSS support than desktop Outlook but still strips some properties.',
  },
  {
    id: 'yahoo',
    name: 'Yahoo Mail',
    icon: '💌',
    bgColor: '#ffffff',
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    fontSize: '13px',
    lineHeight: '1.5',
    containerWidth: '600px',
    bgClass: 'bg-white',
    textColor: '#1d2228',
    linkColor: '#1a0dab',
    notes: 'Yahoo Mail overrides some font sizes and can modify colors.',
  },
  {
    id: 'gmail-dark',
    name: 'Gmail (Dark Mode)',
    icon: '🌙',
    bgColor: '#1f1f1f',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '14px',
    lineHeight: '1.5',
    containerWidth: '600px',
    darkMode: true,
    bgClass: 'bg-[#1f1f1f]',
    textColor: '#e8eaed',
    linkColor: '#8ab4f8',
    notes: 'Dark mode inverts colors. White backgrounds become dark, dark text becomes light.',
  },
];

type ViewMode = 'desktop' | 'tablet' | 'mobile';

export default function EmailPreviewPage() {
  const [inputHtml, setInputHtml] = useState('');
  const [selectedClient, setSelectedClient] = useState('gmail');
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');

  const currentClient = emailClients.find(c => c.id === selectedClient)!;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputHtml(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const viewWidths: Record<ViewMode, string> = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  return (
    <>
      {/* Hero */}
      <section className="py-12 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm mb-6">
            <Eye className="h-4 w-4" />
            Free Tool
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Email Signature Preview Tool
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            See how your email signature renders across Gmail, Outlook, Apple Mail,
            and more. Test desktop, tablet, and mobile views.
          </p>
        </div>
      </section>

      {/* Preview Tool */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Input + Client Selection */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-lg font-semibold">Your Signature HTML</Label>
                  <label htmlFor="file-upload">
                    <Button size="sm" variant="outline" asChild>
                      <span className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </span>
                    </Button>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".html,.htm"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <textarea
                  value={inputHtml}
                  onChange={(e) => setInputHtml(e.target.value)}
                  placeholder={'Paste your email signature HTML here...\n\nExample:\n<table cellpadding="0" cellspacing="0">\n  <tr>\n    <td style="font-family: Arial;">\n      <strong>John Smith</strong><br/>\n      Marketing Director\n    </td>\n  </tr>\n</table>'}
                  className="w-full h-52 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Email Client Selection */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Email Client</Label>
                <div className="grid gap-2">
                  {emailClients.map((client) => (
                    <button
                      key={client.id}
                      onClick={() => setSelectedClient(client.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                        selectedClient === client.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-xl">{client.icon}</span>
                      <span className="font-medium text-sm">{client.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-3">
              <div className="sticky top-8 space-y-4">
                {/* View mode toggles */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span>{currentClient.icon}</span>
                    {currentClient.name} Preview
                  </h2>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    {([
                      { mode: 'desktop' as ViewMode, icon: Monitor, label: 'Desktop' },
                      { mode: 'tablet' as ViewMode, icon: Tablet, label: 'Tablet' },
                      { mode: 'mobile' as ViewMode, icon: Smartphone, label: 'Mobile' },
                    ]).map(({ mode, icon: Icon, label }) => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          viewMode === mode
                            ? 'bg-white shadow-sm text-indigo-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                        title={label}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm text-amber-800">
                  {currentClient.notes}
                </div>

                {/* Preview Container */}
                <div className="bg-gray-100 rounded-xl p-6 flex justify-center min-h-[400px]">
                  <div
                    className="transition-all duration-300"
                    style={{ width: viewWidths[viewMode], maxWidth: '100%' }}
                  >
                    {/* Simulated email window */}
                    <div className="bg-gray-200 rounded-t-lg px-4 py-2 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{currentClient.name}</span>
                    </div>

                    {/* Email body */}
                    <div
                      className="rounded-b-lg border border-t-0 border-gray-200 overflow-hidden"
                      style={{ backgroundColor: currentClient.bgColor }}
                    >
                      {/* Simulated email header */}
                      <div className="px-6 py-4 border-b" style={{ borderColor: currentClient.darkMode ? '#333' : '#e5e7eb' }}>
                        <div className="text-xs" style={{ color: currentClient.darkMode ? '#999' : '#6b7280' }}>
                          From: john@company.com
                        </div>
                        <div className="text-xs mt-1" style={{ color: currentClient.darkMode ? '#999' : '#6b7280' }}>
                          To: you@example.com
                        </div>
                        <div className="text-sm font-medium mt-2" style={{ color: currentClient.textColor }}>
                          Re: Project update
                        </div>
                      </div>

                      {/* Email content */}
                      <div className="px-6 py-4" style={{ color: currentClient.textColor, fontFamily: currentClient.fontFamily, fontSize: currentClient.fontSize, lineHeight: currentClient.lineHeight }}>
                        <p style={{ marginBottom: 16 }}>Thanks for the update. Let me know if you need anything else.</p>
                        <p style={{ marginBottom: 24 }}>Best regards,</p>

                        {/* Signature */}
                        {inputHtml ? (
                          <div
                            style={{
                              borderTop: `1px solid ${currentClient.darkMode ? '#444' : '#e5e7eb'}`,
                              paddingTop: 16,
                              fontFamily: currentClient.fontFamily,
                              fontSize: currentClient.fontSize,
                              lineHeight: currentClient.lineHeight,
                              color: currentClient.textColor,
                            }}
                            dangerouslySetInnerHTML={{ __html: inputHtml }}
                          />
                        ) : (
                          <div
                            style={{
                              borderTop: `1px solid ${currentClient.darkMode ? '#444' : '#e5e7eb'}`,
                              paddingTop: 16,
                              textAlign: 'center',
                              color: currentClient.darkMode ? '#666' : '#9ca3af',
                              fontSize: '13px',
                              padding: '40px 20px',
                            }}
                          >
                            Paste your signature HTML on the left to see a preview here
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Cross-Client Compatibility Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Use table-based layouts', desc: 'Tables are the most reliable way to structure email signatures across all clients, especially Outlook.' },
              { title: 'Inline all CSS styles', desc: 'Gmail and many webmail clients strip <style> tags. Always use inline style attributes.' },
              { title: 'Stick to web-safe fonts', desc: 'Arial, Helvetica, Georgia, and Verdana render consistently. Custom fonts will fall back to defaults.' },
              { title: 'Set explicit image dimensions', desc: 'Always specify width and height on images to prevent layout shifts when images are blocked.' },
              { title: 'Keep width under 600px', desc: 'Most email clients have a max content width around 600px. Stay within this for mobile compatibility.' },
              { title: 'Test dark mode', desc: 'Gmail and Apple Mail auto-invert colors in dark mode. Test with light and dark backgrounds.' },
            ].map((tip) => (
              <div key={tip.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Signatures that look perfect everywhere
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Siggly generates email-client optimized signatures automatically. No more testing
            and fixing rendering issues across Gmail, Outlook, and Apple Mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" className="bg-indigo-700 text-white hover:bg-indigo-800">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
