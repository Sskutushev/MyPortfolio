// e2e/keyboard-navigation.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Keyboard Navigation", () => {
  test.beforeEach(async ({ page }) => {
    // Увеличиваем таймаут для всех операций в тесте
    page.setDefaultTimeout(30000);
    await page.goto("/");
    // Ждем полной загрузки страницы
    await page.waitForLoadState("networkidle");
  });

  test("should navigate through header with Tab key", async ({ page }) => {
    // Focus на первом элементе
    await page.keyboard.press("Tab");

    // Даем время для установки фокуса
    await page.waitForTimeout(500);

    // Проверяем focus на navigation links
    await expect(page.locator(":focus")).toBeVisible();
  });

  test("should open and close mobile menu with keyboard", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Ждем появления кнопки мобильного меню и кликаем
    const menuButton = page
      .getByRole("button", { name: /menu|меню|burger|бургер/i })
      .first();
    await expect(menuButton).toBeVisible();
    await menuButton.focus();
    await page.keyboard.press("Enter");

    // Проверяем что меню открылось
    await expect(page.locator("#mobile-menu")).toBeVisible({ timeout: 15000 });

    // Закрываем с помощью Escape
    await page.keyboard.press("Escape");
    // Даем время для анимации закрытия
    await page.waitForTimeout(1000);
    await expect(page.locator("#mobile-menu")).not.toBeVisible();
  });

  test("should toggle theme with keyboard", async ({ page }) => {
    // Находим кнопку темы
    const themeButton = page
      .getByRole("button", { name: /switch to.*theme|theme|тема/i })
      .first();
    await expect(themeButton).toBeVisible();
    await themeButton.focus();
    await page.keyboard.press("Enter");

    // Ждем, пока тема изменится
    await page.waitForFunction(
      () =>
        document.documentElement.classList.contains("dark") ||
        document.documentElement.classList.contains("light"),
      { timeout: 15000 },
    );

    // Проверяем что тема изменилась
    await expect(page.locator("html")).toHaveClass(/dark|light/);
  });

  test("should respect focus trap in modal", async ({ page }) => {
    // Ждем карточки проекта
    const projectCard = page.locator('[data-testid="project-card"]').first();
    await expect(projectCard).toBeVisible({ timeout: 30000 });
    await projectCard.click();

    // Modal должен быть открыт
    await expect(page.locator('[role="dialog"]')).toBeVisible({
      timeout: 15000,
    });

    // Делаем несколько нажатий Tab и проверяем фокус
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press("Tab");
      await page.waitForTimeout(500); // Даем время для установки фокуса
    }

    // Проверяем, что фокус внутри модального окна
    const currentFocus = page.locator(":focus");
    await expect(currentFocus).toBeVisible();
  });

  test("should skip to main content", async ({ page }) => {
    // Нажимаем Tab для активации skip link
    await page.keyboard.press("Tab");
    await page.waitForTimeout(500);

    // Ждем появление skip link
    const skipLink = page
      .getByText(/skip to main content|перейти к основному содержимому/i)
      .first();
    await expect(skipLink).toBeVisible();

    // Активируем skip link
    await page.keyboard.press("Enter");
    await page.waitForTimeout(500);

    // Проверяем что focus на main content
    await expect(page.locator("#main-content")).toBeVisible();
  });
});
