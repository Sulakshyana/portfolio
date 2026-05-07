// src/components/sections/Projects.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import profileData from "@/data/profile";

const projects = profileData.projects;

export default function Projects(): React.JSX.Element {
  return (
    <section id="projects" className="py-20 section-surface">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-center">Featured Projects</h2>
          <p className="text-center section-text mb-12 max-w-2xl mx-auto">
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
                <h3 className="text-2xl font-bold section-subtitle section-main-subtitle transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="section-subtitle transition-colors"
                    >
                      <FiGithub size={24} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="section-subtitle transition-colors"
                    >
                      <FiExternalLink size={24} />
                    </a>
                  )}
                </div>
              </div>

              <p className="section-text mb-4">{project.description}</p>

              <div className="mb-4">
                <h4 className="section-subtitle font-semibold mb-2">
                  Key Features:
                </h4>
                <ul className="space-y-1">
                  {project.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-sm section-text flex items-start"
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
