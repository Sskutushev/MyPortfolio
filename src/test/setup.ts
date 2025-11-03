// src/test/setup.ts
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// Cleanup после каждого теста
afterEach(() => {
  cleanup();
});

// Mock для window.matchMedia (для responsive компонентов)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock для IntersectionObserver (для Framer Motion)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock для window.scrollTo
window.scrollTo = () => {};

// Mock for HTMLCanvasElement.prototype.getContext (for tests involving canvas)
Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () => ({
    fillRect: () => {},
    clearRect: () => {},
    getImageData: (x: any, y: any, w: any, h: any) => ({
      data: new Array(w * h * 4).fill(0),
    }),
    putImageData: () => {},
    createImageData: () => [],
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {},
    measureText: () => ({ width: 0 }),
    transform: () => {},
    rect: () => {},
    clip: () => {},
  }),
});

// Mock для requestIdleCallback (для axe-core)
window.requestIdleCallback =
  window.requestIdleCallback ||
  ((callback) => {
    setTimeout(callback, 1);
  });
window.cancelIdleCallback =
  window.cancelIdleCallback ||
  ((id) => {
    clearTimeout(id);
  });
