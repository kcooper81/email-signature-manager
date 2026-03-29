'use client';

import { usePathname } from 'next/navigation';
import { MarketingHeader } from '@/components/marketing/header';
import { MarketingFooter } from '@/components/marketing/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld';
import { VisualBreadcrumbs } from '@/components/seo/visual-breadcrumbs';
import { generateOrganizationSchema, generateSoftwareApplicationSchema, generateWebSiteSchema } from '@/lib/seo';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={[generateOrganizationSchema(), generateSoftwareApplicationSchema(), generateWebSiteSchema()]} />
      <BreadcrumbJsonLd />
      <MarketingHeader transparent={isHomepage} variant={isHomepage ? 'homepage' : 'default'} />
      <main className={isHomepage ? '' : 'pt-[73px]'}>
        {!isHomepage && <VisualBreadcrumbs />}
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
