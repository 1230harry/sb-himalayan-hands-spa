import { NextResponse } from 'next/server'
import { getServerClient } from '../../../lib/sanity/client'
import { serviceBySlugQuery } from '../../../lib/sanity/queries'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, serviceSlug, date, notes } = body

    if (!name || !email || !serviceSlug || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const client = getServerClient()

    // Resolve service by slug
    const service = await client.fetch(serviceBySlugQuery, { slug: serviceSlug })
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    const bookingDoc: any = {
      _type: 'booking',
      name,
      email,
      service: { _type: 'reference', _ref: service._id },
      date,
      notes: notes || '',
      status: 'pending',
    }

    const created = await client.create(bookingDoc)

    return NextResponse.json({ ok: true, id: created._id }, { status: 201 })
  } catch (err: any) {
    console.error('Booking API error:', err)
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}
