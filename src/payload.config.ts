import { buildConfig } from 'payload/config'
import { slateEditor } from '@payloadcms/richtext-slate'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import path from 'path'
import { Users } from './collections/User'
import dotenv from 'dotenv'
import { Products } from './collections/Product/Product'
import { Media } from './collections/Media'
import { ProductFiles } from './collections/ProductFile'
import { Orders } from './collections/Orders'
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})
export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Users, Products, Media, ProductFiles, Orders],
  routes: {
    admin: '/sell',
  },
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- GAYA Selling',
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg',
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),

  db: mongooseAdapter({ url: process.env.MONGODB_URL! }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
