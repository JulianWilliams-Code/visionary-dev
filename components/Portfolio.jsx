"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./ui/AnimatedSection";

const projects = [
  {
    title: "Local Bakery Website",
    category: "Starter Website",
    description:
      "Clean 3-page site for a local bakery featuring menu, location info, and a contact form. Mobile-first design with fast load times.",
    tech: ["Next.js", "Tailwind", "Vercel"],
  },
  {
    title: "Law Firm Website",
    category: "Business Website",
    description:
      "Professional 7-page business site with practice area pages, attorney profiles, client testimonials, and intake form with analytics tracking.",
    tech: ["Next.js", "Tailwind", "Google Analytics"],
  },
  {
    title: "Boutique Clothing Store",
    category: "E-Commerce Website",
    description:
      "Full online store with Stripe payments, product catalog, shipping setup, and order notification emails. Launched with 25 products.",
    tech: ["Next.js", "Stripe", "Supabase"],
  },
  {
    title: "Fitness Studio Website",
    category: "Business Website",
    description:
      "Business site with class schedules, trainer bios, online booking integration, and SEO-optimized service pages that doubled organic traffic.",
    tech: ["React", "Tailwind", "Vercel"],
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-dark relative">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-light to-blue-400">
              Projects
            </span>
          </h2>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-navy-light/30 transition-all duration-300"
            >
              <div className="h-1 bg-gradient-to-r from-navy-light to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="p-7">
                <p className="text-navy-light text-xs font-semibold uppercase tracking-wider mb-3">
                  {project.category}
                </p>
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray text-sm leading-relaxed mb-5">
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
