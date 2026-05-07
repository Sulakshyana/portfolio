import Link from "next/link";
import { ME } from "@/config/constant";
import { FiGithub, FiMail, FiLinkedin, FiHeart } from "react-icons/fi";
import SocialLink from "./SocialLink";

export default function Footer(): React.JSX.Element {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="py-12 gradient-bg">
      <div className="layout-text container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <p className="text-2xl font-bold mb-4 nav-logo inline-block">SG</p>
            <p className="mb-4">{ME.shortDescription}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#blogsPreview" className="hover:text-white transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <SocialLink
                href={ME.githubUrl}
                label="GitHub profile"
                platform="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub size={20} aria-hidden="true" />
              </SocialLink>
              <SocialLink
                href={`mailto:${ME.email}`}
                label="Send email"
                platform="Email"
              >
                <FiMail size={20} aria-hidden="true" />
              </SocialLink>
              <SocialLink
                href={ME.linkedinUrl}
                label="LinkedIn profile"
                platform="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin size={20} aria-hidden="true" />
              </SocialLink>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="flex items-center justify-center gap-2">
            © {currentYear} {ME.name}. Built with
            <FiHeart className="text-red-500" aria-hidden="true" />
            using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
