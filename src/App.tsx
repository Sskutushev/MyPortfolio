import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/sections/Header';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { StackSection } from './components/sections/StackSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { AdvantagesSection } from './components/sections/AdvantagesSection';
import { ContactSection } from './components/sections/ContactSection';
import { PortfolioPage } from './pages/PortfolioPage';

const MainLayout = () => (
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
);

function App() {
  const location = useLocation();
  const isPortfolioPage = location.pathname === '/portfolio';

  return (
    <div className="min-h-screen bg-c-bg-primary text-c-text-primary">
      {!isPortfolioPage && <Header />}
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </div>
  );
}

export default App;