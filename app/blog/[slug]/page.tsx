import Image from 'next/image'
import Header from '../../../app/components/Header'
import Hero from '../../../app/components/Hero'
import { cookies } from 'next/headers'
import { getClientForPreview } from '../../../lib/sanity/client'
import {blogBySlugQuery} from '../../../lib/sanity/queries'
import PortableTextRenderer from '../../../app/components/PortableTextRenderer'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const cookiesStore = await cookies()
  const isPreview = !!cookiesStore.get('__prerender_bypass') || !!cookiesStore.get('__next_preview_data')
  const client = getClientForPreview(isPreview)
  const post = await client.fetch(blogBySlugQuery, { slug })

  if (!post) {
    return (
      <main>
        <Header />
        <Hero />
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-bold">Post not found</h1>
        </section>
      </main>
    )
  }

  return (
    <main>
      <Header />
      <Hero />

      <article className="max-w-3xl mx-auto px-6 py-12">
        {post.coverImage?.asset?.url && (
          <div className="w-full h-64 relative mb-6 rounded overflow-hidden">
            <Image src={post.coverImage.asset.url} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-6">{post.excerpt}</p>
        <div className="prose max-w-none">
          <PortableTextRenderer value={post.body} />
        </div>
      </article>
    </main>
  )
}
