import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "textarea textarea-bordered textarea-lg border-b border-b-gray-300 flex min-h-[150px] w-full rounded-none bg-background py-2 placeholder:text-muted-foreground px-4 pr-20 text-gray-900 font-light text-base placeholder:font-light placeholder:text-gray-500 focus:outline-none focus:border-gray-700 sm:leading-6 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
