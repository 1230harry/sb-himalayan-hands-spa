import Header from '../../app/components/Header'
import Hero from '../../app/components/Hero'
import ServiceCard from '../../app/components/ServiceCard'
import { cookies } from 'next/headers'
import { getClientForPreview } from '../../lib/sanity/client'
import {allServicesQuery} from '../../lib/sanity/queries'

export default async function ServicesPage() {
  const cookiesStore = await cookies()
  const isPreview = !!cookiesStore.get('__prerender_bypass') || !!cookiesStore.get('__next_preview_data')
  const client = getClientForPreview(isPreview)
  const services = await client.fetch(allServicesQuery)

  return (
    <main>
      <Header />
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold">Our Services</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s: any) => (
            <ServiceCard key={s._id} service={s} />
          ))}
        </div>
      </section>
    </main>
  )
}
