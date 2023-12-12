import Stripe from 'stripe'

export const stripe =new Stripe(process.env.STRIPESECRET??"",{
 apiVersion:"2023-10-16",
 typescript:true,

})