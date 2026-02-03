import { MarketingHeader } from '@/components/marketing/header';
import { MarketingFooter } from '@/components/marketing/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { generateOrganizationSchema, generateSoftwareApplicationSchema } from '@/lib/seo';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={[generateOrganizationSchema(), generateSoftwareApplicationSchema()]} />
      <MarketingHeader />
      <main className="pt-[73px]">
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
