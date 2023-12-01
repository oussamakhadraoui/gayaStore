'use client'
import { trpc } from '@/app/_trpc/client'
import { XCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface VerifyEmailProps {
  token: string
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isError, isLoading } = trpc.auth.verifyEmail.useQuery({ token })

  if (isError) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <XCircle className='h-8 w-8 text-red-600' />
        <h3 className='font-semibold text-xl'>There was a Problem</h3>
        <p className='text-muted-foreground text-sm'>
        This Token is not valid or expired please try again.
        </p>
      </div>
    )
  }
  if(data?.success){
   return <div className='flex h-full flex-col items-center justify-center'>
    <div className='text-muted-foreground relative mb-4 h-60 '>

     <Image src={'/hippo-email-sent.png'} fill alt={'hippo email sent image'}/>
    </div>
   </div>
  }
  return <div>VerifyEmail</div>
}

export default VerifyEmail
