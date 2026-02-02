import {client} from '../../lib/sanity/client'
import {siteSettingsQuery} from '../../lib/sanity/queries'

export default async function Hero() {
  const site = await client.fetch(siteSettingsQuery)
  const hero = site?.hero || {}

  return (
    <section className="w-full">
      <div className="relative bg-gray-50">
        {hero.backgroundImage?.asset?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero.backgroundImage.asset.url} alt={hero.heading || ''} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">{hero.heading || 'Welcome'}</h1>
          {hero.subheading && <p className="mt-4 text-lg text-gray-700 max-w-2xl">{hero.subheading}</p>}
        </div>
      </div>
    </section>
  )
}
