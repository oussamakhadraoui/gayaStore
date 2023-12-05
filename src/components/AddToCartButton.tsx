'use client'
import { Product } from '@/payload-types'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useCart } from '@/hook/useCart'

interface AddToCartButtonProps {
  product: Product
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const { addItem } = useCart()
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [isSuccess])
  return (
    <Button
      onClick={() => {
        addItem(product)
        setIsSuccess(true)
      }}
      size={'lg'}
      className='w-full'
    >
      {isSuccess ? 'added to cart!!' : 'Add to cart'}
    </Button>
  )
}

export default AddToCartButton
