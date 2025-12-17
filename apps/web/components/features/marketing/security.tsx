import { Lock, Shield, Eye, FileCheck } from 'lucide-react'

const securityFeatures = [
  {
    icon: Lock,
    title: 'Encrypted storage',
    description:
      'All your documents and data are encrypted at rest and in transit.',
  },
  {
    icon: Shield,
    title: 'GDPR compliant',
    description:
      'Full compliance with data protection regulations and user privacy rights.',
  },
  {
    icon: Eye,
    title: 'Your data, your control',
    description: 'Delete your applications and data anytime with one click.',
  },
  {
    icon: FileCheck,
    title: 'Secure authentication',
    description:
      'OAuth-only login via trusted providers like Google and LinkedIn.',
  },
]

export function Security() {
  return (
    <section className="py-20 md:py-32 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 md:text-5xl text-balance">
            Your data is safe with us
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Enterprise-grade security and privacy protection for your sensitive
            information
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 mx-auto">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
