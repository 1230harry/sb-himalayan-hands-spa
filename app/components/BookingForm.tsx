"use client"
import { useState } from 'react'

export default function BookingForm({ services }: { services: any[] }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [serviceSlug, setServiceSlug] = useState(services?.[0]?.slug?.current || '')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    if (!name || !email || !serviceSlug || !date) {
      setMessage('Please fill required fields')
      return
    }

    setLoading(true)
    try {
      const isoDate = new Date(date).toISOString()
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, serviceSlug, date: isoDate, notes }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Booking failed')
      setMessage('Booking created — we will contact you shortly.')
      setName('')
      setEmail('')
      setNotes('')
    } catch (err: any) {
      setMessage(err.message || 'Server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl bg-white p-6 rounded shadow-sm">
      <div className="grid grid-cols-1 gap-4">
        <label className="flex flex-col">
          <span className="text-sm font-medium">Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 border rounded" required />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 border rounded" required />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Service</span>
          <select value={serviceSlug} onChange={(e) => setServiceSlug(e.target.value)} className="mt-1 p-2 border rounded">
            {services.map((s: any) => (
              <option key={s._id} value={s.slug.current}>{s.title}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Date & time</span>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 p-2 border rounded" required />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Notes (optional)</span>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 p-2 border rounded" rows={4} />
        </label>

        <div>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-rose-600 text-white rounded">
            {loading ? 'Booking…' : 'Book Appointment'}
          </button>
        </div>

        {message && <div className="mt-2 text-sm text-gray-700">{message}</div>}
      </div>
    </form>
  )
}
