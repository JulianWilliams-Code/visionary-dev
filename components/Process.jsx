"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./ui/AnimatedSection";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We discuss your business, goals, and which package fits your needs. You choose a plan and we outline the scope together.",
  },
  {
    number: "02",
    title: "Content & Build",
    description:
      "You provide your text, images, and branding. We build your site with a clean layout, mobile responsiveness, and SEO setup.",
  },
  {
    number: "03",
    title: "Review & Revise",
    description:
      "You review the site and request changes within your included revision rounds. We refine until you're satisfied.",
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "We deploy your site, optimize for speed, and hand everything over. Optional monthly care plan to keep it running smoothly.",
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 md:py-32 section-gradient relative">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-navy-light font-semibold text-sm tracking-widest uppercase mb-4">
            How We Work
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Our Proven{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-light to-blue-400">
              Process
            </span>
          </h2>
        </AnimatedSection>

        <div ref={ref} className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-navy-light/30 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step number circle */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-center mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 rounded-full bg-navy/30 border-2 border-navy-light/50 flex items-center justify-center shrink-0"
                  >
                    <span className="text-navy-light font-bold text-lg">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Vertical connector - mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden h-0.5 w-full bg-gradient-to-r from-navy-light/30 to-transparent" />
                  )}
                </div>

                <div className="lg:text-center">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
