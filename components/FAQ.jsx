"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./ui/AnimatedSection";

const faqs = [
  {
    question: "What's included in each website package?",
    answer:
      "Our Starter Website ($500–$1,200) includes 1–3 pages, mobile responsive design, a contact form, basic SEO, and deployment. The Business Website ($1,500–$3,000) includes 5–7 pages with custom layouts, analytics, and performance optimization. The E-Commerce Website ($3,000–$5,000) includes a full store setup with payment integration, up to 25 products, and shipping configuration. Each package includes revision rounds and launch support.",
  },
  {
    question: "How long does it take to build my website?",
    answer:
      "Timelines depend on the package: Starter Websites take 1–2 weeks, Business Websites take 3–4 weeks, and E-Commerce Websites take 4–6 weeks. These timelines assume content (text, images, branding) is provided promptly. Delays in content delivery may extend the timeline.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "You'll need to provide your text/copy, images, logo, and any branding guidelines. If you don't have a logo or branding yet, we can discuss options during the consultation. The more prepared you are with content, the faster we can build and launch your site.",
  },
  {
    question: "How many revisions do I get?",
    answer:
      "Starter Websites include 2 revision rounds, while Business and E-Commerce Websites include 3 revision rounds. Each round lets you request changes to layout, colors, text, and other design elements. Additional revisions beyond your included rounds can be arranged at an hourly rate.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes! Our Monthly Care Plan ($79–$149/mo) includes hosting oversight, security monitoring, backups, plugin/system updates, and up to 30 minutes of minor content edits per month. This keeps your site secure, fast, and up to date without you having to worry about the technical side.",
  },
  {
    question: "What platform do you build websites on?",
    answer:
      "We work with a range of platforms depending on your needs. For fully custom, high-performance sites we use modern frameworks like Next.js and React. For clients who want easy self-management, we build on WordPress or Webflow. During the consultation, we'll recommend the best platform based on your goals, budget, and how hands-on you want to be with updates.",
  },
  {
    question: "Can I update the website myself after launch?",
    answer:
      "It depends on the setup. We can integrate a content management system (CMS) if you'd like to make your own updates, or you can rely on our Monthly Care Plan for hands-off maintenance. We'll discuss the best approach during the consultation based on your needs.",
  },
  {
    question: "Do you handle domain names and hosting?",
    answer:
      "We can guide you through purchasing a domain and setting up hosting, or work with your existing domain. Hosting setup and deployment are included in every package. Our Monthly Care Plan also includes ongoing hosting oversight if you'd like us to manage it for you.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-dark relative">
      <div className="max-w-3xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-navy-light font-semibold text-sm tracking-widest uppercase mb-4">
            Common Questions
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-light to-blue-400">
              Questions
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-xl border border-white/5 hover:border-navy-light/30 transition-colors duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-dark-gray/30 hover:bg-dark-gray/50 transition-colors duration-200"
                >
                  <span className="font-medium text-white pr-4">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-navy-light text-2xl shrink-0 leading-none"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-5 text-gray text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
