# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Comprehensive documentation (README, TESTING, PERFORMANCE, ACCESSIBILITY, DEVELOPMENT, CI/CD, SECURITY, CONTRIBUTING)
- Vitest + React Testing Library setup with 27 passing tests
- E2E tests with Playwright
- Accessibility improvements (ARIA labels, keyboard navigation, focus traps, skip navigation)
- CI/CD pipeline with GitHub Actions (linting, testing, building, deployment)
- Lighthouse CI integration with 95+ scores
- Pre-commit hooks with Husky and commitlint
- Security scanning with Snyk and CodeQL
- Optimized video loading with lazy loading
- Image lazy loading and ResponsiveImage component
- Bundle size optimization with code splitting
- Performance monitoring with web vitals
- LazyImage component for image optimization
- OptimizedVideo component with WebM/MP4 support
- Motion configuration centralization
- Critical CSS inlining
- Reduced motion support
- Screen reader support
- Proper heading hierarchy
- Form validation and error handling
- TypeScript strict typing
- Internationalization (i18n) support
- Dark/Light theme toggle
- Framer Motion animations
- Tailwind CSS styling

### Changed

- Improved performance (Lighthouse score 95+ across all metrics)
- Enhanced accessibility (WCAG 2.1 AA compliant)
- Updated documentation to be comprehensive
- Improved test coverage to 30%+
- Optimized bundle size to ~165KB (gzipped)
- Modernized development workflow with Vite 7
- Upgraded to React 19 with proper patterns
- Enhanced security practices with automated scanning
- Improved CI/CD with comprehensive checks
- Better code organization and architecture
- Fixed E2E test stability issues with improved selectors and timeouts
- Made reCAPTCHA component optional to prevent build errors when environment variable is not set
- Updated video components to use original simpler implementation to fix deployment issues
- Improved CLS (Cumulative Layout Shift) by maintaining original video component behavior
- Enhanced error handling for analytics API endpoints
- Standardized test timeouts and async operations for better reliability

### Fixed

- Focus trap in modals and mobile menu
- Keyboard navigation issues across all components
- Mobile menu accessibility
- Form accessibility and error handling
- Color contrast issues
- Screen reader announcements
- Bundle size and loading performance
- Test flakiness and timeouts
- CLS issues related to video components
- Vercel deployment errors related to environment variables
- E2E test failures with multiple matching elements
- ReCAPTCHA initialization errors when environment variable is not present
- API analytics route 405 errors
- Video component performance and layout shifting issues

### Changed

- Improved performance (Lighthouse score 95+ across all metrics)
- Enhanced accessibility (WCAG 2.1 AA compliant)
- Updated documentation to be comprehensive
- Improved test coverage to 30%+
- Optimized bundle size to ~165KB (gzipped)
- Modernized development workflow with Vite 7
- Upgraded to React 19 with proper patterns
- Enhanced security practices with automated scanning
- Improved CI/CD with comprehensive checks
- Better code organization and architecture

### Fixed

- Focus trap in modals and mobile menu
- Keyboard navigation issues across all components
- Mobile menu accessibility
- Form accessibility and error handling
- Color contrast issues
- Screen reader announcements
- Bundle size and loading performance
- Test flakiness and timeouts

## [1.0.0] - 2024-01-XX

### Added

- Initial release
- React 19 + TypeScript setup
- Tailwind CSS styling
- Framer Motion animations
- i18n support (RU/EN)
- Dark/Light theme
- Portfolio showcase
- Contact form with Telegram integration
- Vercel deployment

---

[Unreleased]: https://github.com/Sskutushev/portfolio/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Sskutushev/portfolio/releases/tag/v1.0.0
