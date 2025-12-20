import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const glassCardVariants = cva(
  'rounded-2xl border backdrop-blur-xl shadow-xl transition-all overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-background/60 border-border/60',
        accent: 'bg-orange-50/30 border-orange-200',
        info: 'bg-blue-50/30 border-blue-200',
        primary: 'bg-primary/5 border-primary/20',
        dashed:
          'border-dashed border-border bg-transparent hover:border-primary hover:bg-primary/5',
      },
      interactive: {
        true: 'hover:bg-white/40 hover:shadow-2xl cursor-pointer',
        false: '',
      },
      selected: {
        true: 'border-primary shadow-md bg-primary/5',
        false: '',
      },
      size: {
        default: 'p-6',
        sm: 'p-4',
        none: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
      selected: false,
      size: 'default',
    },
  }
)

interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
  asChild?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant,
      interactive,
      selected,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(
          glassCardVariants({ variant, interactive, selected, size, className })
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = 'GlassCard'

const GlassCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
GlassCardHeader.displayName = 'GlassCardHeader'

const GlassCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
GlassCardTitle.displayName = 'GlassCardTitle'

const GlassCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
GlassCardDescription.displayName = 'GlassCardDescription'

const GlassCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
GlassCardContent.displayName = 'GlassCardContent'

const GlassCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
GlassCardFooter.displayName = 'GlassCardFooter'

export {
  GlassCard,
  GlassCardHeader,
  GlassCardFooter,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
}
