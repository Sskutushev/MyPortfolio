// src/types/test.d.ts
import { Assertion, AsymmetricMatchersContaining } from 'vitest';

interface CustomMatchers<R = unknown> {
  toHaveNoViolations(): R;
  toBeInTheDocument(): R;
  toHaveClass(expected: string): R;
  toBeDisabled(): R;
  toHaveAttribute(attr: string, value?: string): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}