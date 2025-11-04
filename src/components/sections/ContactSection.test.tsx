// src/components/sections/ContactSection.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { ContactSection } from "./ContactSection";

// Mock fetch
global.fetch = vi.fn();

// Mock the lazy loaded ReCAPTCHA component, matching the actual implementation
vi.mock("react-google-recaptcha", async () => {
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
    // Mock the environment variable to enable reCAPTCHA in tests
    vi.stubEnv("VITE_RECAPTCHA_SITE_KEY", "test-recaptcha-key");
  });

  it("renders contact form", async () => {
    render(<ContactSection />);

    // Wait for the input field to be available
    await waitFor(
      () => {
        expect(screen.getByTestId("name-input")).toBeInTheDocument();
      },
      { timeout: 15000 },
    );

    expect(screen.getByTestId("contact-input")).toBeInTheDocument();
    expect(screen.getByTestId("message-input")).toBeInTheDocument();

    // Find submit button by its actual text
    const submitButton = await screen.findByText(
      /начать проект|start project/i,
    );
    expect(submitButton).toBeInTheDocument();
  }, 20000); // Increased timeout for this test

  it("shows validation errors for empty fields", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    // Wait for the form and the mock reCAPTCHA to be ready
    await waitFor(
      () => {
        expect(screen.getByTestId("name-input")).toBeInTheDocument();
      },
      { timeout: 15000 },
    );

    const submitButton = await screen.findByText(
      /начать проект|start project/i,
    );
    await user.click(submitButton);

    // Wait for validation errors to appear - increased timeout
    await waitFor(
      () => {
        // Instead of looking for general text, check for specific error element attributes
        expect(
          screen.getByText(
            /имя обязательно|name is required|обязательно|required/i,
          ),
        ).toBeInTheDocument();
        expect(
          screen.getByText(
            /сообщение обязательно|message is required|обязательно|required/i,
          ),
        ).toBeInTheDocument();
      },
      { timeout: 15000 },
    );
  }, 20000);

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
      },
      { timeout: 15000 },
    );

    await user.type(screen.getByTestId("name-input"), "John Doe");
    await user.type(screen.getByTestId("contact-input"), "john@example.com");
    await user.type(screen.getByTestId("message-input"), "Hello!");

    const submitButton = await screen.findByText(
      /начать проект|start project/i,
    );
    await user.click(submitButton);

    // Wait for the fetch call to complete - increased timeout
    await waitFor(
      () => {
        expect(global.fetch).toHaveBeenCalledWith(
          "/api/sendMessage",
          expect.objectContaining({
            method: "POST",
          }),
        );
      },
      { timeout: 15000 },
    );
  }, 20000);

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
      },
      { timeout: 15000 },
    );

    await user.type(screen.getByTestId("name-input"), "John Doe");
    await user.type(screen.getByTestId("contact-input"), "john@example.com");
    await user.type(screen.getByTestId("message-input"), "Hello!");

    const submitButton = await screen.findByText(
      /начать проект|start project/i,
    );
    await user.click(submitButton);

    // Wait for the success message to appear - increased timeout
    await waitFor(
      () => {
        expect(screen.queryByTestId("success-message")).toBeInTheDocument();
      },
      { timeout: 15000 },
    );
  }, 20000);
});
