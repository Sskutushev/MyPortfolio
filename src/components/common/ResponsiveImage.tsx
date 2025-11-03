// src/components/common/ResponsiveImage.tsx
interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export const ResponsiveImage = ({
  src,
  alt,
  className = '',
  sizes = '100vw'
}: ResponsiveImageProps) => {
  const basePath = src.replace(/\.(jpg|jpeg|png)$/i, '');
  const extension = src.match(/\.(jpg|jpeg|png)$/i)?.[1] || 'jpg';

  return (
    <picture>
      {/* WebP формат для современных браузеров */}
      <source
        type="image/webp"
        srcSet={`          ${basePath}-320.webp 320w,
          ${basePath}-640.webp 640w,
          ${basePath}-1024.webp 1024w,
          ${basePath}-1920.webp 1920w
       `}
        sizes={sizes}
      />

      {/* Fallback для старых браузеров */}
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        srcSet={`
          ${basePath}-320.${extension} 320w,
          ${basePath}-640.${extension} 640w,
          ${basePath}-1024.${extension} 1024w,
          ${basePath}-1920.${extension} 1920w
        `}
        sizes={sizes}
      />
    </picture>

  );
};
