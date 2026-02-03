import Link from 'next/link';
import { Mail, ArrowLeft, Users, Shield, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'About Us | Siggly',
  description: 'Learn about Siggly - the modern email signature management platform for teams',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            About Siggly
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're on a mission to make email signatures simple, consistent, and beautiful for every team.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="prose prose-lg prose-gray max-w-none">
            <p>
              Email signatures might seem like a small detail, but they're one of the most visible parts of your brand. Every email your team sends is an opportunity to make a professional impression.
            </p>
            <p>
              We built Siggly because we saw teams struggling with inconsistent signatures, outdated information, and hours wasted on manual updates. IT admins were copying and pasting HTML. Marketing teams were frustrated by off-brand signatures. And employees just wanted something that worked.
            </p>
            <p>
              Siggly changes all of that. With our intuitive editor and seamless Google Workspace integration, you can design beautiful signatures once and deploy them to your entire team in seconds. No more chasing people to update their signatures. No more inconsistent branding.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Simplicity</h3>
              <p className="text-gray-600 text-sm">
                We believe powerful tools should be easy to use. No complexity, no learning curve.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Security</h3>
              <p className="text-gray-600 text-sm">
                Your data is precious. We use industry-leading security practices to keep it safe.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Team-First</h3>
              <p className="text-gray-600 text-sm">
                Built for teams of all sizes, from startups to enterprises.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Customer Love</h3>
              <p className="text-gray-600 text-sm">
                We're obsessed with making our customers successful and happy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of teams who trust Siggly for their email signatures.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">Start Free Trial</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
