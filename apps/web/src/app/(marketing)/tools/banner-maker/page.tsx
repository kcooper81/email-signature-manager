'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ImagePlus, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SIZES: { id: string; label: string; w: number; h: number }[] = [
  { id: 'wide', label: 'Wide (600×150)', w: 600, h: 150 },
  { id: 'leaderboard', label: 'Leaderboard (728×90)', w: 728, h: 90 },
  { id: 'compact', label: 'Compact (468×120)', w: 468, h: 120 },
  { id: 'square', label: 'Square (300×250)', w: 300, h: 250 },
];

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export default function BannerMakerPage() {
  const [sizeId, setSizeId] = useState('wide');
  const [headline, setHeadline] = useState('We\'re hiring!');
  const [subtext, setSubtext] = useState('Join our growing team — see open roles');
  const [cta, setCta] = useState('View jobs');
  const [bgFrom, setBgFrom] = useState('#7c3aed');
  const [bgTo, setBgTo] = useState('#2563eb');
  const [textColor, setTextColor] = useState('#ffffff');
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const size = SIZES.find((s) => s.id === sizeId)!;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w, h } = size;
    canvas.width = w;
    canvas.height = h;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, bgFrom);
    grad.addColorStop(1, bgTo);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const pad = Math.round(h * 0.16);
    let textLeft = pad;

    // Optional logo on the left
    if (logo) {
      const logoH = h - pad * 2;
      const ratio = logo.width / logo.height || 1;
      const logoW = logoH * ratio;
      ctx.drawImage(logo, pad, pad, logoW, logoH);
      textLeft = pad + logoW + pad;
    }

    // Headline
    ctx.fillStyle = textColor;
    ctx.textBaseline = 'top';
    const headlineSize = Math.max(16, Math.round(h * 0.24));
    ctx.font = `bold ${headlineSize}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
    ctx.fillText(headline, textLeft, pad, w - textLeft - pad);

    // Subtext
    const subSize = Math.max(11, Math.round(h * 0.13));
    ctx.font = `${subSize}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
    ctx.globalAlpha = 0.92;
    ctx.fillText(subtext, textLeft, pad + headlineSize + Math.round(h * 0.06), w - textLeft - pad);
    ctx.globalAlpha = 1;

    // CTA pill on the right (only if it fits)
    if (cta.trim() && w >= 360) {
      const ctaSize = Math.max(12, Math.round(h * 0.14));
      ctx.font = `bold ${ctaSize}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
      const textW = ctx.measureText(cta).width;
      const btnPadX = Math.round(ctaSize * 1.1);
      const btnW = textW + btnPadX * 2;
      const btnH = Math.round(ctaSize * 2.2);
      const btnX = w - pad - btnW;
      const btnY = (h - btnH) / 2;
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      roundRect(ctx, btnX, btnY, btnW, btnH, btnH / 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1.5;
      roundRect(ctx, btnX, btnY, btnW, btnH, btnH / 2);
      ctx.stroke();
      ctx.fillStyle = textColor;
      ctx.textBaseline = 'middle';
      ctx.fillText(cta, btnX + btnPadX, btnY + btnH / 2);
      ctx.textBaseline = 'top';
    }
  }, [size, headline, subtext, cta, bgFrom, bgTo, textColor, logo]);

  const onLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => setLogo(img);
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'siggly-email-banner.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="text-gray-900">
      <section className="relative pt-28 md:pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-600" />
        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-1.5 text-sm mb-6">
            <ImagePlus className="h-4 w-4" />
            Free tool — no signup
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Email Signature Banner Maker</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Design a professional banner for your email signature — headline, CTA, colors, and logo.
            Preview live and download a ready-to-use PNG.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Controls */}
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
              <div>
                <Label>Banner size</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {SIZES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSizeId(s.id)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        sizeId === s.id ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="b-headline">Headline</Label>
                <Input id="b-headline" value={headline} onChange={(e) => setHeadline(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="b-subtext">Subtext</Label>
                <Input id="b-subtext" value={subtext} onChange={(e) => setSubtext(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="b-cta">CTA button</Label>
                <Input id="b-cta" value={cta} onChange={(e) => setCta(e.target.value)} placeholder="e.g. Learn more" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="b-from" className="text-xs">Gradient from</Label>
                  <input id="b-from" type="color" value={bgFrom} onChange={(e) => setBgFrom(e.target.value)} className="h-9 w-full rounded border border-gray-200 cursor-pointer" />
                </div>
                <div>
                  <Label htmlFor="b-to" className="text-xs">Gradient to</Label>
                  <input id="b-to" type="color" value={bgTo} onChange={(e) => setBgTo(e.target.value)} className="h-9 w-full rounded border border-gray-200 cursor-pointer" />
                </div>
                <div>
                  <Label htmlFor="b-text" className="text-xs">Text</Label>
                  <input id="b-text" type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-9 w-full rounded border border-gray-200 cursor-pointer" />
                </div>
              </div>
              <div>
                <Label htmlFor="b-logo">Logo (optional)</Label>
                <label className="mt-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gray-300 text-sm text-gray-500 cursor-pointer hover:border-violet-300">
                  <Upload className="h-4 w-4" />
                  {logo ? 'Change logo' : 'Upload a logo (PNG with transparency works best)'}
                  <input id="b-logo" type="file" accept="image/*" onChange={onLogoUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col items-center">
              <div className="w-full overflow-x-auto">
                <canvas ref={canvasRef} className="rounded-lg shadow-sm max-w-full" style={{ height: 'auto' }} />
              </div>
              <Button onClick={download} className="gap-2 mt-6">
                <Download className="h-4 w-4" /> Download PNG
              </Button>
              <p className="text-xs text-gray-400 mt-4 text-center">
                Generated entirely in your browser. Nothing is uploaded.
              </p>
            </div>
          </div>

          {/* Product tie-in */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100 p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Deploy banners to your whole team automatically</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              With Siggly you can schedule campaign banners across every employee&apos;s signature, rotate them by
              date, and track clicks — all from one dashboard.
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
