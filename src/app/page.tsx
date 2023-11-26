import MaxWidthWrapper from '@/components/maxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowDownToLine, CheckCircle, Leaf } from 'lucide-react'
import Link from 'next/link'
const service = [
  {
    name: 'Instant Delivery',
    Icon: ArrowDownToLine,
    description:
      'Get your assets delivery to your email in seconds and download them right away',
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description:
      'Every assets in our platform is verified by our team to ensure our highest quality standards.If you are not happy we offer 30 days refund guarantee',
  },
  {
    name: 'For The Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration to the natural environment",
  },
]
export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-5xl'>
            Your store for high quality
            <br />
            <span className='text-blue-600 upp'>Digital Products</span>
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            welcome to GAYA. every asset in our platform is verified by our team
            to ensure our highest quality
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Link href={'/product'} className={buttonVariants({ size: 'lg' })}>
              Brows trending
            </Link>
            <Button variant={'ghost'}>our Quality promise &rarr;</Button>
          </div>
        </div>
        {/* todoList of product */}
      </MaxWidthWrapper>
      <section className='border-t border-gray-200 bg-gray-50 '>
        <MaxWidthWrapper className='py-20'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
            {service.map((item) => (
              <div
                key={item.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'
              >
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                    {<item.Icon className='w-1/3 h-1/3' />}
                  </div>
                </div>
                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-gray-900'>
                    {item.name}
                  </h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}
