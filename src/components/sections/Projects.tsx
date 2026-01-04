// src/components/sections/Projects.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { ME } from "@/config/constant";

interface Project {
  id: number;
  title: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string | null;
  demo?: string | null;
}

const projects: Project[] = [
  {
    id: 1,
    title: "VIDTUBE",
    description:
      "A comprehensive video-sharing platform with robust backend architecture and secure authentication system.",
    features: [
      "Scalable REST API design",
      "JWT authentication with refresh tokens",
      "Media upload with Cloudinary",
      "MongoDB aggregation pipelines",
      "Complete CRUD operations",
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary", "Multer"],
    github: ME.githubUrl + "/vidTube",
    demo: null,
  },
  {
    id: 2,
    title: "MULTIAPP DASHBOARD",
    description:
      "A single-page dashboard hosting multiple JavaScript applications including Expense Tracker, Weather App, and To-Do Manager.",
    features: [
      "Real-time weather data integration",
      "Local storage CRUD operations",
      "Dynamic UI with DOM APIs",
      "Modular architecture",
      "Clean code practices",
    ],
    tech: ["HTML5", "CSS3", "JavaScript ES6", "Weather API", "Local Storage"],
    github: ME.githubUrl + "/multiapp-dashboard",
    demo: null,
  },
];

export default function Projects(): React.JSX.Element {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-center">Featured Projects</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in
            full-stack development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      <FiGithub size={24} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      <FiExternalLink size={24} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-4">{project.description}</p>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Key Features:
                </h4>
                <ul className="space-y-1">
                  {project.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600 flex items-start"
                    >
                      <span className="text-primary mr-2">▹</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-badge text-xs">
                    {tech}
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
