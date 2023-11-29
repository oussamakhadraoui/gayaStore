import { publicProcedure, router } from './trpc'

export const appRouter = router({
  getTodos: publicProcedure.query(({ ctx }) => {
    return 'hello word'
  }),
})
export type AppRouter = typeof appRouter
