import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, MessageSquare, Github } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion-config";
import { ymGoal } from "@/lib/metrics";
import { useState } from "react"; // Import useState

export const ContactSection = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false); // State for copy feedback

  const handleCopyClick = async () => {
    const emailAddress = "Sskutushev@gmail.com"; // Define email address here
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      ymGoal("copy_email"); // Track copy event
    } catch (err) {
      console.error("Failed to copy email:", err);
      // Optionally, provide user feedback that copying failed
    }
  };

  return (
    <section
      id="contact"
      className="section-with-matrix py-24 bg-c-bg-secondary relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeInUp} className="relative z-10 text-center mb-16">
          <h2
            id="contact-heading"
            className="pb-2 text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent"
          >
            {t("contact.title")}
          </h2>
          <p className="text-xl text-c-text-secondary">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid md:grid-cols-12 gap-8 max-w-7xl mx-auto items-center"
        >
          {/* Contact Info */}
          <motion.div
            {...fadeInUp}
            className="md:col-span-8 md:col-start-3 space-y-6"
            aria-label="Contact information"
          >
            <h3 className="text-2xl font-bold mb-6">
              {t("contact.info.title")}
            </h3>
            <div className="p-6 rounded-xl bg-c-bg-primary border border-c-border font-mono text-sm space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="text-c-accent-green" size={16} />
                <span>
                  <span className="text-c-accent-purple">const</span>{" "}
                  <span className="text-c-accent-cyan">telegram</span>{" "}
                  <span className="text-c-text-secondary">=</span>{" "}
                  <span className="text-c-accent-green">'@sskutushev'</span>
                  <span className="text-c-text-secondary">;</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-c-accent-green" size={16} />
                <span>
                  <span className="text-c-accent-purple">const</span>{" "}
                  <span className="text-c-accent-cyan">email</span>{" "}
                  <span className="text-c-text-secondary">=</span>{" "}
                  <span className="text-c-accent-green">
                    'Sskutushev@gmail.com'
                  </span>
                  <span className="text-c-text-secondary">;</span>
                </span>
              </div>
            </div>
            <a
              href="https://t.me/sskutushev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-c-bg-primary border border-c-border hover:border-c-accent-blue transition group"
              onClick={() => ymGoal("click_telegram")}
            >
              <MessageSquare className="text-c-accent-blue" />
              <div>
                <div className="font-semibold group-hover:text-c-accent-blue transition">
                  Telegram
                </div>
                <div className="text-sm text-c-text-secondary">@sskutushev</div>
              </div>
            </a>
            <button // Changed from <a> to <button>
              className="flex items-center gap-3 p-4 rounded-xl bg-c-bg-primary border border-c-border hover:border-c-accent-blue transition group relative w-full text-left" // Added w-full text-left for consistent styling
              onClick={handleCopyClick} // onClick handler directly calls copy logic
            >
              <Mail className="text-c-accent-blue" />
              <div>
                <div className="font-semibold group-hover:text-c-accent-blue transition">
                  Email
                </div>
                <div className="text-sm text-c-text-secondary">
                  Sskutushev@gmail.com
                </div>
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 bg-c-accent-blue text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-50"
                    >
                      Email copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>
            <a
              href="https://github.com/Sskutushev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-c-bg-primary border border-c-border hover:border-c-accent-blue transition group"
              onClick={() => ymGoal("click_github")}
            >
              <Github className="text-c-accent-blue" />
              <div>
                <div className="font-semibold group-hover:text-c-accent-blue transition">
                  GitHub
                </div>
                <div className="text-sm text-c-text-secondary">
                  github.com/Sskutushev
                </div>
              </div>
            </a>
            <div className="p-6 rounded-xl bg-gradient-primary/10 border border-c-accent-blue/30">
              <div className="flex items-start gap-3">
                <MessageSquare className="text-c-accent-blue flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">
                    {t("contact.info.availabilityTitle")}
                  </h4>
                  <p className="text-sm text-c-text-secondary">
                    {t("contact.info.availabilityDescription")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
