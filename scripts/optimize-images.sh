#!/bin/bash

INPUT_DIR="public/images"
OUTPUT_DIR="public/images/optimized"

mkdir -p "$OUTPUT_DIR"

# Оптимизация PNG

for img in "$INPUT_DIR"/*.png "$INPUT_DIR"/*.PNG; do
  if [ -f "$img" ]; then
    filename=$(basename "$img")
    name="${filename%.*}"

    echo "Optimizing $filename..."

    # PNG оптимизация
    convert "$img" -strip -quality 85 "$OUTPUT_DIR/$filename"

    # WebP версия
    cwebp -q 85 "$img" -o "$OUTPUT_DIR/${name}.webp"

    echo "✓ Done: $filename"

  fi
done

# Оптимизация JPG

for img in "$INPUT_DIR"/*.jpg "$INPUT_DIR"/*.jpeg "$INPUT_DIR"/*.JPG "$INPUT_DIR"/*.JPEG; do
  if [ -f "$img" ]; then
    filename=$(basename "$img")
    name="${filename%.*}"

    echo "Optimizing $filename..."

    # JPG оптимизация
    convert "$img" -strip -quality 85 -sampling-factor 4:2:0 "$OUTPUT_DIR/$filename"

    # WebP версия
    cwebp -q 85 "$img" -o "$OUTPUT_DIR/${name}.webp"

    echo "✓ Done: $filename"

  fi
done

echo "All images optimized!"
