import { generateFAQSchema } from '@/lib/seo';
import { JsonLd } from './json-ld';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  faqs: FAQ[];
  className?: string;
}

export function FAQSection({ 
  title = 'Frequently Asked Questions',
  description,
  faqs,
  className = '',
}: FAQSectionProps) {
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <JsonLd data={generateFAQSchema(faqs)} />
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-gray-600 text-lg">{description}</p>
          )}
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                <span className="pr-4">{faq.question}</span>
                <span className="shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
