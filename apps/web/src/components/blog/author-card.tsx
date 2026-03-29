import Link from 'next/link';
import Image from 'next/image';
import { getAuthorBySlug } from '@/lib/authors';

interface AuthorCardProps {
  authorSlug: string;
}

export function AuthorCard({ authorSlug }: AuthorCardProps) {
  const author = getAuthorBySlug(authorSlug);
  if (!author) return null;

  return (
    <Link
      href={`/blog/author/${author.slug}`}
      className="inline-flex items-center gap-3 group"
    >
      <Image
        src={author.image}
        alt={author.name}
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
      <div className="text-sm">
        <p className="font-medium text-gray-900 group-hover:text-violet-700 transition-colors">
          {author.name}
        </p>
        <p className="text-gray-500">{author.title}</p>
      </div>
    </Link>
  );
}
