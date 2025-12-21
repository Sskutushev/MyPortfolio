import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext"; // Import useTheme

interface MatrixBackgroundProps {
  className?: string;
}

const characters = [
  // Бинарный код (40%)
  "0",
  "1",
  "0",
  "1",
  "0",
  "1",
  "0",
  "1",
  // Программные символы (30%)
  "<",
  ">",
  "/",
  "*",
  "#",
  // Иконки технологий (30%)
  "⚛", // React
  "TS", // TypeScript
  "JS", // JavaScript
];

export const MatrixBackground: React.FC<MatrixBackgroundProps> = ({
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme(); // Use the theme from context
  const animationFrameId = useRef<number | undefined>(undefined);
  const lastTime = useRef<number>(0);
  const resizeTimeout = useRef<number | undefined>(undefined);
  const drops = useRef<Array<{ y: number; xOffset: number }>>([]); // To store the y-position and xOffset of each drop
  const scrollY = useRef(0); // Use ref to prevent re-renders on scroll

  const config = useMemo(
    () => ({
      fontSize: 16, // px
      fontFamily: "JetBrains Mono, Courier New, monospace",
      columnWidth: 20, // px (между колонками)
      baseSpeed: 50, // ms между кадрами (20 FPS)
      dropLength: 15, // количество символов в столбце
      glitchProbability: 0.05, // 5% шанс вспышки
    }),
    [],
  );

  const getThemeColors = useCallback(() => {
    if (theme === "dark") {
      return {
        background: "rgba(10, 11, 13, 0.05)", // trail effect
        symbolColor: "#8B5CF6", // violet
        glitchColor: "#a78bfa", // brighter violet
      };
    } else {
      return {
        background: "#F9FAFB", // Use a solid light color (bg-secondary) to prevent dark artifacts
        symbolColor: "#14b8a6", // turquoise
        glitchColor: "#5eead4", // brighter turquoise
      };
    }
  }, [theme]);

  const reinitCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.font = `${config.fontSize}px ${config.fontFamily}`;
    ctx.textBaseline = "top";

    // Use consistent column width across devices, or adjust as needed
    const actualColumnWidth = config.columnWidth;
    const columnCount = Math.floor(canvas.width / actualColumnWidth);

    // Center the animation horizontally if there's leftover space
    const xOffset = (canvas.width % actualColumnWidth) / 2;

    // Initialize drops at y=0 for each column, storing xOffset for drawing
    drops.current = Array(columnCount)
      .fill(0)
      .map((_, i) => ({ y: 0, xOffset: xOffset + i * actualColumnWidth }));
  }, [config.fontSize, config.fontFamily, config.columnWidth]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { background, symbolColor, glitchColor } = getThemeColors();

    // Trail effect
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${config.fontSize}px ${config.fontFamily}`;

    for (let i = 0; i < drops.current.length; i++) {
      const drop = drops.current[i];
      const x = drop.xOffset;
      const y = drop.y;

      const char = characters[Math.floor(Math.random() * characters.length)];

      ctx.fillStyle =
        Math.random() < config.glitchProbability ? glitchColor : symbolColor;
      ctx.globalAlpha = theme === "dark" ? 0.8 : 0.4; // Increased alpha for light theme
      ctx.fillText(char, x, y);

      // Move the drop down
      const adjustedSpeed = 1 + scrollY.current * 0.001; // Parallax effect
      drop.y += config.fontSize * adjustedSpeed;

      // Reset drop to top if it goes off screen (or randomly)
      if (drop.y * 1.5 > canvas.height && Math.random() > 0.975) {
        drop.y = 0;
      }
    }
  }, [
    config.columnWidth,
    config.glitchProbability,
    config.fontSize,
    config.fontFamily,
    getThemeColors,
    theme,
  ]);

  const animate = useCallback(
    (currentTime: number) => {
      const interval = config.baseSpeed;
      const deltaTime = currentTime - lastTime.current;

      if (deltaTime > interval) {
        draw();
        lastTime.current = currentTime - (deltaTime % interval);
      }
      animationFrameId.current = requestAnimationFrame(animate);
    },
    [draw, config.baseSpeed],
  );

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      return; // Do not run animation
    }

    // Initialize canvas
    reinitCanvas();

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
    window.addEventListener("resize", handleResize);

    // Scroll handler for parallax
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

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
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimeout.current);
    };
  }, [reinitCanvas, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none ${className || ""}`}
      aria-hidden="true"
    />
  );
};
