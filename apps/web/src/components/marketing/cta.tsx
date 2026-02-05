import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MarketingCTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  variant?: 'default' | 'violet' | 'blue' | 'emerald' | 'indigo' | 'dark';
  className?: string;
}

const variantStyles = {
  default: {
    bg: 'bg-gray-50',
    title: 'text-gray-900',
    description: 'text-gray-600',
    primaryButton: '',
    secondaryButton: 'variant-outline',
  },
  violet: {
    bg: 'bg-violet-600',
    title: 'text-white',
    description: 'text-violet-100',
    primaryButton: 'bg-white text-violet-700 hover:bg-gray-100',
    secondaryButton: 'border-violet-400 text-white hover:bg-violet-700',
  },
  blue: {
    bg: 'bg-blue-600',
    title: 'text-white',
    description: 'text-blue-100',
    primaryButton: 'bg-white text-blue-700 hover:bg-gray-100',
    secondaryButton: 'border-blue-400 text-white hover:bg-blue-700',
  },
  emerald: {
    bg: 'bg-emerald-600',
    title: 'text-white',
    description: 'text-emerald-100',
    primaryButton: 'bg-white text-emerald-700 hover:bg-gray-100',
    secondaryButton: 'border-emerald-400 text-white hover:bg-emerald-700',
  },
  indigo: {
    bg: 'bg-indigo-600',
    title: 'text-white',
    description: 'text-indigo-100',
    primaryButton: 'bg-white text-indigo-700 hover:bg-gray-100',
    secondaryButton: 'border-indigo-400 text-white hover:bg-indigo-700',
  },
  dark: {
    bg: 'bg-gray-900',
    title: 'text-white',
    description: 'text-gray-400',
    primaryButton: 'bg-white text-gray-900 hover:bg-gray-100',
    secondaryButton: 'border-gray-600 text-white hover:bg-gray-800',
  },
};

export function MarketingCTA({
  title = 'Ready to get started?',
  description = 'Join thousands of teams who trust Siggly for their email signatures.',
  primaryButtonText = 'Get Started Free',
  primaryButtonHref = '/signup',
  secondaryButtonText,
  secondaryButtonHref,
  variant = 'violet',
  className,
}: MarketingCTAProps) {
  const styles = variantStyles[variant];

  return (
    <section className={cn('py-20', styles.bg, className)}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={cn('text-3xl font-bold mb-4', styles.title)}>
          {title}
        </h2>
        <p className={cn('mb-8 max-w-2xl mx-auto', styles.description)}>
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </div>
    </section>
  );
}
