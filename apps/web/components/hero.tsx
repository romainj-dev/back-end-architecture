import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm text-accent">
            <Sparkles className="h-4 w-4" />
            <span>Powered by advanced AI</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-balance md:text-7xl">
            Smarter job applications powered by AI
          </h1>

          <p className="mb-10 text-lg text-muted-foreground text-balance md:text-xl max-w-2xl mx-auto leading-relaxed">
            Generate tailored resumes and cover letters designed to pass AI
            recruiter filters. Track all your applications in one organized
            dashboard.
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
              <Play className="mr-2 h-4 w-4" />
              See how it works
            </Button>
          </div>

          <div className="mt-16 rounded-xl border border-border bg-card p-2 shadow-2xl">
            <div className="relative aspect-video rounded-lg bg-secondary overflow-hidden">
              <Image
                src="/modern-dashboard-showing-ai-generated-resume-and-c.jpg"
                alt="ApplyMate Dashboard"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>
    </section>
  )
}
