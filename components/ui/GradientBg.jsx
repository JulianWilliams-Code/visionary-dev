"use client";

import { motion } from "framer-motion";

export default function GradientBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient base */}
      <div className="gradient-bg absolute inset-0" />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%)",
          top: "10%",
          left: "10%",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(30,58,95,0.5) 0%, transparent 70%)",
          bottom: "20%",
          right: "10%",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
        }}
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -80, 40, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
