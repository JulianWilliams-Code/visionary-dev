"use client";

import AnimatedSection from "./ui/AnimatedSection";
import Counter from "./ui/Counter";

const stats = [
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 section-gradient relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <AnimatedSection direction="left">
            <p className="text-navy-light font-semibold text-sm tracking-widest uppercase mb-4">
              About Us
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Building the Web,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-light to-blue-400">
                One Vision
              </span>{" "}
              at a Time
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

            <div className="flex flex-wrap gap-3">
              {[
                "React / Next.js",
                "Node.js",
                "Tailwind CSS",
                "PostgreSQL",
                "MongoDB",
                "Vercel",
                "AWS",
                "Stripe",
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

          {/* Stats */}
          <AnimatedSection direction="right">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-dark/50 border border-white/5 text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-navy-light mb-2">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-gray text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
