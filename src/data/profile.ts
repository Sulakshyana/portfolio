// src/data/profile.ts

import { ME } from "@/config/constant";

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  achievements: string[];
  skills: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  gpa: string;
}

export interface Skills {
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  tools: string[];
}

export interface Language {
  name: string;
  level: string;
  percentage: number;
}

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  github: string;
  location: string;
  about: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  languages: Language[];
}

export const profileData: ProfileData = {
  name: ME.name,
  title: ME.title,
  email: ME.email,
  phone: ME.phone,
  github: ME.github,
  location: ME.location,

  about: ME.description,

  experience: [
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
  ],

  education: [
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
  ],

  skills: {
    languages: ["C", "C++", "JavaScript"],
    frontend: [
      "HTML5",
      "CSS3",
      "React.js",
      "Next.js",
      "Bootstrap",
      "SASS",
      "jQuery",
    ],
    backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
    databases: ["MongoDB", "Mongoose", "MySQL", "NoSQL"],
    tools: ["Git", "GitHub", "VS Code", "Visual Studio", "Postman"],
  },

  languages: [
    { name: "Nepali", level: "Native", percentage: 100 },
    { name: "English", level: "Fluent", percentage: 90 },
    { name: "Hindi", level: "Proficient", percentage: 75 },
  ],
};

export default profileData;
