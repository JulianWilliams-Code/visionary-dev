"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./ui/AnimatedSection";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Application",
    description:
      "Full-stack e-commerce solution with real-time inventory, Stripe payments, and admin dashboard.",
    tech: ["Next.js", "Node.js", "PostgreSQL"],
    color: "from-blue-600/20 to-navy/20",
  },
  {
    title: "SaaS Dashboard",
    category: "Web Application",
    description:
      "Analytics dashboard with real-time data visualization, user management, and reporting tools.",
    tech: ["React", "D3.js", "Firebase"],
    color: "from-navy/20 to-indigo-600/20",
  },
  {
    title: "Restaurant Website",
    category: "Custom Website",
    description:
      "Modern restaurant site with online ordering, reservation system, and menu management.",
    tech: ["Next.js", "Tailwind", "Supabase"],
    color: "from-indigo-600/20 to-blue-600/20",
  },
  {
    title: "Startup Landing Page",
    category: "Landing Page",
    description:
      "High-converting landing page with A/B tested layouts. Achieved 12% conversion rate.",
    tech: ["React", "Framer Motion", "Vercel"],
    color: "from-navy-light/20 to-navy/20",
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-navy-light font-semibold text-sm tracking-widest uppercase mb-4">
            Our Work
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-light to-blue-400">
              Projects
            </span>
          </h2>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-navy-light/30 transition-all duration-500 cursor-pointer"
            >
              {/* Gradient preview area */}
              <div
                className={`h-48 md:h-56 bg-gradient-to-br ${project.color} relative overflow-hidden`}
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-4 left-4 w-32 h-8 rounded bg-white/10" />
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10" />
                  <div className="absolute top-16 left-4 right-4 h-24 rounded-lg bg-white/5" />
                  <div className="absolute bottom-4 left-4 w-20 h-6 rounded bg-white/10" />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg border-2 border-white/30 px-6 py-2 rounded-lg">
                    View Details
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 bg-dark-gray/50">
                <p className="text-navy-light text-xs font-semibold uppercase tracking-wider mb-2">
                  {project.category}
                </p>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-navy/20 text-navy-light border border-navy-light/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
