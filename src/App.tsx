// src/App.tsx
import { Header } from './components/sections/Header';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { StackSection } from './components/sections/StackSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { AdvantagesSection } from './components/sections/AdvantagesSection';
import { ContactSection } from './components/sections/ContactSection';

function App() {
  return (
    <div className="min-h-screen bg-c-bg-primary text-c-text-primary">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <PortfolioSection />
        <StackSection />
        <ProcessSection />
        <AdvantagesSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;