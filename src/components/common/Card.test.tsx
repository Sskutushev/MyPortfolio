// src/components/common/Card.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children content", () => {
    render(<Card>Test content</Card>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies hoverable styles when hoverable is true", () => {
    const { container } = render(<Card hoverable>Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass("hover:border-c-accent-blue");
  });

  it("does not apply hoverable styles when hoverable is false", () => {
    const { container } = render(<Card hoverable={false}>Content</Card>);
    const card = container.firstChild;
    expect(card).not.toHaveClass("hover:border-c-accent-blue");
  });

  it("merges custom className", () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass("custom-class");
    expect(card).toHaveClass("rounded-2xl"); // default class
  });
});
