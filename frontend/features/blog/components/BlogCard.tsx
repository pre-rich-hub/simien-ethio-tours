import Image from 'next/image'
import Link from 'next/link'
import { type Post } from '@/features/blog/types/blog.types'

export function PostCard({ post, wide }: { post: Post; wide?: boolean }) {
  return (
    <article className="group">
      <Link prefetch={false} href={`/blog/${post.slug}`} className="block">
        <div
          className={`relative overflow-hidden rounded-xl ${
            wide ? 'aspect-[16/10]' : 'aspect-[4/3]'
          }`}
        >
          <Image
            src={post.image || '/placeholder.svg'}
            alt={post.title}
            fill
            sizes={wide ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-5">
          <h3
            className={`mt-3 text-balance font-serif leading-[1.15] text-foreground transition-colors duration-300 group-hover:text-primary ${
              wide ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'
            }`}
          >
            {post.title}
          </h3>
          <p className="mt-3 max-w-[52ch] text-pretty text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </article>
  )
}
