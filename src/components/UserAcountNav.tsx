'use client'

import React from 'react'
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { User } from '@/payload-types'
import Link from 'next/link'
import { useAuth } from '@/hook/use-auth'

interface UserAcountNavProps {
 user:User
}

const UserAcountNav = ({user}: UserAcountNavProps) => {
 const{signOut} = useAuth()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='overflow-visible' asChild>
        <Button variant={'ghost'} size={'sm'} className='relative'>
          my account
        </Button>
        <DropdownMenuContent className='bg-white w-60 ' align='end'>
          <div className='flex items-center justify-start gap-2 p-2'>
            <div className='flex flex-col space-y-0.5 leading-none'>
              <p className='font-medium text-sm text-black'>{user?.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator/>
          <DropdownMenuItem asChild>
            <Link href='/sell'>Seller Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={signOut} className='cursor-pointer'>
            Log Out
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}

export default UserAcountNav
