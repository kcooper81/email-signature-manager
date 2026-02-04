import Link from 'next/link';
import { INTEGRATIONS, AVAILABLE_INTEGRATIONS, COMING_SOON_INTEGRATIONS } from '@/lib/integrations';
import { Badge } from '@/components/ui/badge';

interface IntegrationsSectionProps {
  title?: string;
  description?: string;
  showComingSoon?: boolean;
  variant?: 'grid' | 'list';
}

export function IntegrationsSection({
  title = 'Integrations',
  description = 'Connect with the tools your team already uses',
  showComingSoon = true,
  variant = 'grid',
}: IntegrationsSectionProps) {
  const displayIntegrations = showComingSoon ? INTEGRATIONS : AVAILABLE_INTEGRATIONS;

  if (variant === 'list') {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          </div>
          <div className="space-y-4">
            {displayIntegrations.map((integration) => {
              const Icon = integration.icon;
              const content = (
                <div className="flex items-center gap-4 p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 transition-all">
                  <div className={`h-12 w-12 rounded-xl bg-${integration.color}-100 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-6 w-6 text-${integration.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{integration.name}</h3>
                      {integration.status === 'coming-soon' && (
                        <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{integration.description}</p>
                  </div>
                </div>
              );

              return integration.status === 'available' && integration.href ? (
                <Link key={integration.id} href={integration.href}>
                  {content}
                </Link>
              ) : (
                <div key={integration.id}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayIntegrations.map((integration) => {
            const Icon = integration.icon;
            const content = (
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`h-12 w-12 rounded-xl bg-${integration.color}-100 flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 text-${integration.color}-600`} />
                  </div>
                  {integration.status === 'coming-soon' && (
                    <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2">{integration.name}</h3>
                <p className="text-gray-600 text-sm">{integration.description}</p>
              </div>
            );

            return integration.status === 'available' && integration.href ? (
              <Link key={integration.id} href={integration.href}>
                {content}
              </Link>
            ) : (
              <div key={integration.id}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
