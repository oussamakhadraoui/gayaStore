import { authRoute } from './routes/auth-route'
import { publicProcedure, router } from './trpc'

export const appRouter = router({
  auth: authRoute,
})
export type AppRouter = typeof appRouter
