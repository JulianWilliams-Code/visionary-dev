import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Visionary Dev`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="pt-24">
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-sm text-gray hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to all projects
        </Link>
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <p className="text-navy-light text-xs font-semibold uppercase tracking-wider mb-3">
          {project.category} &middot; Concept Project
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {project.title}
        </h1>
        <p className="text-light-gray text-lg max-w-2xl">
          {project.description}
        </p>
      </section>

      {/* Screenshots placeholder */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <div className={`rounded-2xl bg-gradient-to-br ${project.color} p-px`}>
          <div className="rounded-2xl bg-dark-gray/80 p-12 md:p-20 text-center">
            <div className="text-gray/40 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
              </svg>
            </div>
            <p className="text-gray/60 text-sm">
              Project screenshots coming soon
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
        <p className="text-gray leading-relaxed">
          {project.overview}
        </p>
      </section>

      {/* Features + Details grid */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Features */}
          <div>
            <h2 className="text-xl font-bold mb-4">Features</h2>
            <ul className="space-y-2.5">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-light-gray">
                  <svg className="w-4 h-4 text-navy-light shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Services + Tech */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Services</h2>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="text-xs px-3 py-1.5 rounded-full bg-navy/20 text-navy-light border border-navy-light/20"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1.5 rounded-full bg-dark border border-white/10 text-light-gray"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="rounded-2xl bg-dark-gray/50 border border-white/5 p-10 md:p-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Want something like this for your business?
          </h2>
          <p className="text-gray text-sm mb-6 max-w-md mx-auto">
            Tell us about your project and we&apos;ll put together a plan that
            fits your needs and budget.
          </p>
          <a
            href="/#contact"
            className="inline-block px-8 py-3 bg-navy-light text-white font-semibold rounded-xl hover:bg-navy-light/90 transition-all duration-200"
          >
            Start a Project
          </a>
        </div>
      </section>
    </main>
  );
}
