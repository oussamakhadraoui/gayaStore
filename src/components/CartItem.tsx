import { Product } from '@/payload-types'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface CartItemProps {
  product: Product
}

const CartItem = ({ product }: CartItemProps) => {
  const { image } = product.images[0]
  return (
    <div className='space-y-3 py-2'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex items-center space-x-4'>
          <div className='relative aspect-square overflow-hidden rounded h-16 w-16 min-w-fit'>
            {typeof image !== 'string' && image.url ? (
              <Image
                src={image.url}
                alt={product.name}
                fill
                className='object-cover absolute'
              />
            ) : (
              <div className='flex h-full items-center justify-center bg-secondary'>
                <ImageIcon
                  className='h-4 w-4 text-muted-foreground'
                  aria-hidden='true'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
