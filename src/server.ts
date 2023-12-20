import express from 'express'
import { getPayloadClient } from './lib/getPayloadClient'
import { nextAPP, nextHandler } from './next-utils'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from '../src/server/index'
import { inferAsyncReturnType } from '@trpc/server'
import bodyParser from 'body-parser'
import { IncomingMessage } from 'http'
import { stripewebhookHandler } from './components/webHookk'
const app = express()

const PORT = Number(process.env.PORT) || 3000
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
})
export type ExpressContext = inferAsyncReturnType<typeof createContext>
export type webhookRequest = IncomingMessage & { rawBody: Buffer }
const Start = async () => {
  const webHookMiddleware = bodyParser.json({
    verify: (req: webhookRequest, _, buffer) => {
      req.rawBody = buffer
    },
  })
  app.post('/api/webhooks/stripe',webHookMiddleware,stripewebhookHandler)
  const payload = await getPayloadClient({
    initOption: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info('admin url ' + cms.getAdminURL())
      },
    },
  })
  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  )
  app.use((req, res) => nextHandler(req, res)) ///the next server

  nextAPP.prepare().then(() => {
    payload.logger.info('NEXT.JS started')

    app.listen(PORT, async () => {
      payload.logger.info(`NEXT APP URL:${process.env.NEXT_PUBLIC_SERVER_URL}`)
    })
  })
}
Start()
