# Конфигурация GitHub Secrets

Для корректной работы CI/CD пайплайна в настройках репозитория GitHub должны быть добавлены следующие секреты.

## Инструкция по добавлению

1.  Перейдите в настройки вашего репозитория на GitHub.
2.  В меню слева выберите `Settings` → `Secrets and variables` → `Actions`.
3.  Нажмите `New repository secret` для каждого секрета из списка ниже.

---

## Обязательные секреты

### Vercel

Эти секреты необходимы для автоматического деплоя проекта на платформу Vercel.

| Secret | Описание | Где найти - `VERCEL_TOKEN` | Токен доступа для авторизации в Vercel. | В личном кабинете Vercel: `Settings` → `Tokens` → `Create`. - `VERCEL_ORG_ID` | ID вашей организации или персонального аккаунта в Vercel. | В личном кабинете Vercel: `Settings` → `Your ID`. - `VERCEL_PROJECT_ID` | ID вашего проекта в Vercel. | В дашборде проекта Vercel: `Settings` → `General` → `Project ID`. -

### Инструменты

| Secret | Описание - `CODECOV_TOKEN` | Токен для загрузки отчетов о покрытии кода в Codecov. - `LHCI_GITHUB_APP_TOKEN` | Токен для публикации отчетов Lighthouse CI в Pull Requests. -
