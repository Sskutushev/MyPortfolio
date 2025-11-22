// src/components/common/LazyImage.tsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  aspectRatio?: string; // например "16/9", "4/3", "1/1"
  placeholder?: string;
}

export const LazyImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  aspectRatio = "16/9", // По умолчанию соотношение сторон 16:9
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3C/svg%3E',
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Расчет соотношения сторон для предотвращения layout shift
  const [aspectWidth, aspectHeight] = aspectRatio.split("/").map(Number);
  const calculatedAspectRatio = aspectHeight
    ? aspectWidth / aspectHeight
    : 16 / 9;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : undefined,
        // Используем padding-top trick для предотвращения layout shifts
        ...(height ? {} : { 
          position: "relative", 
          paddingTop: `${100 / calculatedAspectRatio}%` 
        })
      }}
    >
      <motion.img
        ref={imgRef}
        src={isInView ? src : placeholder}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        loading="lazy"
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: height ? "100%" : "100%",
          objectFit: "cover",
          // Убираем анимацию scale для уменьшения CLS
        }}
      />
    </div>
  );
};
