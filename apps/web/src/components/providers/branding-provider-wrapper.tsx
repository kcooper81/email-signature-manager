import { getBrandingFromHeaders } from '@/lib/branding/get-branding';
import { BrandingProvider } from '@/lib/branding/branding-context';

interface BrandingProviderWrapperProps {
  children: React.ReactNode;
}

export async function BrandingProviderWrapper({ children }: BrandingProviderWrapperProps) {
  const brandingInfo = await getBrandingFromHeaders();

  return (
    <BrandingProvider
      initialBranding={brandingInfo.branding}
      mspOrgId={brandingInfo.mspOrgId}
      mspOrgName={brandingInfo.mspOrgName}
      mspOrgType={brandingInfo.mspOrgType}
    >
      {children}
    </BrandingProvider>
  );
}
