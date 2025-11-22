// src/components/common/ProjectModal.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, Code } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

// Map project IDs to translation keys
const PROJECT_TRANSLATION_MAP: Record<number, string> = {
  1: "dexsafe", // DexSafe Wallet Pro
  2: "ecochain", // EcoChain Token Platform
  3: "airbro", // AIRBRO Business
  4: "dexflow", // DexFlow
  5: "portfolio", // Reactive Velocity Portfolio
  6: "landingspace", // Landing Space
  7: "vangogh", // Van Gogh Link
  8: "tot", // TOT
};

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"flow" | "code">("flow");

  // Check if translation exists for this project
  const projectIdKey = PROJECT_TRANSLATION_MAP[project.id];
  const hasTranslation =
    !!projectIdKey &&
    t(`projects.${projectIdKey}.flowInput`) !==
      `projects.${projectIdKey}.flowInput`;

  return (
    <Modal isOpen={!!project} onClose={onClose}>
      <div className="sticky top-0 z-10 p-6 border-b border-c-border bg-c-bg-primary/95 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-c-accent-blue hover:underline"
              >
                <ExternalLink size={24} />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-c-bg-tertiary transition"
          >
            ✕
          </button>
        </div>
        <div className="flex gap-4 mt-6">
          {["flow", "code"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${activeTab === tab ? "bg-gradient-primary text-white" : "bg-c-bg-tertiary text-c-text-secondary hover:text-c-text-primary"}`}
            >
              {tab === "flow"
                ? t("portfolio.processTab") || "The Flow"
                : t("portfolio.codeTab") || "Code Highlight"}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {activeTab === "flow" ? (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-c-bg-secondary border border-c-border">
              <h4 className="text-sm font-semibold text-c-accent-blue mb-2">
                {t("portfolio.input")}
              </h4>
              <p className="text-c-text-secondary">
                {hasTranslation
                  ? t(`projects.${projectIdKey}.flowInput`)
                  : project.flow.input}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-c-bg-secondary border border-c-border">
              <h4 className="text-sm font-semibold text-c-accent-purple mb-2">
                {t("portfolio.process")}
              </h4>
              <p className="text-c-text-secondary">
                {hasTranslation
                  ? t(`projects.${projectIdKey}.flowProcess`)
                  : project.flow.process}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-c-bg-secondary border border-c-border">
              <h4 className="text-sm font-semibold text-c-accent-green mb-2">
                {t("portfolio.output")}
              </h4>
              <p className="text-c-text-secondary">
                {hasTranslation
                  ? t(`projects.${projectIdKey}.flowOutput`)
                  : project.flow.output}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code size={24} className="text-c-accent-blue" />
              <h4 className="text-lg font-semibold">
                {hasTranslation
                  ? t(`projects.${projectIdKey}.codeTitle`)
                  : project.codeHighlight.title}
              </h4>
            </div>
            <pre className="block w-full p-6 rounded-xl bg-c-bg-tertiary border border-c-border overflow-x-auto">
              <code className="text-sm text-c-text-secondary font-mono">
                {project.codeHighlight.code}
              </code>
            </pre>
          </div>
        )}
      </div>
    </Modal>
  );
};
