// src/components/sections/Hero.tsx
"use client";
import { motion } from "framer-motion";
import { FiGithub, FiMail, FiLinkedin } from "react-icons/fi";
import { ME } from "@/config/constant";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 gradient-bg layout-text">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Profile Image/Initial */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center text-5xl font-bold shadow-2xl icon-circle"
          >
            SG
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            {ME.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl mb-8"
          >
            {ME.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg mb-12 max-w-2xl mx-auto"
          >
            {ME.description}
          </motion.p>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16"
          >
            <a
              href={`mailto:${ME.email}`}
              className="flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg transition-all hover:scale-105 backdrop-blur-md bg-white/10"
            >
              <FiMail aria-hidden="true" />
              <span className="hidden md:inline">{ME.email}</span>
              <span className="md:hidden">Email</span>
            </a>
            <a
              href={ME.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg transition-all hover:scale-105 backdrop-blur-md bg-white/10"
            >
              <FiGithub aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a
              href={ME.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg transition-all hover:scale-105 backdrop-blur-md bg-white/10"
            >
              <FiLinkedin aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full flex items-start justify-center p-2 border-2 border-white/50">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-white/80"
          />
        </div>
      </motion.div>
    </section>
  );
}
