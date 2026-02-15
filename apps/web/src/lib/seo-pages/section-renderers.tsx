import { CheckCircle, XCircle } from 'lucide-react';
import { resolveIcon } from './icon-map';
import type { SEOContentSection } from './types';

export function SectionRenderer({ section }: { section: SEOContentSection }) {
  switch (section.type) {
    case 'checklist':
      return <ChecklistSection {...section} />;
    case 'comparison-table':
      return <ComparisonTableSection {...section} />;
    case 'how-it-works':
      return <HowItWorksSection {...section} />;
    case 'benefits':
      return <BenefitsSection {...section} />;
    case 'prose':
      return <ProseSection {...section} />;
    case 'use-cases-grid':
      return <UseCasesGridSection {...section} />;
    default:
      return null;
  }
}

function ChecklistSection({
  title,
  items,
}: Extract<SEOContentSection, { type: 'checklist' }>) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl"
            >
              <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonTableSection({
  title,
  competitor,
  rows,
}: Extract<SEOContentSection, { type: 'comparison-table' }>) {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-900">
                  Feature
                </th>
                <th className="text-center p-4 font-semibold text-violet-700">
                  Siggly
                </th>
                <th className="text-center p-4 font-semibold text-gray-500">
                  {competitor}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={i < rows.length - 1 ? 'border-b border-gray-100' : ''}
                >
                  <td className="p-4 text-gray-700">{row.feature}</td>
                  <td className="p-4 text-center">
                    <CellValue value={row.siggly} positive />
                  </td>
                  <td className="p-4 text-center">
                    <CellValue value={row.competitor} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CellValue({
  value,
  positive,
}: {
  value: boolean | string;
  positive?: boolean;
}) {
  if (typeof value === 'boolean') {
    return value ? (
      <CheckCircle className="h-5 w-5 text-emerald-500 mx-auto" />
    ) : (
      <XCircle className="h-5 w-5 text-gray-300 mx-auto" />
    );
  }
  return (
    <span className={positive ? 'text-violet-700 font-medium' : 'text-gray-500'}>
      {value}
    </span>
  );
}

function HowItWorksSection({
  title,
  steps,
}: Extract<SEOContentSection, { type: 'how-it-works' }>) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-full bg-violet-100 text-violet-700 font-bold text-lg flex items-center justify-center mx-auto mb-4">
                {step.step}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection({
  title,
  items,
}: Extract<SEOContentSection, { type: 'benefits' }>) {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const Icon = resolveIcon(item.icon);
            return (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-violet-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProseSection({
  title,
  paragraphs,
}: Extract<SEOContentSection, { type: 'prose' }>) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-gray-600 leading-relaxed mb-4">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

function UseCasesGridSection({
  title,
  cases,
}: Extract<SEOContentSection, { type: 'use-cases-grid' }>) {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{c.title}</h3>
              <p className="text-gray-600 text-sm">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
