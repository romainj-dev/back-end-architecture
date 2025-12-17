import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTABanner() {
  return (
    <section className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-accent/10 to-transparent p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 md:text-5xl text-balance">
              Ready to transform your job search?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-balance leading-relaxed max-w-2xl mx-auto">
              Join thousands of job seekers who are landing more interviews with
              AI-powered applications. Start for free today, no credit card
              required.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8"
              >
                Start for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 bg-transparent"
              >
                Schedule a demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
