// src/components/common/Button.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies primary variant styles by default", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByText("Primary");
    expect(button).toHaveClass("bg-gradient-primary");
  });

  it("applies secondary variant styles", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByText("Secondary");
    expect(button).toHaveClass("bg-c-bg-tertiary");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByText("Click"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });
});
