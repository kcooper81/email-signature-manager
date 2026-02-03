import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MarketingTestimonialProps {
  quote: string;
  author: {
    name: string;
    title: string;
    image?: string;
  };
  variant?: 'light' | 'dark' | 'violet' | 'slate';
  className?: string;
}

const variantStyles = {
  light: {
    bg: 'bg-gray-50',
    quote: 'text-gray-900',
    name: 'text-gray-900',
    title: 'text-gray-500',
  },
  dark: {
    bg: 'bg-gray-900 text-white',
    quote: 'text-white',
    name: 'text-white',
    title: 'text-gray-400',
  },
  violet: {
    bg: 'bg-gradient-to-r from-violet-600 to-purple-700 text-white',
    quote: 'text-white',
    name: 'text-white',
    title: 'text-violet-200',
  },
  slate: {
    bg: 'bg-slate-900 text-white',
    quote: 'text-white',
    name: 'text-white',
    title: 'text-gray-400',
  },
};

export function MarketingTestimonial({
  quote,
  author,
  variant = 'dark',
  className,
}: MarketingTestimonialProps) {
  const styles = variantStyles[variant];

  return (
    <section className={cn('py-20', styles.bg, className)}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        {author.image && (
          <div className="mb-8">
            <Image
              src={author.image}
              alt={author.name}
              width={80}
              height={80}
              className="rounded-full mx-auto mb-4 border-4 border-white/20"
            />
          </div>
        )}
        <blockquote className={cn('text-2xl font-medium mb-6', styles.quote)}>
          "{quote}"
        </blockquote>
        <div>
          <p className={cn('font-semibold', styles.name)}>{author.name}</p>
          <p className={styles.title}>{author.title}</p>
        </div>
      </div>
    </section>
  );
}
