"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Blog", href: "#blogsPreview" },
  { name: "Contact", href: "#contact" },
];

function ThemeIcon({
  size,
  resolvedTheme,
  mounted,
}: {
  size: number;
  resolvedTheme: string | undefined;
  mounted: boolean;
}) {
  if (!mounted)
    return <span className="block" style={{ width: size, height: size }} />;
  return resolvedTheme === "light" ? <Moon size={size} /> : <Sun size={size} />;
}

export default function Header() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // eslint-disable-next-line
    setMounted(true);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`layout-text fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen || !isLandingPage
          ? "nav-bar shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold nav-logo">
            SG
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-gray-300 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Theme Toggle Button */}
            <li>
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "light" ? "dark" : "light")
                }
                className="px-4 py-2 rounded text-white hover:opacity-90 transition flex items-center gap-2"
                aria-label="Toggle theme"
              >
                <ThemeIcon
                  size={20}
                  resolvedTheme={resolvedTheme}
                  mounted={mounted}
                />
              </button>
            </li>
          </ul>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() =>
                setTheme(resolvedTheme === "light" ? "dark" : "light")
              }
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Toggle theme"
            >
              <ThemeIcon
                size={18}
                resolvedTheme={resolvedTheme}
                mounted={mounted}
              />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <ul className="md:hidden mt-4 space-y-4 pb-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block text-gray-300 dark:text-gray-300 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
