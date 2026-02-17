import Image from 'next/image';
import Link from 'next/link';
import { getBrandingFromHeaders } from '@/lib/branding/get-branding';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { branding, mspOrgId, mspOrgName, isWhiteLabeled } = await getBrandingFromHeaders();

  const isPartner = Boolean(mspOrgId);
  const companyName = branding.companyName || mspOrgName || 'Siggly';
  const logoUrl = branding.logoUrl;

  // Build gradient: Siggly default is violet→blue→cyan; partners use their brand colors
  const primaryColor = branding.primaryColor || '#7c3aed';   // violet-600
  const secondaryColor = branding.secondaryColor || '#2563eb'; // blue-600
  const accentColor = branding.accentColor || '#0891b2';       // cyan-600

  const backgroundStyle = isPartner
    ? {
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor || primaryColor} 50%, ${accentColor || primaryColor} 100%)`,
      }
    : {
        background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 40%, #0891b2 100%)',
      };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={backgroundStyle}
    >
      {/* Subtle overlay for depth */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(0,0,0,0.3) 0%, transparent 50%)',
        }}
      />
      {/* Centered logo */}
      <Link href={isPartner ? '/login' : '/'} className="relative z-10 flex flex-col items-center gap-2 mb-8">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${companyName} Logo`}
            className="h-12 w-auto object-contain"
          />
        ) : (
          <Image
            src="/siggly-logo.png"
            alt="Siggly Logo"
            width={48}
            height={48}
            className="h-12 w-auto brightness-0 invert"
          />
        )}
        <span className="font-semibold text-2xl text-white drop-shadow-md">{companyName}</span>
      </Link>

      {/* Card content */}
      <main className="relative z-10 w-full flex justify-center">
        {children}
      </main>

      {/* Footer */}
      <p className="relative z-10 mt-8 text-center text-sm text-white/60">
        {isWhiteLabeled ? (
          <>© {new Date().getFullYear()} {companyName}. All rights reserved.</>
        ) : isPartner ? (
          <>
            © {new Date().getFullYear()} {companyName}. Powered by{' '}
            <a href="https://siggly.io" className="hover:text-white/80 underline" target="_blank" rel="noopener noreferrer">
              Siggly
            </a>
          </>
        ) : (
          <>© {new Date().getFullYear()} Siggly. All rights reserved.</>
        )}
      </p>
    </div>
  );
}
