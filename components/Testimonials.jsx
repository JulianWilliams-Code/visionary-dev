"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import AnimatedSection from "./ui/AnimatedSection";

const testimonials = [
  {
    quote:
      "Visionary Dev completely transformed our online presence. The new website increased our leads by 40% in the first month. Their attention to detail is unmatched.",
    name: "Sarah Mitchell",
    role: "CEO, BrightPath Marketing",
  },
  {
    quote:
      "Working with Visionary Dev was seamless from start to finish. They understood our vision and delivered a product that exceeded every expectation. Highly recommend.",
    name: "James Rodriguez",
    role: "Founder, TechNova",
  },
  {
    quote:
      "The e-commerce platform they built for us handles thousands of orders daily without a hitch. Fast, reliable, and beautifully designed. Best investment we've made.",
    name: "Emily Chen",
    role: "COO, Urban Bloom",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-dark relative">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-navy-light font-semibold text-sm tracking-widest uppercase mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-light to-blue-400">
              Clients
            </span>{" "}
            Say
          </h2>
        </AnimatedSection>

        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Quote */}
            <div className="text-center mb-12">
              <div className="text-6xl text-navy-light/30 font-serif mb-4">
                &ldquo;
              </div>
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-lg md:text-2xl text-off-white leading-relaxed max-w-3xl mx-auto mb-8"
              >
                {testimonials[active].quote}
              </motion.p>
              <motion.div
                key={`name-${active}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <p className="font-semibold text-lg">
                  {testimonials[active].name}
                </p>
                <p className="text-gray text-sm">
                  {testimonials[active].role}
                </p>
              </motion.div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === active
                      ? "bg-navy-light w-8"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
