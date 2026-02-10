import Link from 'next/link';
import Image from 'next/image';

export function MarketingFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image 
                src="/siggly-logo.png" 
                alt="Siggly Logo" 
                width={48} 
                height={48}
                className="h-10 w-auto"
              />
              <span className="font-bold text-lg text-gray-900">Siggly</span>
            </Link>
            <p className="text-sm text-gray-500">
              Email signatures, simplified.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-900">Product</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/features" className="hover:text-gray-900 transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link></li>
              <li><Link href="/demo" className="hover:text-gray-900 transition-colors">Demo</Link></li>
              <li><Link href="/google-workspace" className="hover:text-gray-900 transition-colors">Google Workspace</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-900">Solutions</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/use-cases" className="hover:text-gray-900 transition-colors">Use Cases</Link></li>
              <li><Link href="/for/marketing" className="hover:text-gray-900 transition-colors">For Marketing</Link></li>
              <li><Link href="/for/it-admins" className="hover:text-gray-900 transition-colors">For IT Admins</Link></li>
              <li><Link href="/for/agencies" className="hover:text-gray-900 transition-colors">For Agencies</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-900">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link></li>
              <li><Link href="/help" className="hover:text-gray-900 transition-colors">Help Center</Link></li>
              <li><Link href="/compare/exclaimer" className="hover:text-gray-900 transition-colors">vs Exclaimer</Link></li>
              <li><Link href="/compare/codetwo" className="hover:text-gray-900 transition-colors">vs CodeTwo</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-900">Company</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-gray-900 transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link></li>
              <li><Link href="/partners/apply" className="hover:text-gray-900 transition-colors">Partners</Link></li>
              <li><Link href="/careers" className="hover:text-gray-900 transition-colors">Careers</Link></li>
              <li><Link href="/security" className="hover:text-gray-900 transition-colors">Security</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-900">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 sm:pt-8 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()} Siggly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
