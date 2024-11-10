'use client'

import { useEffect } from "react"
import { toast } from "sonner"
import { CookieIcon } from "@radix-ui/react-icons"
import Link from "next/link"

const COOKIE_CONSENT_KEY = 'mg-events-cookie-consent'
const TOAST_ID = 'cookie-consent-toast'

export default function CookieConsent() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window === 'undefined') return

      try {
        const hasSeenCookieNotice = localStorage.getItem(COOKIE_CONSENT_KEY)

        if (!hasSeenCookieNotice) {
          toast.dismiss(TOAST_ID)
          
          localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
          
          toast(
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CookieIcon className="h-7 w-7" />
                  <span className="w-full font-medium text-lg">Utilisation des cookies</span>
                </div>
                <button 
                  onClick={() => toast.dismiss(TOAST_ID)} 
                  className="text-zinc-500 hover:text-zinc-800 transition-colors -mt-4"
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm">
                Ce site utilise des cookies essentiels pour garantir son bon fonctionnement. En continuant votre navigation, vous acceptez leur utilisation.
              </p>
              <div className="flex justify-end">
                <Link 
                  href="/mentions-legales#cookies-policy"
                  className="text-sm underline cursor-pointer"
                  onClick={() => toast.dismiss(TOAST_ID)}
                >
                  En savoir plus
                </Link>
              </div>
            </div>,
            {
              id: TOAST_ID,
              duration: 8000,
              position: "bottom-left",
              important: true,
            }
          )
        }
      } catch (error) {
        console.error('Error checking cookie consent:', error)
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
      toast.dismiss(TOAST_ID)
    }
  }, [])

  return null
}
