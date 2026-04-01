import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Eventos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'date',
      type: 'datetime',
    }),
  ],
})