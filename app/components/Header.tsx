import Link from 'next/link'
import {client} from '../../lib/sanity/client'
import {siteSettingsQuery} from '../../lib/sanity/queries'
import {urlFor} from '../../lib/sanity/image'

export default async function Header() {
  const site = await client.fetch(siteSettingsQuery)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center">
            {site?.logo?.asset?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={site.logo.asset.url} alt={site.title || 'logo'} className="h-10 w-auto object-contain" />
            ) : (
              <span className="text-lg font-semibold">{site?.title || 'Spa'}</span>
            )}
          </Link>
        </div>

        <nav>
          <ul className="flex items-center space-x-6 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/services" className="hover:underline">Services</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/blog" className="hover:underline">Blogs</Link></li>
            <li>
              <Link href="/book" className="px-4 py-2 bg-rose-600 text-white rounded-md">Book Now</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
