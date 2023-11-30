import dotenv from 'dotenv'
import path from 'path'
import payload, { Payload } from 'payload'
import type { InitOptions } from 'payload/config'
import nodemailer from 'nodemailer'
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})
console.log(process.env.RESEND_API_KEY)
const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY,
  },
})

let cashed = (global as any).payload
if (!cashed) {
  cashed = (global as any).payload = {
    client: null,
    promise: null,
  }
}
interface Option {
  initOption?: Partial<InitOptions>
}
export const getPayloadClient = async ({ initOption }: Option = {}):Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is not defined')
  }
  if(cashed.client){
   return cashed.client
  }
  if(!cashed.promise){
  cashed.promise = payload.init({
    email: {
      transport: transporter,
      fromAddress: 'black0velta@gmail.com',
      fromName: 'DigitalHippo',
    },
    secret: process.env.PAYLOAD_SECRET,
    local: initOption?.express ? false : true,
    ...(initOption || {}),
  })
  }
try {
 cashed.client= await cashed.promise

} catch (error:unknown) {
 cashed.promise =null
 throw error
}
return cashed.client
}
