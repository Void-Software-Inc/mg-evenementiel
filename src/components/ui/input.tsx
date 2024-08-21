import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full max-w-[624px] border border-t-0 border-x-0 border-b-gray-300 bg-background px-4 py-6 text-base font-light ring-offset-background file:border-0 file:bg-transparent file:font-light placeholder:text-muted-foreground placeholder:text-gray-500 focus-visible:outline-none focus-visible:border-gray-700 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
