
import { PRODUCT_GAT } from '../../config/index'
import { CollectionConfig } from 'payload/types'
import { Product } from '../../payload-types'
import { BeforeChangeHook } from 'payload/dist/collections/config/types'
import { stripe } from '../../lib/stripe'
const addUser:BeforeChangeHook<Product> =async({req,data})=>{
const user = req.user
return { ...data, user: user?.id }
}
export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {},
  hooks: {
    beforeChange: [
      addUser,
      async (args) => {
        if (args.operation === 'create') {
          const data = args.data as Product
          const createProduct = await stripe.products.create({
            name: data.name,
            default_price_data: {
              currency: 'usd',
              unit_amount: data.price * 100,
            },
          })
          const update: Product = {
            ...data,
            priceId: createProduct.default_price as string,
            stripeId: createProduct.id,
          }
          return update
        } else if (args.operation === 'update') {
          const data = args.data as Product

          const updatedProduct = await stripe.products.update(data.stripeId!, {
            name: data.name,
            default_price: data.priceId!,
          })

          const updated: Product = {
            ...data,
            stripeId: updatedProduct.id,
            priceId: updatedProduct.default_price as string,
          }

          return updated
        }
      },
    ],
  },
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
