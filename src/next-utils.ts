import next from "next"

const PORT = Number(process.env.PORT)||3000


export const nextAPP= next({
 dev: process.env.NODE_ENV !== 'production',
 port: PORT
})

export const nextHandler = nextAPP.getRequestHandler()