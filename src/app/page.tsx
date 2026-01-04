// src/app/page.tsx
import React from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import BlogPreview from "@/components/sections/BlogPreview";

export default function Home(): React.JSX.Element {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <BlogPreview />
    </>
  );
}
