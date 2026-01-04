// src/components/sections/Education.tsx
"use client";
import { motion } from "framer-motion";

const education = [
  {
    id: 1,
    degree: "Bachelor of Information Technology (BIT)",
    institution: "Triton International College",
    period: "2076-2080",
    gpa: "3.60/4.0",
  },
  {
    id: 2,
    degree: "Higher Secondary Education (+2)",
    institution: "Patan Multiple Campus",
    period: "2074-2076",
    gpa: "3.45/4.0",
  },
  {
    id: 3,
    degree: "Secondary Education (Grade 10)",
    institution: "Mahalaxmi Academy",
    period: "2074",
    gpa: "3.5/4.0",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-20 bg-gray-50">
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
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {edu.degree}
              </h3>
              <p className="text-gray-600 mb-1">{edu.institution}</p>
              <p className="text-sm text-gray-500 mb-2">{edu.period}</p>
              <p className="font-semibold text-primary">GPA: {edu.gpa}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
