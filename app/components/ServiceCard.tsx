import Link from 'next/link'
import {urlFor} from '../../lib/sanity/image'

export default function ServiceCard({service}: {service: any}) {
  const img = service?.image?.asset?.url

  return (
    <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      {img && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt={service.title} className="w-full h-44 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{service.title}</h3>
        {service.excerpt && <p className="mt-2 text-sm text-gray-600">{service.excerpt}</p>}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium">${service.price}</span>
          <Link href={`/services/${service.slug.current}`} className="text-rose-600 text-sm font-semibold">View</Link>
        </div>
      </div>
    </article>
  )
}
