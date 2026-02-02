import Header from '../../app/components/Header'
import Hero from '../../app/components/Hero'
import {client} from '../../lib/sanity/client'
import {siteSettingsQuery} from '../../lib/sanity/queries'

export default async function ContactPage() {
  const settings = await client.fetch(siteSettingsQuery)
  const contact = settings?.contact || {}

  return (
    <main>
      <Header />
      <Hero />

      <section className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <div className="space-y-3 text-gray-700">
          <div>
            <strong>Email:</strong> <a href={`mailto:${contact.email}`} className="text-rose-600">{contact.email}</a>
          </div>
          <div>
            <strong>Phone:</strong> <a href={`tel:${contact.phone}`} className="text-rose-600">{contact.phone}</a>
          </div>
          <div>
            <strong>Address:</strong>
            <div>{contact.address}</div>
          </div>
        </div>
      </section>
    </main>
  )
}
