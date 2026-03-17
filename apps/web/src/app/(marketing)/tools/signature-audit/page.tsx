'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ClipboardCheck, AlertTriangle, CheckCircle2, XCircle, Info, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SafeHtmlViewer } from '@/components/admin/safe-html-viewer';

interface AuditResult {
  score: number;
  grade: string;
  gradeColor: string;
  checks: {
    category: string;
    name: string;
    status: 'pass' | 'warning' | 'fail';
    message: string;
  }[];
}

function auditSignature(html: string): AuditResult {
  const checks: AuditResult['checks'] = [];

  // 1. Table-based layout
  const hasTable = /<table/i.test(html);
  checks.push({
    category: 'Structure',
    name: 'Table-based layout',
    status: hasTable ? 'pass' : 'fail',
    message: hasTable
      ? 'Uses table layout for cross-client compatibility'
      : 'Not using tables. Many email clients require table-based layouts for consistent rendering.',
  });

  // 2. Inline styles
  const hasInlineStyles = /style="/i.test(html);
  const hasStyleTag = /<style/i.test(html);
  checks.push({
    category: 'Structure',
    name: 'Inline styles',
    status: hasInlineStyles && !hasStyleTag ? 'pass' : hasInlineStyles && hasStyleTag ? 'warning' : 'fail',
    message: hasInlineStyles && !hasStyleTag
      ? 'Uses inline styles only (best practice)'
      : hasStyleTag
      ? 'Contains <style> tags which many email clients strip. Use inline styles instead.'
      : 'No inline styles found. Email clients may not render this correctly.',
  });

  // 3. No JavaScript
  const hasScript = /<script/i.test(html);
  checks.push({
    category: 'Compatibility',
    name: 'No JavaScript',
    status: hasScript ? 'fail' : 'pass',
    message: hasScript
      ? 'Contains <script> tags. All email clients block JavaScript.'
      : 'No JavaScript detected (good)',
  });

  // 4. Image optimization
  const imgTags = html.match(/<img[^>]*>/gi) || [];
  const hasImages = imgTags.length > 0;
  const allImagesHaveAlt = imgTags.every(img => /alt="/i.test(img));
  const allImagesHaveWidth = imgTags.every(img => /width/i.test(img));
  if (hasImages) {
    checks.push({
      category: 'Images',
      name: 'Image alt text',
      status: allImagesHaveAlt ? 'pass' : 'warning',
      message: allImagesHaveAlt
        ? 'All images have alt text'
        : 'Some images missing alt text. Add alt attributes for accessibility and when images are blocked.',
    });
    checks.push({
      category: 'Images',
      name: 'Image dimensions',
      status: allImagesHaveWidth ? 'pass' : 'warning',
      message: allImagesHaveWidth
        ? 'All images have explicit dimensions'
        : 'Some images missing width/height. Set explicit dimensions to prevent layout shifts.',
    });
  }

  // 5. Contact information
  const hasEmail = /mailto:/i.test(html) || /[\w.-]+@[\w.-]+\.\w+/.test(html);
  const hasPhone = /tel:/i.test(html) || /\+?[\d\s()-]{7,}/.test(html);
  const hasLink = /href="/i.test(html);
  checks.push({
    category: 'Content',
    name: 'Email address',
    status: hasEmail ? 'pass' : 'warning',
    message: hasEmail ? 'Contains email address' : 'No email address found. Include your email for easy contact.',
  });
  checks.push({
    category: 'Content',
    name: 'Phone number',
    status: hasPhone ? 'pass' : 'warning',
    message: hasPhone ? 'Contains phone number' : 'No phone number found. Consider adding one for accessibility.',
  });
  checks.push({
    category: 'Content',
    name: 'Clickable links',
    status: hasLink ? 'pass' : 'warning',
    message: hasLink ? 'Contains clickable links' : 'No links found. Add links to your website or social profiles.',
  });

  // 6. Social links
  const socialPatterns = /linkedin|twitter|facebook|instagram|youtube|github/i;
  const hasSocial = socialPatterns.test(html);
  checks.push({
    category: 'Content',
    name: 'Social profiles',
    status: hasSocial ? 'pass' : 'warning',
    message: hasSocial ? 'Includes social media links' : 'No social links detected. Social links help build your professional network.',
  });

  // 7. Size check
  const sizeKB = new Blob([html]).size / 1024;
  checks.push({
    category: 'Performance',
    name: 'Signature size',
    status: sizeKB < 10 ? 'pass' : sizeKB < 30 ? 'warning' : 'fail',
    message: sizeKB < 10
      ? `${sizeKB.toFixed(1)}KB — lightweight and fast`
      : sizeKB < 30
      ? `${sizeKB.toFixed(1)}KB — a bit heavy. Try optimizing images and removing unnecessary code.`
      : `${sizeKB.toFixed(1)}KB — too large. Gmail clips emails over ~102KB. Optimize aggressively.`,
  });

  // 8. CSS classes (email clients strip them)
  const hasCssClasses = /class="/i.test(html);
  checks.push({
    category: 'Compatibility',
    name: 'No CSS classes',
    status: hasCssClasses ? 'warning' : 'pass',
    message: hasCssClasses
      ? 'Contains CSS classes. Many email clients strip class attributes. Use inline styles instead.'
      : 'No CSS classes (good — uses inline styles)',
  });

  // 9. Font stack
  const hasFontFamily = /font-family/i.test(html);
  const hasWebSafeFonts = /arial|helvetica|georgia|times|verdana|tahoma/i.test(html);
  checks.push({
    category: 'Typography',
    name: 'Font specification',
    status: hasFontFamily && hasWebSafeFonts ? 'pass' : hasFontFamily ? 'warning' : 'fail',
    message: hasFontFamily && hasWebSafeFonts
      ? 'Uses web-safe font stack'
      : hasFontFamily
      ? 'Uses custom fonts that may not render in all email clients. Include a web-safe fallback.'
      : 'No font-family specified. Email clients will use their default font.',
  });

  // 10. Responsive considerations
  const hasMediaQuery = /@media/i.test(html);
  const hasMaxWidth = /max-width/i.test(html);
  checks.push({
    category: 'Mobile',
    name: 'Mobile friendly',
    status: hasMaxWidth || hasMediaQuery ? 'pass' : 'warning',
    message: hasMaxWidth || hasMediaQuery
      ? 'Has responsive design considerations'
      : 'No max-width or media queries. Signature may overflow on mobile devices. Keep width under 600px.',
  });

  // 11. Disclaimer/legal
  const hasDisclaimer = /confidential|disclaimer|privileged|intended recipient|legal/i.test(html);
  checks.push({
    category: 'Compliance',
    name: 'Legal disclaimer',
    status: hasDisclaimer ? 'pass' : 'warning',
    message: hasDisclaimer
      ? 'Contains a legal disclaimer'
      : 'No legal disclaimer found. Many industries require confidentiality notices.',
  });

  // Calculate score
  const passCount = checks.filter(c => c.status === 'pass').length;
  const warnCount = checks.filter(c => c.status === 'warning').length;
  const total = checks.length;
  const score = Math.round(((passCount + warnCount * 0.5) / total) * 100);

  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 65 ? 'C' : score >= 50 ? 'D' : 'F';
  const gradeColor = score >= 90 ? 'text-emerald-600' : score >= 80 ? 'text-blue-600' : score >= 65 ? 'text-amber-600' : 'text-red-600';

  return { score, grade, gradeColor, checks };
}

export default function SignatureAuditPage() {
  const [inputHtml, setInputHtml] = useState('');
  const [result, setResult] = useState<AuditResult | null>(null);

  const handleAudit = () => {
    if (!inputHtml.trim()) return;
    setResult(auditSignature(inputHtml));
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

  const statusIcon = (status: string) => {
    if (status === 'pass') return <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />;
    if (status === 'warning') return <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />;
    return <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />;
  };

  return (
    <>
      {/* Hero */}
      <section className="py-12 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm mb-6">
            <ClipboardCheck className="h-4 w-4" />
            Free Tool
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Email Signature Audit &amp; Grader
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Paste your email signature HTML and get an instant score with actionable
            recommendations for compatibility, branding, and compliance.
          </p>
        </div>
      </section>

      {/* Audit Tool */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">Your Signature HTML</Label>
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
              <textarea
                value={inputHtml}
                onChange={(e) => setInputHtml(e.target.value)}
                placeholder={'Paste your email signature HTML here...\n\nExample:\n<table cellpadding="0" cellspacing="0">\n  <tr>\n    <td style="font-family: Arial;">\n      <strong>John Smith</strong><br />\n      Marketing Director | Acme Inc.\n    </td>\n  </tr>\n</table>'}
                className="w-full h-80 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <div className="mt-4">
                <Button onClick={handleAudit} className="w-full" size="lg" disabled={!inputHtml.trim()}>
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Audit My Signature
                </Button>
              </div>

              {/* Preview */}
              {inputHtml && (
                <div className="mt-6">
                  <Label className="text-sm font-semibold text-gray-500 mb-2 block">Live Preview</Label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <SafeHtmlViewer html={inputHtml} />
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <div>
              {result ? (
                <div className="space-y-6">
                  {/* Score */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                    <div className={`text-7xl font-bold ${result.gradeColor}`}>{result.grade}</div>
                    <div className="mt-2 text-lg text-gray-600">Score: {result.score}/100</div>
                    <div className="mt-4 h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          result.score >= 90 ? 'bg-emerald-500' : result.score >= 80 ? 'bg-blue-500' : result.score >= 65 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        {result.checks.filter(c => c.status === 'pass').length}
                      </div>
                      <div className="text-xs text-emerald-600">Passed</div>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-amber-600">
                        {result.checks.filter(c => c.status === 'warning').length}
                      </div>
                      <div className="text-xs text-amber-600">Warnings</div>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {result.checks.filter(c => c.status === 'fail').length}
                      </div>
                      <div className="text-xs text-red-600">Failed</div>
                    </div>
                  </div>

                  {/* Detailed checks */}
                  <div className="space-y-3">
                    {result.checks.map((check, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                        {statusIcon(check.status)}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{check.name}</span>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{check.category}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-0.5">{check.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <Info className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-400">Paste your signature and click &quot;Audit&quot;</h3>
                  <p className="text-sm text-gray-400 mt-2 max-w-sm">
                    We&apos;ll check structure, compatibility, content, performance, mobile-friendliness, and compliance.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What We Check */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What We Audit</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Structure & Compatibility', items: ['Table-based layout', 'Inline styles only', 'No JavaScript', 'No CSS classes', 'Web-safe fonts'] },
              { title: 'Content & Branding', items: ['Email address present', 'Phone number', 'Clickable links', 'Social media profiles', 'Image alt text'] },
              { title: 'Performance & Compliance', items: ['Signature file size', 'Mobile responsiveness', 'Image dimensions', 'Legal disclaimer', 'Accessibility'] },
            ].map((section) => (
              <div key={section.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-violet-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want perfect signatures for your whole team?
          </h2>
          <p className="text-violet-100 mb-8 max-w-2xl mx-auto">
            Siggly ensures every signature passes these checks automatically. Deploy consistent,
            compliant signatures across your entire organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-violet-700 hover:bg-gray-100">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" className="bg-violet-700 text-white hover:bg-violet-800">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
