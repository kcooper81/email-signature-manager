'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Download, Eye, Check, Sparkles, Briefcase, Building2, Heart, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const templates = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    category: 'Business',
    icon: Briefcase,
    color: 'violet',
    description: 'Clean and modern design perfect for corporate environments',
    preview: {
      name: 'Sarah Johnson',
      title: 'Marketing Director',
      company: 'Acme Corporation',
      email: 'sarah@example.com',
    },
  },
  {
    id: 'minimal-elegant',
    name: 'Minimal Elegant',
    category: 'Professional',
    icon: Sparkles,
    color: 'slate',
    description: 'Simple and elegant design that works everywhere',
    preview: {
      name: 'Michael Chen',
      title: 'Senior Consultant',
      company: 'Example Consulting',
      email: 'michael@example.com',
    },
  },
  {
    id: 'bold-creative',
    name: 'Bold Creative',
    category: 'Creative',
    icon: Zap,
    color: 'blue',
    description: 'Eye-catching design for creative professionals',
    preview: {
      name: 'Emma Davis',
      title: 'Creative Director',
      company: 'Demo Design Co',
      email: 'emma@example.com',
    },
  },
  {
    id: 'corporate-classic',
    name: 'Corporate Classic',
    category: 'Business',
    icon: Building2,
    color: 'gray',
    description: 'Traditional corporate style for established businesses',
    preview: {
      name: 'James Wilson',
      title: 'Chief Financial Officer',
      company: 'Sample Financial Inc',
      email: 'james@example.com',
    },
  },
  {
    id: 'startup-friendly',
    name: 'Startup Friendly',
    category: 'Startup',
    icon: Heart,
    color: 'emerald',
    description: 'Fresh and approachable design for startups',
    preview: {
      name: 'Alex Rivera',
      title: 'Co-Founder & CEO',
      company: 'Example Ventures',
      email: 'alex@example.com',
    },
  },
  {
    id: 'executive-premium',
    name: 'Executive Premium',
    category: 'Executive',
    icon: Crown,
    color: 'amber',
    description: 'Sophisticated design for C-level executives',
    preview: {
      name: 'Victoria Stone',
      title: 'Chief Executive Officer',
      company: 'Demo Global LLC',
      email: 'victoria@example.com',
    },
  },
];

const categories = ['All', 'Business', 'Professional', 'Creative', 'Startup', 'Executive'];

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600' },
  slate: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600' },
  gray: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600' },
};

export default function SignatureTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const generateTemplateHtml = (template: typeof templates[0]) => {
    const colorValues = {
      violet: '#7c3aed',
      slate: '#64748b',
      blue: '#2563eb',
      gray: '#374151',
      emerald: '#10b981',
      amber: '#f59e0b',
    };
    const color = colorValues[template.color as keyof typeof colorValues];

    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #1f2937;">
  <tr>
    <td style="padding-right: 15px; border-right: 3px solid ${color};">
      <div style="width: 70px; height: 70px; background: ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: bold;">
        ${template.preview.name.split(' ').map(n => n[0]).join('')}
      </div>
    </td>
    <td style="padding-left: 15px;">
      <div style="font-size: 16px; font-weight: bold; color: #1f2937;">${template.preview.name}</div>
      <div style="color: ${color}; font-weight: 500; margin-top: 2px;">${template.preview.title}</div>
      <div style="font-weight: 500; margin-top: 2px;">${template.preview.company}</div>
      <div style="margin-top: 8px; font-size: 13px; color: #6b7280;">
        <div>✉️ ${template.preview.email}</div>
      </div>
    </td>
  </tr>
</table>
    `.trim();
  };

  const downloadTemplate = (template: typeof templates[0]) => {
    const html = generateTemplateHtml(template);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.id}-signature.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Free Email Signature Templates
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional email signature templates ready to use. Download HTML, 
            customize with your details, and paste into any email client.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/signature-generator">
              <Button size="lg">
                Customize a Template <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline">
                Deploy to Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => {
              const colors = colorMap[template.color];
              const Icon = template.icon;
              
              return (
                <div
                  key={template.id}
                  className={`border-2 ${colors.border} rounded-xl overflow-hidden hover:shadow-lg transition-shadow`}
                >
                  {/* Preview */}
                  <div className={`${colors.bg} p-6 border-b-2 ${colors.border}`}>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center ${colors.text} font-bold text-sm`}>
                          {template.preview.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">{template.preview.name}</div>
                          <div className={`text-xs ${colors.text} font-medium truncate`}>{template.preview.title}</div>
                          <div className="text-xs text-gray-600 truncate">{template.preview.company}</div>
                          <div className="text-xs text-gray-500 mt-2 space-y-0.5">
                            <div className="truncate">✉️ {template.preview.email}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`h-5 w-5 ${colors.text}`} />
                      <h3 className="font-semibold">{template.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => downloadTemplate(template)}
                        className="flex-1"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPreviewTemplate(template.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How to Use These Templates</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-violet-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Download Template</h3>
              <p className="text-sm text-gray-600">
                Click download on your favorite template to get the HTML file.
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-violet-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Customize Details</h3>
              <p className="text-sm text-gray-600">
                Open the HTML file and replace the example text with your information.
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-violet-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Add to Email</h3>
              <p className="text-sm text-gray-600">
                Copy the HTML and paste it into Gmail, Outlook, or your email client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Use Our Templates?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-14 w-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Check className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Email Client Compatible</h3>
              <p className="text-sm text-gray-600">
                Works perfectly in Gmail, Outlook, Apple Mail, and all major email clients.
              </p>
            </div>
            <div className="text-center">
              <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Professional Design</h3>
              <p className="text-sm text-gray-600">
                Designed by professionals to make you look your best in every email.
              </p>
            </div>
            <div className="text-center">
              <div className="h-14 w-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-7 w-7 text-violet-600" />
              </div>
              <h3 className="font-semibold mb-2">Easy to Customize</h3>
              <p className="text-sm text-gray-600">
                Simple HTML structure makes it easy to update your details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setPreviewTemplate(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const template = templates.find(t => t.id === previewTemplate);
              if (!template) return null;
              const colors = colorMap[template.color];
              return (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{template.name} Preview</h3>
                    <button 
                      onClick={() => setPreviewTemplate(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                      ×
                    </button>
                  </div>
                  <div className={`${colors.bg} rounded-xl p-6 mb-4`}>
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center ${colors.text} font-bold text-lg`}>
                          {template.preview.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-lg">{template.preview.name}</div>
                          <div className={`${colors.text} font-medium`}>{template.preview.title}</div>
                          <div className="text-gray-600">{template.preview.company}</div>
                          <div className="text-gray-500 mt-3 space-y-1 text-sm">
                            <div>✉️ {template.preview.email}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <div className="flex gap-3">
                    <Button onClick={() => downloadTemplate(template)} className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download HTML
                    </Button>
                    <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
                      Close
                    </Button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 bg-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need signatures for your whole team?
          </h2>
          <p className="text-violet-100 mb-8 max-w-2xl mx-auto">
            Siggly lets you deploy professional signatures to your entire organization 
            with one click. No manual setup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-violet-700 hover:bg-gray-100">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
