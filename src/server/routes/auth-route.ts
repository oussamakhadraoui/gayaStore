import { CredentialsType } from '../../lib/Validation/CredentialsType'
import { publicProcedure, router } from '../trpc'
import { getPayloadClient } from '../../lib/getPayloadClient'
import { TRPCClientError } from '@trpc/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

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
  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input, ctx }) => {
      const { token } = input
      const payload = await getPayloadClient()
      const isVerfied = await payload.verifyEmail({
        token,
        collection: 'users',
      })
      if (!isVerfied) throw new TRPCError({ code: 'UNAUTHORIZED' })
      return { success: true }
    }),
  signIn: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { password, email } = input
      const payload = await getPayloadClient()
      try {
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },

          res: ctx.res,
        })
        return { success: true }
      } catch (error) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),
})
