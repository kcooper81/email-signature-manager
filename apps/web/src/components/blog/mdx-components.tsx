import Image from 'next/image';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mb-3 mt-6">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    a: ({ href, children }) => (
      <Link href={href || '#'} className="text-violet-600 hover:text-violet-800 underline">
        {children}
      </Link>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-violet-500 pl-4 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-violet-700">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    img: ({ src, alt }) => (
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-xl my-6"
      />
    ),
    hr: () => <hr className="my-8 border-gray-200" />,
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 bg-gray-50 text-left text-sm font-semibold text-gray-900">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
        {children}
      </td>
    ),
    ...components,
  };
}

// Blog-specific components
export function BlogCallout({ 
  type = 'info', 
  children 
}: { 
  type?: 'info' | 'warning' | 'tip'; 
  children: React.ReactNode;
}) {
  const styles = {
    info: 'bg-blue-50 border-blue-500 text-blue-800',
    warning: 'bg-amber-50 border-amber-500 text-amber-800',
    tip: 'bg-green-50 border-green-500 text-green-800',
  };

  return (
    <div className={`border-l-4 p-4 my-6 rounded-r-lg ${styles[type]}`}>
      {children}
    </div>
  );
}

export function BlogImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={450}
        className="rounded-xl w-full"
      />
      {caption && (
        <figcaption className="text-center text-sm text-gray-500 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
