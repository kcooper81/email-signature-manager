import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface MarketingFeatureGridProps {
  title?: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'cards';
  iconVariant?: 'violet' | 'blue' | 'emerald' | 'indigo' | 'red';
  className?: string;
}

const iconStyles = {
  violet: 'bg-violet-100 text-violet-600',
  blue: 'bg-blue-100 text-blue-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  indigo: 'bg-indigo-100 text-indigo-600',
  red: 'bg-red-100 text-red-600',
};

export function MarketingFeatureGrid({
  title,
  description,
  features,
  columns = 3,
  variant = 'cards',
  iconVariant = 'violet',
  className,
}: MarketingFeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={cn('py-20', className)}>
      <div className="max-w-6xl mx-auto px-6">
        {(title || description) && (
          <div className="text-center mb-16">
            {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
            {description && (
              <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
            )}
          </div>
        )}
        <div className={cn('grid gap-8', gridCols[columns])}>
          {features.map((feature) => (
            <div
              key={feature.title}
              className={cn(
                variant === 'cards'
                  ? 'bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow'
                  : ''
              )}
            >
              <div className={cn('h-12 w-12 rounded-lg flex items-center justify-center mb-4', iconStyles[iconVariant])}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
