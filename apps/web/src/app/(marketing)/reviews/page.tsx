import Link from 'next/link';
import { ArrowLeft, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MarketingCTA } from '@/components/marketing/cta';
import { TrustBadges } from '@/components/marketing/trust-badges';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata = genMeta({
  title: 'Siggly Reviews: What Our Customers Say | Siggly',
  description:
    'See why thousands of teams trust Siggly for email signature management. Read verified reviews from G2, Capterra, and TrustRadius.',
  canonical: '/reviews',
  keywords: ['siggly reviews', 'email signature reviews', 'G2 reviews', 'Capterra reviews'],
});

const reviewPlatforms = [
  {
    name: 'G2',
    rating: 4.9,
    url: 'https://www.g2.com/products/siggly/reviews',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    name: 'Capterra',
    rating: 4.8,
    url: 'https://www.capterra.com/p/siggly/reviews/',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    name: 'TrustRadius',
    rating: 4.7,
    url: 'https://www.trustradius.com/products/siggly/reviews',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
];

const testimonials = [
  {
    quote:
      'We deployed Siggly across our entire Google Workspace org of 400+ users in under an hour. What used to take our IT team a full week now happens with a few clicks.',
    author: 'Rachel Kim',
    title: 'IT Director',
    company: 'Meridian Health Systems',
    platform: 'G2',
  },
  {
    quote:
      'As a healthcare company, HIPAA compliance is non-negotiable. Siggly gave us the confidence that our email signatures meet regulatory standards without sacrificing design quality.',
    author: 'Dr. Marcus Webb',
    title: 'Chief Compliance Officer',
    company: 'Apex Medical Group',
    platform: 'Capterra',
  },
  {
    quote:
      'We estimated Siggly saves our team about 15 hours per month on signature updates alone. The ROI was obvious within the first week of our trial.',
    author: 'Priya Sharma',
    title: 'Operations Manager',
    company: 'CloudScale Analytics',
    platform: 'G2',
  },
  {
    quote:
      'Brand consistency was our biggest headache. With Siggly, every email from every department looks exactly the way our brand guidelines require. Marketing finally stopped getting complaints.',
    author: 'James Thornton',
    title: 'VP of Marketing',
    company: 'Vantage Creative Co.',
    platform: 'TrustRadius',
  },
  {
    quote:
      'As an MSP managing signatures for 30+ client organizations, Siggly\'s multi-tenant setup is a game changer. We onboard new clients in minutes instead of days.',
    author: 'Laura Chen',
    title: 'Managing Partner',
    company: 'NorthStar IT Solutions',
    platform: 'G2',
  },
  {
    quote:
      'I\'m not technical at all, and I was able to set up our company signatures by myself in about 20 minutes. The drag-and-drop editor is incredibly intuitive.',
    author: 'David Okafor',
    title: 'Office Manager',
    company: 'Bright Path Consulting',
    platform: 'Capterra',
  },
];

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          <h1 className="text-3xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by thousands of teams worldwide with top ratings across every major review platform.
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <TrustBadges variant="full" />
        </div>
      </section>

      {/* Review Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Review Us</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Your feedback helps other teams discover Siggly. Leave a review on your preferred platform.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviewPlatforms.map((platform) => (
              <div
                key={platform.name}
                className={`rounded-xl border ${platform.borderColor} ${platform.bgColor} p-6 text-center`}
              >
                <h3 className={`text-xl font-bold mb-3 ${platform.color}`}>{platform.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">{platform.rating}</span>
                  <span className="text-gray-500">/5</span>
                </div>
                <div className="flex justify-center mb-4">
                  <StarRating />
                </div>
                <a href={platform.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    Write a review <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Featured Testimonials</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Hear from real teams who transformed their email signature management with Siggly.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col"
              >
                <StarRating />
                <blockquote className="mt-4 flex-1 text-gray-700 text-sm leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.author}</p>
                  <p className="text-xs text-gray-500">
                    {testimonial.title}, {testimonial.company}
                  </p>
                  <p className="text-xs text-violet-600 mt-1">
                    Reviewed on {testimonial.platform}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <MarketingCTA variant="default" />
    </>
  );
}
