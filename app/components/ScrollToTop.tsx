"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const ScrollToTop = () => {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Check if we should scroll to top (e.g., from Explore button)
    const scrollToTop = searchParams.get("scrollToTop");
    if (scrollToTop === "true") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Clean up the URL parameter
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams]);

  return null;
};

