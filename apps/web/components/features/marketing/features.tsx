import { FileText, Mail, MessageSquare, BarChart } from 'lucide-react'
import Image from 'next/image'

const features = [
  {
    icon: FileText,
    title: 'Resume tailoring',
    description:
      'AI analyzes each job posting and automatically customizes your resume to match requirements and keywords.',
    image: '/feature-resume.png',
  },
  {
    icon: Mail,
    title: 'AI cover letter writing',
    description:
      'Generate compelling, personalized cover letters that highlight your relevant experience for each position.',
    image: '/feature-cover-letter.png',
  },
  {
    icon: MessageSquare,
    title: 'Application Q&A assistant',
    description:
      'Get AI-generated answers to common application questions, perfectly aligned with the job description.',
    image: '/feature-qa.png',
  },
  {
    icon: BarChart,
    title: 'Application tracking dashboard',
    description:
      'Manage all your applications in one place. Search, filter, and access your materials anytime.',
    image: '/feature-tracking.png',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 md:text-5xl text-balance tracking-tight">
            Everything you need to{' '}
            <span className="text-primary">land your dream job</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Powerful features designed to give you a competitive edge
          </p>
        </div>

        <div className="space-y-24 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid gap-12 md:grid-cols-2 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/10 shadow-sm">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-4 text-2xl font-bold md:text-3xl tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <div className="group rounded-2xl border border-border/50 bg-card/50 p-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-video rounded-xl bg-secondary overflow-hidden">
                    <Image
                      src={feature.image || '/placeholder.svg'}
                      alt={feature.title}
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Glass overlay on hover */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
