import { PRODUCT_GAT } from '@/config'
import { useCart } from '@/hook/useCart'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/payload-types'
import { ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface CartItemProps {
  product: Product
}

const CartItem = ({ product }: CartItemProps) => {
  const label = PRODUCT_GAT.find(
    (value) => value.value === product.category
  )?.label
  const {removeItem}= useCart()
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
          <div className='flex flex-col self-start'>
            <span className='line-clamp-1 text-sm font-medium mb-1'>
              {product.name}
            </span>
            <span className='line-clamp-1 text-xs capitalize text-muted-foreground'>
              {label}
            </span>
            <div className='mt-4 text-xs text-muted-foreground'>
              <button className='flex items-center' onClick={()=>removeItem(product.id)}>
                <X className='w-3 h-3' /> Remove
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col space-y-1 font-medium'>
         <span className='ml-auto line line-clamp-1 text-sm'>
          {formatPrice(product.price)}
         </span>
        </div>
      </div>
    </div>
  )
}

export default CartItem
