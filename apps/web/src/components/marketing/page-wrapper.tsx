import { MarketingHeader } from './header';
import { MarketingFooter } from './footer';

interface MarketingPageWrapperProps {
  children: React.ReactNode;
  transparentHeader?: boolean;
}

export function MarketingPageWrapper({
  children,
  transparentHeader = false,
}: MarketingPageWrapperProps) {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader transparent={transparentHeader} />
      <main className={transparentHeader ? '' : 'pt-[73px]'}>
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
