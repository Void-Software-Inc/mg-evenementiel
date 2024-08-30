"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

type ProductContextType = {
  productsShouldRefetch: boolean;
  setProductsShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductContext = createContext<ProductContextType>({
  productsShouldRefetch: false,
  setProductsShouldRefetch: () => {},
})

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [productsShouldRefetch, setProductsShouldRefetch] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    const productsChannel = supabase.channel('products_changes')

    productsChannel
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        setProductsShouldRefetch(true)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(productsChannel)
    }
  }, [])

  return (
    <ProductContext.Provider value={{ 
      productsShouldRefetch, 
      setProductsShouldRefetch
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductContext)