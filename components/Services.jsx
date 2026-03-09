"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./ui/AnimatedSection";

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Starter Website",
    price: "$500 - $1,200",
    description:
      "A simple professional website for small businesses or individuals that need a clean online presence.",
    includes: [
      "1-3 pages",
      "Mobile responsive design",
      "Contact form",
      "Basic SEO setup",
      "Speed optimization",
      "Website deployment",
    ],
    limits: "Max 3 pages | 2 revision rounds | Client provides text & images",
    timeline: "1-2 weeks",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: "Business Website",
    price: "$1,500 - $3,000",
    description:
      "A complete business website designed to represent a company professionally and convert visitors into customers.",
    includes: [
      "5-7 pages",
      "Custom layout",
      "Mobile responsive design",
      "SEO setup",
      "Analytics integration",
      "Performance optimization",
      "Launch support",
    ],
    limits: "Max 7 pages | 3 revision rounds | Standard integrations only",
    timeline: "3-4 weeks",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    title: "E-Commerce Website",
    price: "$3,000 - $5,000",
    description:
      "A professional online store that allows businesses to sell products securely online.",
    includes: [
      "Store setup",
      "Payment integration",
      "Up to 25 products uploaded",
      "Shipping configuration",
      "Order notification emails",
      "Launch support",
    ],
    limits: "Max 25 products | 3 revision rounds | No marketplace features",
    timeline: "4-6 weeks",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Monthly Care Plan",
    price: "$79 - $149/mo",
    description:
      "Ongoing website support to keep your site secure, updated, and running smoothly.",
    includes: [
      "Hosting oversight",
      "Security monitoring",
      "Backups",
      "Minor content edits (up to 30 min/mo)",
      "Plugin/system updates",
    ],
    limits: "Does not include new features or redesign work",
    timeline: "Ongoing",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-dark relative">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold">
            Services &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-light to-blue-400">
              Pricing
            </span>
          </h2>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              className="group p-7 rounded-2xl bg-dark-gray/50 border border-white/5 hover:border-navy-light/30 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-navy-light">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-tight">{service.title}</h3>
                  <p className="text-navy-light font-bold text-sm">
                    {service.price}
                  </p>
                </div>
              </div>
              <p className="text-gray text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              <ul className="space-y-2 mb-5 flex-1">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-light-gray">
                    <svg className="w-4 h-4 text-navy-light shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray/60 border-t border-white/5 pt-3 mb-3">
                {service.limits}
              </p>

              <div className="flex items-center gap-1.5 text-xs text-navy-light font-medium">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {service.timeline}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
