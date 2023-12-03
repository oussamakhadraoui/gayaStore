
import { appRouter } from '../../../../server/index'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    //@ts-expect-error from express middleware
    createContext: () => ({}),
  })

export { handler as GET, handler as POST }


