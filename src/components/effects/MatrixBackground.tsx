import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';

interface MatrixBackgroundProps {
  className?: string;
}

const characters = [
  // Бинарный код (40%)
  '0', '1', '0', '1', '0', '1', '0', '1',
  // Программные символы (30%)
'<', '>', '/', '*', '#',
  // Иконки технологий (30%)
  '⚛', // React
  'TS', // TypeScript
  'JS', // JavaScript
];

export const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const animationFrameId = useRef<number>();
  const lastTime = useRef<number>(0);
  const resizeTimeout = useRef<NodeJS.Timeout>();
  const drops = useRef<number[]>([]); // To store the y-position of each drop
  const [scrollY, setScrollY] = useState(0);

  const config = useMemo(() => ({
    fontSize: 16, // px
    fontFamily: 'JetBrains Mono, Courier New, monospace',
    columnWidth: 20, // px (между колонками)
    baseSpeed: 50, // ms между кадрами (20 FPS)
    dropLength: 15, // количество символов в столбце
    glitchProbability: 0.05, // 5% шанс вспышки
  }), []);

  const getThemeColors = useCallback(() => {
    if (theme === 'dark') {
      return {
        background: 'rgba(10, 11, 13, 0.05)', // trail effect
        symbolColor: '#8B5CF6', // violet
        glitchColor: '#a78bfa', // brighter violet
      };
    } else {
      return {
        background: 'rgba(255, 255, 255, 0.15)', // trail effect
        symbolColor: '#14b8a6', // turquoise
        glitchColor: '#5eead4', // brighter turquoise
      };
    }
  }, [theme]);

  const reinitCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.font = `${config.fontSize}px ${config.fontFamily}`;
    ctx.textBaseline = 'top';

    const isMobile = window.innerWidth < 768;
    const actualColumnWidth = isMobile ? config.columnWidth * 2 : config.columnWidth;
    const columnCount = Math.floor(canvas.width / actualColumnWidth);
    drops.current = Array(columnCount).fill(0); // Initialize drops at y=0 for each column
  }, [config.fontSize, config.fontFamily, config.columnWidth]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { background, symbolColor, glitchColor } = getThemeColors();

    // Trail effect
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const isMobile = window.innerWidth < 768;
    const actualColumnWidth = isMobile ? config.columnWidth * 2 : config.columnWidth;
    
    ctx.font = `${config.fontSize}px ${config.fontFamily}`;

    for (let i = 0; i < drops.current.length; i++) {
      const x = i * actualColumnWidth;
      const y = drops.current[i];

      const char = characters[Math.floor(Math.random() * characters.length)];

      ctx.fillStyle = Math.random() < config.glitchProbability ? glitchColor : symbolColor;
      ctx.globalAlpha = theme === 'dark' ? 0.8 : (Math.random() * 0.1 + 0.15); 
      ctx.fillText(char, x, y);

      // Move the drop down
      const adjustedSpeed = 1 + (scrollY * 0.001); // Parallax effect
      drops.current[i] += config.fontSize * adjustedSpeed;

      // Reset drop to top if it goes off screen (or randomly)
      if (drops.current[i] * 1.5 > canvas.height && Math.random() > 0.975) {
        drops.current[i] = 0;
      }
    }

  }, [config.columnWidth, config.glitchProbability, config.fontSize, config.fontFamily, getThemeColors, theme, scrollY]);

  const animate = useCallback((currentTime: number) => {
    const interval = config.baseSpeed;
    const deltaTime = currentTime - lastTime.current;

    if (deltaTime > interval) {
      draw();
      lastTime.current = currentTime - (deltaTime % interval);
    }
    animationFrameId.current = requestAnimationFrame(animate);
  }, [draw, config.baseSpeed]);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return; // Do not run animation
    }

    // Initialize canvas
    reinitCanvas();

    // Theme observer
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Start animation
    const startAnimation = () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        animationFrameId.current = requestAnimationFrame(animate);
    };
    startAnimation();


    // Resize handler
    const handleResize = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        reinitCanvas();
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    // Scroll handler for parallax
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Visibility change handler for pausing animation
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
      } else {
        startAnimation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);


    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimeout.current);
    };
  }, [reinitCanvas, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none ${className || ''}`}
      aria-hidden="true"
    />
  );
};

