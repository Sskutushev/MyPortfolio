// src/components/sections/ContactSection.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { ContactSection } from "./ContactSection";

describe("ContactSection", () => {
  it("renders the contact section title", () => {
    render(<ContactSection />);
    // Check for the title of the section, which is managed by i18n
    // We look for the key in the component, which is "contact.title"
    // The default text in the translation files is "Deploy & Connect" or "Контакт"
    expect(
      screen.getByRole("heading", { name: /deploy & connect/i }),
    ).toBeInTheDocument();
  });
});
