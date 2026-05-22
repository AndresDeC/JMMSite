import { defineField, defineType } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Eventos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    // Para expandir a más ramas en el futuro, descomentar este campo y agregar
    // las opciones correspondientes (cat-familias, cat-mujeres, cat-general):
    // defineField({
    //   name: 'categoryColor',
    //   title: 'Categoría / Color',
    //   type: 'string',
    //   options: {
    //     list: [
    //       { title: 'Juventud Masculina (Azul)', value: 'cat-juventud' },
    //     ],
    //     layout: 'dropdown',
    //   },
    //   initialValue: 'cat-juventud',
    // }),
    defineField({
      name: 'date',
      title: 'Fecha y hora',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Fecha y hora de término',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Lugar',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagen del evento',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
    },
    prepare({ title, date, media }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : ''
      return {
        title,
        subtitle: formattedDate,
        media,
      }
    },
  },
})
