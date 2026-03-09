"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/lib/projects";
import AnimatedSection from "./ui/AnimatedSection";

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-dark relative">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection className="text-center mb-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            Our Work
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={0.1} className="text-center mb-14">
          <p className="text-gray text-sm max-w-lg mx-auto">
            These are concept projects we built to demonstrate our capabilities.
            Each one represents the type of work we do for real clients.
          </p>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <motion.a
              key={project.slug}
              href={`/projects/${project.slug}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-navy-light/30 transition-all duration-300"
            >
              {/* Gradient preview area */}
              <div
                className={`h-40 bg-gradient-to-br ${project.color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium flex items-center gap-2">
                    View Project
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-navy-light text-xs font-semibold uppercase tracking-wider mb-2">
                  {project.category}
                </p>
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-gray text-sm leading-relaxed">
                  {project.tagline}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
