// src/contexts/ThemeContext.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { useTheme } from './ThemeContext';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('ThemeContext', () => {
  it('provides default theme', () => {
    render(<TestComponent />);
    const themeElement = screen.getByTestId('theme');
    expect(themeElement.textContent).toMatch(/light|dark/);
  });

  it('toggles theme when toggleTheme is called', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const initialTheme = screen.getByTestId('theme').textContent;
    const button = screen.getByText('Toggle');

    await user.click(button);

    const newTheme = screen.getByTestId('theme').textContent;
    expect(newTheme).not.toBe(initialTheme);

  });
});
