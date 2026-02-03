import type { MDXComponents } from 'mdx/types';
import { useMDXComponents as getBlogMDXComponents } from '@/components/blog/mdx-components';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getBlogMDXComponents(components);
}
