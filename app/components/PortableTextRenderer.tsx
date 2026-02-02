"use client"
import {PortableText} from '@portabletext/react'
import {urlFor} from '../../lib/sanity/image'
import Image from 'next/image'

export default function PortableTextRenderer({value}: {value: any}) {
  if (!value) return null

  const components = {
    types: {
      image: ({value: v}: any) => {
        const src = v?.asset?.url
        if (!src) return null
        return (
          // use next/image for optimization
          <div className="my-4">
            <img src={src} alt={v.alt || 'image'} className="w-full object-cover rounded" />
          </div>
        )
      },
    },
    marks: {
      link: ({children, value: v}: any) => {
        const href = v?.href || '#'
        return (
          <a href={href} target={v?.blank ? '_blank' : '_self'} rel={v?.blank ? 'noopener noreferrer' : undefined} className="text-rose-600 underline">
            {children}
          </a>
        )
      },
    },
    block: {
      h1: ({children}: any) => <h1 className="text-3xl font-bold">{children}</h1>,
      h2: ({children}: any) => <h2 className="text-2xl font-semibold">{children}</h2>,
      normal: ({children}: any) => <p className="text-base text-gray-700">{children}</p>,
    },
  }

  return <PortableText value={value} components={components} />
}
