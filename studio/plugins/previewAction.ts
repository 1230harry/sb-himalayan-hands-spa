import { definePlugin } from 'sanity'

export default definePlugin({
  name: 'preview-action',
  document: {
    actions: (prevActions: any[], context: any) => {
      const previewAction = {
        label: 'Open Preview',
        icon: () => '🔍',
        async onHandle(actionContext?: any) {
          const ctx = actionContext ?? context
          const doc = ctx?.draft || ctx?.published || ctx?.document || ctx
          const slug = doc?.slug?.current || doc?.slug
          const type = doc?._type

          if (!slug) {
            // fallback: open site root
            window.open(process.env.NEXT_PUBLIC_SITE_URL || '/', '_blank')
            ctx?.onComplete?.()
            return
          }

          // build preview URL
          const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
          const previewSecret = process.env.SANITY_PREVIEW_SECRET
          let path = `/${slug}`
          if (type === 'blogPost' || type === 'post') path = `/blog/${slug}`
          if (type === 'service') path = `/services/${slug}`

          const url = `${base}/api/preview?secret=${previewSecret}&slug=${encodeURIComponent(path)}`
          window.open(url, '_blank')
          ctx?.onComplete?.()
        },
      }

      return [...prevActions, previewAction]
    },
  },
})