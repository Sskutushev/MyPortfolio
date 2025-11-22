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
}

export const OptimizedVideo = ({
  src,
  poster,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: OptimizedVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    if (!videoRef.current) return;

    // Используем passive observer для лучшей производительности
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);

        if (entry.isIntersecting && videoRef.current) {
          // Начать загрузку видео только когда оно в viewport
          videoRef.current.load();
        } else if (!entry.isIntersecting && videoRef.current) {
          // Приостановить видео когда оно вне viewport
          try {
            videoRef.current.pause();
          } catch {
            // Игнорируем ошибки при паузе
          }
          isPlayingRef.current = false;
        }
      },
      {
        threshold: 0.25,
        rootMargin: "50px",
        // Уменьшаем частоту обновлений для лучшей производительности
        // passive: true - этот параметр не поддерживается во всех браузерах
      },
    );

    observer.observe(videoRef.current);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    // Функция для безопасного воспроизведения видео
    const safePlay = async () => {
      if (!video || !isInView || !autoPlay || !isLoaded || isPlayingRef.current)
        return;

      try {
        await video.play();
        isPlayingRef.current = true;
      } catch (error) {
        // Обработка ошибки, включая AbortError, если play был прерван
        if ((error as Error).name !== "AbortError") {
          console.error("Video play error:", error);
        }
        isPlayingRef.current = false;
      }
    };

    // Функция для безопасной паузы видео
    const safePause = () => {
      if (video && isPlayingRef.current) {
        try {
          video.pause();
          isPlayingRef.current = false;
        } catch (error) {
          console.error("Video pause error:", error);
        }
      }
    };

    if (isInView && autoPlay && isLoaded) {
      safePlay();
    } else {
      safePause();
    }

    // Очистка при размонтировании
    return () => {
      safePause();
    };
  }, [isInView, autoPlay, isLoaded]);

  const lowerCaseSrc = src.toLowerCase();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <video
        ref={videoRef}
        className={className}
        poster={poster}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload="none"
        width="100%"
        height="auto"
        onLoadedData={() => setIsLoaded(true)}
        onPlay={() => {
          isPlayingRef.current = true;
        }}
        onPause={() => {
          isPlayingRef.current = false;
        }}
        onEnded={() => {
          isPlayingRef.current = false;
        }}
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
