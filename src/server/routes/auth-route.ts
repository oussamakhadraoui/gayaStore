import { CredentialsType } from '../../lib/Validation/CredentialsType'
import { publicProcedure, router } from '../trpc'
import { getPayloadClient } from '../../lib/getPayloadClient'
import { TRPCClientError } from '@trpc/client'
import { TRPCError } from '@trpc/server'

export const authRoute = router({
  createPayloadUser: publicProcedure
    .input(CredentialsType)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input
      const payload = await getPayloadClient()
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })

      if (users.length !== 0) throw new TRPCError({ code: 'CONFLICT' })

      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'user',
        },
      })

      return { success: true, sentToEmail: email }
    }),
})
