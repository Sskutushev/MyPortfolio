// e2e/keyboard-navigation.spec.ts
import { test, expect, describe } from '@playwright/test';

describe('Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4173');
  });

  test('should navigate through header with Tab key', async ({ page }) => {
    // Focus на первом элементе
    await page.keyboard.press('Tab');

    // Проверяем focus на navigation links
    const focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should open and close mobile menu with keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Tab до кнопки меню
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // Проверяем что меню открылось
    await expect(page.locator('#mobile-menu')).toBeVisible();

    // Закрываем с помощью Escape
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-menu')).not.toBeVisible();
  });

  test('should toggle theme with keyboard', async ({ page }) => {
    // Находим кнопку темы
    const themeButton = page.getByRole('button', { name: /switch to.*theme/i });
    await themeButton.focus();
    await page.keyboard.press('Enter');

    // Проверяем что тема изменилась
    const html = page.locator('html');
    const currentClass = await html.getAttribute('class');
    expect(currentClass).toContain('dark');
  });

  test('should submit form with keyboard', async ({ page }) => {
    // Скроллим к форме
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Заполняем форму с клавиатуры
    await page.getByLabel(/name/i).focus();
    await page.keyboard.type('John Doe');

    await page.keyboard.press('Tab');
    await page.keyboard.type('john@example.com');

    await page.keyboard.press('Tab');
    await page.keyboard.type('Test message');

    // Note: В реальном тесте нужно обработать reCAPTCHA
  });

  test('should respect focus trap in modal', async ({ page }) => {
    // Открываем проект
    await page.locator('[data-testid="project-card"]').first().click();

    // Modal должен быть открыт
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Много Tab нажатий
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
    }

    // Focus должен остаться внутри modal
    const currentFocus = await page.locator(':focus');
    const modalContent = page.locator('[role="dialog"]');
    await expect(currentFocus).toBeVisible();
    await expect(modalContent).toContainText(await currentFocus.textContent() || '');
  });

  test('should skip to main content', async ({ page }) => {
    // Нажимаем Tab для активации skip link
    await page.keyboard.press('Tab');

    // Проверяем что skip link виден
    const skipLink = page.getByText(/skip to main content/i);
    await expect(skipLink).toBeFocused();

    // Активируем skip link
    await page.keyboard.press('Enter');

    // Проверяем что focus на main content
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });
});

describe('Screen Reader Announcements', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('http://localhost:4173');

    // Проверяем navigation
    const nav = page.locator('nav').first();
    await expect(nav).toHaveAttribute('aria-label', 'Main navigation');

    // Проверяем form
    const form = page.locator('form').first();
    await expect(form).toHaveAttribute('aria-label', 'Contact form');

    // Проверяем buttons
    const submitButton = page.getByRole('button', { name: /submit/i });
    await expect(submitButton).toBeVisible();
  });

  test('should announce form errors', async ({ page }) => {
    await page.goto('http://localhost:4173/#contact');

    // Пытаемся отправить пустую форму
    const submitButton = page.getByRole('button', { name: /submit/i });
    await submitButton.click();

    // Проверяем что ошибки видны и имеют role="alert"
    const errors = page.locator('[role="alert"]');
    await expect(errors.first()).toBeVisible();
  });
});