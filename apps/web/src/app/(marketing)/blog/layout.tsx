import { BlogFAQOverride } from '@/components/seo/blog-faq-override';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BlogFAQOverride />
    </>
  );
}
