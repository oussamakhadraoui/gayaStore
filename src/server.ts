import express from 'express'
import { getPayloadClient } from './lib/getPayloadClient'
import { nextAPP, nextHandler } from './next-utils'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './server/index'
import { inferAsyncReturnType } from '@trpc/server'
import bodyParser from 'body-parser'
import { IncomingMessage } from 'http'
import { stripewebhookHandler } from './components/webHookk'
import nextBuild from "next/dist/build"
import path from 'path'
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
    if (process.env.NEXT_BUILD) {
      app.listen(PORT, async () => {
        payload.logger.info('Next.js is building for production')

        // @ts-expect-error
        await nextBuild(path.join(__dirname, '../'))

        process.exit()
      })

      return
    }
  app.use((req, res) => nextHandler(req, res)) ///the next server

  nextAPP.prepare().then(() => {
    payload.logger.info('NEXT.JS started')

    app.listen(PORT, async () => {
      payload.logger.info(`NEXT APP URL:${process.env.NEXT_PUBLIC_SERVER_URL}`)
    })
  })
}
Start()
