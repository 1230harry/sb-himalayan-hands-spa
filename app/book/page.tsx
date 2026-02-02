import Header from '../components/Header'
import Hero from '../components/Hero'
import BookingForm from '../components/BookingForm'
import { client } from '../../lib/sanity/client'
import { allServicesQuery } from '../../lib/sanity/queries'

export default async function BookPage() {
  const services = await client.fetch(allServicesQuery)

  return (
    <main>
      <Header />
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-bold">Book an Appointment</h2>
            <p className="mt-2 text-gray-600">Choose a service and select a convenient date and time.</p>
            <div className="mt-6">
              <BookingForm services={services} />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="text-lg font-semibold">Contact</h3>
              <p className="mt-2 text-sm text-gray-600">Email: info@himalayanhealing.com</p>
              <p className="text-sm text-gray-600">Phone: +1 (555) 123-4567</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
