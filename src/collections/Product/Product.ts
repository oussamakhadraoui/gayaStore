import { PRODUCT_GAT } from '../../config/index'
import { CollectionConfig } from 'payload/types'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {},
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Product details',
      type: 'textarea',
      required: true,
    },
    {
      name: 'price',
      label: 'Price in USD',
      type: 'number',
      max: 1000,
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: PRODUCT_GAT.map(({ label, value }) => ({
        label,
        value,
      })),
      required: true,
    },
    {
      name: 'product_files',
      label: 'Product file(s)',
      type: 'relationship',
      required: true,
      relationTo: 'product_files',
      hasMany: false,
    },
    {
      name: 'approvedForSale',
      label: 'Product Status',
      type: 'select',
      defaultValue: 'pending',
      access: {
        create: ({ req }) => {
          return req.user?.role === 'admin'
        },
        read: ({ req }) => {
          return req.user?.role === 'admin'
        },
        update: ({ req }) => {
          return req.user?.role === 'admin'
        },
      },
      options: [
        {
          label: 'Pending verification',
          value: 'pending',
        },
        {
          label: 'Approved',
          value: 'approved',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],
      required: true,
      hasMany: false,
    },
    {
      name: 'priceId',
      type: 'text',
      admin: {
        hidden: true,
      },

      access: {
        create: () => {
          return false
        },
        read: () => {
          return false
        },
        update: () => {
          return false
        },
      },
    },
    {
      name: 'stripeId',
      type: 'text',
      admin: {
        hidden: true,
      },

      access: {
        create: () => {
          return false
        },
        read: () => {
          return false
        },
        update: () => {
          return false
        },
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'product images',
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
}
