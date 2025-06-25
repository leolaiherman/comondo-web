"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import to avoid hydration mismatch
const PageMobile = dynamic(() => import("./pageMobile"), { ssr: false });
const PageDesktop = dynamic(() => import("./pageDesktop"), { ssr: false });

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

export default function Home() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <PageMobile />;
  }
  return <PageDesktop />;
}