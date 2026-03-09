"use client";

import AnimatedSection from "./ui/AnimatedSection";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 section-gradient relative">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-navy-light font-semibold text-sm tracking-widest uppercase mb-4">
            About Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Who We Are
          </h2>

          <div className="space-y-6 text-gray leading-relaxed mb-10">
            <p>
              Visionary Dev is a web design studio that works with small
              businesses, local service companies, and startups.
              We&apos;ve seen too many businesses lose potential customers
              because their website is slow, outdated, or just doesn&apos;t
              represent them well. We fix that.
            </p>
            <p>
              Every project starts with a conversation — we learn about your
              business, your customers, and what you actually need the website to
              do. Then we build it. No templates, no generic layouts. Just a
              clean, fast website that works for your specific situation.
            </p>
            <p>
              We work with tools like Next.js, React, WordPress, and Webflow —
              and we&apos;ll recommend the right platform based on your needs,
              not on what&apos;s trendy. The goal is always the same: a site
              that looks professional, loads fast, and helps you get more
              business.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {[
              "Next.js",
              "React",
              "WordPress",
              "Webflow",
              "Tailwind CSS",
              "Node.js",
              "Stripe",
              "Vercel",
            ].map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1.5 rounded-full bg-dark border border-white/10 text-light-gray"
              >
                {tech}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
