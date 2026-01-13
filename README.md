# Reactive Velocity Portfolio

This is a modern, production-ready portfolio website that demonstrates advanced React development practices. The project showcases professional work experience, projects, and technical skills with a focus on performance, accessibility, and user experience.

## Project Overview

The portfolio is built using modern web technologies and follows industry best practices for performance, accessibility, and maintainability. It includes comprehensive testing, CI/CD pipeline, and real-time performance monitoring.

### Key Features

- **Modern Tech Stack**: React 19, TypeScript, Vite 7, Tailwind CSS
- **Performance Optimized**: 95+ Lighthouse scores across all categories
- **Full Accessibility**: WCAG 2.1 AA compliance with keyboard navigation
- **Internationalization**: Support for Russian and English languages
- **Comprehensive Testing**: Unit, E2E, and accessibility tests with 100% pass rate
- **CI/CD Pipeline**: Automated testing, building, and deployment
- **Real-time Monitoring**: Web Vitals tracking and performance metrics

## Architecture

The project follows a modular architecture with clear separation of concerns:

```
src/
├── components/     # Reusable UI components organized by feature
├── contexts/       # React context providers for state management
├── data/           # Static data for projects and UI components
├── hooks/          # Custom React hooks for common functionality
├── lib/            # Utilities, configuration, and third-party integrations
├── pages/          # Route-level components
├── styles/         # Global styles and design system
├── test/           # Testing utilities and helpers
└── types/          # TypeScript type definitions
```

### Tech Stack

- **Frontend**: React 19, TypeScript, Vite 7
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions
- **Routing**: React Router for navigation
- **State Management**: React Context API
- **Internationalization**: i18next for multi-language support
- **Testing**: Vitest, React Testing Library, Playwright
- **Accessibility**: axe-core for automated testing
- **Performance**: Web Vitals monitoring

## Performance Optimizations

The application implements several performance strategies:

- **Code Splitting**: Route-level and component-level code splitting
- **Image Optimization**: Lazy loading with WebP/MP4 fallbacks
- **Bundle Optimization**: Manual chunk splitting and tree shaking
- **Compression**: Gzip and Brotli compression
- **Caching**: Smart caching strategies for API requests
- **Intersection Observer**: For performance monitoring and lazy loading

## Accessibility Features

The portfolio meets WCAG 2.1 AA standards:

- Keyboard navigation with skip links
- Proper ARIA attributes and semantic HTML
- Focus management in modals and menus
- Reduced motion support for motion-sensitive users
- Screen reader compatibility

## Internationalization

The application supports multiple languages:

- Russian and English language support
- Dynamic language switching
- Content translation stored in JSON files
- Locale persistence in localStorage

## Development Setup

### Prerequisites

- Node.js (version 20.x or higher)
- npm package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/noname/MyPortfolio.git
cd MyPortfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run test` - Run unit tests in watch mode
- `npm run test:coverage` - Run unit tests with coverage
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:a11y` - Run accessibility tests
- `npm run lint` - Run ESLint checks

## Testing Strategy

The project implements a comprehensive testing approach:

- **Unit Tests**: Vitest with React Testing Library for component testing
- **E2E Tests**: Playwright for full user journey testing
- **Accessibility Tests**: axe-core integration for automated a11y testing
- **Code Coverage**: Continuous monitoring with Codecov integration

## Deployment

The application is deployed on Vercel with:

- Automatic deployments on every push to main branch
- Preview deployments for pull requests
- Performance monitoring integration
- Custom domain configuration

## Browser Support

The portfolio supports modern browsers including:

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers on iOS and Android
- Progressive Web App (PWA) capabilities

## Project Data Structure

Portfolio content is organized in TypeScript files:

- `projects.ts` - Contains detailed project information with code examples
- `ui-components.ts` - UI component showcase data
- Translation files in `src/lib/locales/` for i18n support

Each project includes:

- Title, category, and technology stack
- Project flow description (input, process, output)
- Code highlights and performance metrics
- Links to live demos and source code

## Custom Hooks

The project includes several reusable custom hooks:

- `useTheme` - Theme switching with localStorage persistence
- `useFocusTrap` - Keyboard navigation in modal dialogs
- `useSkipNavigation` - Accessibility navigation helpers
- `useDebounce` - Optimized search functionality

## Performance Monitoring

Built-in performance tracking includes:

- Core Web Vitals (CLS, FCP, INP, LCP, TTFB)
- Long task detection and reporting
- Layout shift monitoring
- Analytics integration with beacon API

## Security Considerations

- Input validation and sanitization
- Secure API communication
- Proper error handling without information disclosure
- Content Security Policy implementation

## Contributing

This is a personal portfolio project, but feel free to explore the code and learn from the implementation patterns used throughout the application.
