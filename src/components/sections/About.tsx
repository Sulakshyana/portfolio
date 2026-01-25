// src/components/sections/About.tsx
"use client";
import { motion } from "framer-motion";
import profileData from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-center">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              {profileData.about}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
