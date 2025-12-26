'use client'

import { Button } from '@/components/ui/button'
import { useGetPlanPricingQuery } from '@/graphql/generated'
import { Check, RefreshCw } from 'lucide-react'

interface Plan {
  id: string
  code: string
  price: number
}

interface PlanCard {
  id: string
  price: string
  name: string
  description: string
  features: readonly string[]
  cta: string
  popular: boolean
  period: string | undefined
}

const PLAN_METADATA = {
  FREE: {
    name: 'Free',
    description: 'Perfect for trying out ApplyMate',
    features: [
      '3 applications total',
      'AI-tailored resumes',
      'AI-generated cover letters',
      'Application Q&A assistance',
      'Basic application tracking',
    ],
    cta: 'Start for free',
    popular: false,
    period: undefined,
  },
  PREMIUM: {
    name: 'Premium',
    description: 'For serious job seekers',
    features: [
      'Unlimited applications',
      'AI-tailored resumes',
      'AI-generated cover letters',
      'Application Q&A assistance',
      'Advanced application tracking',
      'Priority AI processing',
      'Export all documents',
    ],
    cta: 'Upgrade to Premium',
    popular: true,
    period: '/month',
  },
} as const

export function Pricing() {
  const { data, isLoading, isError, refetch } = useGetPlanPricingQuery()
  const plans = data?.plans ?? []

  const planCards = plans
    .map((plan: Plan): PlanCard | null => {
      const metadata =
        PLAN_METADATA[plan.code.toUpperCase() as keyof typeof PLAN_METADATA]
      if (!metadata) {
        return null
      }

      return {
        id: plan.id,
        price: plan.price === 0 ? '$0' : `$${plan.price}`,
        ...metadata,
      } satisfies PlanCard
    })
    .filter((card): card is PlanCard => card !== null)

  return (
    <section id="pricing" className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 md:text-5xl text-balance">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Start free, upgrade when you&apos;re ready to supercharge your job
            search
          </p>
        </div>

        {isLoading ? (
          <div className="max-w-2xl mx-auto rounded-2xl border border-dashed border-border bg-background/60 p-10 text-center animate-pulse">
            <p className="text-lg text-muted-foreground">Loading plans…</p>
          </div>
        ) : isError ? (
          <div className="max-w-2xl mx-auto rounded-2xl border border-destructive/40 bg-destructive/5 p-10 text-center space-y-4">
            <p className="text-lg text-muted-foreground">
              We couldn&apos;t load pricing information. Please try again.
            </p>
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="inline-flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        ) : planCards.length === 0 ? (
          <div className="max-w-2xl mx-auto rounded-2xl border border-dashed border-border bg-background/60 p-10 text-center">
            <p className="text-lg text-muted-foreground">
              Plans will appear here once they&apos;re configured in Supabase.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {planCards.map((plan) => (
              <div
                key={plan.id ?? plan.name}
                className={`rounded-2xl border p-8 relative ${
                  plan.popular
                    ? 'border-accent bg-card shadow-lg shadow-accent/10'
                    : 'border-border bg-card'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="rounded-full bg-accent px-4 py-1 text-sm font-medium text-accent-foreground">
                      Most popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>

                <Button
                  className={`w-full mb-6 ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
