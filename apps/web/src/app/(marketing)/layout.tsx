'use client';

import { usePathname } from 'next/navigation';
import { MarketingHeader } from '@/components/marketing/header';
import { MarketingFooter } from '@/components/marketing/footer';
import { JsonLd } from '@/components/seo/json-ld';
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
      <MarketingHeader transparent={isHomepage} variant={isHomepage ? 'homepage' : 'default'} />
      <main className={isHomepage ? '' : 'pt-[73px]'}>
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
