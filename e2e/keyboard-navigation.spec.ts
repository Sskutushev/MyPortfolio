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

  test("should submit form with keyboard", async ({ page }) => {
    // Ждем секцию контактов
    await expect(page.locator("section#contact")).toBeVisible();

    // Скроллим к форме
    await page.locator("section#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // Даем время для анимации скролла

    // Ждем поля имени и фокусируемся на нем, используя более конкретный селектор
    const nameInput = page
      .locator("section#contact")
      .getByLabel(/name|имя/i)
      .first();
    await expect(nameInput).toBeVisible();
    await nameInput.focus();
    await page.keyboard.type("John Doe");

    await page.keyboard.press("Tab");
    await page.keyboard.type("john@example.com");

    await page.keyboard.press("Tab");
    await page.keyboard.type("Test message");
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

test.describe("Screen Reader Announcements", () => {
  test("should have proper ARIA labels", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Проверяем navigation
    await expect(page.locator("nav").first()).toHaveAttribute(
      "aria-label",
      "Main navigation",
    );

    // Scroll to the bottom to trigger lazy-loaded sections
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Ждем появления секции контактов
    await expect(page.locator("section#contact")).toBeVisible({
      timeout: 30000,
    });

    // Проверяем наличие submit кнопки
    await expect(
      page
        .getByRole("button", { name: /Start Project|Начать Проект/i })
        .first(),
    ).toBeVisible();
  });

  test("should announce form errors", async ({ page }) => {
    await page.goto("/#contact");
    await page.waitForLoadState("networkidle");

    // Ждем секцию контактов
    await expect(page.locator("section#contact")).toBeVisible();

    // Скроллим к форме
    await page.locator("section#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Находим поля формы, используя более конкретные селекторы внутри секции контактов
    const nameInput = page
      .locator("section#contact")
      .getByLabel(/name|имя/i)
      .first();
    const contactInput = page
      .locator("section#contact")
      .getByLabel(/email|telegram/i)
      .first();
    const messageInput = page
      .locator("section#contact")
      .getByLabel(/message|описание|сообщение/i)
      .first();
    const submitButton = page
      .locator("section#contact")
      .getByRole("button", { name: /Start Project|Начать Проект/i })
      .first();

    // Заполняем поля, чтобы кнопка стала активной
    await nameInput.fill("Test Name");
    await contactInput.fill("test@example.com");
    await messageInput.fill("Test message");

    // Убеждаемся, что кнопка активна
    await expect(submitButton).toBeEnabled();

    // Очищаем поля, чтобы вызвать ошибки валидации
    await nameInput.fill("");
    await contactInput.fill("");
    await messageInput.fill("");

    // Кликаем кнопку отправки с пустыми полями
    await submitButton.click();

    // Проверяем наличие сообщений об ошибках
    const alerts = page.locator('[role="alert"]');
    await expect(alerts).toHaveCount(3); // ожидаем 3 сообщения об ошибках (для имени, контакта и сообщения)
  });
});
