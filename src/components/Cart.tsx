'use client'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { ShoppingCartIcon } from 'lucide-react'
import { Separator } from './ui/separator'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import Image from 'next/image'

interface CartProps {}

const Cart = ({}: CartProps) => {
  const itemsCount = 0
  const fee = 1
  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <ShoppingCartIcon
          className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
          aria-hidden='true'
        />
        <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
          0
        </span>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-6'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>crt(0)</SheetTitle>
        </SheetHeader>
        {itemsCount > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6'>cart Items</div>
            <div className='space-y-4 pr-6'>
              <Separator />
              <div className='space-y-1.5 text-sm'>
                <div className='flex '>
                  <span className='flex-1'>shipping</span>
                  <span>free</span>
                </div>
                <div className='flex '>
                  <span className='flex-1'>transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className='flex '>
                  <span className='flex-1'>Total</span>
                  <span>{formatPrice(fee)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href={'/cart'}
                    className={buttonVariants({ className: 'w-full' })}
                  >
                    continue to check out
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div
              aria-hidden='true'
              className='relative mb-4 h-60 w-60 text-muted-foreground'
            >
              <Image src={'/hippo-empty-cart.png'} alt='empty cart' fill />
            </div>
            <div className='text-xl font-semibold '>Your Cart Is Empty</div>
            <SheetTrigger asChild>
              <Link
                className={buttonVariants({
                  variant: 'ghost',
                  className: 'text-sm text-muted-foreground',
                  size:'sm',
                })}
                href={'/product'}
              >
                Add Items To Your Card To Checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Cart
