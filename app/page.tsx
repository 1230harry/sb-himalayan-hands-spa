import Header from './components/Header'
import Hero from './components/Hero'
import ServiceCard from './components/ServiceCard'
import Link from 'next/link'
import Image from 'next/image'
import PortableTextRenderer from './components/PortableTextRenderer'
import {cookies} from 'next/headers'
import {getClientForPreview} from '../lib/sanity/client'
import {siteSettingsQuery, allServicesQuery, blogListQuery} from '../lib/sanity/queries'

export default async function Home() {
  const cookiesStore = await cookies()
  const isPreview = !!cookiesStore.get('__prerender_bypass') || !!cookiesStore.get('__next_preview_data')
  const client = getClientForPreview(isPreview)

  const [settings, services, posts] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(allServicesQuery),
    client.fetch(blogListQuery),
  ])

  const featured = (services || []).filter((s: any) => s.featured).slice(0, 6)
  const latest = (posts || []).slice(0, 3)

  return (
    <main>
      <Header />
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Our Featured Services</h2>
          <Link href="/services" className="text-sm text-rose-600">View all services</Link>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.length ? featured.map((s: any) => (
            <ServiceCard key={s._id} service={s} />
          )) : (services || []).slice(0,6).map((s: any) => (
            <ServiceCard key={s._id} service={s} />
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold">Latest from the blog</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {latest.map((p: any) => (
              <article key={p._id} className="border rounded-lg overflow-hidden">
                {p.coverImage?.asset?.url ? (
                  <div className="w-full h-40 relative">
                    <Image src={p.coverImage.asset.url} alt={p.title} fill className="object-cover" />
                  </div>
                ) : null}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  {p.excerpt && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{p.excerpt}</p>}
                  <div className="mt-4">
                    <Link href={`/blog/${p.slug.current}`} className="text-rose-600 text-sm font-semibold">Read post</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold">About {settings?.title || 'Us'}</h2>
            <div className="mt-4 text-gray-700">
              {settings?.about ? (
                <div className="prose max-w-none">
                  {/* @ts-ignore */}
                  <PortableTextRenderer value={settings.about} />
                </div>
              ) : (
                <p>We offer therapeutic treatments designed to restore balance and relaxation.</p>
              )}
            </div>
            <div className="mt-6">
              <Link href="/about" className="px-4 py-2 bg-rose-600 text-white rounded">Learn more</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="mt-2 text-gray-700">{settings?.contact?.phone}</p>
            <p className="text-gray-700">{settings?.contact?.email}</p>
            <div className="mt-4">
              <Link href="/contact" className="text-rose-600">Get in touch</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}



