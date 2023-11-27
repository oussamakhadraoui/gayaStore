import express from 'express'
import { getPayloadClient } from './lib/getPayloadClient'
import { nextAPP, nextHandler } from './next-utils'

const app = express()

const PORT = Number(process.env.PORT) || 3000

const Start = async () => {
  const payload = await getPayloadClient({
    initOption: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info('admin url ' + cms.getAdminURL())
      },
    },
  })
  app.use((req, res) => nextHandler(req, res))
  nextAPP.prepare().then(() => {
    payload.logger.info('NEXT.JS started')

    app.listen(PORT, async() => {
     payload.logger.info(`NEXT APP URL:${process.env.NEXT_PUBLIC_SERVER_URL}`)
    })
    // app.listen(PORT, () => {
    //   console.log(`> Ready on http://localhost:${PORT}`)
    // })
  
  })
}
Start()
