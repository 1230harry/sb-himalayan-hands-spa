import Header from '../../../app/components/Header'
import { cookies } from 'next/headers'
import { getClientForPreview } from '../../../lib/sanity/client'
import {serviceBySlugQuery} from '../../../lib/sanity/queries'
import {urlFor} from '../../../lib/sanity/image'
import Link from 'next/link'
import PortableTextRenderer from '../../../app/components/PortableTextRenderer'

export default async function ServiceDetailPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const { slug } = await params as { slug: string }
  const cookiesStore = await cookies()
  const isPreview = !!cookiesStore.get('__prerender_bypass') || !!cookiesStore.get('__next_preview_data')
  const client = getClientForPreview(isPreview)
  const service = await client.fetch(serviceBySlugQuery, { slug })

  if (!service) {
    return (
      <main>
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-12">Service not found.</div>
      </main>
    )
  }

  const img = service?.image?.asset?.url

  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{service.title}</h1>
            {service.excerpt && <p className="mt-4 text-gray-700">{service.excerpt}</p>}

            {service.body && (
              <div className="mt-6 prose max-w-none">
                {/* Render portable text */}
                {/* @ts-ignore */}
                <PortableTextRenderer value={service.body} />
              </div>
            )}
          </div>

          <aside className="w-full lg:w-80">
            {img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img} alt={service.title} className="w-full h-64 object-cover rounded-md" />
            )}
            <div className="mt-4">
              <div className="text-lg font-semibold">Price: ${service.price}</div>
              <div className="text-sm text-gray-600">Duration: {service.duration} minutes</div>
              <Link href="/book" className="block mt-4 px-4 py-2 bg-rose-600 text-white rounded">Book Now</Link>
            </div>
          </aside>
        </div>

        <div className="mt-8">
          <Link href="/services" className="text-sm text-gray-600">← Back to services</Link>
        </div>
      </div>
    </main>
  )
}
