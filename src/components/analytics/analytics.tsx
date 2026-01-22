"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
