import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Github } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useSkipNavigation } from "@/hooks/useSkipNavigation";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const menuRef = useFocusTrap(isMenuOpen);
  useSkipNavigation();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  const navigationItems = [
    { id: "about", label: t("nav.about") },
    { id: "experience", label: t("nav.experience") },
    { id: "portfolio", label: t("nav.portfolio") },
    { id: "stack", label: t("nav.stack") },
    { id: "contact", label: t("nav.contact") },
  ];

  return (
    <>
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-c-accent-blue focus:text-white"
      >
        Skip to main content
      </a>

      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-c-bg-primary/80 border-b border-c-border"
        role="banner"
      >
        <nav
          className="container mx-auto px-4 py-5"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              <a href="/" aria-label="Sskutushev - Homepage">
                Sskutushev
              </a>
            </h1>

            <div className="flex items-center gap-8">
              {/* Navigation Links */}
              {navigationItems.map(({ id, label }) => (
                <ScrollLink
                  key={id}
                  to={id}
                  smooth
                  duration={500}
                  className="cursor-pointer hover:text-c-accent-blue transition focus:outline-none focus:ring-2 focus:ring-c-accent-blue focus:ring-offset-2 rounded"
                  aria-label={`${label}`}
                  title={label}
                  tabIndex={0}
                >
                  {label}
                </ScrollLink>
              ))}

              {/* Action Buttons */}
              <a
                href="https://github.com/Sskutushev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-c-accent-blue transition focus:outline-none focus:ring-2 focus:ring-c-accent-blue focus:ring-offset-2 rounded"
                aria-label="Visit GitHub profile (opens in new tab)"
              >
                <Github size={20} aria-hidden="true" />
              </a>

              <button
                onClick={toggleLanguage}
                className="px-3 py-1 rounded-lg border border-c-border hover:border-c-accent-blue transition focus:outline-none focus:ring-2 focus:ring-c-accent-blue"
                aria-label={`Switch language to ${i18n.language === "ru" ? "English" : "Russian"}. Current: ${i18n.language.toUpperCase()}`}
              >
                {i18n.language.toUpperCase()}
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-c-bg-tertiary transition focus:outline-none focus:ring-2 focus:ring-c-accent-blue"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? (
                  <Sun size={20} aria-hidden="true" />
                ) : (
                  <Moon size={20} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center justify-between">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="focus:outline-none focus:ring-2 focus:ring-c-accent-blue rounded"
            >
              {isMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>

            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              <a href="/" aria-label="Sskutushev - Homepage">
                Sskutushev
              </a>
            </h1>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Sskutushev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile (opens in new tab)"
                className="focus:outline-none focus:ring-2 focus:ring-c-accent-blue rounded"
              >
                <Github size={20} aria-hidden="true" />
              </a>

              <button
                onClick={toggleLanguage}
                className="px-2 py-1 text-sm rounded border border-c-border focus:outline-none focus:ring-2 focus:ring-c-accent-blue"
                aria-label={`Switch language to ${i18n.language === "ru" ? "English" : "Russian"}. Current: ${i18n.language.toUpperCase()}`}
              >
                {i18n.language.toUpperCase()}
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 focus:outline-none focus:ring-2 focus:ring-c-accent-blue rounded"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? (
                  <Sun size={18} aria-hidden="true" />
                ) : (
                  <Moon size={18} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 z-40 md:hidden"
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
              >
                <motion.div
                  ref={menuRef as any}
                  id="mobile-menu"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  className="mt-16 bg-c-bg-primary rounded-b-2xl shadow-lg mx-4 p-8"
                  role="dialog"
                  aria-label="Mobile navigation menu"
                >
                  <nav aria-label="Mobile navigation">
                    <div className="flex flex-col items-center gap-6">
                      {navigationItems.map(({ id, label }) => (
                        <ScrollLink
                          key={id}
                          to={id}
                          smooth
                          duration={500}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-xl cursor-pointer hover:text-c-accent-blue transition focus:outline-none focus:ring-2 focus:ring-c-accent-blue rounded px-2"
                          tabIndex={0}
                          aria-label={`${label}`}
                          title={label}
                        >
                          {label}
                        </ScrollLink>
                      ))}
                    </div>
                  </nav>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
};
