import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, MessageSquare } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion-config";

export const ContactSection = () => {
  const { t } = useTranslation();

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
                  <span className="text-c-accent-cyan">contact</span>{" "}
                  <span className="text-c-text-secondary">=</span>{" "}
                  <span className="text-c-accent-green">
                    '[No contact info]'
                  </span>
                  <span className="text-c-text-secondary">;</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-c-accent-green" size={16} />
                <span>
                  <span className="text-c-accent-purple">const</span>{" "}
                  <span className="text-c-accent-cyan">email</span>{" "}
                  <span className="text-c-text-secondary">=</span>{" "}
                  <span className="text-c-accent-green">'[No email]'</span>
                  <span className="text-c-text-secondary">;</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-c-bg-primary border border-c-border">
              <MessageSquare className="text-c-accent-blue" />
              <div>
                <div className="font-semibold">Telegram</div>
                <div className="text-sm text-c-text-secondary">
                  [No contact]
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-c-bg-primary border border-c-border">
              <Mail className="text-c-accent-blue" />
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-sm text-c-text-secondary">[No email]</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-c-bg-primary border border-c-border">
              <div>
                <div className="font-semibold">GitHub</div>
                <div className="text-sm text-c-text-secondary">
                  [No profile]
                </div>
              </div>
            </div>
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
