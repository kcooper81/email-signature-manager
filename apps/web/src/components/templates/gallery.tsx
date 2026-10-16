'use client';

import { FilePlus2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignaturePreview } from './preview';
import { starterTemplates, BLANK_STARTER_BLOCKS, type StarterTemplate } from '@/lib/templates/starters';
import { INDUSTRY_LABELS, type SignatureBlock, type IndustryType } from './types';

interface TemplateGalleryProps {
  onSelect: (blocks: SignatureBlock[], industry: IndustryType, name: string) => void;
}

/**
 * Starter-template gallery shown when creating a new template. Each card renders
 * a live, sample-data preview so users can pick a professionally-structured
 * starting point in one click instead of beginning from a bare editor.
 */
export function TemplateGallery({ onSelect }: TemplateGalleryProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Choose a starting point</h1>
        <p className="text-muted-foreground mt-1">
          Pick a professionally-designed template to customize, or start from scratch.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Blank option */}
        <button
          onClick={() => onSelect(BLANK_STARTER_BLOCKS, 'general', '')}
          className="group flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/20 p-6 min-h-[260px] transition-colors hover:border-primary/50 hover:bg-primary/5"
        >
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <FilePlus2 className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-semibold">Start from blank</p>
            <p className="text-xs text-muted-foreground mt-1">Build your signature from the ground up</p>
          </div>
        </button>

        {starterTemplates.map((t: StarterTemplate) => (
          <div
            key={t.id}
            className="group flex flex-col rounded-xl border bg-card overflow-hidden transition-shadow hover:shadow-md"
          >
            <div className="flex-1 p-4 bg-white border-b min-h-[150px] flex items-center justify-center overflow-hidden">
              <div className="scale-90 origin-top">
                <SignaturePreview blocks={t.blocks} />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="font-semibold text-sm">{t.name}</h3>
                {t.industry !== 'general' && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground whitespace-nowrap">
                    {INDUSTRY_LABELS[t.industry]}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{t.description}</p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => onSelect(t.blocks, t.industry, t.name)}
              >
                Use this template
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
