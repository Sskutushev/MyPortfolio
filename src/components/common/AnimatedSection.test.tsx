// src/components/common/AnimatedSection.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { AnimatedSection } from './AnimatedSection';

describe('AnimatedSection', () => {
  it('renders children', () => {
    render(
      <AnimatedSection>
        <div>Test content</div>
      </AnimatedSection>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <AnimatedSection className="custom">
        <div>Content</div>
      </AnimatedSection>
    );
    expect(container.firstChild).toHaveClass('custom');
  });
});
