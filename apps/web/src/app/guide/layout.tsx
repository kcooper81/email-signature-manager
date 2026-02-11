import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'User Guide - Siggly',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/siggly-logo.png" 
              alt="Siggly Logo" 
              width={32} 
              height={32}
              className="h-8 w-auto"
            />
            <span className="font-semibold text-xl">Siggly</span>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t bg-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Siggly. Internal Testing Guide.
        </div>
      </footer>
    </div>
  );
}
