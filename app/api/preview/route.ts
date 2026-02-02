import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug') || '/'

  if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid preview secret' }, { status: 401 })
  }

  // enable draft mode (sets __prerender_bypass and __next_preview_data)
  const dm = await draftMode()
  if (dm && typeof dm.enable === 'function') dm.enable()

  return NextResponse.redirect(slug)
}
