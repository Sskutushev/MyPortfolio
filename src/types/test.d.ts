// src/types/test.d.ts

import('@testing-library/jest-dom');

// Extend Jest/Vitest matchers with Testing Library ones
// This file is needed because of the way we're using jest-dom matchers with Vitest
declare global {
  namespace Vi {
    interface Assertion {
      toHaveNoViolations(): Promise<void>;
      toBeInTheDocument(): Promise<void>;
      toHaveClass(expected: string): Promise<void>;
      toBeDisabled(): Promise<void>;
      toHaveAttribute(attr: string, value?: string): Promise<void>;
    }
    interface AsymmetricMatchersContaining {
      toHaveNoViolations(): Promise<void>;
      toBeInTheDocument(): Promise<void>;
      toHaveClass(expected: string): Promise<void>;
      toBeDisabled(): Promise<void>;
      toHaveAttribute(attr: string, value?: string): Promise<void>;
    }
  }
}

export {};