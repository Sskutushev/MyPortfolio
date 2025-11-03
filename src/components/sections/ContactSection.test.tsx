// src/components/sections/ContactSection.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { ContactSection } from "./ContactSection";

// Mock fetch
global.fetch = vi.fn();

// Mock the lazy loaded ReCAPTCHA component
vi.mock("react-google-recaptcha", () => {
  const RecaptchaMock = ({
    onChange,
  }: {
    onChange?: (token: string | null) => void;
  }) => {
    // Simulate that reCAPTCHA has a valid token
    // Immediately set the token when the component is rendered
    if (onChange) {
      setTimeout(() => {
        onChange("test-token");
      }, 0);
    }
    return <div data-testid="recaptcha-mock">reCAPTCHA</div>;
  };
  return {
    default: RecaptchaMock,
  };
});

describe("ContactSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders contact form", async () => {
    render(<ContactSection />);
    // Wait for animations to complete so elements are visible
    await waitFor(
      () => {
        expect(screen.getByTestId("name-input")).toBeInTheDocument();
      },
      { timeout: 10000 },
    );

    expect(screen.getByTestId("contact-input")).toBeInTheDocument();
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
    // Find submit button by its actual text "Начать Проект" which appears in the DOM
    expect(
      screen.getByText(/начать проект|start project/i),
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    // Wait for the form and the mock reCAPTCHA to be ready
    await waitFor(
      () => {
        expect(screen.getByTestId("name-input")).toBeInTheDocument();
        expect(screen.getByTestId("recaptcha-mock")).toBeInTheDocument();
      },
      { timeout: 10000 },
    );

    const submitButton = screen.getByText(/начать проект|start project/i);
    await user.click(submitButton);

    // Wait for validation errors to appear
    await waitFor(
      () => {
        const errorElements = screen.queryAllByText(
          /обязательно|required|необходимо|must not be empty|введите|заполните/i,
        );
        const errorAlerts = screen.queryAllByRole("alert");
        expect(errorElements.length + errorAlerts.length).toBeGreaterThan(0);
      },
      { timeout: 10000 },
    );
  });

  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactSection />);
    
    // Wait for the form and the mock reCAPTCHA to be ready
    await waitFor(
      () => {
        expect(screen.getByTestId("name-input")).toBeInTheDocument();
        expect(screen.getByTestId("recaptcha-mock")).toBeInTheDocument();
      },
      { timeout: 10000 },
    );

    await user.type(screen.getByTestId("name-input"), "John Doe");
    await user.type(screen.getByTestId("contact-input"), "john@example.com");
    await user.type(screen.getByTestId("message-input"), "Hello!");

    const submitButton = screen.getByText(/начать проект|start project/i);
    await user.click(submitButton);

    // Wait for the fetch call to complete
    await waitFor(
      () => {
        expect(global.fetch).toHaveBeenCalledWith(
          "/api/sendMessage",
          expect.objectContaining({
            method: "POST",
          }),
        );
      },
      { timeout: 10000 },
    );
  });

  it("displays success message on successful submission", async () => {
    const user = userEvent.setup();
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactSection />);

    // Wait for the form and the mock reCAPTCHA to be ready
    await waitFor(
      () => {
        expect(screen.getByTestId("name-input")).toBeInTheDocument();
        expect(screen.getByTestId("recaptcha-mock")).toBeInTheDocument();
      },
      { timeout: 10000 },
    );

    await user.type(screen.getByTestId("name-input"), "John Doe");
    await user.type(screen.getByTestId("contact-input"), "john@example.com");
    await user.type(screen.getByTestId("message-input"), "Hello!");

    const submitButton = screen.getByText(/начать проект|start project/i);
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(screen.getByTestId("success-message")).toBeInTheDocument();
      },
      { timeout: 10000 },
    );
  });
});
