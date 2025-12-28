// src/components/common/ProjectModal.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, Code, Github } from "lucide-react";
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
  9: "lumi", // Lumi
  10: "course", // Course Catalog
  11: "yokai", // Yokai Threat Matrix
  12: "moviecatalog", // MovieCatalog
  13: "rkn", // RKN Simulator
  14: "moviecatalog", // MovieCatalog
  15: "rkn", // RKN Simulator
};

// Map project IDs to GitHub links
const PROJECT_GITHUB_MAP: Record<number, string> = {
  1: "https://github.com/Sskutushev/Presentation-site-landing", // DexSafe Wallet Pro
  2: "https://github.com/Sskutushev/1Xecochain", // EcoChain Token Platform
  3: "https://github.com/Sskutushev/AIRBRO", // AIRBRO Business
  4: "https://github.com/Sskutushev/DexFlow", // DexFlow
  5: "https://github.com/Sskutushev/MyPortfolio", // Reactive Velocity Portfolio
  6: "https://github.com/Sskutushev/Landing-space", // Landing Space
  7: "https://github.com/Sskutushev/VAN_Gogh_Link", // Van Gogh Link
  8: "https://github.com/Sskutushev/TOT-Test", // TOT
  9: "https://github.com/Sskutushev/Lumi", // Lumi
  10: "https://github.com/Sskutushev/Test-Kozyrev", // Course Catalog
  11: "https://github.com/Sskutushev/Yokai-Threat-Matrix-YTM", // Yokai Threat Matrix
  12: "https://github.com/Sskutushev/effective-mobile", // MovieCatalog
  13: "https://github.com/Sskutushev/RKN_simulator", // RKN Simulator
  14: "https://github.com/Sskutushev/effective-mobile", // MovieCatalog
  15: "https://github.com/Sskutushev/RKN_simulator", // RKN Simulator
  16: "https://github.com/Sskutushev/nft-marketplace", // NFT Marketplace
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

  // Get GitHub link for this project
  const githubLink = PROJECT_GITHUB_MAP[project.id];

  return (
    <Modal isOpen={!!project} onClose={onClose}>
      <div className="sticky top-0 z-10 p-6 border-b border-c-border bg-c-bg-primary/95 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
            <div className="flex gap-2">
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-c-accent-blue hover:underline"
                  aria-label="Visit GitHub repository"
                >
                  <Github size={24} />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-c-accent-blue hover:underline"
                  aria-label="Visit project website"
                >
                  {project.link.includes("github.com") ? (
                    <ExternalLink size={24} />
                  ) : (
                    <ExternalLink size={24} />
                  )}
                </a>
              )}
            </div>
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
