'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Upload, ImageIcon, Download, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Role = 'logo' | 'headshot' | 'banner';

// Recommended email-signature image specs. Widths are the max DISPLAY width;
// files should stay small so signatures load fast and don't trip spam filters.
const SPECS: Record<Role, { label: string; maxWidth: number; maxKB: number; note: string }> = {
  logo: { label: 'Company logo', maxWidth: 200, maxKB: 50, note: 'Transparent PNG, 150–200px wide works best.' },
  headshot: { label: 'Headshot / photo', maxWidth: 120, maxKB: 50, note: 'Square (1:1), 80–120px. JPG or PNG.' },
  banner: { label: 'Campaign banner', maxWidth: 600, maxKB: 100, note: '468–600px wide. Keep it light for fast loads.' },
};

interface Analyzed {
  name: string;
  width: number;
  height: number;
  bytes: number;
  type: string;
  dataUrl: string;
}

function kb(bytes: number) {
  return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(0)} KB`;
}

export default function ImageSizeCheckerPage() {
  const [img, setImg] = useState<Analyzed | null>(null);
  const [role, setRole] = useState<Role>('logo');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const image = new Image();
      image.onload = () => {
        setImg({ name: file.name, width: image.naturalWidth, height: image.naturalHeight, bytes: file.size, type: file.type, dataUrl });
        // Guess the role from the aspect ratio.
        const ar = image.naturalWidth / image.naturalHeight;
        setRole(ar > 2.2 ? 'banner' : ar > 0.85 && ar < 1.15 ? 'headshot' : 'logo');
      };
      image.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, []);

  const resizeAndDownload = useCallback(() => {
    if (!img) return;
    const spec = SPECS[role];
    const scale = Math.min(1, spec.maxWidth / img.width);
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0, w, h);
      const isPng = img.type.includes('png');
      const out = canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', 0.85);
      const a = document.createElement('a');
      a.href = out;
      a.download = img.name.replace(/\.(\w+)$/, '') + `-${w}x${h}.` + (isPng ? 'png' : 'jpg');
      a.click();
    };
    image.src = img.dataUrl;
  }, [img, role]);

  const spec = SPECS[role];
  const widthOk = img ? img.width <= spec.maxWidth * 2 : true; // allow up to 2x for retina
  const widthIdeal = img ? img.width <= spec.maxWidth : true;
  const sizeOk = img ? img.bytes <= spec.maxKB * 1024 : true;
  const oversized = img && img.width > spec.maxWidth;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <section className="max-w-4xl mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-violet-100 mb-4">
            <ImageIcon className="h-6 w-6 text-violet-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Email Signature Image Size Checker</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Drop in a logo, headshot, or banner to see if it&apos;s the right size for an email
            signature — then resize it to the recommended dimensions in one click. Everything runs
            in your browser; nothing is uploaded.
          </p>
        </div>

        {/* Dropzone */}
        {!img && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
            onClick={() => inputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-colors ${dragOver ? 'border-violet-500 bg-violet-50' : 'border-gray-300 bg-white hover:border-violet-400'}`}
          >
            <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
            <p className="font-medium">Drop an image here, or click to choose</p>
            <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF, or WebP</p>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </div>
        )}

        {/* Results */}
        {img && (
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-6 flex items-center justify-center bg-[length:16px_16px] bg-gray-50" style={{ backgroundImage: 'linear-gradient(45deg,#f3f4f6 25%,transparent 25%,transparent 75%,#f3f4f6 75%),linear-gradient(45deg,#f3f4f6 25%,transparent 25%,transparent 75%,#f3f4f6 75%)', backgroundPosition: '0 0,8px 8px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.dataUrl} alt={img.name} className="max-h-56 max-w-full object-contain" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold truncate pr-2">{img.name}</h2>
                  <button onClick={() => { setImg(null); if (inputRef.current) inputRef.current.value = ''; }} className="text-sm text-violet-600 hover:underline shrink-0">Replace</button>
                </div>
                <dl className="grid grid-cols-3 gap-3 text-center mb-5">
                  <div className="rounded-lg bg-gray-50 p-3"><dt className="text-xs text-gray-500">Dimensions</dt><dd className="font-semibold">{img.width}×{img.height}</dd></div>
                  <div className="rounded-lg bg-gray-50 p-3"><dt className="text-xs text-gray-500">File size</dt><dd className="font-semibold">{kb(img.bytes)}</dd></div>
                  <div className="rounded-lg bg-gray-50 p-3"><dt className="text-xs text-gray-500">Type</dt><dd className="font-semibold uppercase">{img.type.split('/')[1]}</dd></div>
                </dl>

                <label className="text-sm font-medium block mb-1.5">This image is a:</label>
                <div className="flex gap-2 mb-5">
                  {(Object.keys(SPECS) as Role[]).map((r) => (
                    <button key={r} onClick={() => setRole(r)} className={`flex-1 text-sm px-2 py-1.5 rounded-md border transition-colors ${role === r ? 'bg-violet-600 text-white border-violet-600' : 'bg-white hover:bg-gray-50'}`}>{SPECS[r].label.split(' ')[0]}</button>
                  ))}
                </div>

                <div className="space-y-2 text-sm mb-5">
                  <Check ok={widthIdeal} warn={!widthIdeal && widthOk}
                    label={`Width ${img.width}px`}
                    detail={widthIdeal ? `within the ${spec.maxWidth}px recommendation` : widthOk ? `a bit wide — ${spec.maxWidth}px is ideal (≤${spec.maxWidth * 2}px OK for retina)` : `too wide — resize to ${spec.maxWidth}px`} />
                  <Check ok={sizeOk} label={`File size ${kb(img.bytes)}`}
                    detail={sizeOk ? `under the ${spec.maxKB}KB target` : `heavy — aim for under ${spec.maxKB}KB`} />
                </div>

                <p className="text-xs text-gray-500 mb-4">{spec.note}</p>

                {oversized && (
                  <Button onClick={resizeAndDownload} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Resize to {spec.maxWidth}px &amp; download
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Guidance */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {(Object.values(SPECS)).map((s) => (
            <div key={s.label} className="rounded-xl border bg-white p-5">
              <h3 className="font-semibold mb-1">{s.label}</h3>
              <p className="text-sm text-gray-600">Max width <strong>{s.maxWidth}px</strong> · under <strong>{s.maxKB}KB</strong></p>
              <p className="text-xs text-gray-500 mt-2">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-violet-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Stop resizing images by hand</h2>
          <p className="text-violet-100 mb-5 max-w-xl mx-auto">Siggly builds and deploys consistent, correctly-sized email signatures to your whole team automatically.</p>
          <Link href="/signup"><Button variant="secondary" size="lg">Get started free <ArrowRight className="h-4 w-4 ml-2" /></Button></Link>
        </div>
      </section>
    </div>
  );
}

function Check({ ok, warn, label, detail }: { ok: boolean; warn?: boolean; label: string; detail: string }) {
  return (
    <div className="flex items-start gap-2">
      {ok ? <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /> : <AlertTriangle className={`h-4 w-4 mt-0.5 shrink-0 ${warn ? 'text-amber-500' : 'text-red-500'}`} />}
      <span><strong>{label}</strong> — {detail}</span>
    </div>
  );
}
