"use client";

interface SocialLinkProps {
  href: string;
  label: string;
  platform: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

export default function SocialLink({
  href,
  label,
  platform,
  children,
  target,
  rel,
}: SocialLinkProps) {
  const track = () => {
    window.gtag?.("event", "social_click", { platform, location: "footer" });
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={label}
      onClick={track}
      className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
    >
      {children}
    </a>
  );
}
