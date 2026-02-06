'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ChevronDown, Building2, Users, Briefcase, Crown, Scale, Heart, TrendingUp, Home, Zap, FileText, Wrench, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MarketingHeaderProps {
  transparent?: boolean;
}

export function MarketingHeader({ transparent = true }: MarketingHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm'
          : transparent
          ? 'bg-transparent border-b border-transparent'
          : 'bg-white border-b border-gray-200'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/siggly-logo.png" 
            alt="Siggly Logo" 
            width={48} 
            height={48}
            className="h-8 sm:h-10 w-auto"
          />
          <span className="font-bold text-lg sm:text-xl tracking-tight text-gray-900">Siggly</span>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-1">
          <Link 
            href="/features" 
            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium rounded-lg hover:bg-gray-50"
          >
            Features
          </Link>
          
          {/* Solutions Mega Menu */}
          <div className="relative group">
            <button className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium flex items-center gap-1 rounded-lg hover:bg-gray-50">
              Solutions
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-3">By Team</div>
                  <div className="space-y-1">
                    <Link href="/for/it-admins" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-violet-50 group/item transition-colors">
                      <div className="h-8 w-8 rounded-lg bg-violet-100 flex items-center justify-center group-hover/item:bg-violet-200 transition-colors">
                        <Wrench className="h-4 w-4 text-violet-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">IT Admins</div>
                        <div className="text-xs text-gray-500">Centralized management</div>
                      </div>
                    </Link>
                    <Link href="/for/marketing" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 group/item transition-colors">
                      <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover/item:bg-blue-200 transition-colors">
                        <Zap className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Marketing Teams</div>
                        <div className="text-xs text-gray-500">Campaign banners</div>
                      </div>
                    </Link>
                    <Link href="/for/small-business" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-emerald-50 group/item transition-colors">
                      <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center group-hover/item:bg-emerald-200 transition-colors">
                        <Briefcase className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Small Business</div>
                        <div className="text-xs text-gray-500">Free for 5 users</div>
                      </div>
                    </Link>
                    <Link href="/for/agencies" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-purple-50 group/item transition-colors">
                      <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover/item:bg-purple-200 transition-colors">
                        <Users className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Agencies</div>
                        <div className="text-xs text-gray-500">Client management</div>
                      </div>
                    </Link>
                    <Link href="/for/enterprise" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 group/item transition-colors">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover/item:bg-slate-200 transition-colors">
                        <Crown className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Enterprise</div>
                        <div className="text-xs text-gray-500">SSO & compliance</div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-3">By Industry</div>
                  <div className="space-y-1">
                    <Link href="/industries/legal" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 group/item transition-colors">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover/item:bg-slate-200 transition-colors">
                        <Scale className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Legal</div>
                        <div className="text-xs text-gray-500">Bar compliance</div>
                      </div>
                    </Link>
                    <Link href="/industries/healthcare" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 group/item transition-colors">
                      <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover/item:bg-blue-200 transition-colors">
                        <Heart className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Healthcare</div>
                        <div className="text-xs text-gray-500">HIPAA compliant</div>
                      </div>
                    </Link>
                    <Link href="/industries/finance" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-emerald-50 group/item transition-colors">
                      <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center group-hover/item:bg-emerald-200 transition-colors">
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Finance</div>
                        <div className="text-xs text-gray-500">SEC/FINRA ready</div>
                      </div>
                    </Link>
                    <Link href="/industries/real-estate" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 group/item transition-colors">
                      <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center group-hover/item:bg-orange-200 transition-colors">
                        <Home className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Real Estate</div>
                        <div className="text-xs text-gray-500">Showcase listings</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integrations Dropdown */}
          <div className="relative group">
            <button className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium flex items-center gap-1 rounded-lg hover:bg-gray-50">
              Integrations
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-3">
              <Link href="/google-workspace" className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 group/item transition-colors">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 mb-0.5">Google Workspace</div>
                  <div className="text-xs text-gray-500">Gmail signature deployment</div>
                </div>
              </Link>
              <Link href="/integrations/microsoft-365" className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 group/item transition-colors">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#0078D4">
                    <path d="M11.5 0h12v12h-12zM0 0h11v11H0zM11.5 12.5h12v11.5h-12zM0 11.5h11V23H0z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 mb-0.5">Microsoft 365</div>
                  <div className="text-xs text-gray-500">Outlook signature management</div>
                </div>
              </Link>
              <Link href="/integrations/hubspot" className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 group/item transition-colors">
                <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#FF7A59">
                    <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.07A2.199 2.199 0 0017.232.837h-.068a2.199 2.199 0 00-2.199 2.199v.07a2.196 2.196 0 001.267 1.977v2.847a4.301 4.301 0 00-2.066.7L9.77 4.233a2.25 2.25 0 10-1.342 1.342l4.396 4.396a4.3 4.3 0 00-.7 2.066H9.278a2.196 2.196 0 00-1.978-1.267h-.07a2.199 2.199 0 00-2.199 2.199v.068a2.199 2.199 0 002.199 2.199h.07a2.196 2.196 0 001.977-1.267h2.847a4.301 4.301 0 107.04-4.04z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 mb-0.5">HubSpot CRM</div>
                  <div className="text-xs text-gray-500">Sync contact data</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Resources Dropdown */}
          <div className="relative group">
            <button className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium flex items-center gap-1 rounded-lg hover:bg-gray-50">
              Resources
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
              <Link href="/blog" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 group/item transition-colors">
                <FileText className="h-4 w-4 text-gray-400 group-hover/item:text-violet-600" />
                <span className="text-sm text-gray-700">Blog</span>
              </Link>
              <Link href="/tools/signature-generator" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 group/item transition-colors">
                <Zap className="h-4 w-4 text-gray-400 group-hover/item:text-violet-600" />
                <span className="text-sm text-gray-700">Free Generator</span>
              </Link>
              <Link href="/tools/signature-templates" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 group/item transition-colors">
                <FileText className="h-4 w-4 text-gray-400 group-hover/item:text-violet-600" />
                <span className="text-sm text-gray-700">Templates</span>
              </Link>
              <Link href="/tools/html-signature-converter" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 group/item transition-colors">
                <Wrench className="h-4 w-4 text-gray-400 group-hover/item:text-violet-600" />
                <span className="text-sm text-gray-700">HTML Converter</span>
              </Link>
              <div className="h-px bg-gray-200 my-2"></div>
              <Link href="/help" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 group/item transition-colors">
                <FileText className="h-4 w-4 text-gray-400 group-hover/item:text-violet-600" />
                <span className="text-sm text-gray-700">Help Center</span>
              </Link>
            </div>
          </div>
          
          <Link 
            href="/pricing" 
            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium rounded-lg hover:bg-gray-50"
          >
            Pricing
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
              Sign in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90">
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link 
              href="/features" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            
            {/* Solutions submenu */}
            <div className="space-y-2">
              <div className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase">Solutions</div>
              <Link href="/for/it-admins" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>IT Admins</Link>
              <Link href="/for/marketing" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Marketing Teams</Link>
              <Link href="/for/small-business" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Small Business</Link>
              <Link href="/for/enterprise" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Enterprise</Link>
            </div>

            {/* Integrations submenu */}
            <div className="space-y-2">
              <div className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase">Integrations</div>
              <Link href="/google-workspace" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Google Workspace</Link>
              <Link href="/integrations/microsoft-365" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Microsoft 365</Link>
              <Link href="/integrations/hubspot" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>HubSpot CRM</Link>
            </div>

            {/* Resources submenu */}
            <div className="space-y-2">
              <div className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase">Resources</div>
              <Link href="/blog" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
              <Link href="/tools/signature-generator" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Free Generator</Link>
              <Link href="/help" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Help Center</Link>
            </div>

            <Link 
              href="/pricing" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>

            {/* Mobile CTA buttons */}
            <div className="pt-4 space-y-2">
              <Link href="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">Sign in</Button>
              </Link>
              <Link href="/signup" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-violet-600 to-blue-600">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
