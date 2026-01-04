// src/constants/me.js

const NAME = "Swastika Ghimire";
const TITLE = "Full Stack Developer | JavaScript Specialist";
const LOCATION = "Patan, Nepal";

const GITHUB_USERNAME = "sulakshyana";
const LINKEDIN_USERNAME = "sulakshyana-ghimire";
const EMAIL = "sulakshyanaghimire@gmail.com";
const PHONE = "-";
const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-domain.com"
    : "http://localhost:3000"; // replace later

export const ME = {
  // Basic Info
  name: NAME,
  title: TITLE,
  location: LOCATION,
  email: EMAIL,
  phone: PHONE,

  // Social
  github: GITHUB_USERNAME,
  linkedin: LINKEDIN_USERNAME,

  // URLs
  githubUrl: `https://github.com/${GITHUB_USERNAME}`,
  linkedinUrl: `https://www.linkedin.com/in/${LINKEDIN_USERNAME}/`,

  // About
  description: `Passionate ${TITLE} with expertise in building scalable, high-performance web applications 
    using modern JavaScript technologies. Experienced in developing REST APIs, implementing secure 
    authentication systems, and creating responsive user interfaces. Strong foundation in both 
    frontend and backend development with a focus on clean code, best practices, and maintainable architecture.`,

  shortDescription: `${TITLE} skilled in modern JavaScript, REST APIs, secure authentication, and responsive UI development.`,

  // SEO
  seo: {
    title: `${NAME} | ${TITLE}`,
    description: `${NAME} is a ${TITLE} from ${LOCATION} specializing in modern JavaScript, React, Node.js, REST APIs, and secure authentication systems.`,
    keywords: [
      NAME,
      `${TITLE} Nepal`,
      "JavaScript Developer",
      "React Developer",
      "Node.js Developer",
      "MERN Stack Developer",
      "Web Developer Nepal",
      "REST API Developer",
    ],
    author: NAME,
    siteUrl: SITE_URL,
  },
};
