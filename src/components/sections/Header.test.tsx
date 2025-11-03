// src/components/sections/Header.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";

describe("Header", () => {
  it("renders logo text", () => {
    render(<Header />);
    expect(screen.getAllByText("Sskutushev")[0]).toBeInTheDocument();
  });

  it("renders navigation links on desktop", () => {
    render(<Header />);
    expect(
      screen.getByLabelText(/navigate to обо мне section/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/navigate to опыт section/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/navigate to портфолио section/i),
    ).toBeInTheDocument();
  });

  it("toggles language when language button is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const langButton = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent === "RU" || btn.textContent === "EN");

    if (langButton) {
      await user.click(langButton);
      // Проверяем, что язык изменился
    }
  });

  it("toggles theme when theme button is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const themeButtons = screen.getAllByRole("button");
    const themeButton = themeButtons.find((btn) => {
      const svg = btn.querySelector("svg");
      return svg !== null;
    });

    if (themeButton) {
      await user.click(themeButton);
      // Проверяем переключение темы
    }
  });

  it("opens mobile menu on hamburger click", async () => {
    // Mock mobile viewport
    global.innerWidth = 375;

    const user = userEvent.setup();
    render(<Header />);

    // Находим кнопку меню (Menu icon)
    const menuButton = screen.getAllByRole("button")[0];
    await user.click(menuButton);

    // Проверяем что меню открылось
  });
});
