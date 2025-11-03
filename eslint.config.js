import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default tseslint.config(
  { 
    files: ['src/**/*.{ts,tsx}', 'e2e/**/*.{ts,tsx}', '*.config.{js,mjs,ts}', 'scripts/**/*.{js,ts}'],
    ignores: [
      'dist/**', 
      'node_modules/**', 
      '*.min.js', 
      'coverage/**', 
      'build/**',
      'src/test/setup.ts',
      'src/__mocks__/**',
      'public/**',
      '*.d.ts',
      // Явно исключаем сгенерированные файлы
      'dist/**/*',
      'src/**/*.js',  // Исключаем JS файлы в src, кроме случаев когда TypeScript не может их обработать
    ] 
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.vitest,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/no-autofocus': 'warn',
      // Отключаем правила, которые могут мешать тестам
      '@typescript-eslint/no-explicit-any': 'off'
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  }
);
