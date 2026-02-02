import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(req: Request) {
  const dm = await draftMode()
  if (dm && typeof dm.disable === 'function') dm.disable()
  return NextResponse.redirect('/')
}
