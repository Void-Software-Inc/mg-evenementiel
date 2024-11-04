"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowUp } from 'lucide-react'

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 rounded-full p-3 bg-black/70 hover:bg-black transition-all duration-300
            ring-0 hover:ring-2 hover:ring-white/50 hover:ring-offset-2 hover:ring-offset-transparent"
          size="icon"
          aria-label="Retour en haut"
        >
          <ArrowUp className="h-5 w-5 relative z-10" />
        </Button>
      )}
    </>
  )
}