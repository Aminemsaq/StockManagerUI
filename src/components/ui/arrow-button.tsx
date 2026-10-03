import { ArrowRight } from "lucide-react"
import type * as React from "react"

import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"

export interface ArrowButtonProps extends React.ComponentProps<typeof Button> {
  direction?: "right" | "left"
  position?: "left" | "right"
}

export function ArrowButton({
  children,
  direction = "right",
  position = "right",
  className,
  ...props
}: ArrowButtonProps) {
  const arrow = (
    <ArrowRight
      data-icon={position === "left" ? "inline-start" : "inline-end"}
      className={cn(
        "transition-transform duration-200",
        direction === "left" && "-scale-x-100",
        direction === "left"
          ? "group-hover/button:-translate-x-0.5"
          : "group-hover/button:translate-x-0.5",
      )}
    />
  )

  return (
    <Button className={className} {...props}>
      {position === "left" && arrow}
      {children}
      {position === "right" && arrow}
    </Button>
  )
}

export default ArrowButton
