# GitHub Secrets Configuration

## Required Secrets

В настройках репозитория GitHub добавьте следующие secrets:

## Vercel Secrets

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

## Telegram Notifications

```
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## reCAPTCHA

```
VITE_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

## Lighthouse CI (Optional)

```
LHCI_GITHUB_APP_TOKEN=your_lhci_token
```

## Snyk (Security Scanning)

```
SNYK_TOKEN=your_snyk_token
```

## Codecov (Coverage Reports)

```
CODECOV_TOKEN=your_codecov_token
```

## How to Configure

1. Перейдите в настройки репозитория на GitHub
2. Выберите "Settings" → "Secrets and variables" → "Actions"
3. Нажмите "New repository secret"
4. Добавьте каждый secret по отдельности

## Secret Values

### Vercel Token

1. Зайдите в Vercel Dashboard
2. Перейдите в Settings → Tokens
3. Создайте новый token с нужными permissions

### Telegram Bot Token

1. Создайте бота через @BotFather в Telegram
2. Получите token после создания бота

### Telegram Chat ID

1. Напишите своему боту любое сообщение
2. Перейдите по ссылке: `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates`
3. Найдите chat_id в ответе

### reCAPTCHA Keys

1. Зайдите в Google reCAPTCHA Admin Console
2. Создайте новый сайт
3. Получите site key и secret key

## Environment Variables

Некоторые secrets используются как environment variables:

```bash
# В Vercel Environment Variables
VITE_RECAPTCHA_SITE_KEY=@vite_recaptcha_site_key
```

## Testing Secrets

Проверьте, что все secrets настроены правильно:

```bash
# В GitHub Actions workflow
env:
  VITE_RECAPTCHA_SITE_KEY: ${{ secrets.VITE_RECAPTCHA_SITE_KEY }}
```