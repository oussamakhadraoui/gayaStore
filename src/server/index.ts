import { QueryValidator } from '../lib/Validation/QueryValidator'
import { authRoute } from './routes/auth-route'
import { publicProcedure, router } from './trpc'
import { z } from 'zod'
import { getPayloadClient } from '../lib/getPayloadClient'
import { paymentRouter } from './routes/payment-router'
export const appRouter = router({
  auth: authRoute,
  payment:paymentRouter,
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { limit, sort, ...queryOpts } = input.query
      const payload = await getPayloadClient()

      const parsedQueryOpts: Record<string, { equals: string }> = {}

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        }
      })

      const page = input.cursor || 1
      const { docs, hasNextPage, nextPage } = await payload.find({
        collection: 'products',
        where: {
          //u need to change tha pending to approved
          approvedForSale: {
            equals: 'pending',
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      })
      return { items: docs,nextPage: hasNextPage?nextPage:null }
    }),
})
export type AppRouter = typeof appRouter
