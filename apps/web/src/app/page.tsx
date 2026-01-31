import Link from 'next/link';
import { ArrowRight, Check, Mail, Users, Zap, Shield, Building2, Globe, Clock, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <Mail className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-xl tracking-tight">Siggly</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-white/60 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors">
              How it works
            </Link>
            <Link href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#0a0a0a] hover:bg-white/90 transition-all"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px]" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/70">Now with Google Workspace & Microsoft 365</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Email signatures
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                without the chaos
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Deploy consistent, on-brand signatures to your entire team in seconds. 
              No more manual updates. No more rogue signatures.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition-all w-full sm:w-auto"
              >
                Start free trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white hover:bg-white/10 transition-all w-full sm:w-auto"
              >
                Watch demo
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatCard value="10K+" label="Signatures deployed" />
            <StatCard value="500+" label="Companies trust us" />
            <StatCard value="99.9%" label="Uptime guaranteed" />
            <StatCard value="<5min" label="Average setup time" />
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Managing email signatures shouldn&apos;t be this hard
            </h2>
            <p className="text-lg text-white/60">
              IT teams waste hours chasing employees to update signatures. Marketing loses control of brand consistency. 
              Sound familiar?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
              <div className="text-red-400 font-semibold text-sm uppercase tracking-wider mb-4">Without Siggly</div>
              <ul className="space-y-4">
                <PainPoint text="Manual signature updates for every employee" />
                <PainPoint text="Inconsistent branding across the organization" />
                <PainPoint text="Hours wasted on IT support tickets" />
                <PainPoint text="No way to enforce compliance" />
              </ul>
            </div>
            
            {/* After */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
              <div className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-4">With Siggly</div>
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
      <section id="how-it-works" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm mb-6">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-white/70">Simple setup</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Up and running in minutes
            </h2>
            <p className="text-lg text-white/60">
              No complex integrations. No lengthy onboarding. Just connect, design, and deploy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number="01"
              title="Connect your workspace"
              description="Link your Google Workspace or Microsoft 365 account with a single click. We handle the rest."
              icon={<Globe className="h-6 w-6" />}
            />
            <StepCard 
              number="02"
              title="Design your signature"
              description="Use our visual editor to create beautiful, on-brand signatures. No coding required."
              icon={<Mail className="h-6 w-6" />}
            />
            <StepCard 
              number="03"
              title="Deploy to everyone"
              description="Push signatures to your entire team instantly. Updates sync automatically."
              icon={<Zap className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Everything you need to manage signatures at scale
            </h2>
            <p className="text-lg text-white/60">
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
              description="Push signatures to all users with one click. Changes sync across your entire organization."
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
              title="Scheduled Updates"
              description="Plan signature changes in advance. Perfect for campaigns, promotions, or rebrands."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            
            <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to simplify your signatures?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                Join hundreds of companies who&apos;ve eliminated signature chaos with Siggly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/signup"
                  className="group inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-emerald-600 shadow-lg hover:bg-white/90 transition-all"
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
      <footer className="border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-lg">Siggly</span>
              </Link>
              <p className="text-sm text-white/40">
                Signatures, simplified.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-white/50">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-white transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-white/50">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-white/50">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} Siggly. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-white/40 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </Link>
              <Link href="#" className="text-white/40 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-2">
        {value}
      </div>
      <div className="text-sm text-white/50">{label}</div>
    </div>
  );
}

function PainPoint({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="shrink-0 h-5 w-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
        <span className="text-red-400 text-xs">✕</span>
      </div>
      <span className="text-white/70">{text}</span>
    </li>
  );
}

function BenefitPoint({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="shrink-0 h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
        <Check className="h-3 w-3 text-emerald-400" />
      </div>
      <span className="text-white/70">{text}</span>
    </li>
  );
}

function StepCard({ 
  number, 
  title, 
  description, 
  icon 
}: { 
  number: string; 
  title: string; 
  description: string; 
  icon: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors">
      <div className="text-6xl font-bold text-white/5 absolute top-4 right-6">{number}</div>
      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="font-semibold text-xl mb-3">{title}</h3>
      <p className="text-white/60">{description}</p>
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all">
      <div className="inline-flex items-center justify-center rounded-xl bg-emerald-500/10 p-3 text-emerald-400 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
