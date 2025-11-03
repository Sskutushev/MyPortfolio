import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/sections/Header";
import { HeroSection } from "./components/sections/HeroSection";

// Lazy load all sections except the hero section
const AboutSection = lazy(() =>
  import("./components/sections/AboutSection").then((module) => ({
    default: module.AboutSection,
  })),
);
const ExperienceSection = lazy(() =>
  import("./components/sections/ExperienceSection").then((module) => ({
    default: module.ExperienceSection,
  })),
);
const PortfolioSection = lazy(() =>
  import("./components/sections/PortfolioSection").then((module) => ({
    default: module.PortfolioSection,
  })),
);
const StackSection = lazy(() =>
  import("./components/sections/StackSection").then((module) => ({
    default: module.StackSection,
  })),
);
const ProcessSection = lazy(() =>
  import("./components/sections/ProcessSection").then((module) => ({
    default: module.ProcessSection,
  })),
);
const AdvantagesSection = lazy(() =>
  import("./components/sections/AdvantagesSection").then((module) => ({
    default: module.AdvantagesSection,
  })),
);
const ContactSection = lazy(() =>
  import("./components/sections/ContactSection").then((module) => ({
    default: module.ContactSection,
  })),
);
const PortfolioPage = lazy(() =>
  import("./pages/PortfolioPage").then((module) => ({
    default: module.PortfolioPage,
  })),
);
const UIComponentsPage = lazy(() =>
  import("./pages/UIComponentsPage").then((module) => ({
    default: module.UIComponentsPage,
  })),
);

const MainLayout = () => (
  <main id="main-content" tabIndex={-1}>
    <HeroSection />
    <Suspense fallback={null}>
      <AboutSection />
      <ExperienceSection />
      <PortfolioSection />
      <StackSection />
      <ProcessSection />
      <AdvantagesSection />
      <ContactSection />
    </Suspense>
  </main>
);

function App() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-c-bg-primary text-c-text-primary">
      {isMainPage && <Header />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/ui-components" element={<UIComponentsPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
