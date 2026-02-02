import Header from '../../app/components/Header'
import Hero from '../../app/components/Hero'
import { cookies } from 'next/headers'
import { getClientForPreview } from '../../lib/sanity/client'
import {siteSettingsQuery} from '../../lib/sanity/queries'
import PortableTextRenderer from '../../app/components/PortableTextRenderer'

export default async function AboutPage() {
  const cookiesStore = await cookies()
  const isPreview = !!cookiesStore.get('__prender_bypass') || !!cookiesStore.get('__next_preview_data') || !!cookiesStore.get('__prerender_bypass')
  const client = getClientForPreview(isPreview)
  const settings = await client.fetch(siteSettingsQuery)

  return (
    <main>
      <Header />
      <Hero />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold mb-6">About {settings?.title || 'Us'}</h1>
          {settings?.about ? (
            <div className="prose max-w-none text-gray-700">
              <PortableTextRenderer value={settings.about} />
            </div>
          ) : (
            <p className="text-lg text-gray-700">
              At {settings?.title || 'our spa'}, we specialize in restorative and
              therapeutic treatments designed to rebalance the body and calm the
              mind.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
