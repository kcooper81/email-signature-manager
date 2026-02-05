import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Mail, Users, Zap, Shield, Building2, Globe, Clock, Sparkles, BarChart3, Palette, RefreshCw, Lock, X, AlertTriangle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="text-gray-900">

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        {/* Background with multi-color gradient like Circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-200/30 via-blue-200/30 to-cyan-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-pink-200/20 via-orange-200/20 to-yellow-200/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 backdrop-blur px-3 md:px-4 py-1.5 text-xs md:text-sm mb-6 md:mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 animate-pulse" />
              <span className="text-gray-700 font-medium">Google Workspace & Microsoft 365</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 md:mb-6 leading-[1.1]">
              Email signatures
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                without the chaos
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">
              Deploy consistent, on-brand signatures to your entire team in seconds. 
              No more manual updates. No more rogue signatures.
            </p>
            
            {/* CTA Button */}
            <div className="flex items-center justify-center mb-10 md:mb-16">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 px-6 md:px-8 py-3.5 md:py-4 text-base font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40 transition-all active:scale-[0.98]"
              >
                Get started free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8 gap-y-3 text-xs md:text-sm text-gray-500 mb-10 md:mb-16 px-4">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-violet-600" />
                <span>Free plan available</span>
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
            <div className="relative mx-auto max-w-5xl px-2 md:px-0">
              {/* Mobile: Simplified signature preview card */}
              <div className="md:hidden">
                <div className="bg-white rounded-2xl shadow-2xl shadow-violet-500/20 border border-gray-200/50 p-6 mx-auto max-w-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">JD</div>
                    <div>
                      <div className="font-bold text-gray-900">John Doe</div>
                      <div className="text-sm text-gray-600">Marketing Director</div>
                      <div className="text-sm text-violet-600">john@company.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-6 h-6 rounded-full bg-blue-500" />
                    <div className="w-6 h-6 rounded-full bg-sky-400" />
                    <div className="w-6 h-6 rounded-full bg-pink-500" />
                    <div className="flex-1" />
                    <div className="h-8 px-4 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center">
                      <span className="text-white text-xs font-medium">Deploy</span>
                    </div>
                  </div>
                </div>
                {/* Mobile floating badges */}
                <div className="flex justify-center gap-3 mt-6">
                  <div className="bg-white rounded-full shadow-lg px-3 py-1.5 border border-gray-100 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-[8px] font-bold">SM</div>
                    <span className="text-xs text-gray-600">Sales</span>
                  </div>
                  <div className="bg-white rounded-full shadow-lg px-3 py-1.5 border border-gray-100 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[8px] font-bold">AK</div>
                    <span className="text-xs text-gray-600">Engineering</span>
                  </div>
                  <div className="bg-white rounded-full shadow-lg px-3 py-1.5 border border-gray-100 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-[8px] font-bold">JT</div>
                    <span className="text-xs text-gray-600">Support</span>
                  </div>
                </div>
              </div>

              {/* Desktop: Full editor mockup */}
              <div className="hidden md:block relative rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/10 border border-gray-200/50 bg-white">
                {/* Browser chrome mockup */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-500 text-center">
                      app.siggly.io/templates
                    </div>
                  </div>
                </div>
                {/* Screenshot placeholder - detailed mockup of the editor */}
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                  <div className="h-full rounded-xl border border-gray-200 bg-white shadow-sm flex overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-56 border-r border-gray-200 bg-gray-50/50 flex flex-col">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500" />
                          <div className="text-sm font-semibold text-gray-800">Siggly</div>
                        </div>
                      </div>
                      <div className="p-3 space-y-1 flex-1">
                        <div className="flex items-center gap-2 px-3 py-2 bg-violet-100 rounded-lg border border-violet-200">
                          <div className="w-4 h-4 rounded bg-violet-400" />
                          <span className="text-xs font-medium text-violet-700">Templates</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
                          <div className="w-4 h-4 rounded bg-gray-300" />
                          <span className="text-xs text-gray-600">Team</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
                          <div className="w-4 h-4 rounded bg-gray-300" />
                          <span className="text-xs text-gray-600">Deployments</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
                          <div className="w-4 h-4 rounded bg-gray-300" />
                          <span className="text-xs text-gray-600">Analytics</span>
                        </div>
                      </div>
                      <div className="p-3 border-t border-gray-200">
                        <div className="flex items-center gap-2 px-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400" />
                          <span className="text-xs text-gray-600">John D.</span>
                        </div>
                      </div>
                    </div>
                    {/* Main content - signature editor */}
                    <div className="flex-1 flex flex-col">
                      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-800">Marketing Team Signature</span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 px-3 bg-gray-100 rounded-lg flex items-center text-xs text-gray-600">Preview</div>
                          <div className="h-8 px-4 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg flex items-center text-xs text-white font-medium">Deploy</div>
                        </div>
                      </div>
                      <div className="flex-1 p-6 flex gap-6">
                        {/* Editor panel */}
                        <div className="w-48 space-y-3">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Blocks</div>
                          <div className="space-y-2">
                            <div className="p-2 bg-violet-50 border border-violet-200 rounded-lg text-xs text-violet-700 flex items-center gap-2">
                              <div className="w-4 h-4 rounded bg-violet-300" />
                              Profile Photo
                            </div>
                            <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700 flex items-center gap-2">
                              <div className="w-4 h-4 rounded bg-blue-300" />
                              Name & Title
                            </div>
                            <div className="p-2 bg-cyan-50 border border-cyan-200 rounded-lg text-xs text-cyan-700 flex items-center gap-2">
                              <div className="w-4 h-4 rounded bg-cyan-300" />
                              Contact Info
                            </div>
                          </div>
                        </div>
                        {/* Signature preview */}
                        <div className="flex-1 bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <div className="flex gap-4">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 flex items-center justify-center text-white font-bold text-lg">JD</div>
                              <div className="space-y-1">
                                <div className="font-semibold text-gray-900 text-sm">John Doe</div>
                                <div className="text-xs text-gray-600">Marketing Director</div>
                                <div className="text-xs text-blue-600">john@company.com</div>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-3">
                              <div className="flex-1" />
                              <div className="h-6 w-16 rounded bg-gradient-to-r from-violet-500 to-blue-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements - Department signatures */}
              <div className="absolute -left-4 top-[15%] bg-white rounded-xl shadow-xl p-3 border border-gray-100 hidden lg:block animate-float-slow">
                <div className="text-[10px] font-medium text-violet-600 mb-2 flex items-center gap-1">
                  <Building2 className="h-3 w-3" /> Sales Team
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-[10px] font-bold">SM</div>
                  <div>
                    <div className="text-[11px] font-semibold text-gray-900">Sarah Miller</div>
                    <div className="text-[9px] text-gray-500">Account Executive</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-8 top-[55%] bg-white rounded-xl shadow-xl p-3 border border-gray-100 hidden lg:block animate-float-medium">
                <div className="text-[10px] font-medium text-blue-600 mb-2 flex items-center gap-1">
                  <Building2 className="h-3 w-3" /> Engineering
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold">AK</div>
                  <div>
                    <div className="text-[11px] font-semibold text-gray-900">Alex Kim</div>
                    <div className="text-[9px] text-gray-500">Senior Developer</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-4 top-[20%] bg-white rounded-xl shadow-xl p-3 border border-gray-100 hidden lg:block animate-float-fast">
                <div className="text-[10px] font-medium text-cyan-600 mb-2 flex items-center gap-1">
                  <Building2 className="h-3 w-3" /> Support
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-[10px] font-bold">JT</div>
                  <div>
                    <div className="text-[11px] font-semibold text-gray-900">Jamie Torres</div>
                    <div className="text-[9px] text-gray-500">Support Lead</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-6 top-[50%] bg-white rounded-xl shadow-xl p-4 border border-gray-100 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">All Deployed!</div>
                    <div className="text-xs text-gray-500">3 departments • 47 users</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-8 bottom-[15%] bg-white rounded-xl shadow-xl p-4 border border-gray-100 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">One Admin</div>
                    <div className="text-xs text-gray-500">Manages all signatures</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & Social Proof */}
      <section className="py-20 border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Star rating highlight */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-full px-6 py-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-amber-700 font-semibold">4.9/5</span>
              <span className="text-amber-600">from 500+ companies</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Loved by teams worldwide</h3>
            <p className="text-gray-600">See why companies choose Siggly for their email signatures</p>
          </div>
          
          {/* Review cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <ReviewCard
              quote="Siggly saved us 10+ hours per month on signature management. The deployment is instant and our branding is finally consistent."
              author="Sarah Chen"
              role="Marketing Director"
              company="Acme Digital Corp"
              rating={5}
            />
            <ReviewCard
              quote="We switched from Exclaimer and couldn't be happier. Setup took 2 minutes instead of 2 days. The UI is beautiful."
              author="Michael Torres"
              role="IT Manager"
              company="Example Tech Solutions"
              rating={5}
            />
            <ReviewCard
              quote="The analytics feature is a game-changer. We can finally track which signature CTAs drive the most engagement."
              author="Emily Watson"
              role="Head of Operations"
              company="Demo Industries LLC"
              rating={5}
            />
          </div>

          {/* Company logos */}
          <div className="pt-8 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500 mb-6 font-medium">Trusted by teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50 grayscale">
              <div className="text-2xl font-bold text-gray-400">Stripe</div>
              <div className="text-2xl font-bold text-gray-400">Notion</div>
              <div className="text-2xl font-bold text-gray-400">Figma</div>
              <div className="text-2xl font-bold text-gray-400">Linear</div>
              <div className="text-2xl font-bold text-gray-400">Vercel</div>
            </div>
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
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Managing email signatures shouldn&apos;t be this hard
            </h2>
            <p className="text-lg text-gray-600">
              Stop wasting time on manual updates. Deploy consistent signatures to your entire team in seconds.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Problems */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">The Problem</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="h-4 w-4 text-gray-500" />
                    </div>
                    <span className="text-gray-700">Manual updates require chasing employees</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="h-4 w-4 text-gray-500" />
                    </div>
                    <span className="text-gray-700">Inconsistent branding across the organization</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="h-4 w-4 text-gray-500" />
                    </div>
                    <span className="text-gray-700">IT teams waste hours on support tickets</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="h-4 w-4 text-gray-500" />
                    </div>
                    <span className="text-gray-700">Can't enforce compliance or legal disclaimers</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="h-4 w-4 text-gray-500" />
                    </div>
                    <span className="text-gray-700">Outdated information stays in signatures</span>
                  </li>
                </ul>
              </div>
              
              {/* Solution */}
              <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl p-8 border-2 border-violet-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-violet-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">The Solution</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-violet-600" />
                    </div>
                    <span className="text-gray-700 font-medium">One-click deploy to everyone instantly</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-violet-600" />
                    </div>
                    <span className="text-gray-700 font-medium">100% consistent branding across all signatures</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-violet-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Zero IT overhead, marketing can self-serve</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-violet-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Automatic compliance and disclaimers by region</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-violet-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Always current with directory sync</span>
                  </li>
                </ul>
              </div>
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
              icon={<Shield className="h-5 w-5" />}
              title="Industry Compliance"
              description="Built-in compliance blocks for Legal, Healthcare, Finance, and Real Estate. Auto-populate bar numbers, NPI, CRD, and license info."
            />
            <FeatureCard
              icon={<Lock className="h-5 w-5" />}
              title="Security & Disclaimers"
              description="GDPR-ready disclaimers, HIPAA notices, and legal compliance templates. Protect your organization."
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
              <div className="flex items-center justify-center">
                <Link
                  href="/signup"
                  className="group inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-violet-600 shadow-lg hover:bg-gray-50 transition-all"
                >
                  Get started free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
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

function ReviewCard({
  quote,
  author,
  role,
  company,
  rating,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-700 mb-6 leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
          {author.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-sm">{author}</div>
          <div className="text-gray-500 text-xs">{role} at {company}</div>
        </div>
      </div>
    </div>
  );
}

function ComparisonItem({
  title,
  description,
  negative = false,
}: {
  title: string;
  description: string;
  negative?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
        negative ? 'bg-red-100' : 'bg-green-100'
      }`}>
        {negative ? (
          <X className="h-3.5 w-3.5 text-red-500" />
        ) : (
          <Check className="h-3.5 w-3.5 text-green-600" />
        )}
      </div>
      <div>
        <div className={`font-semibold text-sm ${negative ? 'text-red-700' : 'text-green-700'}`}>{title}</div>
        <div className={`text-xs ${negative ? 'text-red-600/70' : 'text-green-600/70'}`}>{description}</div>
      </div>
    </div>
  );
}
