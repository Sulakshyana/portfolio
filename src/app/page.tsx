import React from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import BlogPreview from "@/components/sections/BlogPreview";
import profileData from "@/data/profile";

export default function Home(): React.JSX.Element {
  return (
    <>
      <Hero />
      <About about={profileData.about} />
      <Experience experience={profileData.experience} />
      <Projects projects={profileData.projects} />
      <Skills skills={profileData.skills} />
      <Education education={profileData.education} />
      <BlogPreview />
      <Contact />
    </>
  );
}
