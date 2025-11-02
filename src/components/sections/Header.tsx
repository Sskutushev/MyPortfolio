// src/components/sections/Header.tsx
import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X, Sun, Moon, Github } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-c-bg-primary/80 border-b border-c-border">
      <nav className="container mx-auto px-4 py-4">
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Sskutushev
          </h1>
          
          <div className="flex items-center gap-8">
            {/* Navigation Links */}
            <ScrollLink to="about" smooth duration={500} className="cursor-pointer hover:text-c-accent-blue transition">
              {t('nav.about')}
            </ScrollLink>
            <ScrollLink to="experience" smooth duration={500} className="cursor-pointer hover:text-c-accent-blue transition">
              {t('nav.experience')}
            </ScrollLink>
            <ScrollLink to="portfolio" smooth duration={500} className="cursor-pointer hover:text-c-accent-blue transition">
              {t('nav.portfolio')}
            </ScrollLink>
            <ScrollLink to="stack" smooth duration={500} className="cursor-pointer hover:text-c-accent-blue transition">
              {t('nav.stack')}
            </ScrollLink>
            <ScrollLink to="contact" smooth duration={500} className="cursor-pointer hover:text-c-accent-blue transition">
              {t('nav.contact')}
            </ScrollLink>
            
            {/* Action Buttons */}
            <a href="https://github.com/Sskutushev" target="_blank" rel="noopener noreferrer" 
               className="hover:text-c-accent-blue transition">
              <Github size={20} />
            </a>
            <button onClick={toggleLanguage} className="px-3 py-1 rounded-lg border border-c-border hover:border-c-accent-blue transition">
              {i18n.language.toUpperCase()}
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-c-bg-tertiary transition">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center justify-between">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Sskutushev
          </h1>
          <div className="flex items-center gap-2">
            <a href="https://github.com/Sskutushev" target="_blank" rel="noopener noreferrer">
              <Github size={20} />
            </a>
            <button onClick={toggleLanguage} className="px-2 py-1 text-sm rounded border border-c-border">
              {i18n.language.toUpperCase()}
            </button>
            <button onClick={toggleTheme} className="p-2">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 bg-c-bg-primary z-40 md:hidden rounded-2xl backdrop-blur-sm">
            <div className="flex flex-col items-center gap-6 py-8">
              {['about', 'experience', 'portfolio', 'stack', 'contact'].map((section) => (
                <ScrollLink
                  key={section}
                  to={section}
                  smooth
                  duration={500}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl cursor-pointer hover:text-c-accent-blue transition"
                >
                  {t(`nav.${section}`)}
                </ScrollLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};