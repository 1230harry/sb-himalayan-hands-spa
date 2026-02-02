import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (Rule) => Rule.required().email() }),
    defineField({ name: 'service', title: 'Service', type: 'reference', to: [{ type: 'service' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'date', title: 'Requested Date', type: 'datetime', validation: (Rule) => Rule.required() }),
    defineField({ name: 'notes', title: 'Notes', type: 'text' }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['pending', 'confirmed', 'cancelled'] }, initialValue: 'pending' }),
  ],
})
