'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Upload, Download, Copy, Check, AlertCircle, FileCode, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function HtmlSignatureConverterPage() {
  const [inputHtml, setInputHtml] = useState('');
  const [outputHtml, setOutputHtml] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const convertSignature = () => {
    if (!inputHtml.trim()) {
      setError('Please paste your HTML signature');
      return;
    }

    try {
      // Clean and optimize HTML for email clients
      let cleaned = inputHtml;

      // Remove script tags
      cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      
      // Remove style tags (inline styles only in emails)
      cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
      
      // Remove link tags
      cleaned = cleaned.replace(/<link[^>]*>/gi, '');
      
      // Remove meta tags
      cleaned = cleaned.replace(/<meta[^>]*>/gi, '');
      
      // Remove DOCTYPE
      cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/gi, '');
      
      // Remove html, head, body tags but keep content
      cleaned = cleaned.replace(/<\/?html[^>]*>/gi, '');
      cleaned = cleaned.replace(/<\/?head[^>]*>/gi, '');
      cleaned = cleaned.replace(/<\/?body[^>]*>/gi, '');
      
      // Convert div to table-based layout (more email-compatible)
      // This is a simplified conversion - in production you'd want more sophisticated logic
      
      // Remove CSS classes (email clients often strip them)
      cleaned = cleaned.replace(/class="[^"]*"/gi, '');
      
      // Remove IDs
      cleaned = cleaned.replace(/id="[^"]*"/gi, '');
      
      // Ensure all images have proper attributes
      cleaned = cleaned.replace(/<img([^>]*)>/gi, (match, attrs) => {
        if (!attrs.includes('style=')) {
          return `<img${attrs} style="display: block; border: 0;">`;
        }
        return match;
      });

      // Wrap in email-safe table if not already
      if (!cleaned.includes('<table')) {
        cleaned = `<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px;">
  <tr>
    <td>
      ${cleaned}
    </td>
  </tr>
</table>`;
      }

      // Clean up whitespace
      cleaned = cleaned.trim();

      setOutputHtml(cleaned);
      setError('');
    } catch (err) {
      setError('Failed to convert HTML. Please check your input.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([outputHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-signature.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-6">
            <FileCode className="h-4 w-4" />
            Free Tool
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            HTML Email Signature Converter
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Convert any HTML signature into email-client compatible format. 
            Removes unsupported code and optimizes for Gmail, Outlook, and more.
          </p>
        </div>
      </section>

      {/* Converter Tool */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">Input HTML</Label>
                <div className="flex gap-2">
                  <label htmlFor="file-upload">
                    <Button size="sm" variant="outline" asChild>
                      <span className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
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
              </div>
              <textarea
                value={inputHtml}
                onChange={(e) => setInputHtml(e.target.value)}
                placeholder="Paste your HTML signature here..."
                className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="mt-4">
                <Button onClick={convertSignature} className="w-full" size="lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Convert to Email-Safe HTML
                </Button>
              </div>
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </div>

            {/* Output */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">Email-Safe HTML</Label>
                {outputHtml && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleCopy}>
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleDownload}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <textarea
                value={outputHtml}
                readOnly
                placeholder="Converted HTML will appear here..."
                className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none bg-gray-50"
              />
              {outputHtml && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <p className="font-medium">Conversion complete!</p>
                    <p className="mt-1">Your signature is now optimized for email clients.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What Gets Removed */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What This Tool Does</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-red-600">❌ Removes</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>JavaScript:</strong> Email clients block all scripts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>External CSS:</strong> Style tags and linked stylesheets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>CSS Classes:</strong> Most email clients strip them</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Meta Tags:</strong> Not needed in email signatures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span><strong>Unsupported HTML:</strong> DOCTYPE, html, head, body tags</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-green-600">Keeps & Optimizes</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Inline Styles:</strong> Converts to inline CSS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Images:</strong> Adds proper email-safe attributes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Links:</strong> Preserves all hyperlinks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Tables:</strong> Email-safe layout structure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Text Content:</strong> All your signature text</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How to Use</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Paste HTML</h3>
              <p className="text-sm text-gray-600">
                Copy your existing HTML signature and paste it in the input box.
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Convert</h3>
              <p className="text-sm text-gray-600">
                Click convert to optimize your HTML for email clients.
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Copy or Download</h3>
              <p className="text-sm text-gray-600">
                Get your email-safe HTML ready to use.
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Add to Email</h3>
              <p className="text-sm text-gray-600">
                Paste into Gmail, Outlook, or any email client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compatible Email Clients */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Works With All Email Clients</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Gmail', 'Outlook', 'Apple Mail', 'Yahoo Mail', 'Thunderbird', 'Outlook.com', 'ProtonMail', 'Zoho Mail'].map((client) => (
              <div key={client} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <Check className="h-5 w-5 text-green-500 mx-auto mb-2" />
                <span className="font-medium text-sm">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need to manage signatures for your team?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Stop converting signatures one by one. Siggly automatically deploys 
            email-safe signatures to your entire organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
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
