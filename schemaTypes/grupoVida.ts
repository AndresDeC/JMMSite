import { defineField, defineType } from 'sanity'

export const grupoVidaType = defineType({
  name: 'grupoVida',
  title: 'Grupos de Vida',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Grupo',
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
      name: 'tagline',
      title: 'Lema / Descripción corta',
      type: 'string',
      description: 'Aparece en la tarjeta de presentación. Máx. 140 caracteres.',
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'patron',
      title: 'Patrono / Referencia espiritual',
      type: 'string',
    }),
    defineField({
      name: 'meetingInfo',
      title: 'Información de reuniones',
      type: 'string',
      description: 'Ej. "Martes 8 PM en la Casa JM".',
    }),
    defineField({
      name: 'leaders',
      title: 'Líderes / Coordinadores',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'body',
      title: 'Descripción completa',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              title: 'Pie de foto',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'mainImage',
    },
  },
})
