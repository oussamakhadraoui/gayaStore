import { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Verify Account</a>`
      },
    },
  },
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: 'role',
      // admin:{
      // condition: ({req}) => req.user?.role === "admin",
      // },
      required: true,
      defaultValue: 'user',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
  ],
}
