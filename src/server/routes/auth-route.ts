import { CredentialsType } from "@/lib/Validation/CredentialsType";
import { publicProcedure, router } from "../trpc";
import { getPayloadClient } from "@/lib/getPayloadClient";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

export const authRoute = router({
  createPayloadUser: publicProcedure.input(CredentialsType).mutation(async ({ input, ctx }) => {
    const { email, password } = input
  const payload = await getPayloadClient()
  const{docs}= await payload.find({
    collection: "users",
    where: {
      email:{
        equals: email
      },
      password:{
       equals:password
      }
    },
    limit: 1
  })

  if(docs.length>0){
    throw new TRPCError({
      code: "CONFLICT",
      cause: new TRPCClientError("User Already Exists"),
      message: "User Already Exists",
    })
  
  }
  await payload.create({
   collection:"users",
   data:{
    email,
    password
   }
  })
  }),
})