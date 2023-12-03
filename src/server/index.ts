import { QueryValidator } from '../lib/Validation/QueryValidator'
import { authRoute } from './routes/auth-route'
import { publicProcedure, router } from './trpc'
import { z } from 'zod'
import { getPayloadClient } from '../lib/getPayloadClient'
export const appRouter = router({
  auth: authRoute,
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query:QueryValidator
      })
    )
    .query(async({ input }) => {
      const {limit,sort,...queryOp}= input.query
      const payload= await getPayloadClient()
      const {docs}=await payload.find({
        collection:"products",
        where:{
          approvedForSale:{
            equals:"approved"
          },
          
        },
        sort,
        depth:1,
        limit,
        page
      })
      return { limit }
    }),
})
export type AppRouter = typeof appRouter
