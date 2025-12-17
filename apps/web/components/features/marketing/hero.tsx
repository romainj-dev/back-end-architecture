import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background with Aurora Effect */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute top-[10%] left-1/4 h-[300px] w-[500px] rounded-full bg-accent/20 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>Powered by advanced AI</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-7xl">
            Smarter job applications <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              powered by AI
            </span>
          </h1>

          <p className="mb-10 text-lg text-muted-foreground text-balance md:text-xl max-w-2xl mx-auto leading-relaxed">
            Generate tailored resumes and cover letters designed to pass AI
            recruiter filters. Track all your applications in one organized
            dashboard.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-16">
            <Button
              size="lg"
              className="h-12 px-8 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-105"
            >
              Start for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 rounded-full border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-background/80"
            >
              <Play className="mr-2 h-4 w-4 fill-current" />
              See how it works
            </Button>
          </div>

          {/* Hero Image Container */}
          <div className="relative mx-auto w-full max-w-5xl perspective-1000">
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-accent/20 blur-3xl -z-10 translate-y-10 opacity-50" />

            <div className="glass-card rounded-2xl p-2 animate-float">
              <div className="relative aspect-video rounded-xl bg-background overflow-hidden border border-border/50 shadow-2xl">
                <Image
                  src="/hero-dashboard.png"
                  alt="ApplyMate Dashboard"
                  fill
                  sizes="(min-width: 1200px) 1200px, 100vw"
                  className="object-cover"
                  priority
                />

                {/* Overlay Gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
