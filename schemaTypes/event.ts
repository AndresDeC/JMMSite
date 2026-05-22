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
    defineField({
      name: 'categoryColor',
      title: 'Categoría / Color',
      type: 'string',
      options: {
        list: [
          { title: 'Juventud Masculina (Azul)', value: 'cat-juventud' },
          { title: 'Familias (Verde)', value: 'cat-familias' },
          { title: 'Mujeres de Schoenstatt (Morado)', value: 'cat-mujeres' },
          { title: 'General / Comunidad (Dorado)', value: 'cat-general' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'cat-juventud',
    }),
    defineField({
      name: 'date',
      title: 'Fecha y hora de inicio',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Fecha y hora de término',
      type: 'datetime',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción corta (para hover)',
      type: 'string',
      description: 'Máx. 120 caracteres. Aparece en la tarjeta flotante del calendario.',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Link de registro (Google Forms)',
      type: 'url',
      description: 'URL del formulario de inscripción.',
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
      title: 'Descripción completa',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
      category: 'categoryColor',
    },
    prepare({ title, date, media, category }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : ''
      const categoryLabels: Record<string, string> = {
        'cat-juventud': '🔵 Juventud',
        'cat-familias': '🟢 Familias',
        'cat-mujeres': '🟣 Mujeres',
        'cat-general': '🟡 General',
      }
      return {
        title,
        subtitle: `${categoryLabels[category] ?? ''} · ${formattedDate}`,
        media,
      }
    },
  },
})
