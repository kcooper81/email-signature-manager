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
  const primaryColor = branding.primaryColor || '#4d52de';

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: `linear-gradient(to bottom right, #0f172a, ${primaryColor}22, #0f172a)`,
      }}
    >
      {/* Centered logo */}
      <Link href={isPartner ? '/login' : '/'} className="flex flex-col items-center gap-2 mb-8">
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
            className="h-12 w-auto"
          />
        )}
        <span className="font-semibold text-2xl text-white">{companyName}</span>
      </Link>

      {/* Card content */}
      <main className="w-full flex justify-center">
        {children}
      </main>

      {/* Footer */}
      <p className="mt-8 text-center text-sm text-slate-400">
        {isWhiteLabeled ? (
          <>© {new Date().getFullYear()} {companyName}. All rights reserved.</>
        ) : isPartner ? (
          <>
            © {new Date().getFullYear()} {companyName}. Powered by{' '}
            <a href="https://siggly.io" className="hover:text-slate-300 underline" target="_blank" rel="noopener noreferrer">
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
