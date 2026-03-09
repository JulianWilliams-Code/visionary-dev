"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./ui/AnimatedSection";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const data = new FormData(form);

    try {
      // Replace with your Formspree endpoint
      const res = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch {
      // Fallback: still show success for demo
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-50" />
      <div className="absolute inset-0 bg-dark/70" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <p className="text-navy-light font-semibold text-sm tracking-widest uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let&apos;s Build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-light to-blue-400">
              Something Great
            </span>
          </h2>
          <p className="text-gray text-lg max-w-xl mx-auto">
            Ready to start your project? Fill out the form below and we&apos;ll
            get back to you within 24 hours.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-12 rounded-2xl bg-dark-gray/50 border border-navy-light/30"
            >
              <div className="text-5xl mb-4">&#10003;</div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray">
                We&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 md:p-12 rounded-2xl bg-dark-gray/30 border border-white/5 backdrop-blur-sm"
            >
              <div>
                <label className="block text-sm font-medium text-light-gray mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-dark border border-white/10 text-white placeholder-gray focus:border-navy-light focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light-gray mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-dark border border-white/10 text-white placeholder-gray focus:border-navy-light focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light-gray mb-2">
                  Project Type
                </label>
                <select
                  name="project_type"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-dark border border-white/10 text-white focus:border-navy-light focus:outline-none transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="starter">Starter Website</option>
                  <option value="business">Business Website</option>
                  <option value="ecommerce">E-Commerce Website</option>
                  <option value="care-plan">Monthly Care Plan</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-light-gray mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  className="w-full px-4 py-3 rounded-lg bg-dark border border-white/10 text-white focus:border-navy-light focus:outline-none transition-colors"
                >
                  <option value="">Select budget</option>
                  <option value="500-1200">$500 - $1,200</option>
                  <option value="1500-3000">$1,500 - $3,000</option>
                  <option value="3000-5000">$3,000 - $5,000</option>
                  <option value="5000+">$5,000+</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-light-gray mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-dark border border-white/10 text-white placeholder-gray focus:border-navy-light focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <div className="md:col-span-2">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-navy-light text-white font-semibold rounded-xl hover:bg-navy-light/90 transition-all duration-200 text-lg disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
              </div>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
