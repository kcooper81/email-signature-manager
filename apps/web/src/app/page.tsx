import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Mail, Users, Zap, Shield, Building2, Globe, Clock, Sparkles, BarChart3, Palette, RefreshCw, Lock, Play } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Siggly</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
              How it works
            </Link>
            <Link href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all shadow-sm"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background with multi-color gradient like Circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-200/30 via-blue-200/30 to-cyan-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-pink-200/20 via-orange-200/20 to-yellow-200/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 backdrop-blur px-4 py-1.5 text-sm mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 animate-pulse" />
              <span className="text-gray-700 font-medium">Now with Google Workspace & Microsoft 365</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Email signatures
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                without the chaos
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Deploy consistent, on-brand signatures to your entire team in seconds. 
              No more manual updates. No more rogue signatures.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40 transition-all w-full sm:w-auto"
              >
                Start free trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/demo"
                className="group inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all w-full sm:w-auto shadow-sm"
              >
                <Play className="mr-2 h-4 w-4 text-violet-600" />
                Watch demo
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-500 mb-16">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-violet-600" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyan-600" />
                <span>Setup in 60 seconds</span>
              </div>
            </div>

            {/* Hero Screenshot/Product Image */}
            <div className="relative mx-auto max-w-5xl">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/10 border border-gray-200/50 bg-white">
                {/* Browser chrome mockup */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-500 text-center">
                      app.siggly.com/templates
                    </div>
                  </div>
                </div>
                {/* Screenshot placeholder - gradient mockup of the editor */}
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                  <div className="h-full rounded-xl border border-gray-200 bg-white shadow-sm flex">
                    {/* Sidebar */}
                    <div className="w-64 border-r border-gray-200 p-4 space-y-3">
                      <div className="h-8 bg-gradient-to-r from-violet-100 to-blue-100 rounded-lg" />
                      <div className="h-6 bg-gray-100 rounded w-3/4" />
                      <div className="h-6 bg-gray-100 rounded w-1/2" />
                      <div className="mt-6 space-y-2">
                        <div className="h-10 bg-violet-50 rounded-lg border border-violet-200" />
                        <div className="h-10 bg-gray-50 rounded-lg border border-gray-200" />
                        <div className="h-10 bg-gray-50 rounded-lg border border-gray-200" />
                      </div>
                    </div>
                    {/* Main content - signature preview */}
                    <div className="flex-1 p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="h-6 bg-gray-200 rounded w-32" />
                        <div className="h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full w-24" />
                      </div>
                      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-blue-400" />
                          <div className="space-y-2">
                            <div className="h-5 bg-gray-300 rounded w-32" />
                            <div className="h-4 bg-gray-200 rounded w-24" />
                            <div className="h-3 bg-blue-200 rounded w-40" />
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                          <div className="w-6 h-6 rounded bg-blue-100" />
                          <div className="w-6 h-6 rounded bg-cyan-100" />
                          <div className="w-6 h-6 rounded bg-violet-100" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-xl p-4 border border-gray-100 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Deployed!</div>
                    <div className="text-xs text-gray-500">47 signatures updated</div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 bottom-1/4 bg-white rounded-xl shadow-xl p-4 border border-gray-100 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Team synced</div>
                    <div className="text-xs text-gray-500">From Google Workspace</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Social Proof */}
      <section className="py-16 border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-8 font-medium">Trusted by teams at companies of all sizes</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60">
            {/* Placeholder logos - grayscale company logos */}
            <div className="h-8 w-24 bg-gray-300 rounded" />
            <div className="h-8 w-28 bg-gray-300 rounded" />
            <div className="h-8 w-20 bg-gray-300 rounded" />
            <div className="h-8 w-32 bg-gray-300 rounded" />
            <div className="h-8 w-24 bg-gray-300 rounded" />
          </div>
        </div>
      </section>

      {/* Stats Section with colorful cards */}
      <section className="py-20 bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value="10K+" label="Signatures deployed" color="violet" />
            <StatCard value="500+" label="Companies trust us" color="blue" />
            <StatCard value="99.9%" label="Uptime guaranteed" color="cyan" />
            <StatCard value="60s" label="Average setup time" color="green" />
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Managing email signatures shouldn&apos;t be this hard
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              IT teams waste hours chasing employees to update signatures. Marketing loses control of brand consistency. 
              Sound familiar?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <div className="rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-8">
              <div className="text-red-600 font-semibold text-sm uppercase tracking-wider mb-6">Without Siggly</div>
              <ul className="space-y-4">
                <PainPoint text="Manual signature updates for every employee" />
                <PainPoint text="Inconsistent branding across the organization" />
                <PainPoint text="Hours wasted on IT support tickets" />
                <PainPoint text="No way to enforce compliance" />
              </ul>
            </div>
            
            {/* After */}
            <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8">
              <div className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-6">With Siggly</div>
              <ul className="space-y-4">
                <BenefitPoint text="One-click deployment to all users" />
                <BenefitPoint text="Consistent, on-brand signatures everywhere" />
                <BenefitPoint text="Zero IT overhead after setup" />
                <BenefitPoint text="Automatic compliance enforcement" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm mb-6">
              <Sparkles className="h-4 w-4 text-violet-600" />
              <span className="text-violet-700 font-medium">Zero-friction onboarding</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Up and running in 60 seconds
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              No complex integrations. No IT involvement required. Just connect, design, and deploy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number="01"
              title="Connect your workspace"
              description="Link your Google Workspace or Microsoft 365 account with a single click. We handle the OAuth securely."
              icon={<Globe className="h-6 w-6" />}
              color="violet"
            />
            <StepCard 
              number="02"
              title="Design your signature"
              description="Use our visual editor to create beautiful, on-brand signatures. No coding required."
              icon={<Mail className="h-6 w-6" />}
              color="blue"
            />
            <StepCard 
              number="03"
              title="Deploy to everyone"
              description="Push signatures to your entire team instantly. Updates sync automatically across all devices."
              icon={<Zap className="h-6 w-6" />}
              color="cyan"
            />
          </div>
        </div>
      </section>

      {/* What Sets Us Apart - Competitive Differentiators */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-violet-50/30 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm mb-6">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-blue-700 font-medium">Why choose Siggly</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Built different from the competition
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Unlike Exclaimer, CodeTwo, and WiseStamp, we built Siggly for the modern era — 
              fast setup, powerful analytics, and AI-powered design.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <DifferentiatorCard
              icon={<Zap className="h-6 w-6" />}
              title="60-Second Setup"
              description="Most competitors require IT involvement and complex configurations. Siggly connects in one click — marketing and HR teams can self-serve."
              highlight="No IT required"
              color="violet"
            />
            <DifferentiatorCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Signature Analytics"
              description="Track clicks on links, banners, and CTAs. See which signatures drive engagement and connect to your CRM for ROI attribution."
              highlight="Coming soon"
              color="blue"
            />
            <DifferentiatorCard
              icon={<Palette className="h-6 w-6" />}
              title="AI-Powered Design"
              description="Describe what you want and our AI generates professional signatures. Get a signature health score and brand consistency checks."
              highlight="Coming soon"
              color="cyan"
            />
            <DifferentiatorCard
              icon={<RefreshCw className="h-6 w-6" />}
              title="HR System Sync"
              description="Connect to BambooHR, Gusto, or Workday. When someone gets promoted or changes roles, their signature updates automatically."
              highlight="Coming soon"
              color="green"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Everything you need to manage signatures at scale
            </h2>
            <p className="text-lg text-gray-600">
              Powerful features designed for modern teams
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Mail className="h-5 w-5" />}
              title="Visual Editor"
              description="Drag-and-drop builder with live preview. Create professional signatures without touching code."
            />
            <FeatureCard
              icon={<Users className="h-5 w-5" />}
              title="Team Management"
              description="Organize users by department, role, or location. Assign different templates to different groups."
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Instant Deployment"
              description="Push signatures to all users with one click. Changes sync across Gmail, Outlook, and mobile."
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Brand Compliance"
              description="Lock down signature elements to ensure consistent branding. No more rogue signatures."
            />
            <FeatureCard
              icon={<Building2 className="h-5 w-5" />}
              title="Directory Sync"
              description="Automatically sync user data from Google Workspace or Microsoft 365. Always up to date."
            />
            <FeatureCard
              icon={<Clock className="h-5 w-5" />}
              title="Campaign Banners"
              description="Add promotional banners that rotate automatically. Perfect for product launches and events."
            />
            <FeatureCard
              icon={<Lock className="h-5 w-5" />}
              title="Security & Compliance"
              description="GDPR-ready disclaimers, audit trails, and verified sender badges to fight spoofing."
            />
            <FeatureCard
              icon={<Globe className="h-5 w-5" />}
              title="Multi-Platform"
              description="Works seamlessly across Gmail, Outlook, and mobile apps. One signature, everywhere."
            />
            <FeatureCard
              icon={<BarChart3 className="h-5 w-5" />}
              title="Analytics Dashboard"
              description="Track signature impressions, link clicks, and engagement. Measure your email marketing ROI."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background with multi-color gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-600" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl" />
            
            <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                Ready to simplify your signatures?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                Join hundreds of companies who&apos;ve eliminated signature chaos with Siggly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/signup"
                  className="group inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-violet-600 shadow-lg hover:bg-gray-50 transition-all"
                >
                  Start your free trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-base font-medium text-white hover:bg-white/10 transition-all"
                >
                  Talk to sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg">Siggly</span>
              </Link>
              <p className="text-sm text-gray-500">
                Signatures, simplified.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 text-gray-900">Product</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="#features" className="hover:text-gray-900 transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-gray-900 transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 text-gray-900">Company</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="/about" className="hover:text-gray-900 transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 text-gray-900">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Siggly. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ value, label, color = 'violet' }: { value: string; label: string; color?: string }) {
  const colorClasses: Record<string, string> = {
    violet: 'from-violet-500 to-violet-600',
    blue: 'from-blue-500 to-blue-600',
    cyan: 'from-cyan-500 to-cyan-600',
    green: 'from-green-500 to-emerald-600',
  };
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
      <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent mb-2`}>
        {value}
      </div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </div>
  );
}

function PainPoint({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
        <span className="text-red-500 text-xs font-bold">✕</span>
      </div>
      <span className="text-gray-700">{text}</span>
    </li>
  );
}

function BenefitPoint({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="shrink-0 h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
        <Check className="h-3 w-3 text-emerald-600" />
      </div>
      <span className="text-gray-700">{text}</span>
    </li>
  );
}

function StepCard({ 
  number, 
  title, 
  description, 
  icon,
  color = 'violet'
}: { 
  number: string; 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  color?: string;
}) {
  const colorClasses: Record<string, { bg: string; shadow: string }> = {
    violet: { bg: 'from-violet-500 to-violet-600', shadow: 'shadow-violet-500/20' },
    blue: { bg: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/20' },
    cyan: { bg: 'from-cyan-500 to-cyan-600', shadow: 'shadow-cyan-500/20' },
    green: { bg: 'from-green-500 to-emerald-600', shadow: 'shadow-green-500/20' },
  };
  
  const colors = colorClasses[color] || colorClasses.violet;
  
  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg hover:shadow-gray-100 transition-all">
      <div className="text-7xl font-bold text-gray-100 absolute top-4 right-6">{number}</div>
      <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-6 shadow-lg ${colors.shadow} text-white`}>
        {icon}
      </div>
      <h3 className="font-semibold text-xl mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:shadow-gray-100 hover:border-gray-300 transition-all group">
      <div className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-blue-50 p-3 text-violet-600 mb-4 group-hover:from-violet-100 group-hover:to-blue-100 transition-colors">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function DifferentiatorCard({
  icon,
  title,
  description,
  highlight,
  color = 'violet',
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
  color?: string;
}) {
  const colorClasses: Record<string, { bg: string; shadow: string; badge: string; badgeText: string }> = {
    violet: { bg: 'from-violet-500 to-violet-600', shadow: 'shadow-violet-500/20', badge: 'bg-violet-50', badgeText: 'text-violet-600' },
    blue: { bg: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/20', badge: 'bg-blue-50', badgeText: 'text-blue-600' },
    cyan: { bg: 'from-cyan-500 to-cyan-600', shadow: 'shadow-cyan-500/20', badge: 'bg-cyan-50', badgeText: 'text-cyan-600' },
    green: { bg: 'from-green-500 to-emerald-600', shadow: 'shadow-green-500/20', badge: 'bg-green-50', badgeText: 'text-green-600' },
  };
  
  const colors = colorClasses[color] || colorClasses.violet;
  
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-xl hover:shadow-gray-100 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center text-white shadow-lg ${colors.shadow}`}>
          {icon}
        </div>
        <span className={`text-xs font-semibold uppercase tracking-wider ${colors.badgeText} ${colors.badge} px-3 py-1 rounded-full`}>
          {highlight}
        </span>
      </div>
      <h3 className="font-bold text-xl mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
