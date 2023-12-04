"use client"
import { trpc } from '@/app/_trpc/client'
import { TQueryValidator } from '@/lib/Validation/QueryValidator'
import { Product } from '@/payload-types'
import Link from 'next/link'
import React from 'react'
import ProductListing from './ProductListing'

interface ProductReelProps {
  title:string
  subtitle?:string
  href?:string
  query:TQueryValidator
}
const FALLBACK = 4
const ProductReel = (props: ProductReelProps) => {
 const { title, subtitle ,href,query} = props
 const { data: result, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery(
   { limit: query.limit ?? FALLBACK, query },
   {
     getNextPageParam: (lastPage) => lastPage.nextPage,
   }
 )
const products= result?.pages.flatMap(page=>page.items)
let ProductsMap: (Product | null)[] = []
if(products&&products.length){
  ProductsMap = products
}else if (isLoading) {
  ProductsMap = new Array<null>(query.limit ?? FALLBACK).fill(null)
}

  return (
    <section className='py-12'>
      <div className='md:flex md:items-center md:justify-between mb-4'>
        <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
          {title && (
            <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
              {title}
            </h1>
          )}
          {subtitle && (
            <p className='mt-2 text-sm text-muted-foreground'>{subtitle}</p>
          )}
        </div>
        {href && (
          <Link
            className='hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block'
            href={href}
          >
            Shop the collection
            <span aria-hidden='true'>&rarr;</span>
          </Link>
        )}
      </div>
      <div className='relative'>
        <div className='mt-6 flex items-center w-full'>
          <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
            {ProductsMap.map((product, i) => (
              <ProductListing
                key={`product-${i}`}
                product={product}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductReel
