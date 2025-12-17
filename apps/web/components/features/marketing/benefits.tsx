import { Target, Zap, FolderCheck, Shield } from 'lucide-react'

const benefits = [
  {
    icon: Target,
    title: 'Beat AI filters',
    description:
      'Generate applications optimized with the right keywords and formatting to pass automated screening.',
  },
  {
    icon: Zap,
    title: 'Save hours of work',
    description:
      'Stop manually customizing every resume and cover letter. Get professional results in seconds.',
  },
  {
    icon: FolderCheck,
    title: 'Stay organized',
    description:
      'Track all your applications in one dashboard. Never lose track of where you applied or what you sent.',
  },
  {
    icon: Shield,
    title: 'Maintain quality',
    description:
      'Every document maintains professional quality while being perfectly tailored to each opportunity.',
  },
]

export function Benefits() {
  return (
    <section className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 md:text-5xl text-balance">
            Why job seekers choose ApplyMate
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Solve the biggest pain points of modern job searching
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-6 hover:border-accent/30 transition-colors"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <benefit.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
