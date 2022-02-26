export default {
  name: 'record',
  title: 'Record',
  type: 'document',
  groups: [
    {
      name: 'data',
      title: 'Data'
    },
    {
      name: 'images',
      title: 'Images'
    },
  ],
  fieldsets: [
    {
      name: 'dimensions',
      title: 'Dimensions',
      options: {
        columns: 2,
      },
    }
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: (new Date()).toISOString(), // Set date automatically
      validation: Rule => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'singleImage',
      group: 'images',
      validation: Rule => Rule.required(),
    },
    {
      name: 'images',
      type: 'gallery',
      group: 'images'
    },
    {
      name: 'designer',
      type: 'reference',
      to: {type: 'designer'},
      group: 'data',
    },
    {
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'tag'},
        },
      ],
      group: 'data',
    },
    {
      name: 'typefaces',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'typeface'},
        },
      ],
      group: 'data',
    },
    {
      name: 'width',
      type: 'number',
      description: 'Width in millimetres',
      group: 'data',
      fieldset: 'dimensions',
    },
    {
      name: 'height',
      type: 'number',
      description: 'Height in millimetres',
      group: 'data',
      fieldset: 'dimensions',
    },
    {
      name: 'artworkDate',
      title: 'Artwork date',
      type: 'date',
      group: 'data',
    },
    {
      name: 'color',
      title: 'Predominant color',
      type: 'color',
      group: 'data',
    },
    {
      name: 'notes',
      type: 'blockContent',
      group: 'data',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },

  orderings: [
    {
      title: 'Artwork Date, New',
      name: 'artworkDateDesc',
      by: [
        {field: 'artworkDate', direction: 'desc'}
      ]
    },
    {
      title: 'Artwork Date, Old',
      name: 'artworkDateAsc',
      by: [
        {field: 'artworkDate', direction: 'asc'}
      ]
    },
    {
      title: 'Published At, New',
      name: 'publishedAtDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Published At, Old',
      name: 'publishedAtAsc',
      by: [
        {field: 'publishedAt', direction: 'asc'}
      ]
    },
  ]
}
