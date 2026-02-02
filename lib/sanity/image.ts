import imageUrlBuilder from '@sanity/image-url'
import type {ImageUrlBuilder} from '@sanity/image-url'
import {client} from './client'

let builder: ImageUrlBuilder | null = null

function getBuilder() {
  if (!builder) {
    // @ts-ignore
    builder = imageUrlBuilder(client)
  }
  return builder!
}

export function urlFor(source: any) {
  return getBuilder().image(source)
}
