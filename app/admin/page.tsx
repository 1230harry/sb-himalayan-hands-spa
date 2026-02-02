import Header from '../../app/components/Header'

export default function AdminPage() {
  const studioLocal = '/studio'

  return (
    <main>
      <Header />
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-4">Admin / Sanity Studio</h1>
        <p className="mb-4 text-gray-700">Development instructions and quick links for content editing.</p>

        <div className="space-y-3">
          <div>
            <strong>Open Studio locally:</strong>
            <div className="mt-2 font-mono bg-gray-100 p-3 rounded">pnpm --filter studio dev</div>
          </div>

          <div>
            <strong>If Studio is mounted at:</strong>
            <div className="mt-2"><a href={studioLocal} className="text-rose-600">{studioLocal}</a></div>
          </div>

          <div>
            <strong>Preview drafts in the site:</strong>
            <div className="mt-2 text-gray-700">Run Studio locally and use the document preview action (or use the preview API).</div>
          </div>
        </div>
      </section>
    </main>
  )
}
