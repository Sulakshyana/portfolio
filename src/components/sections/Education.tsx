"use client";
import { motion } from "framer-motion";
import type { Education as EducationType } from "@/data/profile";

export default function Education({ education }: { education: EducationType[] }) {
  return (
    <section id="education" className="py-20 section-surface">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-center">Education</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card border-l-4 border-primary"
            >
              <h3 className="text-xl font-bold section-main-subtitle section-subtitle mb-1">
                {edu.degree}
              </h3>
              <p className="section-text mb-1">{edu.institution}</p>
              <p className="text-sm section-text mb-2">{edu.period}</p>
              <p className="font-semibold section-text">GPA: {edu.gpa}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
