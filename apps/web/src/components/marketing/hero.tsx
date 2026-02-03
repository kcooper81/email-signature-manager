import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MarketingHeroProps {
  badge?: {
    icon?: LucideIcon;
    text: string;
  };
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  image?: {
    src: string;
    alt: string;
  };
  imageOverlay?: React.ReactNode;
  variant?: 'light' | 'dark' | 'violet' | 'emerald' | 'indigo' | 'slate';
  className?: string;
  children?: React.ReactNode;
}

const variantStyles = {
  light: {
    bg: 'bg-gradient-to-b from-violet-50 to-white',
    badge: 'bg-violet-100 text-violet-700',
    title: 'text-gray-900',
    description: 'text-gray-600',
    primaryButton: '',
    secondaryButton: '',
  },
  dark: {
    bg: 'bg-gradient-to-b from-gray-900 to-gray-800 text-white',
    badge: 'bg-white/20 text-white',
    title: 'text-white',
    description: 'text-gray-300',
    primaryButton: 'bg-white text-gray-900 hover:bg-gray-100',
    secondaryButton: 'border-gray-600 text-white hover:bg-gray-800',
  },
  violet: {
    bg: 'bg-gradient-to-b from-violet-600 to-purple-700 text-white',
    badge: 'bg-white/20 text-white',
    title: 'text-white',
    description: 'text-violet-100',
    primaryButton: 'bg-white text-violet-700 hover:bg-gray-100',
    secondaryButton: 'border-white/50 text-white hover:bg-white/10',
  },
  emerald: {
    bg: 'bg-gradient-to-b from-emerald-50 to-white',
    badge: 'bg-emerald-100 text-emerald-700',
    title: 'text-gray-900',
    description: 'text-gray-600',
    primaryButton: 'bg-emerald-600 hover:bg-emerald-700',
    secondaryButton: '',
  },
  indigo: {
    bg: 'bg-gradient-to-b from-indigo-900 to-indigo-800 text-white',
    badge: 'bg-indigo-500/30 text-indigo-200',
    title: 'text-white',
    description: 'text-indigo-200',
    primaryButton: 'bg-white text-indigo-700 hover:bg-gray-100',
    secondaryButton: 'border-indigo-400 text-white hover:bg-indigo-700',
  },
  slate: {
    bg: 'bg-gradient-to-b from-slate-900 to-slate-800 text-white',
    badge: 'bg-violet-500/20 text-violet-300',
    title: 'text-white',
    description: 'text-gray-300',
    primaryButton: 'bg-violet-600 hover:bg-violet-700',
    secondaryButton: 'border-gray-600 text-white hover:bg-gray-800',
  },
};

export function MarketingHero({
  badge,
  title,
  description,
  primaryButtonText = 'Start Free Trial',
  primaryButtonHref = '/signup',
  secondaryButtonText,
  secondaryButtonHref,
  image,
  imageOverlay,
  variant = 'light',
  className,
  children,
}: MarketingHeroProps) {
  const styles = variantStyles[variant];
  const BadgeIcon = badge?.icon;

  return (
    <section className={cn('py-20', styles.bg, className)}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={cn('grid gap-12 items-center', image ? 'lg:grid-cols-2' : '')}>
          <div className={!image ? 'text-center max-w-4xl mx-auto' : ''}>
            {badge && (
              <div className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6', styles.badge)}>
                {BadgeIcon && <BadgeIcon className="h-4 w-4" />}
                {badge.text}
              </div>
            )}
            <h1 className={cn('text-4xl lg:text-5xl font-bold mb-6 leading-tight', styles.title)}>
              {title}
            </h1>
            <p className={cn('text-xl mb-8', styles.description)}>
              {description}
            </p>
            <div className={cn('flex gap-4', !image ? 'flex-col sm:flex-row justify-center' : 'flex-col sm:flex-row')}>
              <Link href={primaryButtonHref}>
                <Button size="lg" className={styles.primaryButton}>
                  {primaryButtonText} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              {secondaryButtonText && secondaryButtonHref && (
                <Link href={secondaryButtonHref}>
                  <Button size="lg" variant="outline" className={styles.secondaryButton}>
                    {secondaryButtonText}
                  </Button>
                </Link>
              )}
            </div>
            {children}
          </div>
          {image && (
            <div className="relative">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
              {imageOverlay}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
