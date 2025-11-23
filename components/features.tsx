import { FileText, Mail, MessageSquare, BarChart } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Resume tailoring",
    description:
      "AI analyzes each job posting and automatically customizes your resume to match requirements and keywords.",
    image: "/tailored-resume-with-highlighted-keywords.jpg",
  },
  {
    icon: Mail,
    title: "AI cover letter writing",
    description:
      "Generate compelling, personalized cover letters that highlight your relevant experience for each position.",
    image: "/professional-cover-letter-being-written.jpg",
  },
  {
    icon: MessageSquare,
    title: "Application Q&A assistant",
    description:
      "Get AI-generated answers to common application questions, perfectly aligned with the job description.",
    image: "/ai-chat-interface-answering-questions.jpg",
  },
  {
    icon: BarChart,
    title: "Application tracking dashboard",
    description: "Manage all your applications in one place. Search, filter, and access your materials anytime.",
    image: "/application-tracking-dashboard-with-status-cards.jpg",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 md:text-5xl text-balance">
            Everything you need to land your dream job
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Powerful features designed to give you a competitive edge
          </p>
        </div>

        <div className="space-y-24 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid gap-12 md:grid-cols-2 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-4 text-2xl font-bold md:text-3xl">{feature.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <div className="rounded-2xl border border-border bg-card p-2 shadow-lg">
                  <div className="aspect-video rounded-lg bg-secondary overflow-hidden">
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      className="h-full w-full object-cover"
                    />
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
