// src/components/sections/Skills.tsx
"use client";
import { motion } from "framer-motion";

const skills = {
  languages: ["C", "C++", "JavaScript", "TypeScript"],
  frontend: [
    "HTML5",
    "CSS3",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Bootstrap",
    "SASS",
  ],
  backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
  databases: ["MongoDB", "Mongoose", "MySQL", "NoSQL"],
  tools: ["Git", "GitHub", "VS Code", "Postman", "Figma"],
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-center">Technical Skills</h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCategory
              title="Programming Languages"
              skills={skills.languages}
              delay={0}
            />
            <SkillCategory
              title="Frontend Technologies"
              skills={skills.frontend}
              delay={0.1}
            />
            <SkillCategory
              title="Backend Technologies"
              skills={skills.backend}
              delay={0.2}
            />
            <SkillCategory
              title="Databases"
              skills={skills.databases}
              delay={0.3}
            />
            <SkillCategory
              title="Tools & Platforms"
              skills={skills.tools}
              delay={0.4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCategory({
  title,
  skills,
  delay,
}: {
  title: string;
  skills: string[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="card"
    >
      <h3 className="text-lg font-semibold text-primary mb-4">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li key={skill} className="text-gray-700 flex items-start">
            <span className="text-primary mr-2">▹</span>
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
