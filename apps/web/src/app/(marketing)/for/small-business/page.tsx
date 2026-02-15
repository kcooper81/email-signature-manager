import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowRight, Briefcase, Clock, DollarSign, Smile, CheckCircle, Zap, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Email Signatures for Small Business | Siggly',
  description: 'Professional email signatures for small teams. Easy setup, affordable pricing, and no technical skills required.',
};

const painPoints = [
  {
    icon: Briefcase,
    title: 'Look unprofessional',
    description: 'Inconsistent signatures make your small team look disorganized to clients.',
  },
  {
    icon: Clock,
    title: 'No time to set up',
    description: 'You\'re busy running a business. Who has time to design HTML signatures?',
  },
  {
    icon: DollarSign,
    title: 'Enterprise tools are expensive',
    description: 'Most signature software starts at $2-4/user. That adds up fast.',
  },
  {
    icon: Smile,
    title: 'Too complicated',
    description: 'You just want nice signatures, not a complex IT project.',
  },
];

const features = [
  {
    icon: Zap,
    title: '5-Minute Setup',
    description: 'Connect your email, pick a template, and you\'re done. No technical skills needed.',
  },
  {
    icon: DollarSign,
    title: 'Free for Small Teams',
    description: 'Up to 5 team members free forever. Paid plans start at just $1.50/user/month.',
  },
  {
    icon: Heart,
    title: 'Beautiful Templates',
    description: 'Professional designs that make your small business look like a big one.',
  },
  {
    icon: CheckCircle,
    title: 'Works Everywhere',
    description: 'Gmail, Outlook, Apple Mail—your signatures look great on any device.',
  },
];

const testimonials = [
  {
    quote: "Finally, our team looks professional without spending hours on setup.",
    name: "David Park",
    role: "Owner, Park Consulting",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "The free plan is perfect for our 4-person startup. We'll upgrade when we grow.",
    name: "Emily Rodriguez",
    role: "Co-founder, Bloom Studio",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "I set up signatures for my whole team in 10 minutes. Incredible.",
    name: "James Wilson",
    role: "CEO, Wilson & Co",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
];

const pricingComparison = [
  { competitor: 'CodeTwo', price: '$2.00/user', siggly: '$1.50/user', savings: '25%' },
  { competitor: 'Exclaimer', price: '$2-3/user', siggly: '$1.50/user', savings: '50%' },
  { competitor: 'WiseStamp', price: '$4.00/user', siggly: '$1.50/user', savings: '63%' },
];

export default function SmallBusinessPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm mb-6">
                <Briefcase className="h-4 w-4" />
                Perfect for Small Teams
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Professional Email Signatures for Small Business
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Look like a Fortune 500 company without the Fortune 500 budget. 
                Beautiful signatures, easy setup, affordable pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                    Start Free (No Card Required) <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Free for up to 5 team members • Setup in 5 minutes
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop"
                alt="Small business team"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-medium">JD</div>
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">SM</div>
                    <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-medium">AK</div>
                  </div>
                  <span className="text-sm text-gray-600">Team signatures ready!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">We get it. You're busy.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Running a small business is hard enough. Email signatures shouldn't be 
              another headache.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {painPoints.map((point) => (
              <div key={point.title} className="text-center">
                <div className="h-16 w-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <point.icon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-semibold mb-2">{point.title}</h3>
                <p className="text-sm text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Siggly makes it simple</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              Professional signatures for your whole team in minutes, not hours.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-emerald-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Save up to 63% vs competitors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enterprise signature tools charge enterprise prices. 
              Siggly gives you the same features at a fraction of the cost.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Competitor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Their Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Siggly Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">You Save</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pricingComparison.map((row) => (
                  <tr key={row.competitor}>
                    <td className="px-6 py-4 text-sm">{row.competitor}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 line-through">{row.price}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">{row.siggly}</td>
                    <td className="px-6 py-4">
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded">
                        {row.savings} less
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Plus, our Free plan supports up to 5 users—forever free!
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Get started in 3 steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Connect your email</h3>
              <p className="text-sm text-gray-600">
                One-click connection to Google Workspace or Microsoft 365.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Pick a template</h3>
              <p className="text-sm text-gray-600">
                Choose from beautiful, professional designs. Customize with your brand.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Deploy to your team</h3>
              <p className="text-sm text-gray-600">
                Push signatures to everyone with one click. Done!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Loved by small businesses</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to look more professional?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of small businesses using Siggly. 
            Free for teams up to 5 people.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

    </>
  );
}
