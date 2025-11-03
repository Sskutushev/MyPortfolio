// src/components/common/LazyImage.tsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
}

export const LazyImage = ({
  src,
  alt,
  className = "",
  width,
  height,
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

  return (
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
    />
  );
};
