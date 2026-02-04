import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center bg-slate-50 p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Siggly. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
