import { cn } from '@/lib/utils';

interface Stat {
  value: string;
  label: string;
}

interface MarketingStatsBarProps {
  stats: Stat[];
  variant?: 'violet' | 'dark' | 'emerald' | 'blue';
  className?: string;
}

const variantStyles = {
  violet: {
    bg: 'bg-violet-600 text-white',
    label: 'text-violet-200',
  },
  dark: {
    bg: 'bg-gray-900 text-white',
    label: 'text-gray-400',
  },
  emerald: {
    bg: 'bg-emerald-600 text-white',
    label: 'text-emerald-200',
  },
  blue: {
    bg: 'bg-blue-600 text-white',
    label: 'text-blue-200',
  },
};

export function MarketingStatsBar({
  stats,
  variant = 'violet',
  className,
}: MarketingStatsBarProps) {
  const styles = variantStyles[variant];

  return (
    <section className={cn('py-12', styles.bg, className)}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={cn('grid gap-8 text-center', `grid-cols-2 md:grid-cols-${stats.length}`)}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
