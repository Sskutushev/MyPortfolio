// src/types/yandex-metrika.d.ts

interface YandexMetrika {
  (counterId: number, method: string, ...args: any[]): void;
}

declare global {
  interface Window {
    ym?: YandexMetrika;
  }
}

export {};
