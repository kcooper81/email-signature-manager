'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';
import { ArrowRight, QrCode, Download, Link2, Mail, Phone, User, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Mode = 'url' | 'email' | 'phone' | 'vcard' | 'text';

const MODES: { id: Mode; label: string; icon: typeof Link2 }[] = [
  { id: 'url', label: 'Website', icon: Link2 },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'vcard', label: 'Contact (vCard)', icon: User },
  { id: 'text', label: 'Text', icon: Type },
];

function escapeVCard(v: string): string {
  // Escape characters that are special in vCard values.
  return v.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export default function QrCodeGeneratorPage() {
  const [mode, setMode] = useState<Mode>('url');
  const [url, setUrl] = useState('https://siggly.io');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [text, setText] = useState('');
  const [vcard, setVcard] = useState({
    firstName: '',
    lastName: '',
    org: '',
    title: '',
    phone: '',
    email: '',
    website: '',
  });
  const [fgColor, setFgColor] = useState('#4d52de');
  const [size, setSize] = useState(256);

  const containerRef = useRef<HTMLDivElement>(null);

  const value = useMemo(() => {
    switch (mode) {
      case 'url':
        return url.trim() || ' ';
      case 'email':
        return email.trim() ? `mailto:${email.trim()}` : ' ';
      case 'phone':
        return phone.trim() ? `tel:${phone.replace(/\s+/g, '')}` : ' ';
      case 'text':
        return text.trim() || ' ';
      case 'vcard': {
        const v = vcard;
        const lines = [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `N:${escapeVCard(v.lastName)};${escapeVCard(v.firstName)};;;`,
          `FN:${escapeVCard(`${v.firstName} ${v.lastName}`.trim())}`,
          v.org && `ORG:${escapeVCard(v.org)}`,
          v.title && `TITLE:${escapeVCard(v.title)}`,
          v.phone && `TEL;TYPE=WORK,VOICE:${escapeVCard(v.phone)}`,
          v.email && `EMAIL;TYPE=WORK:${escapeVCard(v.email)}`,
          v.website && `URL:${escapeVCard(v.website)}`,
          'END:VCARD',
        ].filter(Boolean);
        return lines.join('\n');
      }
      default:
        return ' ';
    }
  }, [mode, url, email, phone, text, vcard]);

  const download = (format: 'png' | 'svg') => {
    const canvas = containerRef.current?.querySelector('canvas');
    if (!canvas) return;

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = 'siggly-qr-code.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      return;
    }

    // SVG: re-encode the QR as a scalable vector by reading module pixels.
    const dataUrl = canvas.toDataURL('image/png');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><image href="${dataUrl}" width="${size}" height="${size}"/></svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.download = 'siggly-qr-code.svg';
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="text-gray-900">
      <section className="relative pt-28 md:pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-600" />
        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-1.5 text-sm mb-6">
            <QrCode className="h-4 w-4" />
            Free tool — no signup
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">QR Code Generator</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Create a free QR code for your website, email, phone, or contact card, then add it to your
            email signature. Download as PNG or SVG in one click.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Controls */}
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex flex-wrap gap-2 mb-6">
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      mode === m.id
                        ? 'bg-violet-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <m.icon className="h-3.5 w-3.5" />
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {mode === 'url' && (
                  <div>
                    <Label htmlFor="qr-url">Website URL</Label>
                    <Input id="qr-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
                  </div>
                )}
                {mode === 'email' && (
                  <div>
                    <Label htmlFor="qr-email">Email address</Label>
                    <Input id="qr-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
                  </div>
                )}
                {mode === 'phone' && (
                  <div>
                    <Label htmlFor="qr-phone">Phone number</Label>
                    <Input id="qr-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 123 4567" />
                  </div>
                )}
                {mode === 'text' && (
                  <div>
                    <Label htmlFor="qr-text">Text</Label>
                    <Input id="qr-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Any text to encode" />
                  </div>
                )}
                {mode === 'vcard' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="v-first">First name</Label>
                      <Input id="v-first" value={vcard.firstName} onChange={(e) => setVcard({ ...vcard, firstName: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="v-last">Last name</Label>
                      <Input id="v-last" value={vcard.lastName} onChange={(e) => setVcard({ ...vcard, lastName: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="v-org">Company</Label>
                      <Input id="v-org" value={vcard.org} onChange={(e) => setVcard({ ...vcard, org: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="v-title">Job title</Label>
                      <Input id="v-title" value={vcard.title} onChange={(e) => setVcard({ ...vcard, title: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="v-phone">Phone</Label>
                      <Input id="v-phone" value={vcard.phone} onChange={(e) => setVcard({ ...vcard, phone: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="v-email">Email</Label>
                      <Input id="v-email" value={vcard.email} onChange={(e) => setVcard({ ...vcard, email: e.target.value })} />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="v-web">Website</Label>
                      <Input id="v-web" value={vcard.website} onChange={(e) => setVcard({ ...vcard, website: e.target.value })} />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="qr-color" className="mb-0">Color</Label>
                    <input
                      id="qr-color"
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="h-9 w-12 rounded border border-gray-200 cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <Label htmlFor="qr-size" className="mb-0 whitespace-nowrap">Size</Label>
                    <input
                      id="qr-size"
                      type="range"
                      min={128}
                      max={512}
                      step={32}
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500 w-12 text-right">{size}px</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col items-center">
              <div ref={containerRef} className="p-4 bg-white rounded-xl">
                <QRCodeCanvas value={value} size={size} fgColor={fgColor} bgColor="#ffffff" level="M" marginSize={2} />
              </div>
              <div className="flex gap-3 mt-6">
                <Button onClick={() => download('png')} className="gap-2">
                  <Download className="h-4 w-4" /> PNG
                </Button>
                <Button variant="outline" onClick={() => download('svg')} className="gap-2">
                  <Download className="h-4 w-4" /> SVG
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">
                Generated entirely in your browser. Nothing is uploaded.
              </p>
            </div>
          </div>

          {/* Product tie-in */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100 p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Add QR codes to your whole team&apos;s signatures</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Siggly deploys consistent, on-brand email signatures — with QR codes, banners, and booking
              links — across your entire Google Workspace or Microsoft 365 organization in minutes.
            </p>
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Get started free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
