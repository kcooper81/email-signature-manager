import Link from 'next/link';
import { ArrowRight, Mail, Users, Zap, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl">Siggly</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-6 bg-white">
          <span className="text-primary">✨ New</span>
          <span className="ml-2 text-muted-foreground">Google Workspace & Microsoft 365 support</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
          Signatures,
          <br />
          <span className="text-primary">simplified.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Deploy professional email signatures to your entire team in seconds.
          One signature, every inbox.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-md border bg-white px-6 py-3 text-base font-medium text-foreground shadow-sm hover:bg-slate-50 transition-colors"
          >
            View Demo
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
          <p className="text-muted-foreground text-lg">
            Powerful features to manage signatures at scale
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Mail className="h-6 w-6" />}
            title="Visual Editor"
            description="Drag-and-drop signature builder with live preview. No HTML knowledge required."
          />
          <FeatureCard
            icon={<Users className="h-6 w-6" />}
            title="Team Management"
            description="Assign signatures by user, department, or role. Sync with your directory."
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="One-Click Deploy"
            description="Push signatures to all users instantly via Google Workspace or Microsoft 365."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="Brand Compliance"
            description="Lock down signature elements. Ensure consistent branding across your org."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-primary rounded-2xl p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of teams who trust Siggly for their email signature management.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-primary shadow-lg hover:bg-slate-50 transition-colors"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">Siggly</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Siggly. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
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
    <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
