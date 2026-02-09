import { MarketingHeader } from './header';
import { MarketingFooter } from './footer';

interface MarketingPageWrapperProps {
  children: React.ReactNode;
  transparentHeader?: boolean;
  headerVariant?: 'default' | 'homepage';
}

export function MarketingPageWrapper({
  children,
  transparentHeader = false,
  headerVariant = 'default',
}: MarketingPageWrapperProps) {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader transparent={transparentHeader} variant={headerVariant} />
      <main className={transparentHeader ? '' : 'pt-[73px]'}>
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
