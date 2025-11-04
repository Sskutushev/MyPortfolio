// src/components/common/OptimizedVideo.tsx
import { useEffect, useRef, useState } from "react";

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  width?: number;
  height?: number;
}

export const OptimizedVideo = ({
  src,
  poster,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  width,
  height,
}: OptimizedVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);

        if (entry.isIntersecting && videoRef.current) {
          // Начать загрузку видео только когда оно в viewport
          videoRef.current.load();
        } else if (!entry.isIntersecting && videoRef.current) {
          // Приостановить видео когда оно вне viewport
          videoRef.current.pause();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "50px",
      },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && autoPlay && videoRef.current && isLoaded) {
      videoRef.current.play().catch(console.error);
    }
  }, [isInView, autoPlay, isLoaded]);

  const lowerCaseSrc = src.toLowerCase();

  return (
    <div
      style={{
        position: "relative",
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
      }}
    >
      <video
        ref={videoRef}
        className={className}
        poster={poster}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload="metadata"
        width={width}
        height={height}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onLoadedData={() => setIsLoaded(true)}
      >
        {lowerCaseSrc.endsWith(".webm") && (
          <source src={src} type="video/webm" />
        )}
        {lowerCaseSrc.endsWith(".mp4") && <source src={src} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
