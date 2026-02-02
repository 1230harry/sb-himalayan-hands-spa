import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', validation: (Rule) => Rule.max(300) }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'publishDate', title: 'Publish Date', type: 'datetime', validation: (Rule) => Rule.required() }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
  ],
})
