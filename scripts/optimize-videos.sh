#!/bin/bash

# Скрипт оптимизации видео

# Использование: ./scripts/optimize-videos.sh

INPUT_DIR="public/images"
OUTPUT_DIR="public/images/optimized"

mkdir -p "$OUTPUT_DIR"

for video in "$INPUT_DIR"/*.mp4 "$INPUT_DIR"/*.MP4; do
  if [ -f "$video" ]; then
    filename=$(basename "$video")
    name="${filename%.*}"

    echo "Optimizing $filename..."

    # Основное видео (оптимизированное)
    ffmpeg -i "$video" \
      -c:v libx264 \
      -preset slow \
      -crf 28 \
      -vf "scale=1920:-2" \
      -movflags +faststart \
      -c:a aac \
      -b:a 128k \
      "$OUTPUT_DIR/${name}.mp4" \
      -y

    # Создаем poster (первый кадр)
    ffmpeg -i "$video" \
      -vframes 1 \
      -q:v 2 \
      "$OUTPUT_DIR/${name}-poster.jpg" \
      -y

    # WebM версия для лучшей поддержки
    ffmpeg -i "$video" \
      -c:v libvpx-vp9 \
      -crf 35 \
      -b:v 0 \
      -vf "scale=1920:-2" \
      -c:a libopus \
      -b:a 96k \
      "$OUTPUT_DIR/${name}.webm" \
      -y

    echo "✓ Done: $filename"

  fi
done

echo "All videos optimized!"

