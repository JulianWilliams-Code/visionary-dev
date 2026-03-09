"use client";

import AnimatedSection from "./ui/AnimatedSection";
import Counter from "./ui/Counter";

const stats = [
  { value: 50, suffix: "+", label: "Projects" },
  { value: 30, suffix: "+", label: "Clients" },
  { value: 5, suffix: "+", label: "Years" },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 section-gradient relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Text — wider column */}
          <AnimatedSection direction="left" className="lg:col-span-3">
            <p className="text-navy-light font-semibold text-sm tracking-widest uppercase mb-4">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Building the Web,{" "}
              One Vision at a Time
            </h2>
            <p className="text-gray leading-relaxed mb-6">
              Visionary Dev LLC is a web development studio focused on creating
              digital experiences that make an impact. We combine clean design
              with powerful technology to build websites and applications that
              not only look great but perform exceptionally.
            </p>
            <p className="text-gray leading-relaxed mb-8">
              Every project starts with understanding your unique needs. We
              don't do cookie-cutter solutions — each build is tailored to your
              brand, your audience, and your goals. From startups to established
              businesses, we deliver results that matter.
            </p>

            {/* Stats — inline row, not the centerpiece */}
            <div className="flex gap-8 pt-6 border-t border-white/5">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-navy-light">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-gray text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Tech stack — narrower column */}
          <AnimatedSection direction="right" className="lg:col-span-2">
            <p className="text-sm font-medium text-light-gray mb-4">
              Technologies we work with
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                "Next.js",
                "React",
                "WordPress",
                "Webflow",
                "Node.js",
                "Tailwind CSS",
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
      </div>
    </section>
  );
}
