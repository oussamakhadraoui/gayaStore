'use client'
import { PRODUCT_GAT } from '@/config'
import React, { ElementRef, useEffect, useRef, useState } from 'react'
import NavItem from './NavItem'
import { useOnClickOutside } from '@/hook/useOutsideClick'

interface NavItemsProps {}

const NavItems = ({}: NavItemsProps) => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null)

  const isAnyOpen = activeIndex !== null
  const navRef = useRef<ElementRef<'div'>>(null)
  useOnClickOutside(navRef, () => setActiveIndex(null))
  useEffect(()=>{
   const handler = (e: KeyboardEvent) => {
     if (e.key === 'Escape') {
       setActiveIndex(null)
     }
   }
   addEventListener('keydown', handler)
   return ()=>{
     removeEventListener('keydown', handler)
   }
  },[])
  return (
    <div className='flex gap-4 h-full' ref={navRef}>
      {PRODUCT_GAT.map((cat, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null)
          } else {
            setActiveIndex(index)
          }
        }
        const isOpen = index === activeIndex
        return (
          <NavItem
            key={cat.value}
            category={cat}
            isOpen={isOpen}
            handleOpen={handleOpen}
            isAnyOpen={isAnyOpen}
          />
        )
      })}
    </div>
  )
}

export default NavItems
