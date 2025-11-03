// src/hooks/useSkipNavigation.ts
import { useEffect } from "react";

export const useSkipNavigation = () => {
  useEffect(() => {
    const handleSkipNav = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K для быстрого перехода к контенту
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        const mainContent = document.getElementById("main-content");
        mainContent?.focus();
      }
    };

    document.addEventListener("keydown", handleSkipNav);
    return () => document.removeEventListener("keydown", handleSkipNav);
  }, []);
};
