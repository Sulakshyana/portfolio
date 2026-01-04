// src/components/sections/Experience.tsx
"use client";
import { motion } from "framer-motion";

const experience = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Outlines Research and Development",
    location: "Patan",
    period: "Poush 2080 - Baisakh 2081",
    responsibilities: [
      "APIs integration using Axios in React.js",
      "Responsive web page development in React and Shopify",
    ],
    achievements: [
      "Converted Figma designs to code for various projects",
      "Developed responsive web pages with backend integration",
      "Integrated APIs with Laravel backends",
      "Implemented responsive designs in Shopify",
    ],
    skills: ["React.js", "Bootstrap", "Axios", "Figma", "Laravel", "Shopify"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-center">Professional Experience</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {exp.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {exp.company} - {exp.location} | {exp.period}
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Responsibilities:
                </h4>
                <ul className="space-y-1">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} className="text-gray-600 flex items-start">
                      <span className="text-primary mr-2">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Achievements:
                </h4>
                <ul className="space-y-1">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="text-gray-600 flex items-start">
                      <span className="text-primary mr-2">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span key={skill} className="tech-badge text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
