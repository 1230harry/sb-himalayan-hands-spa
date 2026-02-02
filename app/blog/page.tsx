import Link from 'next/link'
import Image from 'next/image'
import Header from '../../app/components/Header'
import Hero from '../../app/components/Hero'
import { cookies } from 'next/headers'
import { getClientForPreview } from '../../lib/sanity/client'
import {blogListQuery} from '../../lib/sanity/queries'

export default async function BlogPage() {
  const cookiesStore = await cookies()
  const isPreview = !!cookiesStore.get('__prerender_bypass') || !!cookiesStore.get('__next_preview_data')
  const client = getClientForPreview(isPreview)
  const posts = await client.fetch(blogListQuery)

  return (
    <main>
      <Header />
      <Hero />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((p: any) => (
            <article key={p._id} className="border rounded p-4 hover:shadow-md transition-shadow">
              {p.coverImage?.asset?.url && (
                <div className="w-full h-40 relative mb-3 rounded overflow-hidden">
                  <Image src={p.coverImage.asset.url} alt={p.title} fill className="object-cover" />
                </div>
              )}
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-gray-600 mt-2 line-clamp-3">{p.excerpt}</p>
              <Link href={`/blog/${p.slug.current}`} className="mt-3 inline-block text-rose-600">Read more</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
